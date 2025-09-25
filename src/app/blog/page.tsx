import { getBlogPosts } from "@/lib/redis";
import type { Metadata } from "next";
import BlogContent from "../../components/blog/BlogContent";

// ISR - Blog sayfası 30 dakikada bir yenilenir
export const revalidate = 1800; // 30 dakika = 1800 saniye

export const metadata: Metadata = {
  title: "Beslenme Blog - Diyetisyen Makaleleri ve Sağlıklı Yaşam İpuçları",
  description:
    "Beslenme uzmanlarından güncel makaleler, sağlıklı yaşam ipuçları ve beslenme rehberleri. Diyetisyen yazıları, beslenme bilimleri ve sağlık önerileri.",
  keywords: [
    "beslenme blog",
    "diyetisyen makaleleri",
    "sağlıklı yaşam ipuçları",
    "beslenme rehberleri",
    "beslenme bilimleri",
    "sağlıklı beslenme",
    "diyet önerileri",
    "beslenme uzmanı yazıları",
    "beslenme araştırmaları",
    "sağlık ve beslenme",
    "beslenme danışmanlığı",
    "beslenme eğitimi",
  ],
  openGraph: {
    title: "Beslenme Blog - Diyetisyen Makaleleri | Nutriga Akademi",
    description:
      "Beslenme uzmanlarından güncel makaleler, sağlıklı yaşam ipuçları ve beslenme rehberleri.",
    url: "https://nutrigaakademi.com/blog",
    siteName: "Nutriga Akademi",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nutriga Akademi Blog - Beslenme Makaleleri",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beslenme Blog - Diyetisyen Makaleleri",
    description:
      "Beslenme uzmanlarından güncel makaleler ve sağlıklı yaşam ipuçları.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://nutrigaakademi.com/blog",
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return <BlogContent posts={posts} />;
}
