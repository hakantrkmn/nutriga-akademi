import { notFound } from "next/navigation";
import EgitimDetailContent from "./components/EgitimDetailContent";
import { dummyEgitimler } from "@/data/dummyEgitimData";
import type { Metadata } from "next";

interface EgitimDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: EgitimDetailPageProps): Promise<Metadata> {
  const egitim = dummyEgitimler.find(e => e.slug === params.slug);
  
  if (!egitim) {
    return {
      title: "Eğitim bulunamadı | NutriHome Akademi"
    };
  }

  return {
    title: `${egitim.title} | NutriHome Akademi`,
    description: egitim.description,
  };
}

export default function EgitimDetailPage({ params }: EgitimDetailPageProps) {
  const egitim = dummyEgitimler.find(e => e.slug === params.slug);

  if (!egitim) {
    notFound();
  }

  return <EgitimDetailContent egitim={egitim} />;
}

export async function generateStaticParams() {
  return dummyEgitimler.map((egitim) => ({
    slug: egitim.slug,
  }));
}