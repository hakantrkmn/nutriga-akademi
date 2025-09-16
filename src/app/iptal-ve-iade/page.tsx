import type { Metadata } from "next";
import CancellationContent from "../../components/cancellation/CancellationContent";

export const metadata: Metadata = {
  title: "İptal ve İade Politikası | NutriHome Akademi",
  description:
    "NutriHome Akademi'nin iptal ve iade politikası hakkında detaylı bilgi edinin. Eğitim iptalleri ve iadeleri ile ilgili tüm şartları öğrenin.",
};

export default function IptalVeIadePage() {
  return <CancellationContent />;
}
