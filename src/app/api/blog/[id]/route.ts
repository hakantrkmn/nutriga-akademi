import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET - Tek blog yazısı getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const blogPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!blogPost) {
      return NextResponse.json(
        { success: false, error: "Blog yazısı bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blogPost,
    });
  } catch (error) {
    console.error("Blog yazısı getirilirken hata:", error);
    return NextResponse.json(
      { success: false, error: "Blog yazısı getirilemedi" },
      { status: 500 }
    );
  }
}

// PUT - Blog yazısı güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content, imageUrl, slug, category, excerpt, author } = body;

    // Blog yazısının var olup olmadığını kontrol et
    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: "Blog yazısı bulunamadı" },
        { status: 404 }
      );
    }

    // Slug'un benzersiz olduğunu kontrol et (kendi slug'u hariç)
    if (slug && slug !== existingPost.slug) {
      const slugExists = await prisma.blogPost.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { success: false, error: "Bu slug zaten kullanılıyor" },
          { status: 400 }
        );
      }
    }

    const guncellenenBlogPost = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(slug && { slug }),
        ...(category !== undefined && { category }),
        ...(excerpt !== undefined && { excerpt }),
        ...(author !== undefined && { author }),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: guncellenenBlogPost,
      message: "Blog yazısı başarıyla güncellendi",
    });
  } catch (error) {
    console.error("Blog yazısı güncellenirken hata:", error);
    return NextResponse.json(
      { success: false, error: "Blog yazısı güncellenemedi" },
      { status: 500 }
    );
  }
}

// DELETE - Blog yazısı sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Blog yazısının var olup olmadığını kontrol et
    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: "Blog yazısı bulunamadı" },
        { status: 404 }
      );
    }

    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Blog yazısı başarıyla silindi",
    });
  } catch (error) {
    console.error("Blog yazısı silinirken hata:", error);
    return NextResponse.json(
      { success: false, error: "Blog yazısı silinemedi" },
      { status: 500 }
    );
  }
}
