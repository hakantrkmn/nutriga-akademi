import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// GET - Tek hero slide getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const heroSlide = await prisma.heroSlide.findUnique({
      where: { id },
    });

    if (!heroSlide) {
      return NextResponse.json(
        { success: false, error: "Hero slide bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: heroSlide });
  } catch (error) {
    console.error("Hero slide getirme hatası:", error);
    return NextResponse.json(
      { success: false, error: "Hero slide getirilemedi" },
      { status: 500 }
    );
  }
}

// PUT - Hero slide güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      titleMain,
      titleHighlight,
      description,
      imageSrc,
      imageAlt,
      isActive,
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

    const heroSlide = await prisma.heroSlide.update({
      where: { id },
      data: {
        titleMain,
        titleHighlight,
        description,
        imageSrc,
        imageAlt,
        isActive: isActive !== undefined ? isActive : true,
        sortOrder: sortOrder || 0,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, data: heroSlide });
  } catch (error) {
    console.error("Hero slide güncelleme hatası:", error);
    return NextResponse.json(
      { success: false, error: "Hero slide güncellenemedi" },
      { status: 500 }
    );
  }
}

// DELETE - Hero slide sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.heroSlide.delete({
      where: { id },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, message: "Hero slide silindi" });
  } catch (error) {
    console.error("Hero slide silme hatası:", error);
    return NextResponse.json(
      { success: false, error: "Hero slide silinemedi" },
      { status: 500 }
    );
  }
}
