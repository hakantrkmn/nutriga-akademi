import Hero from "@/components/home/Hero";
import PopularEgitimler from "@/components/home/PopularEgitimler";
import BlogSection from "@/components/home/BlogSection";
import {prisma} from "@/lib/prisma";
export default async function Home() {
  const egitimler = await prisma.egitim.findMany();
  const convertedEgitimler = egitimler.map(egitim => {
    return {
      ...egitim,
      price: parseFloat(egitim.price?.toString() || "0")
    }
  });
  return (
    <>
      <Hero />
      <PopularEgitimler egitimler={convertedEgitimler} />
      <BlogSection />
    </>
  );
}
