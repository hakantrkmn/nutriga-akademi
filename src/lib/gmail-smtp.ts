import nodemailer from "nodemailer";

// Gmail SMTP transporter oluştur
const createGmailTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_USER, // Gmail adresiniz
      pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password
    },
  });
};

export interface NewUserNotificationParams {
  userName: string;
  userEmail: string;
  profession: string;
  university?: string;
  department?: string;
  class?: string;
  phone?: string;
  registrationDate: string;
}

export async function sendNewUserNotificationToAdmin({
  userName,
  userEmail,
  profession,
  university,
  department,
  class: classValue,
  phone,
  registrationDate,
}: NewUserNotificationParams) {
  try {
    const transporter = createGmailTransporter();

    // Email HTML template
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          🎉 Yeni Kullanıcı Kaydı - Nutriga Akademi
        </h2>

        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Kullanıcı Bilgileri</h3>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Ad Soyad:</td>
              <td style="padding: 8px 0; color: #6b7280;">${userName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">E-posta:</td>
              <td style="padding: 8px 0; color: #6b7280;">${userEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Meslek:</td>
              <td style="padding: 8px 0; color: #6b7280;">${profession}</td>
            </tr>
            ${
              university
                ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Üniversite:</td>
              <td style="padding: 8px 0; color: #6b7280;">${university}</td>
            </tr>
            `
                : ""
            }
            ${
              department
                ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Bölüm:</td>
              <td style="padding: 8px 0; color: #6b7280;">${department}</td>
            </tr>
            `
                : ""
            }
            ${
              classValue
                ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Sınıf:</td>
              <td style="padding: 8px 0; color: #6b7280;">${classValue}</td>
            </tr>
            `
                : ""
            }
            ${
              phone
                ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Telefon:</td>
              <td style="padding: 8px 0; color: #6b7280;">${phone}</td>
            </tr>
            `
                : ""
            }
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Kayıt Tarihi:</td>
              <td style="padding: 8px 0; color: #6b7280;">${registrationDate}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
          <p style="margin: 0; color: #065f46;">
            <strong>💡 Bilgi:</strong> Bu kullanıcı Nutriga Akademi platformuna yeni kayıt olmuştur.
            Kullanıcı detaylarını admin panelinden görüntüleyebilirsiniz.
          </p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
          <p>Bu e-posta Nutriga Akademi sistem tarafından otomatik olarak gönderilmiştir.</p>
        </div>
      </div>
    `;

    // Email gönder
    const info = await transporter.sendMail({
      from: `"Nutriga Akademi" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL, // Admin email adresiniz
      subject: `🎉 Yeni Kullanıcı Kaydı: ${userName}`,
      html: emailHtml,
    });

    console.log("Gmail SMTP ile admin bildirimi gönderildi:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Gmail SMTP ile mail gönderme hatası:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Bilinmeyen hata",
    };
  }
}

// Test fonksiyonu - Gmail SMTP bağlantısını test etmek için
export async function testGmailConnection() {
  try {
    const transporter = createGmailTransporter();
    await transporter.verify();
    console.log("Gmail SMTP bağlantısı başarılı!");
    return { success: true };
  } catch (error) {
    console.error("Gmail SMTP bağlantı hatası:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Bilinmeyen hata",
    };
  }
}
