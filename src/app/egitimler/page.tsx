import EgitimlerContent from "@/components/courses/CoursesContent";
import { COMPANY_NAME } from "@/constants";
import { getCourses } from "@/lib/redis";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eğitimler | " + COMPANY_NAME,
  description:
    "Profesyonel diyetisyenler için kapsamlı beslenme eğitimleri. Klinik beslenme, sporcu beslenmesi, pediatrik beslenme ve daha fazlası.",
};

export default async function EgitimlerPage() {
  const egitimler = await getCourses();
  return <EgitimlerContent egitimler={egitimler} />;
}
