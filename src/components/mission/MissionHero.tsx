import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Icon,
} from "@chakra-ui/react";
import { HiBadgeCheck } from "react-icons/hi";

export default function MissionHero() {
  return (
    <Box bg="green.50" pt={20} pb={16}>
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <VStack gap={8} textAlign="center" maxW="900px" mx="auto">
          <Box
            bg="green.100"
            p={6}
            borderRadius="20px"
            display="inline-block"
          >
            <Icon boxSize={12} color="green.500">
              <HiBadgeCheck />
            </Icon>
          </Box>
          
          <VStack gap={6}>
            <Heading 
              as="h1" 
              size="3xl" 
              color="green.500"
              fontWeight="bold"
            >
              Misyonumuz
            </Heading>
            
            <Text 
              fontSize="2xl" 
              color="gray.700" 
              lineHeight="tall"
              fontWeight="medium"
            >
              Beslenme alanında en güncel ve kanıta dayalı bilgileri paylaşarak, 
              diyetisyenlerin mesleki yeterliliklerini artırmak ve toplum sağlığına katkı sağlamak.
            </Text>

            <Text 
              fontSize="lg" 
              color="gray.600" 
              lineHeight="tall"
              maxW="700px"
            >
              NutriHome Akademi olarak, beslenme biliminin sürekli gelişen doğasını takip ederek, 
              diyetisyenlere en güncel bilgileri sunmayı ve onların profesyonel gelişimlerine 
              destek olmayı kendimize görev edindik.
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}