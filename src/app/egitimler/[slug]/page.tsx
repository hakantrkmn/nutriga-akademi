import { notFound } from "next/navigation";
import EgitimDetailContent from "@/components/courses/detail/EgitimDetailContent";
import { dummyEgitimler } from "@/data/dummyEgitimData";
import type { Metadata } from "next";
import { EgitimDetailPageProps } from "@/types";
import { COMPANY_NAME } from "@/constants";

export async function generateMetadata({ params }: EgitimDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const egitim = dummyEgitimler.find(e => e.slug === slug);
  
  if (!egitim) {
    return {
      title: "Eğitim bulunamadı | " + COMPANY_NAME
    };
  }

  return {
    title: `${egitim.title} | ` + COMPANY_NAME,
    description: egitim.description,
  };
}

export default async function EgitimDetailPage({ params }: EgitimDetailPageProps) {
  const { slug } = await params;
  const egitim = dummyEgitimler.find(e => e.slug === slug);

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