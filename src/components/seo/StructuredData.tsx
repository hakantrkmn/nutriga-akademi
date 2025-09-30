import {
  COMPANY_EMAIL,
  COMPANY_INSTAGRAM_URL,
  COMPANY_NAME,
  COMPANY_PHONE,
} from "@/constants";
import Script from "next/script";

interface StructuredDataProps {
  type: "Organization" | "Course" | "Article" | "WebSite";
  data: Record<string, unknown>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case "Organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: COMPANY_NAME,
          url: "https://www.nutrigaakademi.com",
          logo: "https://www.nutrigaakademi.com/nutrig_akademi_logo.svg",
          description:
            "Profesyonel diyetisyenler için kapsamlı beslenme eğitimleri ve kursları.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "İstanbul",
            addressCountry: "TR",
            addressRegion: "İstanbul",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: COMPANY_PHONE,
            contactType: "customer service",
            email: COMPANY_EMAIL,
            availableLanguage: "Turkish",
            areaServed: "TR",
            hoursAvailable: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              opens: "09:00",
              closes: "18:00",
            },
          },
          sameAs: [COMPANY_INSTAGRAM_URL],
          foundingDate: "2024",
          numberOfEmployees: "1-10",
          industry: "Education",
        };

      case "Course":
        return {
          "@context": "https://schema.org",
          "@type": "Course",
          name: data.title,
          description: data.description,
          provider: {
            "@type": "Organization",
            name: COMPANY_NAME,
            url: "https://www.nutrigaakademi.com",
          },
          courseMode: "online",
          educationalLevel: "professional",
          inLanguage: "tr",
          offers: {
            "@type": "Offer",
            price: data.price,
            priceCurrency: "TRY",
            availability: "https://schema.org/InStock",
          },
        };

      case "Article":
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: data.title,
          description: data.description,
          author: {
            "@type": "Organization",
            name: COMPANY_NAME,
          },
          publisher: {
            "@type": "Organization",
            name: COMPANY_NAME,
            logo: {
              "@type": "ImageObject",
              url: "https://www.nutrigaakademi.com/nutrig_akademi_logo.svg",
            },
          },
          datePublished: data.createdAt,
          dateModified: data.updatedAt,
          image: data.image,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://www.nutrigaakademi.com/blog/${data.slug}`,
          },
        };

      case "WebSite":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: COMPANY_NAME,
          url: "https://www.nutrigaakademi.com",
          description:
            "Profesyonel diyetisyenler için kapsamlı beslenme eğitimleri ve kursları.",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate:
                "https://www.nutrigaakademi.com/search?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
          publisher: {
            "@type": "Organization",
            name: COMPANY_NAME,
            url: "https://www.nutrigaakademi.com",
          },
        };

      default:
        return {};
    }
  };

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}
