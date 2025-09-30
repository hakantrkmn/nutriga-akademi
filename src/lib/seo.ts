import { Metadata } from "next";

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "course";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = "/images/og-image.jpg",
    url,
    type = "website",
    publishedTime,
    modifiedTime,
    author = "Nutriga Akademi",
  } = config;

  const baseUrl = "https://www.nutrigaakademi.com";
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: author }],
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: "Nutriga Akademi",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "tr_TR",
      type: type === "course" ? "website" : (type as "website" | "article"),
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImageUrl],
    },
    alternates: {
      canonical: fullUrl,
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
  };
}

// Anahtar kelime optimizasyonu için yardımcı fonksiyonlar
export const seoKeywords = {
  // Ana anahtar kelimeler
  primary: [
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

  // Uzun kuyruk anahtar kelimeler
  longTail: [
    "diyetisyen eğitimleri online",
    "beslenme kursları sertifikalı",
    "klinik beslenme eğitimi",
    "sporcu beslenmesi kursu",
    "pediatrik beslenme uzmanı",
    "beslenme uzmanı eğitimi",
    "diyetisyen sertifikası nasıl alınır",
    "beslenme danışmanlığı kursu",
    "online beslenme eğitimi ücretsiz",
    "beslenme bilimleri eğitimi",
  ],

  // Blog anahtar kelimeleri
  blog: [
    "beslenme blog",
    "diyetisyen makaleleri",
    "sağlıklı yaşam ipuçları",
    "beslenme rehberleri",
    "beslenme bilimleri",
    "sağlıklı beslenme",
    "diyet önerileri",
    "beslenme uzmanı yazıları",
    "beslenme araştırmaları",
    "sağlık ve beslenme",
  ],

  // Eğitim anahtar kelimeleri
  courses: [
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
};

// Sayfa başına özel anahtar kelime kombinasyonları
export function getPageKeywords(
  page: "home" | "courses" | "blog" | "about" | "contact"
): string[] {
  const baseKeywords = seoKeywords.primary;

  switch (page) {
    case "home":
      return [...baseKeywords, ...seoKeywords.longTail.slice(0, 5)];
    case "courses":
      return [...seoKeywords.courses, ...seoKeywords.longTail.slice(5, 10)];
    case "blog":
      return [...seoKeywords.blog, ...seoKeywords.primary.slice(0, 5)];
    case "about":
      return [
        ...baseKeywords.slice(0, 5),
        "nutriga akademi",
        "beslenme eğitimi merkezi",
      ];
    case "contact":
      return [...baseKeywords.slice(0, 3), "iletişim", "beslenme danışmanlığı"];
    default:
      return baseKeywords;
  }
}

// Meta description optimizasyonu
export function generateDescription(
  baseDescription: string,
  keywords: string[],
  maxLength: number = 160
): string {
  let description = baseDescription;

  // Anahtar kelimeleri doğal bir şekilde ekle
  const relevantKeywords = keywords.slice(0, 3);
  const keywordString = relevantKeywords.join(", ");

  if (description.length + keywordString.length + 10 <= maxLength) {
    description += ` ${keywordString} hakkında detaylı bilgi.`;
  }

  // Maksimum uzunluğu kontrol et
  if (description.length > maxLength) {
    description = description.substring(0, maxLength - 3) + "...";
  }

  return description;
}
