import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const {
      userId,
      firstName,
      lastName,
      profession,
      university,
      department,
      class: classValue,
      phone,
      notificationPermission,
    } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı ID gerekli" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!firstName || !lastName || !profession) {
      return NextResponse.json(
        { error: "Ad, soyad ve meslek alanları zorunludur" },
        { status: 400 }
      );
    }

    // Update user profile
    const updateData: {
      first_name: string;
      last_name: string;
      profession: string;
      phone: string | null;
      notification_permission: boolean;
      updated_at: string;
      university?: string | null;
      department?: string | null;
      class?: string | null;
    } = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      profession: profession.trim(),
      phone: phone?.trim() || null,
      notification_permission: notificationPermission || false,
      updated_at: new Date().toISOString(),
    };

    // Add student-specific fields if profession is "Öğrenci"
    if (profession === "Öğrenci") {
      updateData.university = university?.trim() || null;
      updateData.department = department?.trim() || null;
      updateData.class = classValue?.trim() || null;
    } else {
      // Clear student fields if not a student
      updateData.university = null;
      updateData.department = null;
      updateData.class = null;
    }

    const { data, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      console.error("Database update error:", error);
      return NextResponse.json(
        { error: "Profil güncellenirken bir hata oluştu" },
        { status: 500 }
      );
    }

    // Format the response
    const formattedData = {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      profession: data.profession,
      university: data.university,
      department: data.department,
      class: data.class,
      email: data.email,
      phone: data.phone,
      notificationPermission: data.notification_permission,
      desiredEducationId: data.desired_education_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };

    return NextResponse.json({
      success: true,
      data: formattedData,
      message: "Profil başarıyla güncellendi",
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
