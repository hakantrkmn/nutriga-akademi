import { render } from "@react-email/render";
import { Resend } from "resend";
import PurchaseConfirmationEmail from "./email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface OrderDetail {
  educationId: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  title: string;
  instructor: string;
}

export interface SendPurchaseConfirmationParams {
  userEmail: string;
  userName: string;
  orderDetails: OrderDetail[];
  subtotal: number;
}

export async function sendPurchaseConfirmation({
  userEmail,
  userName,
  orderDetails,
  subtotal,
}: SendPurchaseConfirmationParams) {
  try {
    const orderDate = new Date().toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const emailHtml = await render(
      PurchaseConfirmationEmail({
        userName,
        orderDetails,
        subtotal,
        orderDate,
      })
    );

    const { data, error } = await resend.emails.send({
      from: "Nutriga Akademi <noreply@mail.nutrigaakademi.com>", // Resend'de onaylanan domain
      to: [userEmail],
      subject: "Satın Alım Onayı - Nutriga Akademi",
      html: emailHtml,
    });

    if (error) {
      console.error("Email gönderme hatası:", error);
      return { success: false, error: error.message };
    }

    console.log("Email başarıyla gönderildi:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Email gönderme hatası:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Bilinmeyen hata",
    };
  }
}
