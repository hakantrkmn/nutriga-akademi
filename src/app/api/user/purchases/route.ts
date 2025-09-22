import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı ID parametresi gerekli" },
        { status: 400 }
      );
    }

    // Get user's purchased items from payment_items (only COMPLETED payments)
    const paymentItems = await prisma.paymentItem.findMany({
      where: {
        payment: {
          userId: userId,
          status: "COMPLETED",
        },
      },
      include: {
        education: true,
        payment: {
          select: {
            createdAt: true,
          },
        },
      },
      orderBy: {
        payment: {
          createdAt: "desc",
        },
      },
    });

    // Format the response to match the expected CartItem interface
    const formattedData = paymentItems.map((item) => ({
      id: item.id,
      educationId: item.educationId,
      quantity: item.quantity,
      createdAt: item.payment.createdAt.toISOString(),
      education: {
        id: item.education.id,
        title: item.education.title,
        price: Number(item.education.price),
        imageUrl: item.education.imageUrl || undefined,
        category: item.education.category,
        instructor: item.education.instructor,
        level: item.education.level,
      },
    }));

    return NextResponse.json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
