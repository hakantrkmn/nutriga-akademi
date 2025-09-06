import AboutContent from "./components/AboutContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | NutriHome Akademi",
  description: "NutriHome Akademi hakkında bilgi edinin. Misyonumuz, vizyonumuz ve beslenme eğitimindeki uzmanlarımızla tanışın.",
};

export default function HakkimizdaPage() {
  return <AboutContent />;
}