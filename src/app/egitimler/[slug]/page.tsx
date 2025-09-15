import EgitimDetailContent from "@/components/courses/detail/CoursesDetailContent";
import { COMPANY_NAME } from "@/constants";
import { prisma } from "@/lib/prisma";
import { EgitimDetailPageProps } from "@/types";
import { convertEgitimToDecimal } from "@/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// ISR - Eğitim detay sayfaları 2 saatte bir yenilenir
export const revalidate = 7200; // 2 saat = 7200 saniye
export async function generateMetadata({
  params,
}: EgitimDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const egitim = await prisma.egitim.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!egitim) {
    return {
      title: "Eğitim bulunamadı | " + COMPANY_NAME,
    };
  }

  return {
    title: `${egitim?.title || ""} | ` + COMPANY_NAME,
    description: egitim.description,
  };
}

export default async function EgitimDetailPage({
  params,
}: EgitimDetailPageProps) {
  const { slug } = await params;
  const egitim = await prisma.egitim.findUnique({
    where: {
      slug: slug,
    },
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
