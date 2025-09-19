import BlogDetailContent from "@/components/blog/detail/BlogDetailContent";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// ISR - Blog detay sayfaları 1 saatte bir yenilenir
export const revalidate = 3600; // 1 saat = 3600 saniye
interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  console.log("🔍 generateMetadata Debug Info:");
  console.log("Original slug from URL:", slug);

  // Hem encode edilmiş hem de decode edilmiş slug ile dene
  const decodedSlug = decodeURIComponent(slug);
  const post = await prisma.blogPost.findUnique({
    where: {
      slug: decodedSlug,
    },
  });

  if (!post) {
    // Orijinal slug ile dene
    const postOriginal = await prisma.blogPost.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!postOriginal) {
      return {
        title: "Blog yazısı bulunamadı | Nutriga Akademi",
      };
    }

    return {
      title: `${postOriginal.title} | Nutriga Akademi`,
      description: postOriginal.excerpt,
    };
  }

  return {
    title: `${post.title} | Nutriga Akademi`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  console.log("🔍 Debug Info:");
  console.log("Original slug from URL:", slug);
  console.log("Decoded slug:", decodeURIComponent(slug));
  console.log("Encoded slug:", encodeURIComponent(slug));

  // Hem encode edilmiş hem de decode edilmiş slug ile dene
  const decodedSlug = decodeURIComponent(slug);
  const post = await prisma.blogPost.findUnique({
    where: {
      slug: decodedSlug, // Önce decode edilmiş versiyonu dene
    },
  });

  // Eğer bulunamazsa, orijinal slug ile dene
  if (!post) {
    console.log("❌ Post not found with decoded slug, trying original...");
    const postOriginal = await prisma.blogPost.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!postOriginal) {
      console.log("❌ Post not found with original slug either");

      // Tüm blog postlarının slug'larını logla
      const allPosts = await prisma.blogPost.findMany({
        select: {
          title: true,
          slug: true,
        },
      });

      console.log("📝 All blog posts in database:");
      allPosts.forEach((post) => {
        console.log(`  Title: "${post.title}"`);
        console.log(`  Slug: "${post.slug}"`);
        console.log(`  Encoded: "${encodeURIComponent(post.slug)}"`);
        console.log(`  Decoded: "${decodeURIComponent(post.slug)}"`);
        console.log("---");
      });

      notFound();
    }

    return <BlogDetailContent post={postOriginal} />;
  }

  console.log("✅ Post found!");
  return <BlogDetailContent post={post} />;
}

export async function generateStaticParams() {
  return (await prisma.blogPost.findMany()).map((post) => ({
    slug: post.slug,
  }));
}
