import type { Metadata } from "next";
import VisionContent from "../../components/vision/VisionContent";

export const metadata: Metadata = {
  title: "Vizyonumuz - Nutriga Akademi | Beslenme Okuryazarlığında Liderlik",
  description:
    "Nutriga Akademi'nin vizyonu: Beslenme eğitiminin gücünü herkes için erişilebilir kılarak, yenilikçi ve interaktif yöntemlerle bireyleri beslenme okuryazarı yapan lider bir eğitim ekosistemi olmak. Küresel standartlarda eğitim veren, yenilikçi ve sürdürülebilir bir akademi.",
  keywords: [
    "nutriga akademi vizyonu",
    "beslenme eğitimi vizyonu",
    "beslenme okuryazarlığı",
    "yenilikçi beslenme eğitimi",
    "interaktif beslenme eğitimi",
    "beslenme eğitim ekosistemi",
    "küresel beslenme eğitimi",
    "sürdürülebilir beslenme eğitimi",
    "beslenme bilimleri liderliği",
    "beslenme eğitimi geleceği",
    "beslenme danışmanlığı vizyonu",
    "beslenme terapisi vizyonu",
  ],
  openGraph: {
    title: "Vizyonumuz - Nutriga Akademi | Beslenme Okuryazarlığında Liderlik",
    description:
      "Beslenme eğitiminin gücünü herkes için erişilebilir kılarak, yenilikçi ve interaktif yöntemlerle bireyleri beslenme okuryazarı yapan lider bir eğitim ekosistemi olmak.",
    url: "https://nutrigaakademi.com/vizyon",
    siteName: "Nutriga Akademi",
    images: [
      {
        url: "/images/og-vizyon.jpg",
        width: 1200,
        height: 630,
        alt: "Nutriga Akademi Vizyonu - Beslenme Okuryazarlığında Liderlik",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vizyonumuz - Nutriga Akademi",
    description:
      "Beslenme eğitiminin gücünü herkes için erişilebilir kılarak, yenilikçi ve interaktif yöntemlerle bireyleri beslenme okuryazarı yapan lider bir eğitim ekosistemi olmak.",
    images: ["/images/og-vizyon.jpg"],
  },
  alternates: {
    canonical: "https://nutrigaakademi.com/vizyon",
  },
};

export default function VizyonPage() {
  return <VisionContent />;
}
