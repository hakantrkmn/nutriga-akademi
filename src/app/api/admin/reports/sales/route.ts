import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET - Satış raporları
export async function GET() {
  try {
    // Başarılı ödemelerdeki eğitim satış istatistikleri
    const educationSales = await prisma.paymentItem.groupBy({
      by: ["educationId"],
      _sum: {
        quantity: true,
        totalPrice: true,
      },
      where: {
        payment: {
          status: "COMPLETED",
        },
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 20, // En çok satan ilk 20 eğitim
    });

    // Eğitim detaylarını çek
    const educationIds = educationSales.map((item) => item.educationId);
    const educations = await prisma.egitim.findMany({
      where: {
        id: {
          in: educationIds,
        },
      },
      select: {
        id: true,
        title: true,
        price: true,
        category: true,
        level: true,
      },
    });

    // Verileri birleştir
    const formattedEducationSales = educationSales.map((sale) => {
      const education = educations.find((edu) => edu.id === sale.educationId);
      return {
        id: sale.educationId,
        title: education?.title || "Bilinmeyen Eğitim",
        salesCount: sale._sum.quantity || 0,
        totalRevenue: Number(sale._sum.totalPrice || 0),
        price: education?.price ? Number(education.price) : null,
        category: education?.category || "Bilinmeyen",
        level: education?.level || "Bilinmeyen",
      };
    });

    // Toplam gelir hesapla
    const totalRevenue = formattedEducationSales.reduce((sum, edu) => {
      return sum + edu.totalRevenue;
    }, 0);

    // Kategori bazlı satış istatistikleri (gerçek satış verisinden)
    const categoryStatsRaw = await prisma.$queryRaw`
      SELECT
        e.category,
        SUM(pi.quantity) as total_quantity,
        SUM(pi.total_price) as total_revenue,
        COUNT(DISTINCT p.id) as payment_count
      FROM payment_items pi
      JOIN payments p ON p.id = pi.payment_id
      JOIN egitimler e ON e.id = pi.education_id
      WHERE p.status = 'COMPLETED'
      GROUP BY e.category
      ORDER BY total_quantity DESC
    `;

    // BigInt'leri Number'a çevir
    const categoryStats = (
      categoryStatsRaw as Array<{
        category: string;
        total_quantity: bigint;
        total_revenue: string;
        payment_count: bigint;
      }>
    ).map((item) => ({
      category: item.category,
      total_quantity: Number(item.total_quantity),
      total_revenue: item.total_revenue,
      payment_count: Number(item.payment_count),
    }));

    // Son 30 günün başarılı satışları
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentSales = await prisma.payment.groupBy({
      by: ["createdAt"],
      _count: {
        _all: true,
      },
      where: {
        status: "COMPLETED",
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Başarısız ödemeler ve nedenleri
    const failedPayments = await prisma.payment.findMany({
      where: {
        status: "FAILED",
      },
      select: {
        id: true,
        totalAmount: true,
        reason: true,
        createdAt: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        paymentItems: {
          select: {
            quantity: true,
            education: {
              select: {
                title: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20, // Son 20 başarısız ödeme
    });

    // Başarısız ödemeleri formatla
    const formattedFailedPayments = failedPayments.map((payment) => ({
      id: payment.id,
      userName: `${payment.user.firstName} ${payment.user.lastName}`,
      userEmail: payment.user.email,
      totalAmount: Number(payment.totalAmount),
      reason: payment.reason,
      createdAt: payment.createdAt,
      items: payment.paymentItems.map((item) => ({
        title: item.education.title || "Bilinmeyen Eğitim",
        quantity: item.quantity,
      })),
    }));

    return NextResponse.json({
      success: true,
      data: {
        educationSales: formattedEducationSales,
        totalRevenue,
        categoryStats,
        recentSales,
        failedPayments: formattedFailedPayments,
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
