"use client";

import BlogInfoEdit from "@/components/admin/blog/BlogInfoEdit";
import BlogDetailHeader from "@/components/blog/detail/BlogDetailHeader";
import BlogDetailContentTipTap from "@/components/blog/detail/BlogDetailTipTapSection";
import { blogApi } from "@/lib/api";
import { BlogPost } from "@/types";
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
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
            console.log("Blog verileri yüklendi:", response.data.content);
            setInitialData(response.data);
            setFormData(response.data);
            setUploadedImage(response.data.imageUrl || null);
          } else {
            console.error("Blog verileri yüklenemedi");
            router.push("/admin/blog");
          }
        } catch (error) {
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
        console.log(
          isEditing ? "Blog yazısı güncellendi" : "Blog yazısı oluşturuldu"
        );
        router.push("/admin/blog");
      } else {
        console.error("İşlem başarısız:", response.error);
      }
    } catch (error) {
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
      alert("Dosya boyutu 10MB'dan küçük olmalıdır");
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
      alert("Sadece JPG, PNG, GIF, WebP ve SVG dosyaları yüklenebilir");
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
        console.log("New imageUrl:", result.url); // ← Sadece yeni URL'yi göster
        setUploadedImage(result.url);
      } else {
        alert(`Upload hatası: ${result.error}`);
      }
    } catch (error) {
      console.error("Upload hatası:", error);
      alert("Dosya yüklenirken bir hata oluştu");
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
      <Container maxW="800px" p={6}>
        <VStack gap={6} align="stretch">
          <HStack justify="space-between" align="center">
            <Box>
              <Heading size="lg" color="gray.900">
                Blog Yükleniyor...
              </Heading>
              <Text color="gray.600">
                Blog verileri yükleniyor, lütfen bekleyin
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Container>
    );
  }

  return (
    <Box bg="white" minH="100vh">
      <Container maxW="800px" px={{ base: 4, md: 6 }} py={8}>
        <VStack gap={8} align="start" w="full">
          {/* Header */}
          <Box
            p={6}
            bg="white"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            shadow="sm"
            w="full"
          >
            <HStack
              justify="space-between"
              align="center"
              flexWrap={{ base: "wrap", md: "nowrap" }}
              gap={4}
            >
              <Box>
                <Heading size="lg" color="gray.900">
                  {isEditing ? "Blog Yazısı Düzenle" : "Yeni Blog Yazısı Ekle"}
                </Heading>
                <Text color="gray.600">
                  {isEditing
                    ? "Blog yazısı bilgilerini düzenleyin"
                    : "Yeni bir blog yazısı oluşturun"}
                </Text>
              </Box>
              <HStack gap={3} flexShrink={0}>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  size={{ base: "sm", md: "md" }}
                >
                  <Icon as={FiArrowLeft} mr={2} />
                  Geri Dön
                </Button>
                <Button
                  colorScheme="green"
                  onClick={handleSave}
                  loading={loading}
                  loadingText="Kaydediliyor..."
                  size={{ base: "sm", md: "md" }}
                >
                  <Icon as={FiSave} mr={2} />
                  {isEditing ? "Güncelle" : "Kaydet"}
                </Button>
              </HStack>
            </HStack>
          </Box>

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
        </VStack>
      </Container>
    </Box>
  );
}
