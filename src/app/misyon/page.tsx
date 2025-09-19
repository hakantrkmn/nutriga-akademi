import type { Metadata } from "next";
import MissionContent from "../../components/mission/MissionContent";

export const metadata: Metadata = {
  title: "Misyonumuz | Nutriga Akademi",
  description:
    "Nutriga Akademi'nin misyonu: Bilimsel temelli, erişilebilir beslenme eğitimleriyle bireylerin yaşamına sürdürülebilir ve dönüştürücü değer katmak.",
};

export default function MisyonPage() {
  return <MissionContent />;
}
