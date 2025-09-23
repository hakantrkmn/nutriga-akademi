"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function PaymentSuccessToast() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const payment = searchParams.get("payment");

    if (payment === "success") {
      // Toast mesajını göster
      toast.success("🎉 Ödeme Başarılı!", {
        description: "Eğitimlerinize erişim sağlandı. İyi çalışmalar!",
        duration: 5000,
      });

      // Ödeme başarılıysa localStorage'deki sepeti temizle
      console.log("Ödeme başarılı, localStorage sepeti temizleniyor...");
      localStorage.removeItem("nutriga_cart");

      // URL'den parametreyi toast'tan sonra temizle (sayfa yenilenmesini önle)
      setTimeout(() => {
        const url = new URL(window.location.href);
        url.searchParams.delete("payment");
        window.history.replaceState({}, "", url.toString());
      }, 100); // Kısa bir gecikme ile
    }
  }, [searchParams]);

  return null;
}
