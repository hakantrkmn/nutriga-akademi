"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { EgitimPriceProps } from "@/types";
import { Award, BarChart3, CheckCircle, Lock, Users } from "lucide-react";
import { useState } from "react";

export default function EgitimPrice({ egitim }: EgitimPriceProps) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const formatPrice = (price: number | null | undefined): string => {
    if (!price) return "0";
    return new Intl.NumberFormat("tr-TR").format(price);
  };
  const handleAddToCart = async () => {
    setAdding(true);
    const success = await addItem(egitim.id);
    setAdding(false);
    if (success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div className="lg:sticky lg:top-24">
      <Card className="w-full shadow-xl border border-border-color hover:shadow-2xl transition-all duration-300">
        <CardContent className="p-8">
          <div className="flex flex-col gap-6">
            {/* Price Section */}
            <div className="flex flex-col gap-2 items-center">
              <div className="text-5xl font-bold text-primary font-[Poppins,sans-serif]">
                ₺{formatPrice(egitim.price)}
              </div>
              <div className="text-sm text-muted font-medium">
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
            <div className="w-full h-px bg-border-color" />

            {/* Course Details */}
            <div className="flex flex-col gap-4 items-start w-full">
              <h3 className="text-lg font-semibold text-foreground font-[Poppins,sans-serif]">
                Bu Eğitim İçerir:
              </h3>
              <div className="flex flex-col gap-3 w-full">
                <div className="flex justify-between items-center w-full p-3 bg-background-alt rounded-lg">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    <span className="font-medium text-secondary">Seviye</span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {egitim.level}
                  </span>
                </div>
                <div className="flex justify-between items-center w-full p-3 bg-background-alt rounded-lg">
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="font-medium text-secondary">
                      Katılım Belgesi
                    </span>
                  </div>
                  <span className="font-semibold text-foreground">Evet</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-border-color" />

            {/* Features */}
            <div className="flex flex-col gap-3 items-start w-full">
              <div className="flex flex-col gap-2 items-start w-full">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm text-secondary font-medium">
                    7 gün iade garantisi
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4 text-primary" />
                  <span className="text-sm text-secondary font-medium">
                    Güvenli ödeme
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm text-secondary font-medium">
                    Süreli Erişim Linki
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
