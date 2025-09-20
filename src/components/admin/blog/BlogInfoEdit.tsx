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
import { BlogPost } from "@/types";
import Image from "next/image";

interface BlogInfoEditProps {
  formData: BlogPost;
  setFormData: (data: BlogPost) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
  uploadedImage: string | null;
}

import { BLOG_CATEGORIES } from "@/constants";
export default function BlogInfoEdit({
  formData,
  setFormData,
  handleImageUpload,
  uploading,
  uploadedImage,
}: BlogInfoEditProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">Blog Bilgileri</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Başlık */}
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-semibold text-gray-700"
            >
              Blog Başlığı
            </Label>
            <Input
              id="title"
              placeholder="Blog yazısının başlığını girin..."
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label
              htmlFor="slug"
              className="text-sm font-semibold text-gray-700"
            >
              URL Slug
            </Label>
            <Input
              id="slug"
              placeholder="blog-yazisi-slug"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
            />
          </div>

          {/* Kategori */}
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
              <SelectTrigger>
                <SelectValue placeholder="Kategori seçin..." />
              </SelectTrigger>
              <SelectContent>
                {BLOG_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Yazar */}
          <div className="space-y-2">
            <Label
              htmlFor="author"
              className="text-sm font-semibold text-gray-700"
            >
              Yazar
            </Label>
            <Input
              id="author"
              placeholder="Yazar adı"
              value={formData.author || ""}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
            />
          </div>

          {/* Yayın Tarihi */}
          <div className="space-y-2">
            <Label
              htmlFor="date"
              className="text-sm font-semibold text-gray-700"
            >
              Yayın Tarihi
            </Label>
            <Input
              id="date"
              type="date"
              value={
                formData.createdAt
                  ? new Date(formData.createdAt).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  createdAt: new Date(e.target.value),
                })
              }
            />
          </div>

          {/* Görsel Yükleme */}
          <div className="col-span-2 space-y-3">
            <Label className="text-sm font-semibold text-gray-700">
              Blog Görseli
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
                className="w-full"
              >
                {uploading
                  ? "Yükleniyor..."
                  : uploadedImage
                  ? "Görseli Değiştir"
                  : "Görsel Yükle"}
              </Button>
              {uploadedImage && (
                <div className="space-y-2">
                  <p className="text-xs text-primary-600">✓ Görsel yüklendi</p>
                  <Image
                    src={uploadedImage}
                    alt="Blog görseli"
                    width={400}
                    height={128}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Açıklama - Tam genişlik */}
        <div className="space-y-2">
          <Label
            htmlFor="excerpt"
            className="text-sm font-semibold text-gray-700"
          >
            Kısa Açıklama
          </Label>
          <Input
            id="excerpt"
            placeholder="Blog yazısının kısa açıklamasını girin..."
            value={formData.excerpt || ""}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
