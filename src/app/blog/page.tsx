import BlogContent from "./components/BlogContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | NutriHome Akademi",
  description: "Beslenme uzmanlarından güncel makaleler, sağlıklı yaşam ipuçları ve beslenme rehberleri. NutriHome Akademi blog sayfası.",
};

export default function BlogPage() {
  return <BlogContent />;
}