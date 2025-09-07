import { Box, Card, VStack, Text, Button, Icon, HStack, Heading } from "@chakra-ui/react";
import { FiAward, FiCheckCircle, FiUsers } from "react-icons/fi";
import { EgitimCTAProps } from "@/types";



export default function EgitimCTA({ egitim }: EgitimCTAProps) {
  return (
    <Box mt={{ base: 12, md: 20 }}>
    <Card.Root 
      bg="gradient-to-r"
      bgGradient="linear(to-r, green.50, green.100)"
      borderRadius="20px" 
      w="full"
      border="1px solid"
      borderColor="green.200"
      shadow="lg"
      _hover={{ shadow: "xl" }}
      transition="all 0.3s ease"
    >
      <Card.Body p={{ base: 10, md: 12 }}>
        <VStack gap={6} textAlign="center" maxW="700px" mx="auto">
          <VStack gap={3}>
            <Icon as={FiAward} color="green.500" boxSize={12} />
            <Heading as="h3" size="xl" color="green.600" fontFamily="Poppins, sans-serif">
              Kariyerinde Bir Sonraki Adımı At
            </Heading>
          </VStack>
          
          <Text 
            maxW="600px" 
            fontSize="lg" 
            color="gray.700" 
            lineHeight="tall"
            fontFamily="Inter, sans-serif"
          >
            Bu eğitim ile beslenme alanındaki bilginizi derinleştirin ve 
            profesyonel kariyerinizde fark yaratın. Uzman eğitmenlerden 
            öğrenin, sertifikanızı alın.
          </Text>
          
          <HStack gap={4} flexWrap="wrap" justify="center" pt={2}>
            <Button 
              colorScheme="green"
              size="lg"
              px={10}
              py={7}
              borderRadius="12px"
              fontSize="md"
              fontWeight="semibold"
              _hover={{
                bg: "green.600",
                transform: "translateY(-2px)",
                shadow: "xl"
              }}
              transition="all 0.3s ease"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Hemen Başla - ₺{egitim.price}
            </Button>
            
            <Button 
              colorScheme="orange"
              variant="outline"
              size="lg"
              px={8}
              py={7}
              borderRadius="12px"
              fontSize="md"
              fontWeight="semibold"
              borderColor="orange.300"
              color="orange.600"
              _hover={{
                bg: "orange.50",
                borderColor: "orange.400",
                transform: "translateY(-2px)"
              }}
              transition="all 0.3s ease"
            >
              Detayları İncele
            </Button>
          </HStack>
          
          <HStack gap={8} pt={4} fontSize="sm" color="gray.600" flexWrap="wrap" justify="center">
            <HStack gap={2}>
              <Icon as={FiCheckCircle} color="green.500" boxSize={4} />
              <Text fontWeight="medium">7 gün iade garantisi</Text>
            </HStack>
            <HStack gap={2}>
              <Icon as={FiUsers} color="green.500" boxSize={4} />
              <Text fontWeight="medium">Sınırsız erişim</Text>
            </HStack>
            <HStack gap={2}>
              <Icon as={FiAward} color="green.500" boxSize={4} />
              <Text fontWeight="medium">Sertifika dahil</Text>
            </HStack>
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  </Box>
  )
}