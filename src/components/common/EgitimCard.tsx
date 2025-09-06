import {
  Box,
  Card,
  Image,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Button,
  Icon
} from "@chakra-ui/react";
import Link from "next/link";
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
            h="full"
            w="full"
            objectFit="cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <VStack 
            position="absolute"
            top="0"
            left="0"
            h="full" 
            w="full"
            justify="center" 
            bg="gray.100"
            color="gray.400"
          >
            <Text fontSize="sm">Eğitim Görseli</Text>
          </VStack>
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
          {egitim.level}
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
                <Text>{egitim.instructor}</Text>
              </HStack>
              
              <HStack gap={2}>
                <Icon boxSize={4}>
                  <FiClock />
                </Icon>
                <Text>{egitim.duration}</Text>
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