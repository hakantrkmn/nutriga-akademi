import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

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
    const originalFileName = file.name.replace(/\.[^/.]+$/, ""); // uzantıyı kaldır

    let fileName: string;
    let filePath: string;
    let optimizedBuffer: Buffer;
    const originalSize = file.size;

    // SVG dosyalar için farklı işlem
    if (file.type === "image/svg+xml") {
      fileName = `${timestamp}-${originalFileName}.svg`;
      filePath = `uploads/${fileName}`;
      const arrayBuffer = await file.arrayBuffer();
      optimizedBuffer = Buffer.from(arrayBuffer);
    } else {
      fileName = `${timestamp}-${originalFileName}.webp`;
      filePath = `uploads/${fileName}`;
    }

    // Görsel optimizasyonu (sadece görsel dosyalar için, SVG hariç)
    if (file.type.startsWith("image/") && file.type !== "image/svg+xml") {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Sharp ile optimizasyon
        const sharpInstance = sharp(buffer);

        // Görsel bilgilerini al
        const metadata = await sharpInstance.metadata();
        const { width = 1200, height = 800 } = metadata;

        // Maksimum boyutları belirle (eğitim görselleri için)
        const maxWidth = 1200;
        const maxHeight = 800;

        // Boyutu korurken en uygun ölçeklendirme
        let newWidth = width;
        let newHeight = height;

        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;

          if (width > height) {
            newWidth = Math.min(width, maxWidth);
            newHeight = Math.round(newWidth / aspectRatio);
          } else {
            newHeight = Math.min(height, maxHeight);
            newWidth = Math.round(newHeight * aspectRatio);
          }
        }

        // WebP formatına çevir ve optimize et
        optimizedBuffer = await sharpInstance
          .resize(newWidth, newHeight, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({
            quality: 85, // Kalite ayarı
            effort: 4, // Daha iyi sıkıştırma için
          })
          .toBuffer();

        console.log(
          `Görsel optimize edildi: ${originalSize} -> ${optimizedBuffer.length} bytes`
        );
      } catch (error) {
        console.error("Görsel optimizasyonu başarısız:", error);
        // Optimizasyon başarısız olursa orijinal dosyayı kullan
        const arrayBuffer = await file.arrayBuffer();
        optimizedBuffer = Buffer.from(arrayBuffer);
      }
    } else {
      // Görsel değilse (SVG vb.) orijinal dosyayı kullan
      const arrayBuffer = await file.arrayBuffer();
      optimizedBuffer = Buffer.from(arrayBuffer);
    }

    // Supabase Storage'a yükle
    const { error: uploadError } = await supabase.storage
      .from("public-files")
      .upload(filePath, optimizedBuffer, {
        cacheControl: "31536000", // 1 yıl cache
        upsert: false,
        contentType:
          file.type === "image/svg+xml" ? "image/svg+xml" : "image/webp",
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
      fileSize: optimizedBuffer.length,
      originalSize: originalSize,
      fileType:
        file.type.startsWith("image/") && file.type !== "image/svg+xml"
          ? "image/webp"
          : file.type,
      originalName: file.name,
      uploadDate: new Date().toISOString(),
      optimized:
        file.type.startsWith("image/") && file.type !== "image/svg+xml",
    });
  } catch (error) {
    console.error("Dosya yükleme hatası:", error);
    return NextResponse.json({
      success: false,
      error: "Dosya yüklenirken bir hata oluştu",
    });
  }
}
