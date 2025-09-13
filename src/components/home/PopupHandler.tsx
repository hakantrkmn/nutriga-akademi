"use client";

import { RegisterModal } from "@/components/modals/RegisterModal";
import { useEffect, useState } from "react";

interface PopupHandlerProps {
  initialPopup?: string;
}

export function PopupHandler({ initialPopup }: PopupHandlerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Sayfa yüklendiğinde popup=true varsa modal'ı aç
    if (initialPopup === "true") {
      console.log("🎯 POPUP MODAL açılıyor...");
      setIsModalOpen(true);
    }
  }, [initialPopup]);

  return (
    <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
  );
}
