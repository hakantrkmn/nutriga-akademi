import { prisma } from "@/lib/prisma";
import { cartGet, cartSet } from "@/lib/redis";
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

    // Eğer tüm ürünler geçerliyse satın alma işlemini tamamla
    if (allValid) {
      // 3) Cart items'ları veritabanına kaydet
      const cartItemsToCreate = items.map((item) => ({
        userId,
        educationId: item.educationId,
        quantity: item.quantity,
      }));

      // Bulk insert cart items
      await prisma.cartItem.createMany({
        data: cartItemsToCreate,
      });

      // 4) Eğitim tablosunda satış sayılarını güncelle
      const educationUpdates = details.map((detail) => ({
        id: detail.educationId,
        salesCount: {
          increment: detail.quantity, // Satış sayısını quantity kadar arttır
        },
      }));

      // Bulk update eğitim satış sayıları
      for (const update of educationUpdates) {
        await prisma.egitim.update({
          where: { id: update.id },
          data: { salesCount: update.salesCount },
        });
      }

      // 5) Redis'ten sepeti temizle
      await cartSet(userId, []);

      console.log("CHECKOUT_COMPLETED", {
        userId,
        details,
        subtotal,
        cartItemsCreated: cartItemsToCreate.length,
        educationsUpdated: educationUpdates.length,
      });

      return NextResponse.json({
        success: true,
        message: "Satın alma işlemi başarıyla tamamlandı",
        data: {
          details,
          subtotal,
          cartItemsCreated: cartItemsToCreate.length,
          educationsUpdated: educationUpdates.length,
        },
      });
    } else {
      // Bazı ürünler geçerli değilse hata döndür
      const invalidItems = details.filter((d) => !d.exists || d.unitPrice <= 0);
      console.log("CHECKOUT_FAILED_INVALID_ITEMS", { userId, invalidItems });

      return NextResponse.json(
        {
          success: false,
          error: "Bazı ürünler artık mevcut değil veya fiyatları değişmiş",
          data: { invalidItems },
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { success: false, error: "Checkout doğrulaması başarısız" },
      { status: 500 }
    );
  }
}
