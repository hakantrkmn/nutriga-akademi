"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Egitim } from "@/types";

interface EgitimSettingsProps {
  formData: Egitim;
  setFormData: (formData: Egitim) => void;
  generateSlug: (title: string) => string;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
  uploadedImage: string;
}

export default function EgitimSettings({
  formData,
  setFormData,
  generateSlug,
  handleImageUpload,
  uploading,
  uploadedImage,
}: EgitimSettingsProps) {
  return (
    <Card className="w-full shadow-sm bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900 font-semibold">
          Eğitim Ayarları
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="title"
            className="text-sm font-semibold text-gray-700"
          >
            Eğitim Başlığı
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => {
              const title = e.target.value;
              setFormData({
                ...formData,
                title,
                slug: generateSlug(title),
              });
            }}
            placeholder="Eğitim başlığını girin..."
            className="focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="text-sm font-semibold text-gray-700"
          >
            Açıklama
          </Label>
          <Input
            id="description"
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Eğitim açıklamasını girin..."
            className="focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="price"
            className="text-sm font-semibold text-gray-700"
          >
            Fiyat (₺)
          </Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                price: parseFloat(e.target.value) || 0,
              })
            }
            placeholder="299"
            className="focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="category"
            className="text-sm font-semibold text-gray-700"
          >
            Kategori
          </Label>
          <Select
            value={formData.category || ""}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger className="focus:border-green-500 focus:ring-1 focus:ring-green-500">
              <SelectValue placeholder="Kategori seçin..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Temel Beslenme">Temel Beslenme</SelectItem>
              <SelectItem value="Klinik Beslenme">Klinik Beslenme</SelectItem>
              <SelectItem value="Sporcu Beslenmesi">
                Sporcu Beslenmesi
              </SelectItem>
              <SelectItem value="Pediatrik Beslenme">
                Pediatrik Beslenme
              </SelectItem>
              <SelectItem value="Geriatrik Beslenme">
                Geriatrik Beslenme
              </SelectItem>
              <SelectItem value="Beslenme Danışmanlığı">
                Beslenme Danışmanlığı
              </SelectItem>
              <SelectItem value="Fonksiyonel Beslenme">
                Fonksiyonel Beslenme
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="level"
            className="text-sm font-semibold text-gray-700"
          >
            Seviye
          </Label>
          <Select
            value={formData.level || ""}
            onValueChange={(value) =>
              setFormData({ ...formData, level: value })
            }
          >
            <SelectTrigger className="focus:border-green-500 focus:ring-1 focus:ring-green-500">
              <SelectValue placeholder="Seviye seçin..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Başlangıç">Başlangıç</SelectItem>
              <SelectItem value="Orta">Orta</SelectItem>
              <SelectItem value="İleri">İleri</SelectItem>
              <SelectItem value="Uzman">Uzman</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="instructor"
            className="text-sm font-semibold text-gray-700"
          >
            Eğitmen
          </Label>
          <Input
            id="instructor"
            value={formData.instructor || ""}
            onChange={(e) =>
              setFormData({ ...formData, instructor: e.target.value })
            }
            placeholder="Dr. Ahmet Yılmaz"
            className="focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug" className="text-sm font-semibold text-gray-700">
            Slug
          </Label>
          <Input
            id="slug"
            value={formData.slug || ""}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="egitim-slug"
            className="focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">
            Eğitim Görseli
          </Label>
          <div className="space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="image-upload"
            />
            <Button
              variant="outline"
              disabled={uploading}
              onClick={() => document.getElementById("image-upload")?.click()}
              className="w-full border-green-300 text-green-600 hover:bg-green-50 hover:border-green-500"
            >
              {uploading
                ? "Yükleniyor..."
                : uploadedImage
                ? "Görseli Değiştir"
                : "Görsel Yükle"}
            </Button>
            {uploadedImage && (
              <div className="space-y-2">
                <p className="text-xs text-green-600">✓ Görsel yüklendi</p>
                <img
                  src={uploadedImage}
                  alt="Eğitim görseli"
                  className="w-full h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
