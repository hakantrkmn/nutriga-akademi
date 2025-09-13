"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  COMPANY_INSTAGRAM_USERNAME,
  COMPANY_WHATSAPP_MESSAGE,
  COMPANY_WHATSAPP_NUMBER,
} from "@/constants";
import { useEffect, useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function ContactButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Sayfa yüklendiğinde butonu göster
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${encodeURIComponent(
      COMPANY_WHATSAPP_MESSAGE
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleInstagramClick = () => {
    const instagramUrl = `https://www.instagram.com/${COMPANY_INSTAGRAM_USERNAME}`;
    window.open(instagramUrl, "_blank");
  };

  if (!isVisible) return null;

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 animate-fade-in">
        {/* Ana Buton */}

        {/* WhatsApp Butonu */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              onClick={handleWhatsAppClick}
              className="h-12 w-12 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-slide-up"
            >
              <FaWhatsapp className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-gray-800 text-white">
            <p>WhatsApp ile Yazın</p>
          </TooltipContent>
        </Tooltip>

        {/* Instagram Butonu */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              onClick={handleInstagramClick}
              className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-slide-up-delayed"
            >
              <FaInstagram className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-gray-800 text-white">
            <p>Instagram&apos;dan Takip Edin</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
