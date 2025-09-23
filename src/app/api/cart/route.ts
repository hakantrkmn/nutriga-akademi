import { prisma } from "@/lib/prisma";
import { cartAdd, cartGet } from "@/lib/redis";
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

export async function GET(request: NextRequest) {
  const response = NextResponse.next();
  try {
    const userId = await getUserId(request, response);
    if (!userId) {
      return NextResponse.json({ success: true, data: [] });
    }

    const items = await cartGet(userId);
    // Enrich with education for UI
    const educations = await prisma.egitim.findMany({
      where: { id: { in: items.map((i) => i.educationId) } },
    });
    const enriched = items.map((i) => ({
      id: `${i.educationId}`,
      userId,
      educationId: i.educationId,
      quantity: i.quantity,
      createdAt: new Date().toISOString(),
      education: educations.find((e) => e.id === i.educationId),
    }));

    return NextResponse.json({ success: true, data: enriched });
  } catch (error) {
    console.error("Cart GET error:", error);
    return NextResponse.json(
      { success: false, error: "Sepet listelenemedi" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const response = NextResponse.next();
  try {
    const body = await request.json();
    const { educationId, quantity = 1 } = body as {
      educationId: string;
      quantity?: number;
    };
    if (!educationId) {
      return NextResponse.json(
        { success: false, error: "educationId zorunlu" },
        { status: 400 }
      );
    }

    const userId = await getUserId(request, response);
    console.log(
      "POST /api/cart - userId:",
      userId,
      "educationId:",
      educationId
    );

    if (!userId) {
      // Giriş yapmamış kullanıcılar için 200 döndür ama işlem yapma
      // Frontend localStorage kullanacak
      console.log("POST /api/cart - Kullanıcı giriş yapmamış");
      return NextResponse.json({
        success: false,
        error: "Giriş gerekli",
        code: "AUTH_REQUIRED",
      });
    }

    await cartAdd(userId, educationId, quantity);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cart POST error:", error);
    return NextResponse.json(
      { success: false, error: "Sepete eklenemedi" },
      { status: 500 }
    );
  }
}
