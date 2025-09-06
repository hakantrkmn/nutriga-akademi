import { notFound } from "next/navigation";
import BlogDetailContent from "./components/BlogDetailContent";
import { dummyBlogPosts } from "@/data/dummyBlogData";
import type { Metadata } from "next";

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const post = dummyBlogPosts.find(p => p.slug === params.slug);
  
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

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = dummyBlogPosts.find(p => p.slug === params.slug);

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