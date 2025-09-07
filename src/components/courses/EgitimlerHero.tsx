import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  HStack,
  Icon
} from "@chakra-ui/react";
import { FiBook, FiAward, FiUsers } from "react-icons/fi";

export default function EgitimlerHero() {
  return (
    <Box bg="green.50" py={16}>
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <VStack gap={8} textAlign="center" maxW="800px" mx="auto">
          <Heading
            as="h1"
            size="3xl"
            color="green.600"
            fontWeight="bold"
          >
            Profesyonel Beslenme Eğitimleri
          </Heading>
          
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="gray.700"
            lineHeight="tall"
            maxW="600px"
          >
            Alanında uzman eğitmenlerden, güncel bilimsel verilerle desteklenen 
            kapsamlı beslenme eğitimleri alın. Kariyerinizi bir üst seviyeye taşıyın.
          </Text>

          <HStack gap={12} flexWrap="wrap" justify="center" pt={4}>
            <VStack gap={2} align="center">
              <Icon boxSize={8} color="green.500">
                <FiBook />
              </Icon>
              <Text fontWeight="semibold" color="gray.700">6+ Eğitim</Text>
              <Text fontSize="sm" color="gray.600">Farklı uzmanlık alanları</Text>
            </VStack>

            <VStack gap={2} align="center">
              <Icon boxSize={8} color="orange.500">
                <FiAward />
              </Icon>
              <Text fontWeight="semibold" color="gray.700">Sertifikalı</Text>
              <Text fontSize="sm" color="gray.600">Geçerli sertifikalar</Text>
            </VStack>

            <VStack gap={2} align="center">
              <Icon boxSize={8} color="green.500">
                <FiUsers />
              </Icon>
              <Text fontWeight="semibold" color="gray.700">500+ Mezun</Text>
              <Text fontSize="sm" color="gray.600">Başarılı profesyoneller</Text>
            </VStack>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}