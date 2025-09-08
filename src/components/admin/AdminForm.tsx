"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { FiSave, FiX } from "react-icons/fi";
import TipTapEditor from "./TipTapEditor";

interface AdminFormProps {
  type: "egitim" | "blog";
  initialData?: Record<string, unknown>;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export default function AdminForm({
  type,
  initialData,
  onSave,
  onCancel,
  loading = false,
}: AdminFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    imageUrl: "",
    slug: "",
    price: 0,
    category: "",
    excerpt: "",
    author: "",
  });
  const [content, setContent] = useState<object | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: (initialData.title as string) || "",
        description: (initialData.description as string) || "",
        content: "",
        imageUrl:
          (initialData.imageUrl as string) ||
          (initialData.image_url as string) ||
          "",
        slug: (initialData.slug as string) || "",
        price: (initialData.price as number) || 0,
        category: (initialData.category as string) || "",
        excerpt: (initialData.excerpt as string) || "",
        author: (initialData.author as string) || "",
      });
      // TipTap content'i JSON olarak parse et
      try {
        const contentData = initialData.content;
        if (typeof contentData === "string") {
          // Eğer string ise, JSON parse etmeye çalış
          try {
            setContent(JSON.parse(contentData));
          } catch {
            // JSON değilse, basit bir paragraph olarak oluştur
            setContent({
              type: "doc",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: contentData,
                    },
                  ],
                },
              ],
            });
          }
        } else if (typeof contentData === "object" && contentData !== null) {
          setContent(contentData);
        } else {
          setContent(null);
        }
      } catch (error) {
        console.error("Content parse hatası:", error);
        setContent(null);
      }
    }
  }, [initialData]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: generateSlug(value),
    }));
  };

  const handleSave = async () => {
    try {
      const dataToSave = {
        ...formData,
        content: content ? JSON.stringify(content) : "",
        imageUrl: formData.imageUrl,
        slug: formData.slug || generateSlug(formData.title),
      };

      await onSave(dataToSave);
      toaster.success(
        `${type === "egitim" ? "Eğitim" : "Blog yazısı"} başarıyla kaydedildi.`
      );
    } catch (error) {
      toaster.error("Kaydetme işlemi başarısız oldu.");
      console.error("Kaydetme hatası:", error);
    }
  };

  const isEgitim = type === "egitim";
  const isBlog = type === "blog";

  return (
    <Card className="max-w-6xl mx-auto h-full">
      <CardContent className="p-6">
        <div className="space-y-6 h-full">
          {/* Header - Sadece fullscreen değilse göster */}
          <div className="block lg:hidden">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {initialData ? "Düzenle" : "Yeni Ekle"} -{" "}
              {isEgitim ? "Eğitim" : "Blog Yazısı"}
            </h2>
            <p className="text-gray-600">
              {isEgitim
                ? "Yeni bir eğitim ekleyin veya mevcut eğitimi düzenleyin."
                : "Yeni bir blog yazısı ekleyin veya mevcut yazıyı düzenleyin."}
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 flex-1 overflow-auto">
            {/* Title */}
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-medium text-gray-800"
              >
                Başlık *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder={
                  isEgitim ? "Eğitim başlığı" : "Blog yazısı başlığı"
                }
                required
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label
                htmlFor="slug"
                className="text-sm font-medium text-gray-800"
              >
                URL Slug *
              </Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                placeholder="url-slug"
                required
              />
              <p className="text-xs text-gray-500">
                URL: /{isEgitim ? "egitimler" : "blog"}/
                {formData.slug || "url-slug"}
              </p>
            </div>

            {/* Description (Eğitim için) */}
            {isEgitim && (
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-800"
                >
                  Açıklama
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Eğitim açıklaması"
                  rows={3}
                />
              </div>
            )}

            {/* Excerpt (Blog için) */}
            {isBlog && (
              <div className="space-y-2">
                <Label
                  htmlFor="excerpt"
                  className="text-sm font-medium text-gray-800"
                >
                  Özet
                </Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      excerpt: e.target.value,
                    }))
                  }
                  placeholder="Blog yazısı özeti"
                  rows={3}
                />
              </div>
            )}

            {/* Author (Blog için) */}
            {isBlog && (
              <div className="space-y-2">
                <Label
                  htmlFor="author"
                  className="text-sm font-medium text-gray-800"
                >
                  Yazar
                </Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, author: e.target.value }))
                  }
                  placeholder="Yazar adı"
                />
              </div>
            )}

            {/* Category */}
            <div className="space-y-2">
              <Label
                htmlFor="category"
                className="text-sm font-medium text-gray-800"
              >
                Kategori
              </Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                placeholder="Kategori girin"
                list="category-list"
              />
              <datalist id="category-list">
                {isEgitim ? (
                  <>
                    <option value="Temel Beslenme" />
                    <option value="Klinik Beslenme" />
                    <option value="Sporcu Beslenmesi" />
                    <option value="Pediatrik Beslenme" />
                    <option value="Geriatrik Beslenme" />
                    <option value="Beslenme Danışmanlığı" />
                    <option value="Fonksiyonel Beslenme" />
                  </>
                ) : (
                  <>
                    <option value="Beslenme Bilimi" />
                    <option value="Diyet Rehberi" />
                    <option value="Sağlıklı Tarifler" />
                    <option value="Sporcu Beslenmesi" />
                    <option value="Çocuk Beslenmesi" />
                    <option value="Yaşlı Beslenmesi" />
                    <option value="Hastalık ve Beslenme" />
                  </>
                )}
              </datalist>
            </div>

            {/* Price (Eğitim için) */}
            {isEgitim && (
              <div className="space-y-2">
                <Label
                  htmlFor="price"
                  className="text-sm font-medium text-gray-800"
                >
                  Fiyat (₺)
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      price: parseFloat(e.target.value) || 0,
                    }))
                  }
                  min={0}
                  step={0.01}
                  placeholder="0.00"
                />
              </div>
            )}

            {/* Image URL */}
            <div className="space-y-2">
              <Label
                htmlFor="imageUrl"
                className="text-sm font-medium text-gray-800"
              >
                Görsel URL
              </Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
                }
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Content Editor */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-800">
                İçerik *
              </Label>
              <TipTapEditor
                content={content}
                onChange={setContent}
                placeholder={
                  isEgitim
                    ? "Eğitim içeriğini buraya yazın..."
                    : "Blog yazısı içeriğini buraya yazın..."
                }
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 flex-shrink-0">
            <Button variant="outline" onClick={onCancel} disabled={loading}>
              <FiX className="mr-2 h-4 w-4" />
              İptal
            </Button>
            <Button
              onClick={handleSave}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700"
            >
              <FiSave className="mr-2 h-4 w-4" />
              {loading
                ? "Kaydediliyor..."
                : initialData
                ? "Güncelle"
                : "Kaydet"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
