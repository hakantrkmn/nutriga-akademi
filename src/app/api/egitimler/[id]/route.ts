import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET - Tek eğitim getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const egitim = await prisma.egitim.findUnique({
      where: { id },
    });

    if (!egitim) {
      return NextResponse.json(
        { success: false, error: "Eğitim bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: egitim,
    });
  } catch (error) {
    console.error("Eğitim getirilirken hata:", error);
    return NextResponse.json(
      { success: false, error: "Eğitim getirilemedi" },
      { status: 500 }
    );
  }
}

// PUT - Eğitim güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    // Eğitimin var olup olmadığını kontrol et
    const existingEgitim = await prisma.egitim.findUnique({
      where: { id },
    });

    if (!existingEgitim) {
      return NextResponse.json(
        { success: false, error: "Eğitim bulunamadı" },
        { status: 404 }
      );
    }

    // Slug'un benzersiz olduğunu kontrol et (kendi slug'u hariç)
    if (slug && slug !== existingEgitim.slug) {
      const slugExists = await prisma.egitim.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { success: false, error: "Bu slug zaten kullanılıyor" },
          { status: 400 }
        );
      }
    }

    const guncellenenEgitim = await prisma.egitim.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(content && { content }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(slug && { slug }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(category !== undefined && { category }),
        ...(level !== undefined && { level }),
        ...(instructor !== undefined && { instructor }),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: guncellenenEgitim,
      message: "Eğitim başarıyla güncellendi",
    });
  } catch (error) {
    console.error("Eğitim güncellenirken hata:", error);
    return NextResponse.json(
      { success: false, error: "Eğitim güncellenemedi" },
      { status: 500 }
    );
  }
}

// DELETE - Eğitim sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Eğitimin var olup olmadığını kontrol et
    const existingEgitim = await prisma.egitim.findUnique({
      where: { id },
    });

    if (!existingEgitim) {
      return NextResponse.json(
        { success: false, error: "Eğitim bulunamadı" },
        { status: 404 }
      );
    }

    await prisma.egitim.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Eğitim başarıyla silindi",
    });
  } catch (error) {
    console.error("Eğitim silinirken hata:", error);
    return NextResponse.json(
      { success: false, error: "Eğitim silinemedi" },
      { status: 500 }
    );
  }
}
