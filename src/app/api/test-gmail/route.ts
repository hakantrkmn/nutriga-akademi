import {
  sendNewUserNotificationToAdmin,
  testGmailConnection,
} from "@/lib/gmail-smtp";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // Gmail SMTP bağlantısını test et
    const connectionTest = await testGmailConnection();

    if (!connectionTest.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Gmail SMTP bağlantısı başarısız",
          details: connectionTest.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Gmail SMTP bağlantısı başarılı!",
    });
  } catch (error) {
    console.error("Gmail test hatası:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { testEmail } = await request.json();

    if (!testEmail) {
      return NextResponse.json(
        {
          success: false,
          error: "Test email adresi gerekli",
        },
        { status: 400 }
      );
    }

    // Test maili gönder
    const testResult = await sendNewUserNotificationToAdmin({
      userName: "Test Kullanıcı",
      userEmail: testEmail,
      profession: "Test Meslek",
      university: "Test Üniversite",
      department: "Test Bölüm",
      class: "Test Sınıf",
      phone: "0555 123 45 67",
      registrationDate: new Date().toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    if (testResult.success) {
      return NextResponse.json({
        success: true,
        message: "Test maili başarıyla gönderildi!",
        messageId: testResult.messageId,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Test maili gönderme hatası",
          details: testResult.error,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Test mail hatası:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 }
    );
  }
}
