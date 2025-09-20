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

    // Get user profile from database
    const { data: userData, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
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
      id: userData.id,
      firstName: userData.first_name,
      lastName: userData.last_name,
      profession: userData.profession,
      university: userData.university,
      department: userData.department,
      class: userData.class,
      email: userData.email,
      phone: userData.phone,
      notificationPermission: userData.notification_permission,
      desiredEducationId: userData.desired_education_id,
      createdAt: userData.created_at,
      updatedAt: userData.updated_at,
    };

    return NextResponse.json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}