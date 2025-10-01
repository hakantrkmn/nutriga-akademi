"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toaster } from "@/components/ui/toaster";
import Image from "next/image";
import { useRef, useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    heroSlide?.imageSrc || null
  );
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Görsel kontrolü
    if (!formData.imageSrc && !selectedFile) {
      toaster.error("Lütfen bir görsel seçin veya URL girin");
      return;
    }

    setIsLoading(true);

    try {
      // Eğer dosya seçiliyse önce upload et
      let finalImageSrc = formData.imageSrc;
      if (selectedFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", selectedFile);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formDataUpload,
        });

        const uploadResult = await uploadResponse.json();

        if (uploadResult.success) {
          finalImageSrc = uploadResult.url;
          toaster.success("Görsel başarıyla yüklendi");
        } else {
          toaster.error(
            uploadResult.error || "Görsel yüklenirken bir hata oluştu"
          );
          return;
        }
      }

      const submitData = {
        ...formData,
        imageSrc: finalImageSrc,
      };

      const url = heroSlide?.id ? `/api/hero/${heroSlide.id}` : "/api/hero";
      const method = heroSlide?.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
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

    // imageSrc değiştiğinde preview'i güncelle
    if (field === "imageSrc") {
      setPreviewUrl(value as string);
      setSelectedFile(null); // URL girildiğinde seçili dosyayı temizle
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFormData((prev) => ({
        ...prev,
        imageSrc: "", // Dosya seçildiğinde URL'i temizle
      }));

      // Önizleme oluştur
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", selectedFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      const result = await response.json();

      if (result.success) {
        setFormData((prev) => ({
          ...prev,
          imageSrc: result.url,
        }));
        setSelectedFile(null);
        toaster.success("Görsel başarıyla yüklendi");
      } else {
        toaster.error(result.error || "Görsel yüklenirken bir hata oluştu");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toaster.error("Görsel yüklenirken bir hata oluştu");
    } finally {
      setIsUploading(false);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setFormData((prev) => ({
      ...prev,
      imageSrc: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

          {/* Görsel Yükleme Bölümü */}
          <div className="space-y-4">
            <Label>Görsel</Label>

            {/* Görsel Önizlemesi */}
            {previewUrl && (
              <div className="relative">
                <div className="w-full max-w-md h-48 relative rounded-lg border overflow-hidden">
                  <Image
                    src={previewUrl}
                    alt="Önizleme"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 448px"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 z-10"
                  onClick={clearFile}
                >
                  <FiX className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Dosya Yükleme */}
            <div className="space-y-2">
              <Label htmlFor="fileInput">Dosya Seç</Label>
              <div className="flex gap-2">
                <Input
                  ref={fileInputRef}
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleUpload}
                  disabled={!selectedFile || isUploading}
                >
                  {isUploading ? (
                    "Yükleniyor..."
                  ) : (
                    <>
                      <FiUpload className="mr-2 h-4 w-4" />
                      Yükle
                    </>
                  )}
                </Button>
              </div>
              {selectedFile && (
                <p className="text-sm text-gray-600">
                  Seçilen dosya: {selectedFile.name} (
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            {/* URL Input */}
            <div className="space-y-2">
              <Label htmlFor="imageSrc">veya Resim URL Gir</Label>
              <Input
                id="imageSrc"
                value={formData.imageSrc}
                onChange={(e) => handleInputChange("imageSrc", e.target.value)}
                placeholder="https://example.com/image.jpg"
                disabled={!!selectedFile}
              />
            </div>
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
            <Button
              type="submit"
              disabled={isLoading || (!formData.imageSrc && !selectedFile)}
            >
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
