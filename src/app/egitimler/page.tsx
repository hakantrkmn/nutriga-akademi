import EgitimlerContent from "@/components/courses/CoursesContent";
import { getCourses } from "@/lib/redis";
import type { Metadata } from "next";

// ISR - Eğitimler sayfası 2 saatte bir yenilenir
export const revalidate = 7200; // 2 saat = 7200 saniye

export const metadata: Metadata = {
  title: "Diyetisyen Eğitimleri ve Beslenme Kursları",
  description:
    "Profesyonel diyetisyenler için kapsamlı beslenme eğitimleri. Klinik beslenme, sporcu beslenmesi, pediatrik beslenme kursları. Sertifikalı eğitim programları ile uzmanlaşın.",
  keywords: [
    "diyetisyen eğitimleri",
    "beslenme kursları",
    "klinik beslenme eğitimi",
    "sporcu beslenmesi kursu",
    "pediatrik beslenme",
    "beslenme uzmanı eğitimi",
    "diyetisyen sertifikası",
    "beslenme danışmanlığı kursu",
    "online beslenme eğitimi",
    "beslenme terapisi",
    "beslenme koçluğu",
    "beslenme ve diyetetik eğitimi",
  ],
  openGraph: {
    title: "Diyetisyen Eğitimleri ve Beslenme Kursları | Nutriga Akademi",
    description:
      "Profesyonel diyetisyenler için kapsamlı beslenme eğitimleri. Klinik beslenme, sporcu beslenmesi, pediatrik beslenme kursları.",
    url: "https://nutrigaakademi.com/egitimler",
    siteName: "Nutriga Akademi",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nutriga Akademi Eğitimler - Diyetisyen Kursları",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diyetisyen Eğitimleri ve Beslenme Kursları",
    description:
      "Profesyonel diyetisyenler için kapsamlı beslenme eğitimleri ve kursları.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://nutrigaakademi.com/egitimler",
  },
};

export default async function EgitimlerPage() {
  const egitimler = await getCourses();
  return <EgitimlerContent egitimler={egitimler} />;
}
