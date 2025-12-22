import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        profession: true,
      },
      orderBy: {
        firstName: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Kullanıcılar listelenirken hata:", error);
    return NextResponse.json(
      { success: false, error: "Kullanıcılar alınamadı" },
      { status: 500 }
    );
  }
}


