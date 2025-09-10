"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toaster } from "@/components/ui/toaster";
import { cartApi } from "@/lib/api";
import { EgitimPriceProps } from "@/types";
import { Award, BarChart3, CheckCircle, Lock, Users } from "lucide-react";
import { useState } from "react";

export default function EgitimPrice({ egitim }: EgitimPriceProps) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const formatPrice = (price: number | null | undefined): string => {
    if (!price) return "0";
    return new Intl.NumberFormat("tr-TR").format(price);
  };
  const handleAddToCart = async () => {
    setAdding(true);
    const res = await cartApi.add(egitim.id);
    setAdding(false);
    if (res.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
      toaster.success("Sepete eklendi");
    } else if (res.error) {
      if (res.error.toLowerCase().includes("giriş")) {
        toaster.error("Giriş gerekli");
      } else {
        toaster.error(res.error);
      }
    }
  };

  return (
    <div className="lg:sticky lg:top-24">
      <Card className="w-full shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
        <CardContent className="p-8">
          <div className="flex flex-col gap-6">
            {/* Price Section */}
            <div className="flex flex-col gap-2 items-center">
              <div className="text-5xl font-bold text-primary font-[Poppins,sans-serif]">
                ₺{formatPrice(egitim.price)}
              </div>
              <div className="text-sm text-gray-500 font-medium">
                Tek seferlik ödeme
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 w-full">
              <Button
                variant={added ? "default" : "outline"}
                size="lg"
                className={`w-full h-14 rounded-xl text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                  added
                    ? "bg-accent hover:bg-accent/90 text-white"
                    : "border-accent text-accent hover:bg-accent/10"
                }`}
                disabled={adding}
                onClick={handleAddToCart}
              >
                {adding ? "Ekleniyor..." : added ? "Eklendi" : "Sepete Ekle"}
              </Button>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-200" />

            {/* Course Details */}
            <div className="flex flex-col gap-4 items-start w-full">
              <h3 className="text-lg font-semibold text-gray-800 font-[Poppins,sans-serif]">
                Bu Eğitim İçerir:
              </h3>
              <div className="flex flex-col gap-3 w-full">
                <div className="flex justify-between items-center w-full p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    <span className="font-medium text-gray-700">Seviye</span>
                  </div>
                  <span className="font-semibold text-gray-800">
                    {egitim.level}
                  </span>
                </div>
                <div className="flex justify-between items-center w-full p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="font-medium text-gray-700">Sertifika</span>
                  </div>
                  <span className="font-semibold text-gray-800">Evet</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-200" />

            {/* Features */}
            <div className="flex flex-col gap-3 items-start w-full">
              <div className="flex flex-col gap-2 items-start w-full">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm text-gray-600 font-medium">
                    7 gün iade garantisi
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4 text-primary" />
                  <span className="text-sm text-gray-600 font-medium">
                    Güvenli ödeme
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm text-gray-600 font-medium">
                    Sınırsız erişim
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
