import EgitimCard from "@/components/courses/CoursesCard";
import { Egitim } from "@/types";
import { Box, Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";

interface EgitimlerGridProps {
  egitimler: Egitim[];
}

export default function EgitimlerGrid({ egitimler }: EgitimlerGridProps) {
  if (egitimler.length === 0) {
    return (
      <Container maxW="1200px" px={{ base: 4, md: 6 }} py={16}>
        <VStack gap={4} textAlign="center">
          <Text fontSize="xl" color="gray.600">
            Seçtiğiniz kriterlere uygun eğitim bulunamadı.
          </Text>
          <Text color="gray.500">
            Filtreleri değiştirerek tekrar deneyin veya tüm eğitimleri
            görüntüleyin.
          </Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Box bg="gray.50" py={16}>
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8} w="full">
          {egitimler.map((egitim) => (
            <EgitimCard key={egitim.id} egitim={egitim} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
