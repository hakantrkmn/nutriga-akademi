import { prisma } from "@/lib/prisma";
import { createSupabaseAdmin } from "@/lib/supabase";
import { NextResponse } from "next/server";

// Force Node.js runtime to avoid Edge Runtime issues with Supabase
export const runtime = "nodejs";

// GET - Kullanıcı raporları
export async function GET() {
  try {
    // Kullanıcıların gerçek satın alma istatistikleri (başarılı ödemeler)
    const userPurchaseStatsRaw = await prisma.$queryRaw`
      SELECT
        u.id,
        u.first_name,
        u.last_name,
        u.email,
        u.profession,
        u.created_at,
        COUNT(DISTINCT p.id) as purchase_count
      FROM users u
      LEFT JOIN payments p ON u.id = p.user_id AND p.status = 'COMPLETED'
      GROUP BY u.id, u.first_name, u.last_name, u.email, u.profession, u.created_at
      HAVING COUNT(DISTINCT p.id) > 0
      ORDER BY purchase_count DESC
      LIMIT 20
    `;

    // BigInt'leri Number'a çevir ve formatla
    const userPurchaseStats = (
      userPurchaseStatsRaw as Array<{
        id: string;
        first_name: string;
        last_name: string;
        email: string;
        profession: string;
        created_at: Date;
        purchase_count: bigint;
      }>
    ).map((item) => ({
      id: item.id,
      firstName: item.first_name,
      lastName: item.last_name,
      email: item.email,
      profession: item.profession,
      createdAt: item.created_at,
      _count: {
        cartItems: Number(item.purchase_count), // Gerçek satın alma sayısı
      },
    }));

    // Toplam başarılı satın alma sayısı
    const totalPurchases = await prisma.payment.count({
      where: { status: "COMPLETED" },
    });

    // Kullanıcı meslek dağılımı
    const professionStats = await prisma.user.groupBy({
      by: ["profession"],
      _count: {
        _all: true,
      },
    });

    // Son 30 günde kayıt olan kullanıcılar
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentUsers = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        profession: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    // Supabase'ten tüm kullanıcı detaylarını al
    const supabaseAdmin = createSupabaseAdmin();
    const { data: authUsers, error } =
      await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      console.error("Auth kullanıcıları alınırken hata:", error);
    }

    // Kullanıcıların gerçek harcamaları (başarılı ödemeler üzerinden)
    const userSpendingRaw = await prisma.$queryRaw`
      SELECT
        u.id as user_id,
        u.first_name,
        u.last_name,
        u.email,
        u.profession,
        COUNT(DISTINCT p.id) as total_purchases,
        SUM(p.total_amount) as total_spent,
        SUM(pi.quantity) as total_items
      FROM users u
      LEFT JOIN payments p ON u.id = p.user_id AND p.status = 'COMPLETED'
      LEFT JOIN payment_items pi ON p.id = pi.payment_id
      GROUP BY u.id, u.first_name, u.last_name, u.email, u.profession
      HAVING COUNT(DISTINCT p.id) > 0
      ORDER BY total_spent DESC
      LIMIT 20
    `;

    // BigInt'leri Number'a çevir ve formatla
    const userSpendingWithDetails = (
      userSpendingRaw as Array<{
        user_id: string;
        first_name: string;
        last_name: string;
        email: string;
        profession: string;
        total_purchases: bigint;
        total_spent: string;
        total_items: bigint;
      }>
    ).map((item) => ({
      userId: item.user_id,
      userDetails: {
        firstName: item.first_name,
        lastName: item.last_name,
        email: item.email,
        profession: item.profession,
      },
      totalPurchases: Number(item.total_purchases),
      totalSpent: Number(item.total_spent),
      totalItems: Number(item.total_items),
    }));

    return NextResponse.json({
      success: true,
      data: {
        userPurchaseStats,
        professionStats,
        recentUsers,
        userSpending: userSpendingWithDetails,
        totalPurchases,
        authUserCount: authUsers?.users.length || 0,
      },
    });
  } catch (error) {
    console.error("Kullanıcı raporları alınırken hata:", error);
    return NextResponse.json(
      { success: false, error: "Kullanıcı raporları alınamadı" },
      { status: 500 }
    );
  }
}
