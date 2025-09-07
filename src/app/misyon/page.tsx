import MissionContent from "../../components/mission/MissionContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Misyonumuz | NutriHome Akademi",
  description: "NutriHome Akademi'nin misyonu: Beslenme alanında güncel bilgileri paylaşarak diyetisyenlerin gelişimine katkı sağlamak.",
};

export default function MisyonPage() {
  return <MissionContent />;
}