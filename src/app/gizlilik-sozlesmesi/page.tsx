import type { Metadata } from "next";
import PrivacyContent from "../../components/privacy/PrivacyContent";

export const metadata: Metadata = {
  title: "Gizlilik Sözleşmesi | NutriHome Akademi",
  description:
    "NutriHome Akademi'nin gizlilik sözleşmesi ve kişisel verilerin korunması hakkında detaylı bilgi edinin. KVKK ve veri güvenliği politikalarımız.",
};

export default function GizlilikSozlesmesiPage() {
  return <PrivacyContent />;
}
