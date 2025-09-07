import { COMPANY_NAME } from "@/constants";
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  Heading,
  Text,
  Icon,
} from "@chakra-ui/react";
import { HiBadgeCheck, HiEye, HiHeart } from "react-icons/hi";

const values = [
  {
    icon: HiBadgeCheck,
    title: "Misyonumuz",
    description: "Beslenme alanında en güncel ve kanıta dayalı bilgileri paylaşarak, diyetisyenlerin mesleki yeterliliklerini artırmak ve toplum sağlığına katkı sağlamak.",
    color: "green.500"
  },
  {
    icon: HiEye,
    title: "Vizyonumuz", 
    description: "Türkiye'nin beslenme alanında önde gelen eğitim platformu olmak ve dünya standartlarında diyetisyen uzmanlar yetiştirmek.",
    color: "orange.500"
  },
  {
    icon: HiHeart,
    title: "Değerlerimiz",
    description: "Bilimsellik, sürekli öğrenme, etik değerler, yenilikçilik ve toplumsal sorumluluk ilkelerini benimser, kaliteli eğitim sunmayı hedefleriz.",
    color: "green.600"
  }
];

export default function AboutValues() {
  return (
    <Box py={16} bg="white">
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Heading 
              as="h2" 
              size="xl" 
              color="gray.800"
            >
              Değerlerimiz
            </Heading>
            <Text 
              fontSize="lg" 
              color="gray.600" 
              maxW="600px"
            >
              {COMPANY_NAME}&apos;yi ayakta tutan temel değerler ve ilkelerimiz
            </Text>
          </VStack>

          <SimpleGrid 
            columns={{ base: 1, md: 3 }} 
            gap={8} 
            w="full"
          >
            {values.map((value, index) => (
              <VStack 
                key={index}
                p={8}
                bg="gray.50"
                borderRadius="12px"
                border="1px solid"
                borderColor="gray.100"
                textAlign="center"
                gap={6}
                _hover={{
                  transform: "translateY(-4px)",
                  shadow: "lg",
                  borderColor: value.color
                }}
                transition="all 0.3s ease"
              >
                <Box
                  bg={`${value.color.split('.')[0]}.50`}
                  p={4}
                  borderRadius="16px"
                  display="inline-block"
                >
                  <Icon boxSize={8} color={value.color}>
                    <value.icon />
                  </Icon>
                </Box>

                <VStack gap={3}>
                  <Heading 
                    as="h3" 
                    size="md" 
                    color="gray.800"
                  >
                    {value.title}
                  </Heading>
                  
                  <Text 
                    fontSize="md" 
                    color="gray.600" 
                    lineHeight="tall"
                  >
                    {value.description}
                  </Text>
                </VStack>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}