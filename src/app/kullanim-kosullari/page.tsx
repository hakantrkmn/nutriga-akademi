import type { Metadata } from "next";
import TermsContent from "../../components/terms/TermsContent";

export const metadata: Metadata = {
  title: "Kullanım Koşulları - Nutriga Akademi | Platform Kullanım Şartları",
  description:
    "Nutriga Akademi'nin kullanım koşulları ve üyelik şartları hakkında detaylı bilgi edinin. Platform kullanımı, beslenme eğitimi kursları, üyelik hakları ve yükümlülükleri ile ilgili tüm kuralları öğrenin.",
  keywords: [
    "nutriga akademi kullanım koşulları",
    "beslenme eğitimi kullanım şartları",
    "diyetisyen eğitimi üyelik koşulları",
    "beslenme kursu kullanım kuralları",
    "beslenme danışmanlığı şartları",
    "beslenme eğitimi platform kuralları",
    "beslenme uzmanı üyelik şartları",
    "beslenme bilimleri kullanım koşulları",
    "beslenme terapisi platform kuralları",
    "beslenme koçluğu üyelik koşulları",
    "beslenme eğitimi haklar ve yükümlülükler",
    "beslenme kursu platform şartları",
  ],
  openGraph: {
    title: "Kullanım Koşulları - Nutriga Akademi | Platform Kullanım Şartları",
    description:
      "Nutriga Akademi'nin kullanım koşulları ve üyelik şartları hakkında detaylı bilgi edinin. Platform kullanımı ile ilgili tüm kuralları öğrenin.",
    url: "https://nutrigaakademi.com/kullanim-kosullari",
    siteName: "Nutriga Akademi",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nutriga Akademi Kullanım Koşulları - Platform Kullanım Şartları",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kullanım Koşulları - Nutriga Akademi",
    description:
      "Nutriga Akademi'nin kullanım koşulları ve üyelik şartları hakkında detaylı bilgi edinin. Platform kullanımı ile ilgili tüm kuralları öğrenin.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://nutrigaakademi.com/kullanim-kosullari",
  },
};

export default function KullanimKosullariPage() {
  return <TermsContent />;
}
