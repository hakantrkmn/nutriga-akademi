import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const courses = await prisma.egitim.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        price: true,
        category: true,
        level: true,
      },
      orderBy: {
        title: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: courses,
      message: "Courses fetched successfully !",
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch courses",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
