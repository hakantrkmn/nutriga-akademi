import { getBlogPosts } from "@/lib/redis";
import type { Metadata } from "next";
import BlogContent from "../../components/blog/BlogContent";

// ISR - Blog sayfası 30 dakikada bir yenilenir
export const revalidate = 1800; // 30 dakika = 1800 saniye

export const metadata: Metadata = {
  title: "Blog | Nutriga Akademi",
  description:
    "Beslenme uzmanlarından güncel makaleler, sağlıklı yaşam ipuçları ve beslenme rehberleri. Nutriga Akademi blog sayfası.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return <BlogContent posts={posts} />;
}
