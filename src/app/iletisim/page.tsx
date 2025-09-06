import IletisimContent from "./components/IletisimContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim | NutriHome Akademi",
  description: "NutriHome Akademi ile iletişime geçin. Beslenme eğitimlerimiz hakkında sorularınızı bizimle paylaşın.",
};

export default function IletisimPage() {
  return <IletisimContent />;
}