import { prisma } from "@/lib/prisma";
import { cartGet } from "@/lib/redis";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

async function getUserId(request: NextRequest, response: NextResponse) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}

export async function POST(request: NextRequest) {
  const response = NextResponse.next();
  try {
    const userId = await getUserId(request, response);
    if (!userId)
      return NextResponse.json(
        { success: false, error: "Giriş gerekli" },
        { status: 401 }
      );

    // 1) Sepeti Redis'ten oku
    const items = await cartGet(userId);
    if (items.length === 0)
      return NextResponse.json(
        { success: false, error: "Sepet boş" },
        { status: 400 }
      );

    // 2) DB'den ürünleri getir ve fiyat doğrulaması yap
    const products = await prisma.egitim.findMany({
      where: { id: { in: items.map((i) => i.educationId) } },
    });

    const details = items.map((i) => {
      const p = products.find((x) => x.id === i.educationId);
      const unitPrice = Number(p?.price ?? 0);
      const lineTotal = unitPrice * i.quantity;
      return {
        educationId: i.educationId,
        quantity: i.quantity,
        unitPrice,
        lineTotal,
        exists: !!p,
      };
    });

    const subtotal = details.reduce((s, d) => s + d.lineTotal, 0);
    const allValid = details.every((d) => d.exists && d.unitPrice > 0);

    // Şimdilik sadece doğrulama sonuçlarını logla
    console.log("CHECKOUT_VALIDATION", { userId, details, subtotal, allValid });

    return NextResponse.json({
      success: true,
      data: { details, subtotal, allValid },
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { success: false, error: "Checkout doğrulaması başarısız" },
      { status: 500 }
    );
  }
}
