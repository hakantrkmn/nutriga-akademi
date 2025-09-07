import type { Metadata } from "next";
import VisionContent from "../../components/vision/VisionContent";

export const metadata: Metadata = {
  title: "Vizyonumuz | NutriHome Akademi",
  description:
    "NutriHome Akademi'nin vizyonu: Türkiye'nin beslenme alanında önde gelen eğitim platformu olmak ve dünya standartlarında uzmanlar yetiştirmek.",
};

export default function VizyonPage() {
  return <VisionContent />;
}
