import type { Metadata } from "next";
import CancellationContent from "../../components/cancellation/CancellationContent";

export const metadata: Metadata = {
  title:
    "İptal ve İade Politikası - Nutriga Akademi | Eğitim İptal ve İade Şartları",
  description:
    "Nutriga Akademi'nin iptal ve iade politikası hakkında detaylı bilgi edinin. Beslenme eğitimi kursları, diyetisyen eğitimleri ve beslenme danışmanlığı hizmetlerinin iptal ve iade şartları ile ilgili tüm bilgileri öğrenin.",
  keywords: [
    "nutriga akademi iptal iade politikası",
    "beslenme eğitimi iptal şartları",
    "diyetisyen eğitimi iade politikası",
    "beslenme kursu iptal koşulları",
    "beslenme danışmanlığı iade şartları",
    "beslenme eğitimi iptal iade",
    "beslenme uzmanı eğitimi iptal",
    "beslenme bilimleri iade politikası",
    "beslenme terapisi iptal şartları",
    "beslenme koçluğu iade koşulları",
    "beslenme eğitimi para iadesi",
    "beslenme kursu iptal prosedürü",
  ],
  openGraph: {
    title:
      "İptal ve İade Politikası - Nutriga Akademi | Eğitim İptal ve İade Şartları",
    description:
      "Nutriga Akademi'nin iptal ve iade politikası hakkında detaylı bilgi edinin. Beslenme eğitimi kursları ve hizmetlerinin iptal ve iade şartları.",
    url: "https://nutrigaakademi.com/iptal-ve-iade",
    siteName: "Nutriga Akademi",
    images: [
      {
        url: "/images/og-iptal.jpg",
        width: 1200,
        height: 630,
        alt: "Nutriga Akademi İptal ve İade Politikası - Eğitim İptal ve İade Şartları",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "İptal ve İade Politikası - Nutriga Akademi",
    description:
      "Nutriga Akademi'nin iptal ve iade politikası hakkında detaylı bilgi edinin. Beslenme eğitimi kursları ve hizmetlerinin iptal ve iade şartları.",
    images: ["/images/og-iptal.jpg"],
  },
  alternates: {
    canonical: "https://nutrigaakademi.com/iptal-ve-iade",
  },
};

export default function IptalVeIadePage() {
  return <CancellationContent />;
}
