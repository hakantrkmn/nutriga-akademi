import { prisma } from "@/lib/prisma";
import { createSupabaseAdmin } from "@/lib/supabase";
import { NextResponse } from "next/server";

// GET - Kullanıcı raporları
export async function GET() {
  try {
    // Kullanıcıların satın alma istatistikleri
    const userPurchaseStats = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        profession: true,
        createdAt: true,
        _count: {
          select: {
            cartItems: true, // Kaç satın alma yapmış
          },
        },
      },
      orderBy: {
        cartItems: {
          _count: "desc",
        },
      },
      take: 20, // En aktif ilk 20 kullanıcı
    });

    // Toplam satın alma sayısı
    const totalPurchases = await prisma.cartItem.count();

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

    // Kullanıcıların toplam harcaması (cart items üzerinden)
    const userSpending = await prisma.cartItem.groupBy({
      by: ["userId"],
      _sum: {
        quantity: true,
      },
      _count: {
        _all: true,
      },
      orderBy: {
        _count: {
          id: "desc",
        },
      },
      take: 20,
    });

    // Her kullanıcının toplam harcamasını hesapla
    const userSpendingWithDetails = await Promise.all(
      userSpending.map(
        async (user: {
          userId: string;
          _count: { _all: number };
          _sum: { quantity: number | null };
        }) => {
          const userDetails = await prisma.user.findUnique({
            where: { id: user.userId },
            select: {
              firstName: true,
              lastName: true,
              email: true,
              profession: true,
            },
          });

          // Kullanıcının satın aldığı eğitimlerin toplam fiyatını hesapla
          const userCartItems = await prisma.cartItem.findMany({
            where: { userId: user.userId },
            include: {
              education: {
                select: {
                  price: true,
                },
              },
            },
          });

          const totalSpent = userCartItems.reduce((sum, item) => {
            const price = Number(item.education?.price || 0);
            return sum + price * item.quantity;
          }, 0);

          return {
            userId: user.userId,
            userDetails,
            totalPurchases: user._count
              ? (user._count as { _all?: number })._all || 0
              : 0,
            totalSpent,
            totalItems: user._sum?.quantity || 0,
          };
        }
      )
    );

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
