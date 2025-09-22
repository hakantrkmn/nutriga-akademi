"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function PaymentSuccessToast() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const payment = searchParams.get("payment");

    if (payment === "success") {
      toast.success("🎉 Ödeme Başarılı!", {
        description: "Eğitimlerinize erişim sağlandı. İyi çalışmalar!",
        duration: 5000,
      });

      // URL'den parametreyi temizle
      const url = new URL(window.location.href);
      url.searchParams.delete("payment");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);

  return null;
}
