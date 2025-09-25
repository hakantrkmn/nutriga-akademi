import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
// GET - Satış raporları
export async function GET() {
  try {
    // Toplam gelir hesapla (paidPrice üzerinden)
    const totalRevenueResult = await prisma.payment.aggregate({
      _sum: {
        paidPrice: true,
      },
      where: {
        status: "COMPLETED",
        paidPrice: {
          not: null,
        },
      },
    });
    const totalRevenue = totalRevenueResult._sum.paidPrice
      ? Number(totalRevenueResult._sum.paidPrice)
      : 0;

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
    }));

    return NextResponse.json({
      success: true,
      data: {
        totalRevenue,
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
