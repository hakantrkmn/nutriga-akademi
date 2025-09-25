// Open Graph görsel URL'lerini dinamik olarak oluşturur

export function generateOGImageUrl(
  type: "blog" | "course" | "default",
  customImage?: string
): string {
  const baseUrl = "https://nutrigaakademi.com";

  // Eğer özel görsel varsa onu kullan (blog/course'un kendi görseli)
  if (customImage) {
    // Eğer görsel zaten tam URL ise direkt kullan
    if (customImage.startsWith("http")) {
      return customImage;
    }
    // Eğer relative path ise base URL ile birleştir
    return customImage.startsWith("/")
      ? `${baseUrl}${customImage}`
      : `${baseUrl}/${customImage}`;
  }

  // Tüm türler için aynı görseli kullan
  return `${baseUrl}/images/og-image.jpg`;
}

// Blog yazısı için metadata oluşturur
export function generateBlogMetadata(post: {
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
}) {
  const ogImageUrl = generateOGImageUrl("blog", post.image);

  return {
    title: `${post.title} | Nutriga Akademi Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://nutrigaakademi.com/blog/${post.slug}`,
      siteName: "Nutriga Akademi",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "tr_TR",
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
  };
}

// Course için metadata oluşturur
export function generateCourseMetadata(course: {
  title: string;
  description: string;
  slug: string;
  price: number;
  updatedAt: string;
  image?: string;
}) {
  const ogImageUrl = generateOGImageUrl("course", course.image);

  return {
    title: `${course.title} | Nutriga Akademi`,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      url: `https://nutrigaakademi.com/egitimler/${course.slug}`,
      siteName: "Nutriga Akademi",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description: course.description,
      images: [ogImageUrl],
    },
  };
}
