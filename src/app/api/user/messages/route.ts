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

    // Get user's contact messages
    const { data: messages, error } = await supabase
      .from("contact_messages")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Mesajlar getirilemedi" },
        { status: 500 }
      );
    }

    // Format the response
    const formattedData = messages?.map((message) => ({
      id: message.id,
      name: message.name,
      email: message.email,
      phone: message.phone,
      message: message.message,
      status: message.status,
      isRead: message.is_read,
      createdAt: message.created_at,
    })) || [];

    return NextResponse.json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}