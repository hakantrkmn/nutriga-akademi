import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı ID parametresi gerekli" },
        { status: 400 }
      );
    }

    // Get user's purchased items (cart items that were completed)
    const { data: cartItems, error: cartError } = await supabase
      .from("cart_items")
      .select(`
        id,
        education_id,
        quantity,
        created_at,
        egitimler (
          id,
          title,
          price,
          image_url,
          category,
          instructor,
          level
        )
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (cartError) {
      console.error("Database error:", cartError);
      return NextResponse.json(
        { error: "Satın alınan eğitimler getirilemedi" },
        { status: 500 }
      );
    }

    // Format the response
    const formattedData = cartItems?.map((item) => {
      const education = Array.isArray(item.egitimler) ? item.egitimler[0] : item.egitimler;
      return {
        id: item.id,
        educationId: item.education_id,
        quantity: item.quantity,
        createdAt: item.created_at,
        education: {
          id: education?.id,
          title: education?.title,
          price: Number(education?.price || 0),
          imageUrl: education?.image_url,
          category: education?.category,
          instructor: education?.instructor,
          level: education?.level,
        },
      };
    }) || [];

    return NextResponse.json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}