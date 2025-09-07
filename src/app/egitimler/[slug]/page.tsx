import { notFound } from "next/navigation";
import EgitimDetailContent from "@/components/courses/detail/EgitimDetailContent";
import type { Metadata } from "next";
import { EgitimDetailPageProps } from "@/types";
import { COMPANY_NAME } from "@/constants";
import { prisma } from "@/lib/prisma";
import { convertEgitimToDecimal } from "@/utils";
export async function generateMetadata({ params, egitim: egitimData }: EgitimDetailPageProps): Promise<Metadata> {
  if (egitimData) {
    return {
      title: `${egitimData.title} | ` + COMPANY_NAME,
      description: egitimData.description,
    };
  }
  const { slug } = await params;
  const egitim = await prisma.egitim.findUnique({
    where: {
      slug: slug
    }
  });

  if (!egitim) {
    return {
      title: "Eğitim bulunamadı | " + COMPANY_NAME
    };
  }

  return {
    title: `${egitim?.title || ''} | ` + COMPANY_NAME,
    description: egitim.description,
  };
}

export default async function EgitimDetailPage({ params, egitim: egitimData }: EgitimDetailPageProps) {
  if (egitimData) {
    return <EgitimDetailContent egitim={egitimData} />;
  }

  const { slug } = await params;
  const egitim = await prisma.egitim.findUnique({
    where: {
      slug: slug
    }
  });

  if (!egitim) {
    notFound();
  }

  const convertedEgitim = convertEgitimToDecimal(egitim);
  return <EgitimDetailContent egitim={convertedEgitim} />;
}

export async function generateStaticParams() {
  const egitimler = await prisma.egitim.findMany();
  return egitimler.map((egitim) => ({
    slug: egitim.slug,
  }));
}