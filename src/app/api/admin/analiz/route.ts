import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");
    const userIds = searchParams.getAll("userId");
    const educationIds = searchParams.getAll("educationId");
    const professions = searchParams.getAll("profession");
    const categories = searchParams.getAll("category");

    // Base filters for payments
    const paymentFilters: Prisma.PaymentWhereInput = {
      status: "COMPLETED",
    };

    if (dateFrom || dateTo) {
      paymentFilters.createdAt = {};
      if (dateFrom) paymentFilters.createdAt.gte = new Date(dateFrom);
      if (dateTo) paymentFilters.createdAt.lte = new Date(dateTo);
    }

    if (userIds.length > 0) {
      paymentFilters.userId = { in: userIds };
    }

    if (professions.length > 0) {
      paymentFilters.user = {
        profession: { in: professions },
      };
    }

    // User Analysis
    let userAnalysis = null;
    // Single user selection logic for detailed user analysis
    if (userIds.length === 1) {
      const userPayments = await prisma.payment.findMany({
        where: paymentFilters,
        include: {
          user: true,
          paymentItems: {
            include: {
              education: true,
            },
          },
        },
      });

      const totalSpent = userPayments.reduce(
        (sum, p) => sum + Number(p.paidPrice || 0),
        0
      );
      const purchaseCount = userPayments.length;

      const purchasedEducations = userPayments.flatMap((p) =>
        p.paymentItems.map((pi) => ({
          id: pi.education.id,
          userName: `${p.user.firstName} ${p.user.lastName}`,
          title: pi.education.title,
          price: Number(pi.unitPrice),
          quantity: pi.quantity,
          paidPrice: Number(pi.totalPrice),
          purchaseDate: p.createdAt,
          status: p.status,
        }))
      );

      userAnalysis = {
        totalSpent,
        purchaseCount,
        purchasedEducations,
      };
    } else if (userIds.length > 1) {
      // Multiple users selection - aggregated view
      const userPayments = await prisma.payment.findMany({
        where: paymentFilters,
        include: {
          user: true,
          paymentItems: {
            include: {
              education: true,
            },
          },
        },
      });

      const totalSpent = userPayments.reduce(
        (sum, p) => sum + Number(p.paidPrice || 0),
        0
      );
      const purchaseCount = userPayments.length;

      const purchasedEducations = userPayments.flatMap((p) =>
        p.paymentItems.map((pi) => ({
          id: pi.education.id,
          userName: `${p.user.firstName} ${p.user.lastName}`,
          title: pi.education.title,
          price: Number(pi.unitPrice),
          quantity: pi.quantity,
          paidPrice: Number(pi.totalPrice),
          purchaseDate: p.createdAt,
          status: p.status,
        }))
      );

      userAnalysis = {
        totalSpent,
        purchaseCount,
        purchasedEducations,
      };
    }

    // Education Analysis
    let educationAnalysis = null;

    // Use the same base filters as user analysis but add education-specific filters
    const educationFilters: Prisma.PaymentWhereInput = {
      ...paymentFilters,
    };

    if (educationIds.length > 0) {
      educationFilters.paymentItems = {
        some: {
          educationId: { in: educationIds },
        },
      };
    } else if (categories.length > 0) {
      const educationsInCategories = await prisma.egitim.findMany({
        where: { category: { in: categories } },
        select: { id: true },
      });
      const ids = educationsInCategories.map((e) => e.id);
      educationFilters.paymentItems = {
        some: {
          educationId: { in: ids },
        },
      };
    }

    const paymentsForEducation = await prisma.payment.findMany({
      where: educationFilters,
      include: {
        user: true,
        paymentItems: {
          include: {
            education: true,
          },
          where:
            educationIds.length > 0
              ? { educationId: { in: educationIds } }
              : categories.length > 0
                ? { education: { category: { in: categories } } }
                : undefined,
        },
      },
    });

    const salesCount = paymentsForEducation.length;
    const totalRevenue = paymentsForEducation.reduce(
      (sum, p) =>
        sum +
        p.paymentItems.reduce((pSum, pi) => pSum + Number(pi.totalPrice), 0),
      0
    );

    const buyers = paymentsForEducation.flatMap((p) =>
      p.paymentItems.map((pi) => ({
        id: p.user.id,
        name: `${p.user.firstName} ${p.user.lastName}`,
        email: p.user.email,
        profession: p.user.profession,
        educationTitle: pi.education.title,
        quantity: pi.quantity,
        paidPrice: Number(pi.totalPrice),
        purchaseDate: p.createdAt,
      }))
    );

    educationAnalysis = {
      salesCount,
      totalRevenue,
      buyers,
    };

    return NextResponse.json({
      success: true,
      data: {
        userAnalysis,
        educationAnalysis,
      },
    });
  } catch (error) {
    console.error("Analiz verileri alınırken hata:", error);
    return NextResponse.json(
      { success: false, error: "Analiz verileri alınamadı" },
      { status: 500 }
    );
  }
}
