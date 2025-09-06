import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'Dosya bulunamadı' });
    }

    // Dosya türünü kontrol et
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: 'Sadece JPG, PNG, GIF, WebP ve SVG dosyaları yüklenebilir' });
    }

    // Dosya boyutunu kontrol et (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: 'Dosya boyutu 10MB\'dan küçük olmalıdır' });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Uploads klasörünü oluştur
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Benzersiz dosya adı oluştur
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    const filePath = join(uploadsDir, fileName);

    // Dosyayı kaydet
    await writeFile(filePath, buffer);

    // Public URL'i döndür
    const publicUrl = `/uploads/${fileName}`;

    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      fileName: fileName,
      fileSize: file.size,
      fileType: file.type,
      originalName: file.name,
      uploadDate: new Date().toISOString()
    });

  } catch (error) {
    console.error('Dosya yükleme hatası:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Dosya yüklenirken bir hata oluştu' 
    });
  }
}
