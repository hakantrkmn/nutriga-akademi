"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EgitimDetailHeroProps } from "@/types";
import {
  ArrowLeft,
  Clock,
  Image as ImageIcon,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function EgitimDetailHero({
  egitim,
  isImageError,
  setIsImageError,
}: EgitimDetailHeroProps) {
  return (
    <div
      className="border-b border-gray-100 shadow-sm"
      style={{ backgroundColor: "var(--background-alt)" }}
    >
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
              <Badge
                className="text-xs px-3 py-1 rounded-lg font-medium"
                style={{
                  color: "var(--primary)",
                  backgroundColor: "rgba(var(--primary-rgb), 0.08)",
                }}
              >
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight font-[Poppins,sans-serif]">
              {egitim.title}
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-600 max-w-[90%] leading-relaxed font-[Inter,sans-serif]">
              {egitim.description}
            </p>

            {/* Meta Information */}
            <div className="flex gap-8 pt-2 text-gray-600 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <span className="font-medium">
                  Eğitmen:{" "}
                  <span className="text-gray-800">{egitim.instructor}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-medium">
                  <span className="text-gray-800">{egitim.salesCount}</span>{" "}
                  öğrenci
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-medium">
                  <span className="text-gray-800">{egitim.salesCount}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="h-72 md:h-96 w-full bg-gray-100 rounded-2xl overflow-hidden shadow-xl border border-gray-200 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300">
            {!isImageError ? (
              <Image
                src={egitim.imageUrl || "/images/egitim-default.jpg"}
                alt={egitim.title}
                width={400}
                height={400}
                className="w-full h-full object-cover"
                onError={() => setIsImageError(true)}
              />
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center bg-gray-100 text-gray-400 gap-4">
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
