import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email parametresi gerekli" },
        { status: 400 }
      );
    }

    // Get user profile from database
    const { data: userData, error } = await supabase
      .from("users")
      .select("first_name, last_name, email, phone")
      .eq("email", email)
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Kullanıcı bilgileri alınamadı" },
        { status: 500 }
      );
    }

    if (!userData) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // Format the response
    const formattedData = {
      firstName: userData.first_name,
      lastName: userData.last_name,
      email: userData.email,
      phone: userData.phone,
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
