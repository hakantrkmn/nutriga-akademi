"use client";

import EgitimContent from "@/components/courses/detail/egitimContent";
import EgitimDetailHero from "@/components/courses/detail/egitimDetailHero";
import EgitimPrice from "@/components/courses/detail/egitimPrice";
import { egitimlerApi } from "@/lib/api";
import { Egitim } from "@/types";
import { generateSlug } from "@/utils";
import {
  Box,
  Button,
  Container,
  Grid,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import EgitimSettings from "./EgitimSettings";
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
            console.error("Eğitim verileri yüklenemedi");
            router.push("/admin/egitimler");
          }
        } catch (error) {
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
        console.log(
          isEditing.current ? "Eğitim güncellendi" : "Eğitim oluşturuldu"
        );
        router.push("/admin/egitimler");
      } else {
        console.error("İşlem başarısız:", response.error);
      }
    } catch (error) {
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
  };

  // İptal
  const handleCancel = () => {
    router.push("/admin/egitimler");
  };

  if (loadingData) {
    return (
      <Box>
        <VStack gap={6} align="stretch">
          <HStack justify="space-between" align="center">
            <Box>
              <Heading size="lg" color="gray.900">
                Eğitim Yükleniyor...
              </Heading>
              <Text color="gray.600">
                Eğitim verileri yükleniyor, lütfen bekleyin
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh">
      {/* Admin Header */}
      <Box
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.100"
        shadow="sm"
      >
        <Container
          maxW="1200px"
          px={{ base: 4, md: 6 }}
          py={{ base: 4, md: 6 }}
        >
          <HStack justify="space-between" align="center">
            <Box>
              <Heading size="lg" color="gray.900">
                {isEditing.current ? "Eğitim Düzenle" : "Yeni Eğitim Ekle"}
              </Heading>
              <Text color="gray.600">
                {isEditing.current
                  ? "Eğitim bilgilerini düzenleyin"
                  : "Yeni bir eğitim oluşturun"}
              </Text>
            </Box>
            <HStack gap={3}>
              <Button variant="outline" onClick={handleCancel}>
                <Icon as={FiArrowLeft} mr={2} />
                Geri Dön
              </Button>
              <Button
                colorScheme="green"
                onClick={handleSave}
                loading={loading}
                loadingText="Kaydediliyor..."
              >
                <Icon as={FiSave} mr={2} />
                Kaydet
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>
      <EgitimDetailHero
        key={egitimId}
        egitim={formData}
        isImageError={false}
        setIsImageError={() => {}}
      />

      {/* Main Content */}
      <Container maxW="1200px" px={{ base: 4, md: 6 }} py={{ base: 8, md: 12 }}>
        <VStack gap={8} align="stretch">
          {/* Top Grid: Editor and Preview */}
          <Grid
            templateColumns={{ base: "1fr", lg: "2.5fr 1.5fr" }}
            gap={{ base: 12, lg: 10 }}
          >
            {/* Left Column: Editor */}
            <EgitimContent
              egitim={formData}
              isEditing={true}
              setFormData={setFormData}
            />

            {/* Right Column: Preview & Settings */}
            <EgitimPrice egitim={formData} />
          </Grid>

          {/* Bottom: Settings */}
          <EgitimSettings
            formData={formData}
            setFormData={setFormData}
            generateSlug={generateSlug}
            handleImageUpload={handleImageUpload}
            uploading={uploading}
            uploadedImage={uploadedImage || ""}
          />
        </VStack>
        {/* JSON Kaydet Butonu */}
        <Box mt={8} textAlign="center">
          <Button
            variant="outline"
            colorScheme="blue"
            onClick={handleSaveAsJSON}
            size="lg"
            borderRadius="12px"
            px={8}
            py={6}
            fontSize="md"
            fontWeight="semibold"
            _hover={{
              bg: "blue.50",
              borderColor: "blue.300",
              transform: "translateY(-1px)",
              shadow: "md",
            }}
            transition="all 0.2s ease"
          >
            <Icon as={FiSave} mr={3} />
            JSON Olarak Kaydet
          </Button>
          <Text fontSize="sm" color="gray.500" mt={2}>
            Editör içeriğini JSON dosyası olarak bilgisayarınıza indirin
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
