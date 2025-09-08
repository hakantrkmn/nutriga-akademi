import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "Dosya bulunamadı" });
    }

    // Dosya türünü kontrol et
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        success: false,
        error: "Sadece JPG, PNG, GIF, WebP ve SVG dosyaları yüklenebilir",
      });
    }

    // Dosya boyutunu kontrol et (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({
        success: false,
        error: "Dosya boyutu 10MB'dan küçük olmalıdır",
      });
    }

    const supabase = await createClient();

    // Benzersiz dosya adı oluştur
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    const filePath = `uploads/${fileName}`;

    // Supabase Storage'a yükle
    const { error: uploadError } = await supabase.storage
      .from("public-files")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return NextResponse.json({
        success: false,
        error: "Dosya yüklenirken bir hata oluştu",
      });
    }

    // Public URL'i al
    const {
      data: { publicUrl },
    } = supabase.storage.from("public-files").getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: fileName,
      fileSize: file.size,
      fileType: file.type,
      originalName: file.name,
      uploadDate: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Dosya yükleme hatası:", error);
    return NextResponse.json({
      success: false,
      error: "Dosya yüklenirken bir hata oluştu",
    });
  }
}
