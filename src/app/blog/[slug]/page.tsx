import { notFound } from "next/navigation";
import BlogDetailContent from "@/components/blog/BlogDetailContent";
import { dummyBlogPosts } from "@/data/dummyBlogData";
import type { Metadata } from "next";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = dummyBlogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return {
      title: "Blog yazısı bulunamadı | NutriHome Akademi"
    };
  }

  return {
    title: `${post.title} | NutriHome Akademi`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = dummyBlogPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogDetailContent post={post} />;
}

export async function generateStaticParams() {
  return dummyBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}