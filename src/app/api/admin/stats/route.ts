import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET - Admin dashboard istatistikleri
export async function GET() {
  try {
    // Prisma ile sayıları al
    const [egitimCount, blogCount, userCount] = await Promise.all([
      prisma.egitim.count(),
      prisma.blogPost.count(),
      prisma.user.count(), // Prisma'dan tüm kullanıcı sayısını al
    ]);

    // Toplam satış sayısını hesapla (başarılı ödemeler)
    const totalSales = await prisma.payment.count({
      where: { status: "COMPLETED" },
    });

    return NextResponse.json({
      success: true,
      data: {
        totalEgitimler: egitimCount,
        totalBlogYazilari: blogCount,
        totalKullanicilar: userCount,
        totalSatislar: totalSales,
      },
    });
  } catch (error) {
    console.error("İstatistikler alınırken hata:", error);
    return NextResponse.json(
      { success: false, error: "İstatistikler alınamadı" },
      { status: 500 }
    );
  }
}
