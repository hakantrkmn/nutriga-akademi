"use client";

import EgitimCard from "@/components/courses/CoursesCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Egitim } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PopularEgitimlerProps {
  egitimler: Egitim[];
}

export default function PopularEgitimler({ egitimler }: PopularEgitimlerProps) {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const checkColumns = () => {
      if (window.innerWidth < 768) setColumns(1);
      else if (window.innerWidth < 1024) setColumns(2);
      else setColumns(3);
    };
    checkColumns();
    window.addEventListener("resize", checkColumns);
    return () => window.removeEventListener("resize", checkColumns);
  }, []);

  // En popüler eğitimleri al (sales_count'a göre sırala)
  const popularEgitimler = egitimler
    .sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
    .slice(0, 6);

  return (
    <div className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-12 items-center">
          {/* Section Header */}
          <div className="flex flex-col gap-4 text-center max-w-[600px]">
            <Badge className="text-green-600 bg-green-50 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto">
              Popüler Eğitimler
            </Badge>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              En Çok Tercih Edilen
              <span className="block text-green-600">Beslenme Eğitimleri</span>
            </h2>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Uzman diyetisyenlerimiz tarafından hazırlanan, en güncel
              bilgilerle donatılmış eğitimlerimizi keşfedin.
            </p>
          </div>

          {/* Eğitim Grid */}
          <div
            className={`grid gap-6 md:gap-8 w-full max-w-6xl ${
              columns === 1
                ? "grid-cols-1"
                : columns === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {popularEgitimler.map((egitim) => (
              <EgitimCard key={egitim.id} egitim={egitim} />
            ))}
          </div>

          {/* Stats Section */}
          <div className="w-full max-w-4xl">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-green-600">
                    {egitimler.length}+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Toplam Eğitim
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-green-600">
                    {egitimler.reduce((sum, e) => sum + (e.salesCount || 0), 0)}
                    +
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Mutlu Öğrenci
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-green-600">4.9/5</div>
                  <div className="text-sm text-gray-600 font-medium">
                    Ortalama Puan
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link href="/egitimler">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all">
                Tüm Eğitimleri Gör
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
