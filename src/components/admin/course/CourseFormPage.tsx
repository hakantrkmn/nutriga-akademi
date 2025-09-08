"use client";

import EgitimDetailHero from "@/components/courses/detail/CoursesDetailHero";
import EgitimPrice from "@/components/courses/detail/CoursesPriceSection";
import EgitimContent from "@/components/courses/detail/CoursesTiptapSection";
import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster";
import { egitimlerApi } from "@/lib/api";
import { Egitim } from "@/types";
import { generateSlug } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import EgitimSettings from "./CourseSettings";
export default function EgitimFormPage({ egitimId }: { egitimId?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [, setInitialData] = useState<Egitim | null>(null);
  const [loadingData, setLoadingData] = useState(!!egitimId);

  // Form state
  const [formData, setFormData] = useState<Egitim>({
    title: "",
    description: "",
    content: null as object | null,
    imageUrl: "",
    slug: "",
    price: 299,
    category: "Temel Beslenme",
    level: "Başlangıç",
    instructor: "Dr. Ahmet Yılmaz",
    salesCount: 156,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: "",
  });

  // Görsel yükleme state'i
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const isEditing = useRef(false);

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
  // Eğitim verilerini yükle (düzenleme modunda)
  useEffect(() => {
    if (egitimId) {
      const loadEgitimData = async () => {
        try {
          setLoadingData(true);
          const response = await egitimlerApi.getById(egitimId);

          if (response.success && response.data) {
            isEditing.current = true;
            setInitialData(response.data);
            setFormData(response.data);
            setUploadedImage(response.data.imageUrl || null);
          } else {
            toaster.error("Eğitim verileri yüklenemedi");
            console.error("Eğitim verileri yüklenemedi");
            router.push("/admin/egitimler");
          }
        } catch (error) {
          toaster.error("Eğitim verileri yüklenirken bir hata oluştu.");
          console.error("Eğitim verileri yüklenirken hata:", error);
          router.push("/admin/egitimler");
        } finally {
          setLoadingData(false);
        }
      };

      loadEgitimData();
    }
  }, [egitimId, router]);

  // Form kaydetme
  const handleSave = async () => {
    try {
      setLoading(true);
      const data = {
        ...formData,
        imageUrl: uploadedImage || "",
        content: JSON.stringify(formData.content),
      };

      let response;

      if (isEditing.current && egitimId) {
        // Güncelle
        response = await egitimlerApi.update(egitimId, data);
      } else {
        // Yeni oluştur
        response = await egitimlerApi.create(
          data as Omit<Egitim, "id" | "createdAt" | "updatedAt">
        );
      }

      if (response.success) {
        toaster.success(
          isEditing.current ? "Eğitim güncellendi" : "Eğitim oluşturuldu"
        );
        router.push("/admin/egitimler");
      } else {
        toaster.error(`İşlem başarısız: ${response.error}`);
        console.error("İşlem başarısız:", response.error);
      }
    } catch (error) {
      toaster.error("Kaydetme hatası");
      console.error("Kaydetme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  // JSON olarak kaydetme fonksiyonu
  const handleSaveAsJSON = () => {
    const dataToSave = {
      ...formData,
      content: formData.content,
    };

    const jsonString = JSON.stringify(dataToSave, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `egitim-${formData.slug || "yeni"}-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toaster.success("Eğitim JSON olarak başarıyla indirildi!");
  };

  // İptal
  const handleCancel = () => {
    router.push("/admin/egitimler");
  };

  if (loadingData) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Eğitim Yükleniyor...
              </h1>
              <p className="text-gray-600">
                Eğitim verileri yükleniyor, lütfen bekleyin
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEditing.current ? "Eğitim Düzenle" : "Yeni Eğitim Ekle"}
              </h1>
              <p className="text-gray-600">
                {isEditing.current
                  ? "Eğitim bilgilerini düzenleyin"
                  : "Yeni bir eğitim oluşturun"}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleCancel}>
                <FiArrowLeft className="mr-2 h-4 w-4" />
                Geri Dön
              </Button>
              <Button
                onClick={handleSave}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700"
              >
                <FiSave className="mr-2 h-4 w-4" />
                {loading ? "Kaydediliyor..." : "Kaydet"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <EgitimDetailHero
        key={egitimId}
        egitim={formData}
        isImageError={false}
        setIsImageError={() => {}}
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="space-y-8">
          {/* Top Grid: Editor and Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1.5fr] gap-8 lg:gap-10">
            {/* Left Column: Editor */}
            <EgitimContent
              egitim={formData}
              isEditing={true}
              setFormData={setFormData}
            />

            {/* Right Column: Preview & Settings */}
            <EgitimPrice egitim={formData} />
          </div>

          {/* Bottom: Settings */}
          <EgitimSettings
            formData={formData}
            setFormData={setFormData}
            generateSlug={generateSlug}
            handleImageUpload={handleImageUpload}
            uploading={uploading}
            uploadedImage={uploadedImage || ""}
          />
        </div>
        {/* JSON Kaydet Butonu */}
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={handleSaveAsJSON}
            size="lg"
            className="px-8 py-6 text-base font-semibold hover:bg-blue-50 hover:border-blue-300 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
          >
            <FiSave className="mr-3 h-4 w-4" />
            JSON Olarak Kaydet
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            Editör içeriğini JSON dosyası olarak bilgisayarınıza indirin
          </p>
        </div>
      </div>
    </div>
  );
}
