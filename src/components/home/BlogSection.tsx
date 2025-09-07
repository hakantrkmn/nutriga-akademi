"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Badge,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { dummyBlogPosts } from "@/data/dummyBlogData";
import BlogCard from "@/components/blog/BlogCard";

export default function BlogSection() {
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  // En son blog yazılarını al (created_at'e göre sırala)
  const latestBlogPosts = dummyBlogPosts
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 6);

  return (
    <Box py={{ base: 16, md: 20 }} bg="gray.50">
      <Container maxW="container.xl">
        <VStack gap={12} align="center">
          {/* Section Header */}
          <VStack gap={4} textAlign="center" maxW="600px">
            <Badge
              colorScheme="orange"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
              fontWeight="semibold"
            >
              Son Blog Yazıları
            </Badge>
            
            <Heading
              as="h2"
              size={{ base: "xl", md: "2xl" }}
              color="gray.800"
              fontWeight="bold"
            >
              Beslenme ve Sağlık
              <Text as="span" color="orange.500" display="block">
                Blog Yazıları
              </Text>
            </Heading>
            
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.600"
              lineHeight="1.6"
            >
              Uzman diyetisyenlerimizden güncel beslenme önerileri, sağlık ipuçları
              ve beslenme bilimindeki son gelişmeleri keşfedin.
            </Text>
          </VStack>

          {/* Blog Grid */}
          <SimpleGrid
            columns={columns}
            gap={{ base: 6, md: 8 }}
            w="full"
            maxW="1200px"
          >
            {latestBlogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </SimpleGrid>

          {/* View All Button */}
          <VStack gap={4}>
            <Text color="gray.600" fontSize="md">
              Tüm blog yazılarımızı okumak ister misiniz?
            </Text>
            <Link href="/blog">
              <Button
                size="lg"
                colorScheme="orange"
                variant="outline"
                borderRadius="12px"
                px={8}
                py={6}
                fontSize="md"
                fontWeight="semibold"
                borderWidth="2px"
                _hover={{
                  bg: "orange.500",
                  color: "white",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(255, 152, 0, 0.3)",
                }}
                _active={{
                  transform: "translateY(0)",
                }}
                transition="all 0.3s ease"
              >
                Tüm Blog Yazılarını Görüntüle
              </Button>
            </Link>
          </VStack>

          {/* Newsletter Section */}
          <Box
            w="full"
            maxW="800px"
            bg="white"
            borderRadius="16px"
            p={{ base: 6, md: 8 }}
            shadow="lg"
            border="1px solid"
            borderColor="gray.200"
          >
            <VStack gap={6} textAlign="center">
              <VStack gap={3}>
                <Heading
                  as="h3"
                  size="lg"
                  color="gray.800"
                  fontWeight="bold"
                >
                  📧 Blog Güncellemeleri
                </Heading>
                <Text color="gray.600" fontSize="md">
                  Yeni blog yazılarımızdan haberdar olmak için e-posta listemize katılın.
                  Haftalık beslenme ipuçları ve özel içerikler sizi bekliyor!
                </Text>
              </VStack>

              <HStack
                gap={3}
                w="full"
                maxW="400px"
                flexDirection={{ base: "column", sm: "row" }}
              >
                <Input
                  type="email"
                  placeholder="E-posta adresiniz"
                  w="full"
                  p={3}
                  border="2px solid"
                  borderColor="gray.200"
                  borderRadius="8px"
                  fontSize="md"
                  _focus={{
                    outline: "none",
                    borderColor: "orange.500",
                  }}
                  _placeholder={{
                    color: "gray.400",
                  }}
                />
                <Button
                  colorScheme="orange"
                  size="md"
                  px={6}
                  borderRadius="8px"
                  fontWeight="semibold"
                  _hover={{
                    transform: "translateY(-1px)",
                  }}
                  _active={{
                    transform: "translateY(0)",
                  }}
                  transition="all 0.2s ease"
                >
                  Abone Ol
                </Button>
              </HStack>

              <Text fontSize="xs" color="gray.500">
                Spam göndermiyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
