import { prisma } from "@/lib/prisma";
import { updateBlogPosts } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

// GET - Tüm blog yazılarını listele
export async function GET() {
  try {
    const blogPosts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: blogPosts,
    });
  } catch (error) {
    console.error("Blog yazıları listelenirken hata:", error);
    return NextResponse.json(
      { success: false, error: "Blog yazıları listelenemedi" },
      { status: 500 }
    );
  }
}

// POST - Yeni blog yazısı oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, imageUrl, slug, category, excerpt, author } = body;

    // Gerekli alanları kontrol et
    if (!title || !slug || !content) {
      return NextResponse.json(
        { success: false, error: "Başlık, slug ve içerik gereklidir" },
        { status: 400 }
      );
    }

    // Slug'un benzersiz olduğunu kontrol et
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { success: false, error: "Bu slug zaten kullanılıyor" },
        { status: 400 }
      );
    }

    const yeniBlogPost = await prisma.blogPost.create({
      data: {
        title,
        content: content || null,
        imageUrl: imageUrl || null,
        slug,
        category: category || null,
        excerpt: excerpt || null,
        author: author || null,
      },
    });
    await updateBlogPosts();

    return NextResponse.json({
      success: true,
      data: yeniBlogPost,
      message: "Blog yazısı başarıyla oluşturuldu",
    });
  } catch (error) {
    console.error("Blog yazısı oluşturulurken hata:", error);
    return NextResponse.json(
      { success: false, error: "Blog yazısı oluşturulamadı" },
      { status: 500 }
    );
  }
}
