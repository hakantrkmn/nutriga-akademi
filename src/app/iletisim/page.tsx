import { COMPANY_NAME } from "@/constants";
import type { Metadata } from "next";
import IletisimContent from "../../components/contact/ContactContext";

export const metadata: Metadata = {
  title: "İletişim | " + COMPANY_NAME,
  description:
    COMPANY_NAME +
    " ile iletişime geçin. Beslenme eğitimlerimiz hakkında sorularınızı bizimle paylaşın.",
};

export default function IletisimPage() {
  return <IletisimContent />;
}
