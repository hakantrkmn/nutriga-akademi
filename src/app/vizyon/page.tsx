import type { Metadata } from "next";
import VisionContent from "../../components/vision/VisionContent";

export const metadata: Metadata = {
  title: "Vizyonumuz | Nutriga Akademi",
  description:
    "Nutriga Akademi'nin vizyonu: Beslenme eğitiminin gücünü herkes için erişilebilir kılarak, yenilikçi ve interaktif yöntemlerle bireyleri beslenme okuryazarı yapan lider bir eğitim ekosistemi olmak.",
};

export default function VizyonPage() {
  return <VisionContent />;
}
