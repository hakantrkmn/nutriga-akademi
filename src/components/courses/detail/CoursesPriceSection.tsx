import { cartApi } from "@/lib/api";
import { EgitimPriceProps } from "@/types";
import {
  Box,
  Button,
  Card,
  GridItem,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
// import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";
import { useState } from "react";
import {
  FiAward,
  FiBarChart,
  FiCheckCircle,
  FiLock,
  FiShoppingCart,
  FiUsers,
} from "react-icons/fi";

export default function EgitimPrice({ egitim }: EgitimPriceProps) {
  // const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);
    const res = await cartApi.add(egitim.id);
    setAdding(false);
    if (res.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
      toaster.success("Sepete eklendi");
    } else if (res.error) {
      if (res.error.toLowerCase().includes("giriş")) {
        toaster.error("Giriş gerekli");
      } else {
        toaster.error(res.error);
      }
    }
  };
  return (
    <GridItem>
      <VStack gap={6} position={{ lg: "sticky" }} top="6rem">
        <Card.Root
          w="full"
          shadow="xl"
          borderRadius="16px"
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          _hover={{ shadow: "2xl" }}
          transition="all 0.3s ease"
        >
          <Card.Body p={8}>
            <VStack gap={6}>
              <VStack gap={2} align="center">
                <Text
                  fontSize="5xl"
                  fontWeight="bold"
                  color="var(--primary)"
                  fontFamily="Poppins, sans-serif"
                >
                  ₺{egitim.price?.toString()}
                </Text>
                <Text fontSize="sm" color="gray.500" fontWeight="medium">
                  Tek seferlik ödeme
                </Text>
              </VStack>

              <VStack gap={4} w="full">
                <Button
                  bg="var(--primary)"
                  color="white"
                  size="lg"
                  w="full"
                  borderRadius="12px"
                  py={7}
                  fontSize="md"
                  fontWeight="semibold"
                  _hover={{
                    bg: "var(--primary-hover)",
                    transform: "translateY(-1px)",
                    shadow: "lg",
                  }}
                  transition="all 0.2s ease"
                >
                  <HStack gap={3}>
                    <Icon as={FiShoppingCart} boxSize={5} />
                    <Text>Eğitimi Satın Al</Text>
                  </HStack>
                </Button>
                <Button
                  bg={added ? "var(--accent)" : "transparent"}
                  variant={added ? "solid" : "outline"}
                  size="lg"
                  w="full"
                  borderRadius="12px"
                  py={7}
                  fontSize="md"
                  fontWeight="semibold"
                  borderColor="var(--accent)"
                  color={added ? "white" : "var(--accent)"}
                  _hover={{
                    bg: "rgba(var(--accent-rgb), 0.08)",
                    borderColor: "var(--accent)",
                    transform: "translateY(-1px)",
                  }}
                  transition="all 0.2s ease"
                  loading={adding}
                  onClick={handleAddToCart}
                >
                  {added ? "Eklendi" : "Sepete Ekle"}
                </Button>
              </VStack>

              <Box w="full" h="1px" bg="gray.200" />

              <VStack gap={4} align="start" w="full">
                <Heading
                  as="h3"
                  size="md"
                  color="gray.800"
                  fontFamily="Poppins, sans-serif"
                >
                  Bu Eğitim İçerir:
                </Heading>
                <VStack gap={3} w="full">
                  <HStack
                    justify="space-between"
                    w="full"
                    p={3}
                    bg="var(--background-alt)"
                    borderRadius="8px"
                  >
                    <HStack gap={3}>
                      <Icon
                        as={FiBarChart}
                        color="var(--primary)"
                        boxSize={4}
                      />
                      <Text fontWeight="medium" color="gray.700">
                        Seviye
                      </Text>
                    </HStack>
                    <Text fontWeight="semibold" color="gray.800">
                      {egitim.level}
                    </Text>
                  </HStack>
                  <HStack
                    justify="space-between"
                    w="full"
                    p={3}
                    bg="var(--background-alt)"
                    borderRadius="8px"
                  >
                    <HStack gap={3}>
                      <Icon as={FiAward} color="var(--primary)" boxSize={4} />
                      <Text fontWeight="medium" color="gray.700">
                        Sertifika
                      </Text>
                    </HStack>
                    <Text fontWeight="semibold" color="gray.800">
                      Evet
                    </Text>
                  </HStack>
                </VStack>
              </VStack>

              <Box w="full" h="1px" bg="gray.200" />

              <VStack gap={3} align="start" w="full">
                <VStack gap={2} align="start" w="full">
                  <HStack gap={3}>
                    <Icon
                      as={FiCheckCircle}
                      color="var(--primary)"
                      boxSize={4}
                    />
                    <Text fontSize="sm" color="gray.600" fontWeight="medium">
                      7 gün iade garantisi
                    </Text>
                  </HStack>
                  <HStack gap={3}>
                    <Icon as={FiLock} color="var(--primary)" boxSize={4} />
                    <Text fontSize="sm" color="gray.600" fontWeight="medium">
                      Güvenli ödeme
                    </Text>
                  </HStack>
                  <HStack gap={3}>
                    <Icon as={FiUsers} color="var(--primary)" boxSize={4} />
                    <Text fontSize="sm" color="gray.600" fontWeight="medium">
                      Sınırsız erişim
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </VStack>
          </Card.Body>
        </Card.Root>
      </VStack>
    </GridItem>
  );
}
