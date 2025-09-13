import BlogSection from "@/components/home/BlogSection";
import Hero from "@/components/home/HomeHero";
import PopularEgitimler from "@/components/home/PopularCourses";
import { PopupHandler } from "@/components/home/PopupHandler";
import { prisma } from "@/lib/prisma";
import { getBlogPosts, getCourses } from "@/lib/redis";

// Server Component'ta search params almak için
interface HomePageProps {
  searchParams: Promise<{
    popup?: string;
    modal?: string;
    show?: string;
    [key: string]: string | undefined;
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const fetchedBlogPosts = await getBlogPosts();
  const fetchedCourses = await getCourses();

  //get only active ones and sort by sortOrder
  const fetchedHeroSlides = await prisma.heroSlide.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  // GET parametrelerini await ile al (Next.js 15)
  const searchParamsResolved = await searchParams;
  const popup = searchParamsResolved.popup;
  const modal = searchParamsResolved.modal;
  const show = searchParamsResolved.show;

  console.log("Server-side GET Parametreleri:", {
    popup,
    modal,
    show,
    allParams: searchParamsResolved,
  });

  // popup=true varsa log yaz
  if (popup === "true") {
    console.log("🎯 POPUP parametresi TRUE tespit edildi!");
  }

  return (
    <>
      <Hero slides={fetchedHeroSlides} />
      <PopularEgitimler egitimler={fetchedCourses} />
      <BlogSection posts={fetchedBlogPosts} />

      {/* Popup Modal Handler */}
      <PopupHandler initialPopup={popup} />
    </>
  );
}
