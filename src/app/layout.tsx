import type { Metadata } from "next";
import { Inter, Nunito, Poppins, Source_Sans_3 } from "next/font/google";
import "./globals.css";

import StructuredData from "@/components/seo/StructuredData";
import { Toaster } from "@/components/ui/toaster";
import ConditionalLayout from "./conditionalLayout";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nutrigaakademi.com"),
  title: {
    default: "Nutriga Akademi - Diyetisyen Eğitimleri ve Beslenme Kursları",
    template: "%s | Nutriga Akademi",
  },
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
  ],
  authors: [{ name: "Nutriga Akademi" }],
  creator: "Nutriga Akademi",
  publisher: "Nutriga Akademi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://nutrigaakademi.com",
    title: "Nutriga Akademi - Diyetisyen Eğitimleri ve Beslenme Kursları",
    description:
      "Profesyonel diyetisyenler için kapsamlı beslenme eğitimleri. Klinik beslenme, sporcu beslenmesi, pediatrik beslenme kursları.",
    siteName: "Nutriga Akademi",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nutriga Akademi - Diyetisyen Eğitimleri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nutriga Akademi - Diyetisyen Eğitimleri",
    description:
      "Profesyonel diyetisyenler için kapsamlı beslenme eğitimleri ve kursları.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <StructuredData type="Organization" data={{}} />
        <StructuredData type="WebSite" data={{}} />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} ${nunito.variable} ${sourceSans3.variable} antialiased`}
      >
        <ConditionalLayout>{children}</ConditionalLayout>
        <Toaster />
      </body>
    </html>
  );
}
