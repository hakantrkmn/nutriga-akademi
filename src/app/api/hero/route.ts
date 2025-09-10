import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET - Tüm hero slide'ları getir
export async function GET() {
  try {
    const heroSlides = await prisma.heroSlide.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({ success: true, data: heroSlides });
  } catch (error) {
    console.error("Hero slides getirme hatası:", error);
    return NextResponse.json(
      { success: false, error: "Hero slide'ları getirilemedi" },
      { status: 500 }
    );
  }
}

// POST - Yeni hero slide oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      titleMain,
      titleHighlight,
      description,
      imageSrc,
      imageAlt,
      sortOrder,
    } = body;

    // Gerekli alanları kontrol et
    if (
      !titleMain ||
      !titleHighlight ||
      !description ||
      !imageSrc ||
      !imageAlt
    ) {
      return NextResponse.json(
        { success: false, error: "Tüm gerekli alanları doldurun" },
        { status: 400 }
      );
    }

    const heroSlide = await prisma.heroSlide.create({
      data: {
        titleMain,
        titleHighlight,
        description,
        imageSrc,
        imageAlt,
        sortOrder: sortOrder || 0,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, data: heroSlide });
  } catch (error) {
    console.error("Hero slide oluşturma hatası:", error);
    return NextResponse.json(
      { success: false, error: "Hero slide oluşturulamadı" },
      { status: 500 }
    );
  }
}
