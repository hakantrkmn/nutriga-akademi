import AboutContent from "@/components/about/AboutContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda - Nutriga Akademi | Beslenme Eğitim Platformu",
  description:
    "Nutriga Akademi hakkında bilgi edinin. Tüm sağlık profesyonellerine yönelik bilimsel temelli beslenme eğitimleri sunan uzman eğitim platformumuz. Misyonumuz, vizyonumuz ve eğitim yaklaşımımız.",
  keywords: [
    "nutriga akademi hakkında",
    "beslenme eğitim platformu",
    "sağlık profesyonelleri eğitimi",
    "bilimsel beslenme eğitimi",
    "diyetisyen eğitim merkezi",
    "beslenme uzmanı eğitimi",
    "beslenme danışmanlığı eğitimi",
    "beslenme bilimleri eğitimi",
    "beslenme terapisi eğitimi",
    "beslenme koçluğu eğitimi",
  ],
  openGraph: {
    title: "Hakkımızda - Nutriga Akademi | Beslenme Eğitim Platformu",
    description:
      "Tüm sağlık profesyonellerine yönelik bilimsel temelli beslenme eğitimleri sunan uzman eğitim platformumuz.",
    url: "https://nutrigaakademi.com/hakkimizda",
    siteName: "Nutriga Akademi",
    images: [
      {
        url: "/images/og-hakkimizda.jpg",
        width: 1200,
        height: 630,
        alt: "Nutriga Akademi Hakkımızda - Beslenme Eğitim Platformu",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakkımızda - Nutriga Akademi",
    description:
      "Tüm sağlık profesyonellerine yönelik bilimsel temelli beslenme eğitimleri sunan uzman eğitim platformumuz.",
    images: ["/images/og-hakkimizda.jpg"],
  },
  alternates: {
    canonical: "https://nutrigaakademi.com/hakkimizda",
  },
};

export default function HakkimizdaPage() {
  return <AboutContent />;
}
