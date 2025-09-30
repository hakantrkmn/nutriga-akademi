import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/auth/",
        "/cart/",
        "/hesabim/",
        "/payment/",
        "/test-editor/",
        "/_next/",
        "/uploads/",
      ],
    },
    sitemap: "https://www.nutrigaakademi.com/sitemap.xml",
  };
}
