import { sendNewUserNotificationToAdmin } from "@/lib/gmail-smtp";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      id,
      first_name,
      last_name,
      profession,
      university,
      department,
      class: classValue,
      email,
      phone,
      notification_permission,
      desired_education_id,
    } = await request.json();

    // Validate required fields
    if (!id || !first_name || !last_name || !email || !profession) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const userData = {
      id,
      firstName: first_name.trim(),
      lastName: last_name.trim(),
      profession,
      university: profession === "Öğrenci" ? university?.trim() : null,
      department: profession === "Öğrenci" ? department?.trim() : null,
      class: profession === "Öğrenci" ? classValue : null,
      email: email.trim(),
      phone: phone?.trim() || null,
      notificationPermission: notification_permission || false,
      desiredEducationId: desired_education_id || null,
    };

    // Create user profile using Prisma
    const user = await prisma.user.create({
      data: userData,
    });

    // Gmail SMTP ile admin'e bildirim gönder
    try {
      const registrationDate = new Date().toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const adminNotificationResult = await sendNewUserNotificationToAdmin({
        userName: `${userData.firstName} ${userData.lastName}`,
        userEmail: userData.email,
        profession: userData.profession,
        university: userData.university || undefined,
        department: userData.department || undefined,
        class: userData.class || undefined,
        phone: userData.phone || undefined,
        registrationDate,
      });

      if (adminNotificationResult.success) {
        console.log(
          "Admin bildirimi başarıyla gönderildi:",
          adminNotificationResult.messageId
        );
      } else {
        console.error(
          "Admin bildirimi gönderme hatası:",
          adminNotificationResult.error
        );
        // Admin bildirimi hatası kullanıcı kaydını etkilemez
      }
    } catch (emailError) {
      console.error("Admin bildirimi sırasında hata:", emailError);
      // Email hatası kullanıcı kaydını etkilemez
    }

    return NextResponse.json({
      success: true,
      data: user,
      message: "User profile created successfully",
    });
  } catch (error) {
    console.error("Database error:", error);

    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 409 }
        );
      }
      if (error.message.includes("Foreign key constraint")) {
        return NextResponse.json(
          { error: "Invalid education ID" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        error: "Failed to create user profile",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
