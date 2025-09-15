import EgitimlerContent from "@/components/courses/CoursesContent";
import { COMPANY_NAME } from "@/constants";
import { getCourses } from "@/lib/redis";
import type { Metadata } from "next";

// ISR - Eğitimler sayfası 2 saatte bir yenilenir
export const revalidate = 7200; // 2 saat = 7200 saniye

export const metadata: Metadata = {
  title: "Eğitimler | " + COMPANY_NAME,
  description:
    "Profesyonel diyetisyenler için kapsamlı beslenme eğitimleri. Klinik beslenme, sporcu beslenmesi, pediatrik beslenme ve daha fazlası.",
};

export default async function EgitimlerPage() {
  const egitimler = await getCourses();
  return <EgitimlerContent egitimler={egitimler} />;
}
