import StructuredData from "@/components/seo/StructuredData";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Nunito, Source_Sans_3 } from "next/font/google";
import ConditionalLayout from "./conditionalLayout";
import "./globals.css";

// Nunito - Used for headings (h1, h2, h3, etc.)
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

// Source Sans 3 - Used for body text
const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nutrigaakademi.com"),
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
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: [
      {
        url: "/nutrig_akademi_logo.svg",
        sizes: "180x180",
        type: "image/svg+xml",
      },
    ],
  },
  manifest: "/site.webmanifest",
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
        {/* Additional meta tags for better Google indexing */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icon-192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/icon-512.png"
        />
        <link rel="apple-touch-icon" href="/nutrig_akademi_logo.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Google Site Icon for search results */}
        <meta name="google-site-verification" content="" />
        <meta name="theme-color" content="#82541c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nutriga Akademi" />
      </head>
      <body
        className={`${nunito.variable} ${sourceSans3.variable} antialiased`}
      >
        <ConditionalLayout>{children}</ConditionalLayout>
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
