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
  FaTrophy, 
  FaGlobe, 
  FaRocket, 
  FaStar,
  FaHandsHelping,
  FaGraduationCap
} from "react-icons/fa";

const visionGoals = [
  {
    icon: FaTrophy,
    title: "Sektör Liderliği",
    description: "Türkiye'de beslenme eğitimi alanında en çok tercih edilen ve güvenilir platform olmak.",
    color: "orange.500"
  },
  {
    icon: FaGlobe,
    title: "Uluslararası Standartlar",
    description: "Dünya çapında geçerli eğitim programları ve sertifikasyonlar sunarak global standartları yakalamak.",
    color: "green.500"
  },
  {
    icon: FaRocket,
    title: "Yenilikçi Yaklaşım",
    description: "Teknoloji destekli öğrenme deneyimleri ile eğitim metodolojilerinde öncü olmak.",
    color: "orange.600"
  },
  {
    icon: FaStar,
    title: "Kalite Güvencesi",
    description: "Sürekli iyileştirme anlayışı ile en yüksek kalite standartlarını korumak.",
    color: "green.600"
  },
  {
    icon: FaHandsHelping,
    title: "Toplumsal Etki",
    description: "Yetiştirdiğimiz uzmanlar aracılığıyla toplum sağlığına maksimum katkı sağlamak.",
    color: "orange.500"
  },
  {
    icon: FaGraduationCap,
    title: "Sürekli Eğitim",
    description: "Yaşam boyu öğrenme felsefesi ile meslek hayatı boyunca destek sunmak.",
    color: "green.500"
  }
];

const futureGoals = [
  {
    year: "2025",
    title: "Dijital Dönüşüm",
    description: "AI destekli kişiselleştirilmiş öğrenme deneyimleri"
  },
  {
    year: "2026", 
    title: "Uluslararası Genişleme",
    description: "Bölgesel ülkelerde eğitim programları başlatma"
  },
  {
    year: "2027",
    title: "Araştırma Merkezi",
    description: "Beslenme araştırmaları için akademik işbirlikler"
  },
  {
    year: "2028",
    title: "Sertifikasyon Otoritesi",
    description: "Bağımsız sertifikasyon kuruluşu statüsü kazanma"
  }
];

export default function VisionGoals() {
  return (
    <>
      {/* Vision Goals */}
      <Box py={16} bg="white">
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <VStack gap={12}>
            <VStack gap={4} textAlign="center">
              <Heading 
                as="h2" 
                size="xl" 
                color="gray.800"
              >
                Vizyonumuzun Ana Hedefleri
              </Heading>
              <Text 
                fontSize="lg" 
                color="gray.600" 
                maxW="600px"
              >
                Geleceğe yönelik stratejik odak alanlarımız
              </Text>
            </VStack>

            <SimpleGrid 
              columns={{ base: 1, md: 2, lg: 3 }} 
              gap={8} 
              w="full"
            >
              {visionGoals.map((goal, index) => (
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
                    borderColor: goal.color
                  }}
                  transition="all 0.3s ease"
                  h="full"
                >
                  <Box
                    bg={`${goal.color.split('.')[0]}.50`}
                    p={4}
                    borderRadius="16px"
                    display="inline-block"
                  >
                    <Icon boxSize={8} color={goal.color}>
                      <goal.icon />
                    </Icon>
                  </Box>

                  <VStack gap={3}>
                    <Heading 
                      as="h3" 
                      size="md" 
                      color="gray.800"
                    >
                      {goal.title}
                    </Heading>
                    
                    <Text 
                      fontSize="sm" 
                      color="gray.600" 
                      lineHeight="tall"
                    >
                      {goal.description}
                    </Text>
                  </VStack>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Future Roadmap */}
      <Box py={16} bg="gray.50">
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <VStack gap={12}>
            <VStack gap={4} textAlign="center">
              <Heading 
                as="h2" 
                size="xl" 
                color="gray.800"
              >
                Gelecek Yol Haritamız
              </Heading>
              <Text 
                fontSize="lg" 
                color="gray.600" 
                maxW="600px"
              >
                Vizyonumuza ulaşmak için planladığımız kilometre taşları
              </Text>
            </VStack>

            <SimpleGrid 
              columns={{ base: 1, md: 2 }} 
              gap={6} 
              w="full" 
              maxW="900px"
            >
              {futureGoals.map((goal, index) => (
                <HStack
                  key={index}
                  p={8}
                  bg="white"
                  borderRadius="12px"
                  border="1px solid"
                  borderColor="gray.200"
                  align="start"
                  gap={6}
                  _hover={{
                    borderColor: "orange.200",
                    shadow: "md",
                    transform: "translateX(4px)"
                  }}
                  transition="all 0.3s ease"
                >
                  <Box
                    bg="orange.500"
                    color="white"
                    borderRadius="12px"
                    px={4}
                    py={2}
                    fontSize="lg"
                    fontWeight="bold"
                    flexShrink={0}
                  >
                    {goal.year}
                  </Box>
                  
                  <VStack align="start" gap={2}>
                    <Heading 
                      as="h3" 
                      size="md" 
                      color="gray.800"
                    >
                      {goal.title}
                    </Heading>
                    
                    <Text 
                      fontSize="md" 
                      color="gray.600" 
                      lineHeight="tall"
                    >
                      {goal.description}
                    </Text>
                  </VStack>
                </HStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Vision Statement */}
      <Box py={16} bg="orange.50">
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <VStack gap={6} textAlign="center" maxW="800px" mx="auto">
            <Heading 
              as="h2" 
              size="xl" 
              color="orange.500"
            >
              Geleceğe Bakışımız
            </Heading>
            
            <Text 
              fontSize="xl" 
              color="gray.700" 
              lineHeight="tall"
              fontStyle="italic"
            >
              &quot;2030 yılında, küresel beslenme topluluğunun vazgeçilmez bir parçası olarak, 
              binlerce diyetisyenin kariyerini şekillendirmiş, milyonlarca insanın 
              sağlıklı yaşam tarzına kavuşmasına katkı sağlamış bir akademi olacağız.&quot;
            </Text>
          </VStack>
        </Container>
      </Box>
    </>
  );
}