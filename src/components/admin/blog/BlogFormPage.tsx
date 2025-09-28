"use client";

import BlogInfoEdit from "@/components/admin/blog/BlogInfoEdit";
import BlogDetailHeader from "@/components/blog/detail/BlogDetailHeader";
import BlogDetailContentTipTap from "@/components/blog/detail/BlogDetailTipTapSection";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { toaster } from "@/components/ui/toaster";
import { blogApi } from "@/lib/api";
import { BlogPost } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiSave } from "react-icons/fi";

export default function BlogFormPage({ blogId }: { blogId?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [, setInitialData] = useState<BlogPost | null>(null);
  const [loadingData, setLoadingData] = useState(!!blogId);

  // Form state
  const [formData, setFormData] = useState<BlogPost>({
    title: "",
    excerpt: "",
    isActive: true,
    content: null as object | null,
    slug: "",
    category: "Genel",
    author: "Admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    id: "",
    imageUrl: "",
  });

  // Görsel yükleme state'i
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const isEditing = !!blogId;

  // Blog verilerini yükle (düzenleme modunda)
  useEffect(() => {
    if (blogId) {
      const loadBlogData = async () => {
        try {
          console.log("Blog verileri yükleniyor:", blogId);
          setLoadingData(true);
          const response = await blogApi.getById(blogId);

          if (response.success && response.data) {
            setInitialData(response.data);
            setFormData(response.data);
            setUploadedImage(response.data.imageUrl || null);
          } else {
            toaster.error("Blog verileri yüklenemedi");
            console.error("Blog verileri yüklenemedi");
            router.push("/admin/blog");
          }
        } catch (error) {
          toaster.error("Blog verileri yüklenirken bir hata oluştu.");
          console.error("Blog verileri yüklenirken hata:", error);
          router.push("/admin/blog");
        } finally {
          setLoadingData(false);
        }
      };

      loadBlogData();
    }
  }, [blogId, router]);

  // Form kaydetme
  const handleSave = async () => {
    try {
      setLoading(true);
      const data = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: JSON.stringify(formData.content),
        imageUrl: uploadedImage || "",
        slug: formData.slug,
        category: formData.category,
        author: formData.author,
      };

      let response;

      if (isEditing && blogId) {
        // Güncelle
        response = await blogApi.update(blogId, data);
      } else {
        // Yeni oluştur
        response = await blogApi.create(
          data as Omit<BlogPost, "id" | "createdAt" | "updatedAt">
        );
      }

      if (response.success) {
        toaster.success(
          isEditing ? "Blog yazısı güncellendi" : "Blog yazısı oluşturuldu"
        );
        router.push("/admin/blog");
      } else {
        toaster.error(`İşlem başarısız: ${response.error}`);
        console.error("İşlem başarısız:", response.error);
      }
    } catch (error) {
      toaster.error("Kaydetme hatası:");
      console.error("Kaydetme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  // Görsel yükleme fonksiyonu
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Dosya boyutunu kontrol et (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toaster.error("Dosya boyutu 10MB'dan küçük olmalıdır");
      return;
    }

    // Dosya türünü kontrol et
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      toaster.error("Sadece JPG, PNG, GIF, WebP ve SVG dosyaları yüklenebilir");
      return;
    }

    try {
      setUploading(true);

      // FormData oluştur
      const newformData = new FormData();
      newformData.append("file", file);

      // Upload API'sine gönder
      const response = await fetch("/api/upload", {
        method: "POST",
        body: newformData,
      });

      const result = await response.json();

      if (result.success) {
        const updatedFormData = { ...formData, imageUrl: result.url };
        setFormData(updatedFormData);
        toaster.success("Görsel başarıyla yüklendi!");
        setUploadedImage(result.url);
      } else {
        toaster.error(`Upload hatası: ${result.error}`);
      }
    } catch (error) {
      console.error("Upload hatası:", error);
      toaster.error("Dosya yüklenirken bir hata oluştu");
    } finally {
      setUploading(false);
    }
  };

  // İptal
  const handleCancel = () => {
    router.push("/admin/blog");
  };

  if (loadingData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Blog Yükleniyor...
              </h1>
              <p className="text-gray-600">
                Blog verileri yükleniyor, lütfen bekleyin
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <div className="space-y-8">
          {/* Header */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <CardTitle className="text-2xl text-gray-900">
                    {isEditing
                      ? "Blog Yazısı Düzenle"
                      : "Yeni Blog Yazısı Ekle"}
                  </CardTitle>
                  <p className="text-gray-600 mt-1">
                    {isEditing
                      ? "Blog yazısı bilgilerini düzenleyin"
                      : "Yeni bir blog yazısı oluşturun"}
                  </p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <Button variant="outline" onClick={handleCancel} size="sm">
                    <FiArrowLeft className="mr-2 h-4 w-4" />
                    Geri Dön
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={loading}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <FiSave className="mr-2 h-4 w-4" />
                    {loading
                      ? "Kaydediliyor..."
                      : isEditing
                        ? "Güncelle"
                        : "Kaydet"}
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Blog Bilgileri - Üstte */}
          <BlogInfoEdit
            formData={formData}
            setFormData={setFormData}
            handleImageUpload={handleImageUpload}
            uploading={uploading}
            uploadedImage={uploadedImage}
          />
          <BlogDetailHeader
            key={formData.id} // formData değiştiğinde key değişir, component re-render olur
            post={formData}
          />

          {/* İçerik Editor - Tam genişlik */}
          <BlogDetailContentTipTap
            isEditing={true}
            content={formData.content as object}
            setFormData={setFormData}
            formData={formData}
          />
        </div>
      </div>
    </div>
  );
}
