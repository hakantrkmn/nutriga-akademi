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
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import EgitimCard from "@/components/courses/EgitimCard";
import { Egitim } from "@/types";

interface PopularEgitimlerProps {
  egitimler: Egitim[];
}
export default function PopularEgitimler({ egitimler }: PopularEgitimlerProps) {
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  // En popüler eğitimleri al (sales_count'a göre sırala)
  const popularEgitimler = egitimler
    .sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
    .slice(0, 6);

  return (
    <Box py={{ base: 16, md: 20 }} bg="white">
      <Container maxW="container.xl">
        <VStack gap={12} align="center">
          {/* Section Header */}
          <VStack gap={4} textAlign="center" maxW="600px">
            <Badge
              colorScheme="green"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
              fontWeight="semibold"
            >
              Popüler Eğitimler
            </Badge>
            
            <Heading
              as="h2"
              size={{ base: "xl", md: "2xl" }}
              color="gray.800"
              fontWeight="bold"
            >
              En Çok Tercih Edilen
              <Text as="span" color="green.500" display="block">
                Beslenme Eğitimleri
              </Text>
            </Heading>
            
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.600"
              lineHeight="1.6"
            >
              Uzman diyetisyenlerimiz tarafından hazırlanan, en güncel bilgilerle
              donatılmış eğitimlerimizi keşfedin.
            </Text>
          </VStack>

          {/* Eğitim Grid */}
          <SimpleGrid
            columns={columns}
            gap={{ base: 6, md: 8 }}
            w="full"
            maxW="1200px"
          >
            {popularEgitimler.map((egitim) => (
              <EgitimCard key={egitim.id} egitim={egitim} />
            ))}
          </SimpleGrid>

          {/* View All Button */}
          <VStack gap={4}>
            <Text color="gray.600" fontSize="md">
              Daha fazla eğitim görmek ister misiniz?
            </Text>
            <Link href="/egitimler">
              <Button
                size="lg"
                colorScheme="green"
                variant="outline"
                borderRadius="12px"
                px={8}
                py={6}
                fontSize="md"
                fontWeight="semibold"
                borderWidth="2px"
                _hover={{
                  bg: "green.500",
                  color: "white",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(76, 175, 80, 0.3)",
                }}
                _active={{
                  transform: "translateY(0)",
                }}
                transition="all 0.3s ease"
              >
                Tüm Eğitimleri Görüntüle
              </Button>
            </Link>
          </VStack>

          {/* Stats Section */}
          <Box
            w="full"
            bg="gray.50"
            borderRadius="16px"
            p={{ base: 6, md: 8 }}
            textAlign="center"
          >
            <HStack
              gap={{ base: 6, md: 12 }}
              justify="center"
              flexWrap="wrap"
            >
              <VStack gap={2}>
                <Text
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="bold"
                  color="green.500"
                >
                  {egitimler.length}+
                </Text>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  Toplam Eğitim
                </Text>
              </VStack>
              
              <VStack gap={2}>
                <Text
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="bold"
                  color="orange.500"
                >
                  {egitimler.reduce((sum, egitim) => sum + (egitim.salesCount || 0), 0)}+
                </Text>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  Satılan Eğitim
                </Text>
              </VStack>
              
              <VStack gap={2}>
                <Text
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="bold"
                  color="blue.500"
                >
                  4.9/5
                </Text>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  Ortalama Puan
                </Text>
              </VStack>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
