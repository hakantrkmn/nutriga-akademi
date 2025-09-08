"use client";

import { blogApi } from "@/lib/api";
import { BlogPost } from "@/types";
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
export default function BlogManagement() {
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Blog yazılarını yükle
  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      const response = await blogApi.getAll();

      if (response.success && response.data) {
        setBlogPosts(response.data);
      } else {
        toaster.error("Blog yazıları yüklenemedi");
        console.error("Blog yazıları yüklenemedi:", response.error);
      }
    } catch (error) {
      toaster.error("Blog yazıları yüklenirken bir hata oluştu");
      console.error("Blog yazıları yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogPosts();
  }, []);

  // Yeni blog yazısı ekle
  const handleAddPost = () => {
    router.push("/admin/blog/yeni");
  };

  // Blog yazısı düzenle
  const handleEditPost = (post: BlogPost) => {
    if (post.id) {
      router.push(`/admin/blog/yeni/${post.id}`);
    }
  };

  // Blog yazısı sil
  const handleDeletePost = async (id: string) => {
    try {
      const response = await blogApi.delete(id);

      if (response.success) {
        await loadBlogPosts(); // Listeyi yenile
        toaster.success("Blog yazısı başarıyla silindi");
      } else {
        toaster.error("Blog yazısı silinemedi");
        console.error("Blog yazısı silinemedi");
      }
    } catch (error) {
      toaster.error("Blog yazısı silinirken bir hata oluştu");
      console.error("Blog yazısı silinirken hata:", error);
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
                Blog Yönetimi
              </Heading>
              <Text color="gray.600">
                Blog yazılarınızı ekleyin, düzenleyin ve yönetin
              </Text>
            </Box>
            <Button colorScheme="green" onClick={handleAddPost}>
              <Icon as={FiPlus} mr={2} />
              Yeni Blog Yazısı
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
                    Blog yazıları yükleniyor...
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
              Blog Yönetimi
            </Heading>
            <Text color="gray.600">
              Blog yazılarınızı ekleyin, düzenleyin ve yönetin
            </Text>
          </Box>
          <Button colorScheme="green" onClick={handleAddPost}>
            <Icon as={FiPlus} mr={2} />
            Yeni Blog Yazısı
          </Button>
        </HStack>

        {/* Blog Yazıları Tablosu */}
        <Card.Root
          bg="white"
          borderRadius="lg"
          boxShadow="sm"
          className="admin-table-container"
          style={{ backgroundColor: "white !important" }}
        >
          <Card.Body p={0} style={{ backgroundColor: "white !important" }}>
            <Table.Root
              size="sm"
              className="admin-table"
              style={{ backgroundColor: "white !important" }}
            >
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
                    Yazar
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    color="gray.700"
                    fontWeight="semibold"
                    fontSize="sm"
                    py={4}
                    px={6}
                  >
                    Özet
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
              <Table.Body backgroundColor={"white !important"}>
                {blogPosts.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={6} textAlign="center" py={12}>
                      <VStack gap={3}>
                        <Text color="gray.500" fontSize="lg">
                          Henüz blog yazısı eklenmemiş
                        </Text>
                        <Text color="gray.400" fontSize="sm">
                          İlk blog yazınızı eklemek için &quot;Yeni Blog
                          Yazısı&quot; butonuna tıklayın
                        </Text>
                      </VStack>
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  blogPosts.map((post, index) => (
                    <Table.Row
                      key={post.id}
                      bg={index % 2 === 0 ? "white" : "gray.25"}
                      _hover={{ bg: "gray.50" }}
                      style={{
                        backgroundColor:
                          index % 2 === 0
                            ? "white !important"
                            : "#fafafa !important",
                      }}
                    >
                      <Table.Cell
                        py={4}
                        px={6}
                        style={{ backgroundColor: "transparent !important" }}
                      >
                        <VStack align="start" gap={1}>
                          <Text fontWeight="medium" color="gray.900">
                            {post.title}
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            /{post.slug}
                          </Text>
                        </VStack>
                      </Table.Cell>
                      <Table.Cell
                        py={4}
                        px={6}
                        style={{ backgroundColor: "transparent !important" }}
                      >
                        {post.category ? (
                          <Badge colorScheme="purple" variant="subtle">
                            {post.category}
                          </Badge>
                        ) : (
                          <Text color="gray.400">-</Text>
                        )}
                      </Table.Cell>
                      <Table.Cell
                        py={4}
                        px={6}
                        style={{ backgroundColor: "transparent !important" }}
                      >
                        <Text fontSize="sm" color="gray.700">
                          {post.author || "-"}
                        </Text>
                      </Table.Cell>
                      <Table.Cell
                        py={4}
                        px={6}
                        style={{ backgroundColor: "transparent !important" }}
                      >
                        <Text fontSize="sm" color="gray.600" maxW="200px">
                          {post.excerpt || "-"}
                        </Text>
                      </Table.Cell>
                      <Table.Cell
                        py={4}
                        px={6}
                        style={{ backgroundColor: "transparent !important" }}
                      >
                        <Text fontSize="sm" color="gray.500">
                          {post.createdAt
                            ? new Date(post.createdAt).toLocaleDateString(
                                "tr-TR"
                              )
                            : "-"}
                        </Text>
                      </Table.Cell>
                      <Table.Cell
                        py={4}
                        px={6}
                        textAlign="center"
                        style={{ backgroundColor: "transparent !important" }}
                      >
                        <HStack gap={2} justify="center">
                          <Button
                            size="sm"
                            variant="outline"
                            colorScheme="blue"
                            onClick={() => handleEditPost(post)}
                          >
                            <Icon as={FiEdit} />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            colorScheme="red"
                            onClick={() => post.id && handleDeletePost(post.id)}
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
