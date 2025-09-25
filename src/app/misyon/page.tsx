import type { Metadata } from "next";
import MissionContent from "../../components/mission/MissionContent";

export const metadata: Metadata = {
  title: "Misyonumuz - Nutriga Akademi | Beslenme Eğitiminde Değer Yaratma",
  description:
    "Nutriga Akademi'nin misyonu: Bilimsel temelli, erişilebilir beslenme eğitimleriyle bireylerin yaşamına sürdürülebilir ve dönüştürücü değer katmak. Beslenme biliminin sürekli gelişen doğasını takip ederek diyetisyenlere en güncel bilgileri sunuyoruz.",
  keywords: [
    "nutriga akademi misyonu",
    "beslenme eğitimi misyonu",
    "bilimsel beslenme eğitimi",
    "erişilebilir beslenme eğitimi",
    "sürdürülebilir beslenme",
    "beslenme bilimleri",
    "diyetisyen eğitimi",
    "beslenme uzmanı gelişimi",
    "beslenme danışmanlığı eğitimi",
    "beslenme terapisi eğitimi",
    "beslenme koçluğu eğitimi",
    "beslenme okuryazarlığı",
  ],
  openGraph: {
    title: "Misyonumuz - Nutriga Akademi | Beslenme Eğitiminde Değer Yaratma",
    description:
      "Bilimsel temelli, erişilebilir beslenme eğitimleriyle bireylerin yaşamına sürdürülebilir ve dönüştürücü değer katmak.",
    url: "https://nutrigaakademi.com/misyon",
    siteName: "Nutriga Akademi",
    images: [
      {
        url: "/images/og-misyon.jpg",
        width: 1200,
        height: 630,
        alt: "Nutriga Akademi Misyonu - Beslenme Eğitiminde Değer Yaratma",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Misyonumuz - Nutriga Akademi",
    description:
      "Bilimsel temelli, erişilebilir beslenme eğitimleriyle bireylerin yaşamına sürdürülebilir ve dönüştürücü değer katmak.",
    images: ["/images/og-misyon.jpg"],
  },
  alternates: {
    canonical: "https://nutrigaakademi.com/misyon",
  },
};

export default function MisyonPage() {
  return <MissionContent />;
}
