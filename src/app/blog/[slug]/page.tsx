import BlogDetailContent from "@/components/blog/detail/BlogDetailContent";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!post) {
    return {
      title: "Blog yazısı bulunamadı | NutriHome Akademi",
    };
  }

  return {
    title: `${post.title} | NutriHome Akademi`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!post) {
    notFound();
  }

  return <BlogDetailContent post={post} />;
}

export async function generateStaticParams() {
  return (await prisma.blogPost.findMany()).map((post) => ({
    slug: post.slug,
  }));
}
