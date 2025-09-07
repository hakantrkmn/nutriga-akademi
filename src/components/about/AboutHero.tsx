import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { COMPANY_NAME } from "@/constants";

export default function AboutHero() {
  return (
    <Box bg="green.50" pt={20} pb={16}>
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <VStack gap={6} textAlign="center" maxW="800px" mx="auto">
          <Heading 
            as="h1" 
            size="3xl" 
            color="green.500"
            fontWeight="bold"
          >
            Hakkımızda
          </Heading>
          
          <Text 
            fontSize="xl" 
            color="gray.700" 
            lineHeight="tall"
            fontWeight="medium"
          >
            {COMPANY_NAME} olarak, beslenme bilimindeki en güncel bilgileri 
            paylaşarak diyetisyenlerin mesleki gelişimine katkı sağlıyoruz.
          </Text>

          <Text 
            fontSize="lg" 
            color="gray.600" 
            lineHeight="tall"
            maxW="600px"
          >
            2020 yılında kurulan akademimiz, kanıta dayalı beslenme eğitimleri 
            ile sektörde fark yaratan uzmanlar yetiştirmeyi hedefliyor.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}