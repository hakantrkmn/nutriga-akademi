import type { Metadata } from "next";
import IletisimContent from "../../components/contact/ContactContext";

export const metadata: Metadata = {
  title: "İletişim - Nutriga Akademi | Beslenme Eğitimleri Hakkında Bilgi Alın",
  description:
    "Nutriga Akademi ile iletişime geçin. Beslenme eğitimlerimiz, kurslarımız ve hizmetlerimiz hakkında sorularınızı bize sorun. Uzman ekibimizden destek alın ve beslenme eğitimi danışmanlığı hizmeti alın.",
  keywords: [
    "nutriga akademi iletişim",
    "beslenme eğitimi danışmanlığı",
    "beslenme kursu bilgi",
    "diyetisyen eğitimi danışmanlık",
    "beslenme uzmanı iletişim",
    "beslenme danışmanlığı hizmeti",
    "beslenme eğitimi destek",
    "beslenme kursu sorular",
    "beslenme bilimleri danışmanlık",
    "beslenme terapisi iletişim",
    "beslenme koçluğu danışmanlık",
    "beslenme eğitimi bilgi",
  ],
  openGraph: {
    title:
      "İletişim - Nutriga Akademi | Beslenme Eğitimleri Hakkında Bilgi Alın",
    description:
      "Beslenme eğitimlerimiz, kurslarımız ve hizmetlerimiz hakkında sorularınızı bize sorun. Uzman ekibimizden destek alın.",
    url: "https://nutrigaakademi.com/iletisim",
    siteName: "Nutriga Akademi",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nutriga Akademi İletişim - Beslenme Eğitimleri Danışmanlığı",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "İletişim - Nutriga Akademi",
    description:
      "Beslenme eğitimlerimiz, kurslarımız ve hizmetlerimiz hakkında sorularınızı bize sorun. Uzman ekibimizden destek alın.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://nutrigaakademi.com/iletisim",
  },
};

export default function IletisimPage() {
  return <IletisimContent />;
}
