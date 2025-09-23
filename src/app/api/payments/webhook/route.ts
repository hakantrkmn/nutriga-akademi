import { sendPurchaseConfirmation } from "@/lib/email";
import getIyzicoClient from "@/lib/iyzico";
import { prisma } from "@/lib/prisma";
import { cartSet } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    let token: string | null = null;
    let conversationId: string | null = null;

    const contentType = request.headers.get("content-type") || "";

    if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const formData = await request.formData();
      token = (formData.get("token") as string) || null;
      conversationId = (formData.get("conversationId") as string) || null;
    } else if (contentType.includes("application/json")) {
      const json = await request.json().catch(() => ({}));
      token = (json?.token as string) || null;
      conversationId = (json?.conversationId as string) || null;
    } else {
      const text = await request.text();
      try {
        const json = JSON.parse(text);
        token = (json?.token as string) || null;
        conversationId = (json?.conversationId as string) || null;
      } catch {
        // ignore
      }
    }

    console.log("Webhook received:", { token, conversationId });

    // Webhook verilerini doğrula
    if (!token) {
      console.error("Invalid webhook data: missing token");
      return NextResponse.json(
        { success: false, error: "Invalid webhook data" },
        { status: 400 }
      );
    }

    // Önce token ile payment kaydını bul; yoksa conversationId ile dene
    let payment = await prisma.payment.findFirst({
      where: { iyzicoToken: token },
      include: {
        paymentItems: {
          include: { education: true },
        },
        user: true,
      },
    });

    if (!payment && conversationId) {
      payment = await prisma.payment.findFirst({
        where: { conversationId },
        include: {
          paymentItems: {
            include: { education: true },
          },
          user: true,
        },
      });
    }

    if (!payment) {
      console.error("Payment not found for conversationId:", conversationId);
      return NextResponse.json(
        { success: false, error: "Payment not found" },
        { status: 404 }
      );
    }

    // Eğer ödeme zaten işlenmişse, duplicate webhook'ı ignore et
    if (payment.status !== "PENDING") {
      console.log("Payment already processed:", payment.id);
      return NextResponse.json({ success: true, message: "Already processed" });
    }

    // Iyzico'dan ödeme detaylarını doğrula
    const iyzicoClient = getIyzicoClient();

    try {
      const paymentDetails = await iyzicoClient.retrieveCheckoutForm(token);

      if (paymentDetails.status !== "success") {
        console.error("Iyzico payment verification failed:", paymentDetails);

        // Hata mesajını kullanıcıya gösteren HTML
        const htmlErrorVerification = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8" />
            <title>Ödeme Doğrulama Hatası</title>
            <script src="/payment-result.js"></script>
          </head>
          <body>
            <script>
              window.PaymentResult.render({
                type: 'error',
                title: 'Ödeme Başarısız',
                message: ${JSON.stringify(
                  paymentDetails.errorMessage || "Ödeme doğrulaması başarısız"
                )},
                redirectUrl: '/cart?payment=failed',
                redirectDelayMs: 3000
              });
            </script>
          </body>
          </html>
        `;

        // DB'de reason alanını güncelle
        try {
          await prisma.payment.update({
            where: { id: payment.id },
            data: {
              status: "FAILED",
              reason:
                paymentDetails.errorMessage ||
                (paymentDetails.errorCode
                  ? `Error ${paymentDetails.errorCode}`
                  : "Payment verification failed"),
            },
          });
        } catch (e) {
          console.error(
            "Failed to update payment failure reason (verification)",
            e
          );
        }

        return new Response(htmlErrorVerification, {
          status: 200,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          },
        });
      }

      // Ödeme başarılı ise
      if (paymentDetails.paymentStatus === "SUCCESS") {
        // Payment kaydını güncelle
        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: "COMPLETED",
            paidPrice: paymentDetails.paidPrice
              ? parseFloat(paymentDetails.paidPrice)
              : null,
            installment: paymentDetails.installment || 1,
            iyzicoPaymentId: paymentDetails.paymentId,
            paymentMethod: paymentDetails.paymentItems?.[0]
              ?.paymentTransactionId
              ? "credit_card"
              : "other",
            reason: null,
          },
        });

        // Eğitim satış sayılarını güncelle
        for (const paymentItem of payment.paymentItems) {
          await prisma.egitim.update({
            where: { id: paymentItem.educationId },
            data: {
              salesCount: {
                increment: paymentItem.quantity,
              },
            },
          });
        }

        // Başarılı ödeme email'i gönder
        try {
          const orderDetails = payment.paymentItems.map((item) => ({
            educationId: item.educationId,
            quantity: item.quantity,
            unitPrice: 0, // Fiyat bilgisi göstermiyoruz
            lineTotal: 0, // Fiyat bilgisi göstermiyoruz
            title: item.education.title || "Eğitim",
            instructor: item.education.instructor || "Eğitmen",
          }));

          const emailResult = await sendPurchaseConfirmation({
            userEmail: payment.user.email,
            userName: `${payment.user.firstName} ${payment.user.lastName}`,
            orderDetails,
            subtotal: 0, // Fiyat bilgisi göstermiyoruz
          });

          if (emailResult.success) {
            console.log("Purchase confirmation email sent successfully");
          } else {
            console.error(
              "Failed to send purchase confirmation email:",
              emailResult.error
            );
          }
        } catch (emailError) {
          console.error("Email sending error:", emailError);
        }

        // Sepeti temizle (sadece başarılı ödeme sonrası)
        await cartSet(payment.userId, []);

        // Başarılı ödeme için HTML yanıt ver, yönlendirme yap
        const htmlResponse = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Ödeme Başarılı</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              :root {
                --background: #ffffff;
                --foreground: #112825;
                --primary: #82541c;
                --primary-hover: #a87f42;
                --success: #6b705c;
                --success-light: #f0f1ef;
                --success-text: #3e4136;
                --gray-600: #4b5563;
                --gray-100: #f3f4f6;
              }
            </style>
          </head>
          <body class="bg-[var(--background)] min-h-screen flex items-center justify-center">
            <div class="bg-[var(--background)] p-4 sm:p-8 rounded-lg shadow-lg text-center max-w-sm sm:max-w-md border border-gray-200">
              <div class="text-[var(--success)] text-5xl sm:text-6xl mb-4">✓</div>
              <h1 class="text-2xl font-bold text-[var(--success-text)] mb-2">Ödeme Başarılı!</h1>
              <p class="text-[var(--gray-600)] mb-4">Eğitimlerinize erişim sağlandı.</p>
              <button onclick="redirectToHome()" class="bg-[var(--primary)] text-white px-6 py-2 rounded hover:bg-[var(--primary-hover)]">
                Ana Sayfaya Dön
              </button>
            </div>
            <script>
              function redirectToHome() {
                window.top.location.href = '/?payment=success';
              }
              // 3 saniye sonra otomatik yönlendir
              setTimeout(redirectToHome, 3000);
            </script>
          </body>
          </html>
        `;

        return new Response(htmlResponse, {
          status: 200,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          },
        });
      } else {
        // Ödeme başarısız ise
        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: "FAILED",
            reason:
              paymentDetails.errorMessage ||
              (paymentDetails.errorCode
                ? `Error ${paymentDetails.errorCode}`
                : "Payment failed"),
          },
        });

        console.log("Payment failed:", payment.id);

        // Başarısız ödeme için HTML yanıt ver
        const userErrorMessage =
          paymentDetails.errorMessage ||
          "Ödeme işlemi tamamlanamadı. Lütfen tekrar deneyin.";
        const htmlErrorResponse = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8" />
            <title>Ödeme Başarısız</title>
            <script src="/payment-result.js"></script>
          </head>
          <body>
            <script>
              window.PaymentResult.render({
                type: 'error',
                title: 'Ödeme Başarısız',
                message: ${JSON.stringify(userErrorMessage)},
                redirectUrl: '/cart?payment=failed',
                redirectDelayMs: 3000
              });
            </script>
          </body>
          </html>
        `;

        return new Response(htmlErrorResponse, {
          status: 200,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          },
        });
      }
    } catch (iyzicoError) {
      console.error("Iyzico API error:", iyzicoError);
      return NextResponse.json(
        { success: false, error: "Payment verification error" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
