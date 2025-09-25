import { createSupabaseAdmin } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = createSupabaseAdmin();
    const { name, email, phone, message, userId } = await request.json();

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Tüm alanlar zorunludur" },
        { status: 400 }
      );
    }

    // Insert message into database
    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        name,
        email,
        phone,
        message,
        user_id: userId || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Mesaj kaydedilirken bir hata oluştu" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Mesaj başarıyla gönderildi",
      data,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseAdmin();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Build query
    let query = supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    // Filter by status if provided
    if (status) {
      query = query.eq("status", status);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Mesajlar alınırken bir hata oluştu" },
        { status: 500 }
      );
    }

    console.log("GET messages response:", { count, dataLength: data?.length });

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        total: count,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createSupabaseAdmin();
    const requestData = await request.json();
    const { id, status, isRead, is_read } = requestData;

    console.log("PUT request data:", { id, status, isRead, is_read });

    if (!id) {
      return NextResponse.json({ error: "Mesaj ID gerekli" }, { status: 400 });
    }

    // Check if message exists first
    const { data: existingMessage, error: checkError } = await supabase
      .from("contact_messages")
      .select("*")
      .eq("id", id);

    console.log("Checking message existence:", {
      id,
      existingMessage,
      checkError,
      dataLength: existingMessage?.length,
    });

    if (checkError) {
      console.log("Database check error:", checkError);
      return NextResponse.json(
        { error: `Veritabanı hatası: ${checkError.message}` },
        { status: 500 }
      );
    }

    if (!existingMessage || existingMessage.length === 0) {
      console.log("Message not found in database");
      return NextResponse.json({ error: "Mesaj bulunamadı" }, { status: 404 });
    }

    // Check if there's actually something to update
    if (status === undefined && isRead === undefined && is_read === undefined) {
      console.log("No data to update");
      return NextResponse.json(
        { error: "Güncellenecek veri bulunamadı" },
        { status: 400 }
      );
    }

    // Update message
    const updateData: {
      status?: string;
      is_read?: boolean;
    } = {};

    if (status !== undefined) {
      updateData.status = status;
    }

    // Check for both isRead (camelCase) and is_read (snake_case)
    const readStatus = isRead !== undefined ? isRead : is_read;

    if (readStatus !== undefined) {
      updateData.is_read = readStatus;
    }

    console.log("Update data:", updateData);

    console.log("Attempting to update message:", { id, updateData });

    const { data, error } = await supabase
      .from("contact_messages")
      .update(updateData)
      .eq("id", id)
      .select();

    console.log("Update result:", { data, error, dataLength: data?.length });

    console.log("Database response:", { data, error });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Mesaj güncellenirken bir hata oluştu" },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Mesaj bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Mesaj başarıyla güncellendi",
      data: data[0], // Return the first (and only) updated record
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
