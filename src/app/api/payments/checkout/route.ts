import getIyzicoClient, {
  CheckoutFormInitializeRequest,
  Locale,
} from "@/lib/iyzico";
import { prisma } from "@/lib/prisma";
import { cartGet } from "@/lib/redis";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

async function getUserId(request: NextRequest, response: NextResponse) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}

async function getUserProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  });
  return user;
}

export async function POST(request: NextRequest) {
  const response = NextResponse.next();

  try {
    console.log("Checkout API called");

    // Read client options (e.g., enabledInstallments, addressData)
    let body: unknown = null;
    try {
      body = await request.json();
    } catch {
      body = {};
    }
    const { enabledInstallments, addressData } = (body as {
      enabledInstallments?: number[];
      addressData?: {
        billingAddress: string;
        billingCity: string;
        billingCountry: string;
        billingZipCode: string;
        isTurkishCitizen: boolean;
        identityNumber: string;
      };
    }) || { enabledInstallments: undefined, addressData: undefined };

    const userId = await getUserId(request, response);
    console.log("User ID:", userId);

    if (!userId) {
      console.log("No user ID found, returning 401");
      return NextResponse.json(
        { success: false, error: "Giriş gerekli" },
        { status: 401 }
      );
    }

    // 1) Sepeti Redis'ten oku
    console.log("Getting cart items for user:", userId);
    const cartItems = await cartGet(userId);
    console.log("Cart items:", cartItems);

    if (cartItems.length === 0) {
      console.log("Cart is empty");
      return NextResponse.json(
        { success: false, error: "Sepet boş" },
        { status: 400 }
      );
    }

    // 2) DB'den ürünleri getir ve fiyat doğrulaması yap
    const products = await prisma.egitim.findMany({
      where: { id: { in: cartItems.map((i) => i.educationId) } },
    });

    const details = cartItems.map((item) => {
      const product = products.find((p) => p.id === item.educationId);
      const unitPrice = Number(product?.price ?? 0);
      const totalPrice = unitPrice * item.quantity;

      return {
        educationId: item.educationId,
        quantity: item.quantity,
        unitPrice,
        totalPrice,
        exists: !!product,
        title: product?.title || "",
        instructor: product?.instructor || "",
      };
    });

    const totalAmount = details.reduce(
      (sum, detail) => sum + detail.totalPrice,
      0
    );
    const allValid = details.every((d) => d.exists && d.unitPrice > 0);

    if (!allValid) {
      const invalidItems = details.filter((d) => !d.exists || d.unitPrice <= 0);
      return NextResponse.json(
        {
          success: false,
          error: "Bazı ürünler artık mevcut değil veya fiyatları değişmiş",
          data: { invalidItems },
        },
        { status: 400 }
      );
    }

    // 3) Kullanıcı bilgilerini al
    const userProfile = await getUserProfile(userId);
    if (!userProfile) {
      return NextResponse.json(
        { success: false, error: "Kullanıcı bilgileri bulunamadı" },
        { status: 404 }
      );
    }

    // 4) Adres bilgilerini kontrol et
    if (!addressData) {
      return NextResponse.json(
        { success: false, error: "Adres bilgileri eksik" },
        { status: 400 }
      );
    }

    // 5) Environment kontrolü
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) {
      console.error("NEXT_PUBLIC_APP_URL environment variable is not set");
      return NextResponse.json(
        { success: false, error: "Sunucu yapılandırma hatası" },
        { status: 500 }
      );
    }

    // 6) Önce aynı user için PENDING payment var mı kontrol et, yoksa FAILED olanı kullan
    let payment = await prisma.payment.findFirst({
      where: {
        userId,
        status: "PENDING",
      },
      include: {
        paymentItems: true,
      },
    });

    // Eğer PENDING yoksa, FAILED olanı kontrol et
    if (!payment) {
      const failedPayment = await prisma.payment.findFirst({
        where: {
          userId,
          status: "FAILED",
        },
        include: {
          paymentItems: true,
        },
        orderBy: {
          createdAt: "desc", // En son FAILED olanı al
        },
      });

      if (failedPayment) {
        // FAILED payment'ın sepetini kontrol et
        const currentCartItems = details;
        const existingItems = failedPayment.paymentItems;

        const currentTotal = currentCartItems.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );
        const existingTotal = existingItems.reduce(
          (sum, item) => sum + Number(item.totalPrice),
          0
        );

        // Eğer sepet aynıysa FAILED payment'ı PENDING'e çevir ve kullan
        if (
          currentTotal === existingTotal &&
          currentCartItems.length === existingItems.length
        ) {
          console.log(
            "Using failed payment and resetting to PENDING:",
            failedPayment.id
          );
          payment = await prisma.payment.update({
            where: { id: failedPayment.id },
            data: { status: "PENDING" },
            include: { paymentItems: true },
          });
        }
      }
    }

    let conversationId: string;

    if (payment) {
      // Mevcut PENDING payment'ı kullan
      console.log("Using existing PENDING payment:", payment!.id);
      // Her zaman yeni conversationId oluştur (webhook conversationId null gönderebiliyor)
      conversationId = uuidv4();

      // Sepeti kontrol et - eğer değiştiyse payment items'ı güncelle
      const currentCartItems = details;
      const existingItems = payment.paymentItems;

      // Basit kontrol: item sayısı ve toplam tutar aynı mı?
      const currentTotal = currentCartItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
      const existingTotal = existingItems.reduce(
        (sum, item) => sum + Number(item.totalPrice),
        0
      );

      if (
        currentTotal !== existingTotal ||
        currentCartItems.length !== existingItems.length
      ) {
        console.log("Cart changed, updating payment items");

        // Eski payment items'ları sil
        await prisma.paymentItem.deleteMany({
          where: { paymentId: payment!.id },
        });

        // Yeni payment items'ları oluştur
        await prisma.paymentItem.createMany({
          data: details.map((detail) => ({
            paymentId: payment!.id,
            educationId: detail.educationId,
            quantity: detail.quantity,
            unitPrice: detail.unitPrice,
            totalPrice: detail.totalPrice,
          })),
        });

        // Payment toplamını güncelle
        await prisma.payment.update({
          where: { id: payment!.id },
          data: { totalAmount },
        });

        // Güncellenmiş payment'ı tekrar çek
        payment = await prisma.payment.findFirst({
          where: { id: payment!.id },
          include: { paymentItems: true },
        });
      }
    } else {
      // Yeni payment oluştur
      conversationId = uuidv4();
      payment = await prisma.payment.create({
        data: {
          userId,
          totalAmount,
          status: "PENDING",
          conversationId,
          paymentItems: {
            create: details.map((detail) => ({
              educationId: detail.educationId,
              quantity: detail.quantity,
              unitPrice: detail.unitPrice,
              totalPrice: detail.totalPrice,
            })),
          },
        },
        include: {
          paymentItems: true,
        },
      });
      console.log("Created new PENDING payment:", payment!.id);
    }

    // 8) Iyzico checkout form başlat
    console.log("Initializing Iyzico client");
    const iyzicoClient = getIyzicoClient();
    console.log("Iyzico client initialized");

    const checkoutData: CheckoutFormInitializeRequest = {
      locale: "tr" as Locale,
      conversationId,
      price: totalAmount.toFixed(2),
      paidPrice: totalAmount.toFixed(2),
      currency: "TRY",
      basketId: `BASKET_${conversationId}`,
      paymentGroup: "PRODUCT",
      callbackUrl: `${appUrl}/api/payments/webhook`,
      forceThreeDS: "1", // 3D Secure açık
      enabledInstallments: Array.isArray(enabledInstallments)
        ? enabledInstallments
        : undefined,
      buyer: {
        id: userId,
        name: userProfile.firstName,
        surname: userProfile.lastName,
        identityNumber: addressData.isTurkishCitizen
          ? addressData.identityNumber
          : "11111111111",
        email: userProfile.email,
        gsmNumber: userProfile.phone,
        registrationAddress: addressData.billingAddress,
        city: addressData.billingCity,
        country:
          addressData.billingCountry === "Türkiye"
            ? "Turkey"
            : addressData.billingCountry,
        zipCode: addressData.billingZipCode,
        ip: request.headers.get("x-forwarded-for") || "127.0.0.1",
      },
      shippingAddress: {
        contactName: `${userProfile.firstName} ${userProfile.lastName}`,
        city: addressData.billingCity,
        country:
          addressData.billingCountry === "Türkiye"
            ? "Turkey"
            : addressData.billingCountry,
        address: "Dijital Teslimat - " + addressData.billingAddress, // Dijital ürün için
        zipCode: addressData.billingZipCode,
      },
      billingAddress: {
        contactName: `${userProfile.firstName} ${userProfile.lastName}`,
        city: addressData.billingCity,
        country:
          addressData.billingCountry === "Türkiye"
            ? "Turkey"
            : addressData.billingCountry,
        address: addressData.billingAddress,
        zipCode: addressData.billingZipCode,
      },
      basketItems: details.map((detail, index) => ({
        id: `BI${index + 1}`,
        name: detail.title,
        category1: "Eğitim",
        category2: "Online Kurs",
        itemType: "VIRTUAL",
        price: detail.totalPrice.toFixed(2),
      })),
    };

    console.log("Checkout data prepared:", checkoutData);
    console.log("Calling Iyzico initializeCheckoutForm");

    const checkoutResult =
      await iyzicoClient.initializeCheckoutForm(checkoutData);

    console.log("Iyzico response:", checkoutResult);

    if (checkoutResult.status !== "success") {
      // Payment kaydını FAILED olarak güncelle
      await prisma.payment.update({
        where: { id: payment!.id },
        data: { status: "FAILED" },
      });

      return NextResponse.json(
        {
          success: false,
          error: "Ödeme formu başlatılamadı",
          details: checkoutResult,
        },
        { status: 500 }
      );
    }

    // 9) Payment kaydını güncelle (token ile)
    await prisma.payment.update({
      where: { id: payment!.id },
      data: {
        iyzicoToken: checkoutResult.token,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Ödeme formu başarıyla başlatıldı",
      data: {
        paymentId: payment!.id,
        token: checkoutResult.token,
        checkoutFormContent: checkoutResult.checkoutFormContent,
        paymentPageUrl: checkoutResult.paymentPageUrl,
        payWithIyzicoPageUrl: checkoutResult.payWithIyzicoPageUrl,
        tokenExpireTime: checkoutResult.tokenExpireTime,
        orderSummary: {
          items: details.map((detail) => ({
            title: detail.title,
            quantity: detail.quantity,
            unitPrice: detail.unitPrice,
            totalPrice: detail.totalPrice,
          })),
          totalAmount,
        },
      },
    });
  } catch (error) {
    console.error("Payment checkout error:", error);

    // Environment variables kontrolü
    console.log("Environment check:", {
      IYZICO_SANDBOX_API_KEY: process.env.IYZICO_SANDBOX_API_KEY
        ? "SET"
        : "NOT SET",
      IYZICO_SANDBOX_SECRET_KEY: process.env.IYZICO_SANDBOX_SECRET_KEY
        ? "SET"
        : "NOT SET",
      IYZICO_SANDBOX_URI: process.env.IYZICO_SANDBOX_URI,
      IYZICO_ENVIRONMENT: process.env.IYZICO_ENVIRONMENT,
    });

    return NextResponse.json(
      { success: false, error: "Ödeme işlemi başlatılamadı" },
      { status: 500 }
    );
  }
}
