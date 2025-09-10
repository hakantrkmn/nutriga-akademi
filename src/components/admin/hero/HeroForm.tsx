"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toaster } from "@/components/ui/toaster";
import { useState } from "react";

interface HeroSlide {
  id?: string;
  titleMain: string;
  titleHighlight: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  isActive: boolean;
  sortOrder: number;
}

interface HeroFormProps {
  heroSlide?: HeroSlide;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function HeroForm({
  heroSlide,
  onSuccess,
  onCancel,
}: HeroFormProps) {
  const [formData, setFormData] = useState<HeroSlide>({
    titleMain: heroSlide?.titleMain || "",
    titleHighlight: heroSlide?.titleHighlight || "",
    description: heroSlide?.description || "",
    imageSrc: heroSlide?.imageSrc || "",
    imageAlt: heroSlide?.imageAlt || "",
    isActive: heroSlide?.isActive ?? true,
    sortOrder: heroSlide?.sortOrder || 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = heroSlide?.id ? `/api/hero/${heroSlide.id}` : "/api/hero";
      const method = heroSlide?.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toaster.success(
          heroSlide?.id ? "Hero slide güncellendi" : "Hero slide oluşturuldu"
        );
        onSuccess();
      } else {
        toaster.error(result.error || "Bir hata oluştu");
      }
    } catch (error) {
      console.error("Hero slide kaydetme hatası:", error);
      toaster.error("Bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof HeroSlide,
    value: string | boolean | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {heroSlide?.id ? "Hero Slide Düzenle" : "Yeni Hero Slide Oluştur"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="titleMain">Ana Başlık</Label>
              <Input
                id="titleMain"
                value={formData.titleMain}
                onChange={(e) => handleInputChange("titleMain", e.target.value)}
                placeholder="Ana başlık"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="titleHighlight">Vurgulanan Başlık</Label>
              <Input
                id="titleHighlight"
                value={formData.titleHighlight}
                onChange={(e) =>
                  handleInputChange("titleHighlight", e.target.value)
                }
                placeholder="Vurgulanan başlık"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Açıklama</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Hero slide açıklaması"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageSrc">Resim URL</Label>
            <Input
              id="imageSrc"
              value={formData.imageSrc}
              onChange={(e) => handleInputChange("imageSrc", e.target.value)}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageAlt">Resim Alt Text</Label>
            <Input
              id="imageAlt"
              value={formData.imageAlt}
              onChange={(e) => handleInputChange("imageAlt", e.target.value)}
              placeholder="Resim açıklaması"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sortOrder">Sıralama</Label>
              <Input
                id="sortOrder"
                type="number"
                value={formData.sortOrder}
                onChange={(e) =>
                  handleInputChange("sortOrder", parseInt(e.target.value) || 0)
                }
                placeholder="0"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  handleInputChange("isActive", e.target.checked)
                }
                className="rounded"
              />
              <Label htmlFor="isActive">Aktif</Label>
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              İptal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Kaydediliyor..."
                : heroSlide?.id
                ? "Güncelle"
                : "Oluştur"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
