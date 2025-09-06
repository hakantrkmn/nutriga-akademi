import EgitimlerContent from "./components/EgitimlerContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eğitimler | NutriHome Akademi",
  description: "Profesyonel diyetisyenler için kapsamlı beslenme eğitimleri. Klinik beslenme, sporcu beslenmesi, pediatrik beslenme ve daha fazlası.",
};

export default function EgitimlerPage() {
  return <EgitimlerContent />;
}