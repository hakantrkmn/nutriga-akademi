"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toaster } from "@/components/ui/toaster";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiEdit, FiEye, FiEyeOff, FiPlus, FiTrash2 } from "react-icons/fi";

interface HeroSlide {
  id: string;
  titleMain: string;
  titleHighlight: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface HeroListProps {
  onEdit: (heroSlide: HeroSlide) => void;
  onCreateNew: () => void;
}

export default function HeroList({ onEdit, onCreateNew }: HeroListProps) {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHeroSlides = async () => {
    try {
      const response = await fetch("/api/hero");
      const result = await response.json();

      if (result.success) {
        setHeroSlides(result.data);
      } else {
        toaster.error("Hero slide'ları yüklenemedi");
      }
    } catch (error) {
      console.error("Hero slide'ları yükleme hatası:", error);
      toaster.error("Bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroSlides();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Bu hero slide'ı silmek istediğinizden emin misiniz?")) {
      return;
    }

    try {
      const response = await fetch(`/api/hero/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        toaster.success("Hero slide silindi");
        fetchHeroSlides();
      } else {
        toaster.error(result.error || "Silme işlemi başarısız");
      }
    } catch (error) {
      console.error("Hero slide silme hatası:", error);
      toaster.error("Bir hata oluştu");
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const heroSlide = heroSlides.find((slide) => slide.id === id);
      if (!heroSlide) return;

      const response = await fetch(`/api/hero/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...heroSlide,
          isActive: !currentStatus,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toaster.success(
          `Hero slide ${!currentStatus ? "aktif" : "pasif"} edildi`
        );
        fetchHeroSlides();
      } else {
        toaster.error(result.error || "Durum değiştirilemedi");
      }
    } catch (error) {
      console.error("Hero slide durum değiştirme hatası:", error);
      toaster.error("Bir hata oluştu");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Hero Slide Yönetimi</h2>
        <Button onClick={onCreateNew} className="flex items-center gap-2">
          <FiPlus className="h-4 w-4" />
          Yeni Hero Slide
        </Button>
      </div>

      {heroSlides.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500 mb-4">Henüz hero slide bulunmuyor.</p>
            <Button onClick={onCreateNew} className="flex items-center gap-2">
              <FiPlus className="h-4 w-4" />
              İlk Hero Slide&apos;ı Oluştur
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {heroSlides.map((heroSlide) => (
            <Card key={heroSlide.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={heroSlide.imageSrc}
                  alt={heroSlide.imageAlt}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={heroSlide.isActive ? "default" : "secondary"}>
                    {heroSlide.isActive ? "Aktif" : "Pasif"}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">
                  {heroSlide.titleMain}
                </CardTitle>
                <p className="text-sm text-primary-600 font-medium">
                  {heroSlide.titleHighlight}
                </p>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {heroSlide.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>Sıra: {heroSlide.sortOrder}</span>
                  <span>
                    {new Date(heroSlide.createdAt).toLocaleDateString("tr-TR")}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(heroSlide)}
                    className="flex-1"
                  >
                    <FiEdit className="h-4 w-4 mr-1" />
                    Düzenle
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleToggleActive(heroSlide.id, heroSlide.isActive)
                    }
                    className="flex-1"
                  >
                    {heroSlide.isActive ? (
                      <FiEyeOff className="h-4 w-4 mr-1" />
                    ) : (
                      <FiEye className="h-4 w-4 mr-1" />
                    )}
                    {heroSlide.isActive ? "Pasif" : "Aktif"}
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(heroSlide.id)}
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
