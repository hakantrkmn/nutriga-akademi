import {
  Box,
  Card,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Button,
  Icon
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { FiClock, FiUser, FiShoppingCart } from "react-icons/fi";
import { Egitim } from "@/data/dummyEgitimData";

interface EgitimCardProps {
  egitim: Egitim;
}

export default function EgitimCard({ egitim }: EgitimCardProps) {
  return (
    <Card.Root
      bg="white"
      borderRadius="12px"
      overflow="hidden"
      shadow="md"
      _hover={{
        shadow: "lg",
        transform: "translateY(-4px)"
      }}
      transition="all 0.3s ease"
      h="full"
    >
      <Box position="relative">
        <Box h="200px" w="full" bg="gray.100" position="relative" overflow="hidden">
          <Image
            src={egitim.image_url}
            alt={egitim.title}
            width={400}
            height={200}
            loading="lazy"
            style={{
              width: "auto",
              height: "200px",
              objectFit: "cover",
              aspectRatio: "2/1"
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Box>
        
        <Badge
          position="absolute"
          top={3}
          right={3}
          colorScheme="orange"
          fontSize="xs"
          px={2}
          py={1}
          borderRadius="6px"
        >
          {egitim.level || "Seviye"}
        </Badge>
      </Box>
      
      <Card.Body p={6}>
        <VStack align="start" gap={4} h="full">
          <HStack justify="space-between" w="full">
            <Badge
              colorScheme="green"
              fontSize="xs"
              px={2}
              py={1}
              borderRadius="6px"
            >
              {egitim.category}
            </Badge>
            <Text fontSize="xs" color="gray.500">
              {egitim.sales_count} kişi aldı
            </Text>
          </HStack>
          
          <Heading
            as="h3"
            size="lg"
            color="gray.800"
            lineHeight="short"
            css={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden"
            }}
          >
            {egitim.title}
          </Heading>
          
          <Text
            color="gray.600"
            fontSize="sm"
            lineHeight="tall"
            flex="1"
            css={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden"
            }}
          >
            {egitim.description}
          </Text>
          
          <VStack gap={3} w="full">
            <HStack justify="space-between" w="full" fontSize="xs" color="gray.500">
              <HStack gap={2}>
                <Icon boxSize={4}>
                  <FiUser />
                </Icon>
                <Text>{egitim.instructor || "Eğitmen"}</Text>
              </HStack>
              
              <HStack gap={2}>
                <Icon boxSize={4}>
                  <FiClock />
                </Icon>
                <Text>{egitim.duration || "Süre"}</Text>
              </HStack>
            </HStack>
            
            <HStack justify="space-between" w="full" align="center">
              <VStack align="start" gap={1}>
                <Text fontSize="2xl" fontWeight="bold" color="green.600">
                  ₺{egitim.price}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Tek seferlik ödeme
                </Text>
              </VStack>
              
              <VStack gap={2}>
                <Link href={`/egitimler/${egitim.slug}`}>
                  <Button
                    colorScheme="green"
                    size="sm"
                    borderRadius="8px"
                    px={4}
                  >
                    Detayları Gör
                  </Button>
                </Link>
                
                <Button
                  colorScheme="orange"
                  variant="outline"
                  size="sm"
                  borderRadius="8px"
                  px={4}
                >
                  <Icon mr={2}>
                    <FiShoppingCart />
                  </Icon>
                  Sepete Ekle
                </Button>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}