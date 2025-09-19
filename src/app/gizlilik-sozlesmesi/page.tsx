import type { Metadata } from "next";
import PrivacyContent from "../../components/privacy/PrivacyContent";

export const metadata: Metadata = {
  title: "Gizlilik Sözleşmesi | Nutriga Akademi",
  description:
    "Nutriga Akademi'nin gizlilik sözleşmesi ve kişisel verilerin korunması hakkında detaylı bilgi edinin. KVKK ve veri güvenliği politikalarımız.",
};

export default function GizlilikSozlesmesiPage() {
  return <PrivacyContent />;
}
