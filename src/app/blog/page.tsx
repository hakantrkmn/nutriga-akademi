import { getBlogPosts } from "@/lib/redis";
import type { Metadata } from "next";
import BlogContent from "../../components/blog/BlogContent";

export const metadata: Metadata = {
  title: "Blog | NutriHome Akademi",
  description:
    "Beslenme uzmanlarından güncel makaleler, sağlıklı yaşam ipuçları ve beslenme rehberleri. NutriHome Akademi blog sayfası.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return <BlogContent posts={posts} />;
}
