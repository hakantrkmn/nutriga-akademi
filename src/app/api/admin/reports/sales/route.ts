import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET - Satış raporları
export async function GET() {
  try {
    // Eğitim satış istatistikleri
    const educationSales = await prisma.egitim.findMany({
      select: {
        id: true,
        title: true,
        salesCount: true,
        price: true,
        category: true,
        level: true,
        _count: {
          select: {
            cartItems: true, // Kaç farklı siparişte bulunduğu
          },
        },
      },
      orderBy: {
        salesCount: "desc",
      },
      take: 20, // En çok satan ilk 20 eğitim
    });

    // Toplam gelir hesapla
    const totalRevenue = educationSales.reduce((sum, edu) => {
      const price = Number(edu.price || 0);
      return sum + price * edu.salesCount;
    }, 0);

    // Kategori bazlı satış istatistikleri
    const categoryStats = await prisma.egitim.groupBy({
      by: ["category"],
      _sum: {
        salesCount: true,
      },
      _count: {
        _all: true,
      },
      orderBy: {
        _sum: {
          salesCount: "desc",
        },
      },
    });

    // Son 30 günün satışları
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentSales = await prisma.cartItem.groupBy({
      by: ["createdAt"],
      _count: {
        _all: true,
      },
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        educationSales,
        totalRevenue,
        categoryStats,
        recentSales,
      },
    });
  } catch (error) {
    console.error("Satış raporları alınırken hata:", error);
    return NextResponse.json(
      { success: false, error: "Satış raporları alınamadı" },
      { status: 500 }
    );
  }
}
