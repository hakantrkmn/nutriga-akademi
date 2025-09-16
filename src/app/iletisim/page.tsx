import { COMPANY_NAME } from "@/constants";
import type { Metadata } from "next";
import IletisimContent from "../../components/contact/ContactContext";

export const metadata: Metadata = {
  title: "Bize Soru Sorun | " + COMPANY_NAME,
  description:
    COMPANY_NAME +
    " hakkında sorularınızı bize sorun. Beslenme eğitimlerimiz hakkında bilgi alın.",
};

export default function IletisimPage() {
  return <IletisimContent />;
}
