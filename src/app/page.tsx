import BlogSection from "@/components/home/BlogSection";
import Hero from "@/components/home/HomeHero";
import PopularEgitimler from "@/components/home/PopularCourses";
import { prisma } from "@/lib/prisma";
import { getBlogPosts, getCourses } from "@/lib/redis";
export default async function Home() {
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
  return (
    <>
      <Hero slides={fetchedHeroSlides} />
      <PopularEgitimler egitimler={fetchedCourses} />
      <BlogSection posts={fetchedBlogPosts} />
    </>
  );
}
