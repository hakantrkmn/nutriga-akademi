import { prisma } from "@/lib/prisma";
import { updateCourses } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// GET - Tüm eğitimleri listele
export async function GET() {
  try {
    const egitimler = await prisma.egitim.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: egitimler,
    });
  } catch (error) {
    console.error("Eğitimler listelenirken hata:", error);
    return NextResponse.json(
      { success: false, error: "Eğitimler listelenemedi" },
      { status: 500 }
    );
  }
}

// POST - Yeni eğitim oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      content,
      imageUrl,
      slug,
      price,
      category,
      level,
      instructor,
    } = body;

    // Gerekli alanları kontrol et
    if (!title || !slug || !content) {
      return NextResponse.json(
        { success: false, error: "Başlık, slug ve içerik gereklidir" },
        { status: 400 }
      );
    }

    // Slug'un benzersiz olduğunu kontrol et
    const existingEgitim = await prisma.egitim.findUnique({
      where: { slug },
    });

    if (existingEgitim) {
      return NextResponse.json(
        { success: false, error: "Bu slug zaten kullanılıyor" },
        { status: 400 }
      );
    }

    const yeniEgitim = await prisma.egitim.create({
      data: {
        title,
        description: description || null,
        content: content || null,
        imageUrl: imageUrl || null,
        slug,
        price: price ? parseFloat(price) : null,
        salesCount: 0,
        category,
        level,
        instructor,
      },
    });

    updateCourses();
    revalidatePath("/egitimler"); // Blog listesi sayfası
    revalidatePath(`/egitimler/${slug}`); // Yeni blog detay sayfası
    revalidatePath("/"); // Ana sayfa (blog section için)
    return NextResponse.json({
      success: true,
      data: yeniEgitim,
      message: "Eğitim başarıyla oluşturuldu",
    });
  } catch (error) {
    console.error("Eğitim oluşturulurken hata:", error);
    return NextResponse.json(
      { success: false, error: "Eğitim oluşturulamadı" },
      { status: 500 }
    );
  }
}
