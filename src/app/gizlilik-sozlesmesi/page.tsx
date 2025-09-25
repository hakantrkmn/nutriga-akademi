import type { Metadata } from "next";
import PrivacyContent from "../../components/privacy/PrivacyContent";

export const metadata: Metadata = {
  title: "Gizlilik Sözleşmesi - Nutriga Akademi | KVKK ve Veri Güvenliği",
  description:
    "Nutriga Akademi'nin gizlilik sözleşmesi ve kişisel verilerin korunması hakkında detaylı bilgi edinin. KVKK uyumlu veri güvenliği politikalarımız, kişisel veri işleme süreçlerimiz ve kullanıcı haklarınız hakkında kapsamlı bilgi.",
  keywords: [
    "nutriga akademi gizlilik sözleşmesi",
    "kvkk gizlilik politikası",
    "kişisel veri korunması",
    "veri güvenliği politikası",
    "beslenme eğitimi gizlilik",
    "diyetisyen eğitimi veri korunması",
    "beslenme kursu gizlilik",
    "beslenme danışmanlığı veri güvenliği",
    "beslenme eğitimi kvkk",
    "beslenme uzmanı gizlilik",
    "beslenme bilimleri veri korunması",
    "beslenme terapisi gizlilik",
  ],
  openGraph: {
    title: "Gizlilik Sözleşmesi - Nutriga Akademi | KVKK ve Veri Güvenliği",
    description:
      "Nutriga Akademi'nin gizlilik sözleşmesi ve kişisel verilerin korunması hakkında detaylı bilgi edinin. KVKK uyumlu veri güvenliği politikalarımız.",
    url: "https://nutrigaakademi.com/gizlilik-sozlesmesi",
    siteName: "Nutriga Akademi",
    images: [
      {
        url: "/images/og-gizlilik.jpg",
        width: 1200,
        height: 630,
        alt: "Nutriga Akademi Gizlilik Sözleşmesi - KVKK ve Veri Güvenliği",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gizlilik Sözleşmesi - Nutriga Akademi",
    description:
      "Nutriga Akademi'nin gizlilik sözleşmesi ve kişisel verilerin korunması hakkında detaylı bilgi edinin. KVKK uyumlu veri güvenliği politikalarımız.",
    images: ["/images/og-gizlilik.jpg"],
  },
  alternates: {
    canonical: "https://nutrigaakademi.com/gizlilik-sozlesmesi",
  },
};

export default function GizlilikSozlesmesiPage() {
  return <PrivacyContent />;
}
