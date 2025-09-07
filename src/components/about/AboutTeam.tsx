import { COMPANY_NAME } from "@/constants";
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Heading,
  Text,
  Icon,
} from "@chakra-ui/react";
import { 
  FaGraduationCap, 
  FaUsers, 
  FaCertificate, 
  FaChartLine 
} from "react-icons/fa";

const stats = [
  {
    icon: FaGraduationCap,
    number: "500+",
    label: "Mezun Diyetisyen",
    color: "green.500"
  },
  {
    icon: FaUsers,
    number: "50+",
    label: "Uzman Eğitmen",
    color: "orange.500"
  },
  {
    icon: FaCertificate,
    number: "25+",
    label: "Sertifikalı Eğitim",
    color: "green.600"
  },
  {
    icon: FaChartLine,
    number: "95%",
    label: "Memnuniyet Oranı",
    color: "orange.600"
  }
];

const teamFeatures = [
  {
    title: "Uzman Kadro",
    description: "Alanında deneyimli, akademik geçmişi güçlü uzmanlardan oluşan eğitmen kadromuz"
  },
  {
    title: "Güncel Eğitimler", 
    description: "Beslenme bilimindeki son gelişmeleri takip eden, sürekli güncellenen müfredat"
  },
  {
    title: "Praktik Odaklı",
    description: "Teorik bilginin yanı sıra pratik uygulamalara ağırlık veren eğitim yaklaşımı"
  },
  {
    title: "Bireysel Destek",
    description: "Her katılımcıya özel ilgi gösteren, sorularını yanıtlamaya odaklı destek sistemi"
  }
];

export default function AboutTeam() {
  return (
    <Box py={16} bg="gray.50">
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <VStack gap={16}>
          {/* Stats Section */}
          <VStack gap={8} textAlign="center">
            <VStack gap={4}>
              <Heading 
                as="h2" 
                size="xl" 
                color="gray.800"
              >
                Rakamlarla {COMPANY_NAME}
              </Heading>
              <Text 
                fontSize="lg" 
                color="gray.600" 
                maxW="600px"
              >
                Başarılarımızı yansıtan sayısal veriler
              </Text>
            </VStack>

            <SimpleGrid 
              columns={{ base: 2, md: 4 }} 
              gap={8} 
              w="full"
            >
              {stats.map((stat, index) => (
                <VStack 
                  key={index}
                  p={6}
                  bg="white"
                  borderRadius="12px"
                  border="1px solid"
                  borderColor="gray.200"
                  textAlign="center"
                  gap={4}
                  _hover={{
                    transform: "translateY(-2px)",
                    shadow: "md",
                    borderColor: stat.color
                  }}
                  transition="all 0.2s ease"
                >
                  <Box
                    bg={`${stat.color.split('.')[0]}.50`}
                    p={3}
                    borderRadius="12px"
                    display="inline-block"
                  >
                    <Icon boxSize={6} color={stat.color}>
                      <stat.icon />
                    </Icon>
                  </Box>

                  <VStack gap={1}>
                    <Text 
                      fontSize="2xl" 
                      fontWeight="bold" 
                      color={stat.color}
                    >
                      {stat.number}
                    </Text>
                    
                    <Text 
                      fontSize="sm" 
                      color="gray.600" 
                      fontWeight="medium"
                    >
                      {stat.label}
                    </Text>
                  </VStack>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>

          {/* Team Features */}
          <VStack gap={8} w="full">
            <VStack gap={4} textAlign="center">
              <Heading 
                as="h3" 
                size="lg" 
                color="gray.800"
              >
                Neden {COMPANY_NAME}?
              </Heading>
              <Text 
                fontSize="md" 
                color="gray.600" 
                maxW="600px"
              >
                Bizimle öğrenmenin avantajları
              </Text>
            </VStack>

            <SimpleGrid 
              columns={{ base: 1, md: 2 }} 
              gap={6} 
              w="full"
            >
              {teamFeatures.map((feature, index) => (
                <HStack
                  key={index}
                  p={6}
                  bg="white"
                  borderRadius="12px"
                  border="1px solid"
                  borderColor="gray.200"
                  align="start"
                  gap={4}
                  _hover={{
                    borderColor: "green.200",
                    shadow: "sm"
                  }}
                  transition="all 0.2s ease"
                >
                  <Box
                    w={2}
                    h={2}
                    bg="green.500"
                    borderRadius="full"
                    mt={2}
                    flexShrink={0}
                  />
                  
                  <VStack align="start" gap={2}>
                    <Text 
                      fontSize="lg" 
                      fontWeight="semibold" 
                      color="gray.800"
                    >
                      {feature.title}
                    </Text>
                    
                    <Text 
                      fontSize="md" 
                      color="gray.600" 
                      lineHeight="tall"
                    >
                      {feature.description}
                    </Text>
                  </VStack>
                </HStack>
              ))}
            </SimpleGrid>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}