import PaymentSuccessToast from "@/components/common/PaymentSuccessToast";
import { PopupHandler } from "@/components/home/PopupHandler";
import SloganSection from "@/components/home/SloganSection";
import { prisma } from "@/lib/prisma";
import { getBlogPosts, getCourses } from "@/lib/redis";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy loaded components for better performance
const Hero = dynamic(() => import("@/components/home/HomeHero"), {
  loading: () => (
    <div className="bg-hero min-h-[320px] flex items-center justify-center">
      <div className="animate-pulse bg-gray-200 rounded-lg w-full h-full" />
    </div>
  ),
});

const BlogSection = dynamic(() => import("@/components/home/BlogSection"), {
  loading: () => (
    <div className="min-h-[400px] bg-gray-50 animate-pulse rounded-lg" />
  ),
});

const PopularEgitimler = dynamic(
  () => import("@/components/home/PopularCourses"),
  {
    loading: () => (
      <div className="min-h-[300px] bg-gray-50 animate-pulse rounded-lg" />
    ),
  }
);

// ISR - Incremental Static Regeneration
// Sayfa 1 saatte bir yeniden generate edilir
export const revalidate = 3600; // 1 saat = 3600 saniye

// Ana sayfa için özel SEO metadata
export const metadata: Metadata = {
  title: "Nutriga Akademi - Diyetisyen Eğitimleri ve Beslenme Kursları",
  description:
    "Nutriga Akademi, tüm sağlık profesyonellerine ve adaylarına yönelik bilimsel temellere dayanan teorik ve pratik eğitimleri, alanında uzman eğitmenler aracılığıyla buluşturan bir eğitim platformudur.",
  keywords: [
    "diyetisyen eğitimleri",
    "beslenme kursları",
    "klinik beslenme",
    "sporcu beslenmesi",
    "pediatrik beslenme",
    "beslenme uzmanı",
    "diyetisyen sertifikası",
    "beslenme danışmanlığı",
    "online beslenme eğitimi",
    "beslenme bilimleri",
    "beslenme ve diyetetik",
    "beslenme terapisi",
    "beslenme koçluğu",
  ],
  openGraph: {
    title: "Nutriga Akademi - Diyetisyen Eğitimleri ve Beslenme Kursları",
    description:
      "Nutriga Akademi, tüm sağlık profesyonellerine ve adaylarına yönelik bilimsel temellere dayanan teorik ve pratik eğitimleri, alanında uzman eğitmenler aracılığıyla buluşturan bir eğitim platformudur.",
    url: "https://nutrigaakademi.com",
    siteName: "Nutriga Akademi",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nutriga Akademi Ana Sayfa - Diyetisyen Eğitimleri",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nutriga Akademi - Diyetisyen Eğitimleri",
    description:
      "Nutriga Akademi, tüm sağlık profesyonellerine ve adaylarına yönelik bilimsel temellere dayanan teorik ve pratik eğitimleri, alanında uzman eğitmenler aracılığıyla buluşturan bir eğitim platformudur.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://nutrigaakademi.com",
  },
};

// Server Component'ta search params almak için
//

export default async function Home() {
  // Fetch data in parallel for better performance
  const [fetchedBlogPosts, fetchedCourses, fetchedHeroSlides] =
    await Promise.all([
      getBlogPosts(),
      getCourses(),
      prisma.heroSlide.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      }),
    ]);

  //

  return (
    <>
      <Hero slides={fetchedHeroSlides} />
      <SloganSection />
      <PopularEgitimler egitimler={fetchedCourses} />
      <BlogSection posts={fetchedBlogPosts} />

      {/* Popup Modal Handler */}
      <Suspense fallback={null}>
        <PopupHandler />
      </Suspense>

      {/* Payment Success Toast */}
      <Suspense fallback={null}>
        <PaymentSuccessToast />
      </Suspense>
    </>
  );
}
