import AboutContent from "@/components/about/AboutContent";
import { COMPANY_NAME } from "@/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | " + COMPANY_NAME,
  description:
    COMPANY_NAME +
    " hakkında bilgi edinin. Misyonumuz, vizyonumuz ve beslenme eğitimindeki uzmanlarımızla tanışın.",
};

export default function HakkimizdaPage() {
  return <AboutContent />;
}
