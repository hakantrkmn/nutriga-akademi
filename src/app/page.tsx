import BlogSection from "@/components/home/BlogSection";
import Hero from "@/components/home/HomeHero";
import PopularEgitimler from "@/components/home/PopularCourses";
import { getBlogPosts, getCourses } from "@/lib/redis";
export default async function Home() {
  const fetchedBlogPosts = await getBlogPosts();
  const fetchedCourses = await getCourses();

  return (
    <>
      <Hero />
      <PopularEgitimler egitimler={fetchedCourses} />
      <BlogSection posts={fetchedBlogPosts} />
    </>
  );
}
