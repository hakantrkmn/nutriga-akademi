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
      university: profession === "öğrenci" ? university?.trim() : null,
      department: profession === "öğrenci" ? department?.trim() : null,
      class: profession === "öğrenci" ? classValue : null,
      email: email.trim(),
      phone: phone?.trim() || null,
      desiredEducationId: desired_education_id || null,
    };

    // Create user profile using Prisma
    const user = await prisma.user.create({
      data: userData,
    });

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
