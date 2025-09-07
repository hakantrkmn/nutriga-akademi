import EgitimlerContent from "@/components/courses/EgitimlerContent";
import { COMPANY_NAME } from "@/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eğitimler | " + COMPANY_NAME,
  description: "Profesyonel diyetisyenler için kapsamlı beslenme eğitimleri. Klinik beslenme, sporcu beslenmesi, pediatrik beslenme ve daha fazlası.",
};

export default function EgitimlerPage() {
  return <EgitimlerContent />;
}