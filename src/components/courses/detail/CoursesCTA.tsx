"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { EgitimCTAProps } from "@/types";
import { Award, CheckCircle, Users } from "lucide-react";

export default function EgitimCTA({ egitim }: EgitimCTAProps) {
  const { addItem, loading } = useCart();
  return (
    <div className="mt-12 md:mt-20">
      <Card className="w-full border border-primary-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary-50 rounded-2xl">
        <CardContent className="p-10 md:p-12">
          <div className="flex flex-col gap-6 text-center max-w-2xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col gap-3">
              <Award className="w-12 h-12 text-primary mx-auto" />
              <h3 className="text-2xl font-semibold text-primary font-[Poppins,sans-serif]">
                Kariyerinde Bir Sonraki Adımı At
              </h3>
            </div>

            {/* Description */}
            <p className="max-w-2xl text-lg text-secondary leading-relaxed font-[Inter,sans-serif]">
              {!egitim.isActive
                ? "Bu eğitim şu anda satışta değildir. Yeni eğitimlerimiz için bizi takip etmeye devam edin."
                : "Bu eğitim ile beslenme alanındaki bilginizi derinleştirin ve profesyonel kariyerinizde fark yaratın. Uzman eğitmenlerden öğrenin, sertifikanızı alın."}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4 flex-wrap justify-center pt-2">
              {!egitim.isActive ? (
                <div className="px-10 py-7 rounded-xl text-base font-semibold bg-red-50 border-2 border-red-200 text-red-800">
                  Satışta Değil
                </div>
              ) : (
                <Button
                  size="lg"
                  className="px-10 py-7 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                  onClick={() => addItem(egitim.id)}
                  disabled={loading}
                >
                  {loading
                    ? "Ekleniyor..."
                    : "Hemen Başla - ₺" + egitim.price?.toString()}
                </Button>
              )}
            </div>

            {/* Features */}
            <div className="flex gap-8 pt-4 text-sm text-secondary flex-wrap justify-center">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="font-medium">7 gün iade garantisi</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-medium">Süreli Erişim Linki</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                <span className="font-medium">Katılım Belgesi dahil</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
