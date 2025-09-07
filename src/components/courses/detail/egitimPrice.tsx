import { Card, GridItem, VStack, Text, Button, Icon, HStack, Heading, Box } from "@chakra-ui/react";
import { FiShoppingCart, FiClock, FiBarChart, FiAward, FiCheckCircle, FiLock, FiUsers } from "react-icons/fi";
import { EgitimPriceProps } from "@/types";



export default function EgitimPrice({ egitim }: EgitimPriceProps) {
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
              <Text fontSize="5xl" fontWeight="bold" color="green.500" fontFamily="Poppins, sans-serif">
                ₺{egitim.price?.toString()}
              </Text>
              <Text fontSize="sm" color="gray.500" fontWeight="medium">
                Tek seferlik ödeme
              </Text>
            </VStack>

            <VStack gap={4} w="full">
              <Button 
                colorScheme="green" 
                size="lg" 
                w="full" 
                borderRadius="12px" 
                py={7}
                fontSize="md"
                fontWeight="semibold"
                _hover={{
                  bg: "green.600",
                  transform: "translateY(-1px)",
                  shadow: "lg"
                }}
                transition="all 0.2s ease"
              >
                <HStack gap={3}>
                  <Icon as={FiShoppingCart} boxSize={5} />
                  <Text>Eğitimi Satın Al</Text>
                </HStack>
              </Button>
              <Button 
                colorScheme="orange" 
                variant="outline" 
                size="lg" 
                w="full" 
                borderRadius="12px" 
                py={7}
                fontSize="md"
                fontWeight="semibold"
                borderColor="orange.300"
                color="orange.600"
                _hover={{
                  bg: "orange.50",
                  borderColor: "orange.400",
                  transform: "translateY(-1px)"
                }}
                transition="all 0.2s ease"
              >
                Sepete Ekle
              </Button>
            </VStack>
            
            <Box w="full" h="1px" bg="gray.200" />

            <VStack gap={4} align="start" w="full">
              <Heading as="h3" size="md" color="gray.800" fontFamily="Poppins, sans-serif">
                Bu Eğitim İçerir:
              </Heading>
              <VStack gap={3} w="full">
                <HStack justify="space-between" w="full" p={3} bg="gray.50" borderRadius="8px">
                  <HStack gap={3}>
                    <Icon as={FiBarChart} color="green.500" boxSize={4} />
                    <Text fontWeight="medium" color="gray.700">Seviye</Text>
                  </HStack>
                  <Text fontWeight="semibold" color="gray.800">{egitim.level}</Text>
                </HStack>
                <HStack justify="space-between" w="full" p={3} bg="gray.50" borderRadius="8px">
                  <HStack gap={3}>
                    <Icon as={FiAward} color="green.500" boxSize={4} />
                    <Text fontWeight="medium" color="gray.700">Sertifika</Text>
                  </HStack>
                  <Text fontWeight="semibold" color="gray.800">Evet</Text>
                </HStack>
              </VStack>
            </VStack>

            <Box w="full" h="1px" bg="gray.200" />

            <VStack gap={3} align="start" w="full">
              <VStack gap={2} align="start" w="full">
                <HStack gap={3}>
                  <Icon as={FiCheckCircle} color="green.500" boxSize={4} />
                  <Text fontSize="sm" color="gray.600" fontWeight="medium">7 gün iade garantisi</Text>
                </HStack>
                <HStack gap={3}>
                  <Icon as={FiLock} color="green.500" boxSize={4} />
                  <Text fontSize="sm" color="gray.600" fontWeight="medium">Güvenli ödeme</Text>
                </HStack>
                <HStack gap={3}>
                  <Icon as={FiUsers} color="green.500" boxSize={4} />
                  <Text fontSize="sm" color="gray.600" fontWeight="medium">Sınırsız erişim</Text>
                </HStack>
              </VStack>
            </VStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  </GridItem>
  )
}