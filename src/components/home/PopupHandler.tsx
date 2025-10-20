"use client";

import { RegisterModal } from "@/components/modals/RegisterModal";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function PopupHandlerInner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Sayfa yüklendiğinde popup=true varsa modal'ı aç
    const popup = searchParams.get("popup");
    if (popup === "true") {
      console.log("🎯 POPUP MODAL açılıyor...");
      setIsModalOpen(true);
    }
  }, [searchParams]);

  return (
    <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
  );
}

export function PopupHandler() {
  return <PopupHandlerInner />;
}
