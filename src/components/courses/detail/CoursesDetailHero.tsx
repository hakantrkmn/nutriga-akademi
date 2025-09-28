"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EgitimDetailHeroProps } from "@/types";
import { ArrowLeft, Image as ImageIcon, Loader2, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function EgitimDetailHero({
  egitim,
  isImageError,
  setIsImageError,
}: EgitimDetailHeroProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  return (
    <div className="border-b border-border-color shadow-sm bg-background-alt">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 md:gap-12 items-start">
          {/* Content Section */}
          <div className="flex flex-col gap-6 items-start">
            {/* Back Button */}
            <Link href="/egitimler">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg px-3 py-2 text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <div className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-medium">Tüm Eğitimler</span>
                </div>
              </Button>
            </Link>

            {/* Badges */}
            <div className="flex gap-3 flex-wrap">
              <Badge className="text-xs px-3 py-1 rounded-lg font-medium bg-primary-50 text-primary">
                {egitim.category}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs px-3 py-1 rounded-lg font-medium border-accent text-accent"
              >
                {egitim.level}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight font-[Poppins,sans-serif]">
              {egitim.title}
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-secondary max-w-[90%] leading-relaxed font-[Inter,sans-serif]">
              {egitim.description}
            </p>

            {/* Meta Information */}
            <div className="flex gap-8 pt-2 text-secondary text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <span className="font-medium">
                  Eğitmen:{" "}
                  <span className="text-foreground">{egitim.instructor}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="h-72 md:h-96 w-full bg-background-alt rounded-2xl overflow-hidden shadow-xl border border-border-color hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center">
            {isImageLoading && !isImageError && (
              <div className="h-full w-full flex flex-col items-center justify-center bg-background-alt text-muted gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="text-sm font-medium">
                  Görsel yükleniyor...
                </span>
              </div>
            )}
            {!isImageError ? (
              <Image
                src={egitim.imageUrl || "/images/egitim-default.jpg"}
                alt={egitim.title}
                width={400}
                height={400}
                className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
                  isImageLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setIsImageLoading(false)}
                onError={() => {
                  setIsImageError(true);
                  setIsImageLoading(false);
                }}
                priority={false}
                quality={85}
              />
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center bg-background-alt text-muted gap-4">
                <ImageIcon className="w-16 h-16" />
                <span className="text-sm font-medium">
                  Eğitim görseli bulunamadı
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
