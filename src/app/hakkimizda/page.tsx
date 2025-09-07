import AboutContent from "@/components/about/AboutContent";
import type { Metadata } from "next";
import { COMPANY_NAME } from "@/constants";

export const metadata: Metadata = {
  title: "Hakkımızda | " + COMPANY_NAME,
  description: COMPANY_NAME + " hakkında bilgi edinin. Misyonumuz, vizyonumuz ve beslenme eğitimindeki uzmanlarımızla tanışın.",
};

export default function HakkimizdaPage() {
  return <AboutContent />;
}