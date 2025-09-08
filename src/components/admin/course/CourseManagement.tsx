"use client";

import { egitimlerApi } from "@/lib/api";
import { Egitim } from "@/types";
import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  HStack,
  Heading,
  Icon,
  Spinner,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { toaster } from "@/components/ui/toaster";

export default function EgitimlerManagement() {
  const router = useRouter();
  const [egitimler, setEgitimler] = useState<Egitim[]>([]);
  const [loading, setLoading] = useState(true);

  // Eğitimleri yükle
  const loadEgitimler = async () => {
    try {
      setLoading(true);
      const response = await egitimlerApi.getAll();

      if (response.success && response.data) {
        setEgitimler(response.data);
      } else {
        toaster.error("Eğitimler yüklenemedi");
        console.error("Eğitimler yüklenemedi:", response.error);
      }
    } catch (error) {
      toaster.error("Eğitimler yüklenirken bir hata oluştu");
      console.error("Eğitimler yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEgitimler();
  }, []);

  // Yeni eğitim ekle
  const handleAddEgitim = () => {
    router.push("/admin/egitimler/course");
  };

  // Eğitim düzenle
  const handleEditEgitim = (egitim: Egitim) => {
    if (egitim.id) {
      router.push(`/admin/egitimler/course/${egitim.id}`);
    }
  };

  // Eğitim sil
  const handleDeleteEgitim = async (id: string) => {
    try {
      const response = await egitimlerApi.delete(id);

      if (response.success) {
        await loadEgitimler(); // Listeyi yenile
        toaster.success("Eğitim başarıyla silindi");
      } else {
        toaster.error("Eğitim silinemedi");
        console.error("Eğitim silinemedi");
      }
    } catch (error) {
      toaster.error("Eğitim silinirken bir hata oluştu");
      console.error("Eğitim silinirken hata:", error);
    }
  };

  if (loading) {
    return (
      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6 }} py={{ base: 6, md: 8 }}>
        <VStack gap={6} align="stretch">
          {/* Header */}
          <HStack justify="space-between" align="center">
            <Box>
              <Heading size="lg" color="gray.900">
                Eğitimler Yönetimi
              </Heading>
              <Text color="gray.600">
                Eğitimlerinizi ekleyin, düzenleyin ve yönetin
              </Text>
            </Box>
            <Button colorScheme="green" onClick={handleAddEgitim}>
              <Icon as={FiPlus} mr={2} />
              Yeni Eğitim
            </Button>
          </HStack>

          {/* Loading State */}
          <Card.Root className="loading-container">
            <Card.Body>
              <Center py={20}>
                <VStack gap={4}>
                  <Spinner
                    size="xl"
                    color="green.500"
                    className="loading-spinner"
                  />
                  <Text color="gray.600" fontSize="lg" className="loading-text">
                    Eğitimler yükleniyor...
                  </Text>
                </VStack>
              </Center>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Box>
    );
  }

  return (
    <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6 }} py={{ base: 6, md: 8 }}>
      <VStack gap={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between" align="center">
          <Box>
            <Heading size="lg" color="gray.900">
              Eğitimler Yönetimi
            </Heading>
            <Text color="gray.600">
              Eğitimlerinizi ekleyin, düzenleyin ve yönetin
            </Text>
          </Box>
          <Button colorScheme="green" onClick={handleAddEgitim}>
            <Icon as={FiPlus} mr={2} />
            Yeni Eğitim
          </Button>
        </HStack>

        {/* Eğitimler Tablosu */}
        <Card.Root
          bg="white"
          borderRadius="lg"
          boxShadow="sm"
          className="admin-table-container"
        >
          <Card.Body p={0}>
            <Table.Root size="sm" className="admin-table">
              <Table.Header>
                <Table.Row bg="gray.50" className="admin-table-header-row">
                  <Table.ColumnHeader
                    color="gray.700"
                    fontWeight="semibold"
                    fontSize="sm"
                    py={4}
                    px={6}
                  >
                    Başlık
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    color="gray.700"
                    fontWeight="semibold"
                    fontSize="sm"
                    py={4}
                    px={6}
                  >
                    Kategori
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    color="gray.700"
                    fontWeight="semibold"
                    fontSize="sm"
                    py={4}
                    px={6}
                  >
                    Fiyat
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    color="gray.700"
                    fontWeight="semibold"
                    fontSize="sm"
                    py={4}
                    px={6}
                  >
                    Satış
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    color="gray.700"
                    fontWeight="semibold"
                    fontSize="sm"
                    py={4}
                    px={6}
                  >
                    Tarih
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    color="gray.700"
                    fontWeight="semibold"
                    fontSize="sm"
                    py={4}
                    px={6}
                    textAlign="center"
                  >
                    İşlemler
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {egitimler.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={6} textAlign="center" py={12}>
                      <VStack gap={3}>
                        <Text color="gray.500" fontSize="lg">
                          Henüz eğitim eklenmemiş
                        </Text>
                        <Text color="gray.400" fontSize="sm">
                          İlk eğitiminizi eklemek için &quot;Yeni Eğitim&quot;
                          butonuna tıklayın
                        </Text>
                      </VStack>
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  egitimler.map((egitim, index) => (
                    <Table.Row
                      key={egitim.id}
                      bg={index % 2 === 0 ? "white" : "gray.25"}
                      _hover={{ bg: "gray.50" }}
                    >
                      <Table.Cell py={4} px={6}>
                        <VStack align="start" gap={1}>
                          <Text fontWeight="medium" color="gray.900">
                            {egitim.title}
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            /{egitim.slug}
                          </Text>
                        </VStack>
                      </Table.Cell>
                      <Table.Cell py={4} px={6}>
                        {egitim.category ? (
                          <Badge colorScheme="blue" variant="subtle">
                            {egitim.category}
                          </Badge>
                        ) : (
                          <Text color="gray.400">-</Text>
                        )}
                      </Table.Cell>
                      <Table.Cell py={4} px={6}>
                        {egitim.price ? (
                          <Text fontWeight="medium" color="green.600">
                            ₺{egitim.price?.toString()}
                          </Text>
                        ) : (
                          <Text color="gray.400">-</Text>
                        )}
                      </Table.Cell>
                      <Table.Cell py={4} px={6}>
                        <Text color="gray.700">{egitim.salesCount || 0}</Text>
                      </Table.Cell>
                      <Table.Cell py={4} px={6}>
                        <Text fontSize="sm" color="gray.500">
                          {egitim.createdAt
                            ? new Date(egitim.createdAt).toLocaleDateString(
                                "tr-TR"
                              )
                            : "-"}
                        </Text>
                      </Table.Cell>
                      <Table.Cell py={4} px={6} textAlign="center">
                        <HStack gap={2} justify="center">
                          <Button
                            size="sm"
                            variant="outline"
                            colorScheme="blue"
                            onClick={() => handleEditEgitim(egitim)}
                          >
                            <Icon as={FiEdit} />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            colorScheme="red"
                            onClick={() =>
                              egitim.id && handleDeleteEgitim(egitim.id)
                            }
                          >
                            <Icon as={FiTrash2} />
                          </Button>
                        </HStack>
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table.Root>
          </Card.Body>
        </Card.Root>
      </VStack>
    </Box>
  );
}
