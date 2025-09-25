import PaymentSuccessToast from "@/components/common/PaymentSuccessToast";
import { PopupHandler } from "@/components/home/PopupHandler";
import SloganSection from "@/components/home/SloganSection";
import { prisma } from "@/lib/prisma";
import { getBlogPosts, getCourses } from "@/lib/redis";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

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
    "Profesyonel diyetisyenler için kapsamlı beslenme eğitimleri. Klinik beslenme, sporcu beslenmesi, pediatrik beslenme kursları. Sertifikalı eğitim programları ile kariyerinizi geliştirin.",
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
      "Profesyonel diyetisyenler için kapsamlı beslenme eğitimleri. Klinik beslenme, sporcu beslenmesi, pediatrik beslenme kursları.",
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
      "Profesyonel diyetisyenler için kapsamlı beslenme eğitimleri ve kursları.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://nutrigaakademi.com",
  },
};

// Static data generation for better performance
export async function generateStaticParams() {
  const [blogPosts, courses, heroSlides] = await Promise.all([
    getBlogPosts(),
    getCourses(),
    prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  return [
    {
      blogPosts: JSON.stringify(blogPosts),
      courses: JSON.stringify(courses),
      heroSlides: JSON.stringify(heroSlides),
    },
  ];
}

// Helper function to parse static data
const parseStaticData = (data: string) => {
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

// Server Component'ta search params almak için
interface HomePageProps {
  searchParams: Promise<{
    popup?: string;
    modal?: string;
    show?: string;
    [key: string]: string | undefined;
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  // Try to use static data first, fallback to live data
  const staticData = await generateStaticParams().then((params) => params[0]);

  const fetchedBlogPosts =
    parseStaticData(staticData.blogPosts) || (await getBlogPosts());
  const fetchedCourses =
    parseStaticData(staticData.courses) || (await getCourses());
  const fetchedHeroSlides =
    parseStaticData(staticData.heroSlides) ||
    (await prisma.heroSlide.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
    }));

  // GET parametrelerini await ile al (Next.js 15)
  const searchParamsResolved = await searchParams;
  const popup = searchParamsResolved.popup;
  const modal = searchParamsResolved.modal;
  const show = searchParamsResolved.show;

  console.log("Server-side GET Parametreleri:", {
    popup,
    modal,
    show,
    allParams: searchParamsResolved,
  });

  // popup=true varsa log yaz
  if (popup === "true") {
    console.log("🎯 POPUP parametresi TRUE tespit edildi!");
  }

  return (
    <>
      <Hero slides={fetchedHeroSlides} />
      <SloganSection />
      <PopularEgitimler egitimler={fetchedCourses} />
      <BlogSection posts={fetchedBlogPosts} />

      {/* Popup Modal Handler */}
      <PopupHandler initialPopup={popup} />

      {/* Payment Success Toast */}
      <PaymentSuccessToast />
    </>
  );
}
