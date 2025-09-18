import type { Metadata } from "next";
import TermsContent from "../../components/terms/TermsContent";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | NutriHome Akademi",
  description:
    "NutriHome Akademi'nin kullanım koşulları ve üyelik şartları hakkında detaylı bilgi edinin. Platform kullanımı ile ilgili tüm kuralları öğrenin.",
};

export default function KullanimKosullariPage() {
  return <TermsContent />;
}
