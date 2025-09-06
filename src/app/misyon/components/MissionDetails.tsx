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
  FaBookReader, 
  FaChalkboardTeacher, 
  FaUsers, 
  FaCertificate,
  FaHeart,
  FaLightbulb
} from "react-icons/fa";

const missionPoints = [
  {
    icon: FaBookReader,
    title: "Güncel Bilgi",
    description: "Beslenme bilimindeki en son gelişmeleri takip ederek, kanıta dayalı eğitim içerikleri sunuyoruz.",
    color: "green.500"
  },
  {
    icon: FaChalkboardTeacher,
    title: "Kaliteli Eğitim",
    description: "Deneyimli uzmanlarımızla, teorik bilgiyi pratiğe dönüştüren etkili eğitim programları geliştiriyoruz.",
    color: "orange.500"
  },
  {
    icon: FaUsers,
    title: "Mesleki Gelişim",
    description: "Diyetisyenlerin kariyer yolculuğunda yanında olarak, sürekli öğrenmeyi destekliyoruz.",
    color: "green.600"
  },
  {
    icon: FaCertificate,
    title: "Sertifikasyon",
    description: "Katılımcılarımıza uluslararası standartlarda geçerli sertifikalar sunarak değer katıyoruz.",
    color: "orange.600"
  },
  {
    icon: FaHeart,
    title: "Toplum Sağlığı",
    description: "Eğittiğimiz uzmanlar aracılığıyla toplumun beslenme bilincini artırmayı hedefliyoruz.",
    color: "green.500"
  },
  {
    icon: FaLightbulb,
    title: "İnovasyon",
    description: "Eğitim metodolojilerinde yenilikçi yaklaşımlarla öğrenme deneyimini zenginleştiriyoruz.",
    color: "orange.500"
  }
];

const commitments = [
  "Bilimsel araştırmalara dayalı güncel içerik sunmak",
  "Etik değerleri ön planda tutarak eğitim vermek", 
  "Her katılımcının bireysel ihtiyaçlarını gözetmek",
  "Sürekli gelişim ve iyileştirme anlayışını benimser",
  "Toplumsal sorumluluk bilincini yaygınlaştırmak"
];

export default function MissionDetails() {
  return (
    <>
      {/* Mission Points */}
      <Box py={16} bg="white">
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <VStack gap={12}>
            <VStack gap={4} textAlign="center">
              <Heading 
                as="h2" 
                size="xl" 
                color="gray.800"
              >
                Misyonumuzun Temel Unsurları
              </Heading>
              <Text 
                fontSize="lg" 
                color="gray.600" 
                maxW="600px"
              >
                Hedeflerimize ulaşmak için odaklandığımız ana konular
              </Text>
            </VStack>

            <SimpleGrid 
              columns={{ base: 1, md: 2, lg: 3 }} 
              gap={8} 
              w="full"
            >
              {missionPoints.map((point, index) => (
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
                    borderColor: point.color
                  }}
                  transition="all 0.3s ease"
                  h="full"
                >
                  <Box
                    bg={`${point.color.split('.')[0]}.50`}
                    p={4}
                    borderRadius="16px"
                    display="inline-block"
                  >
                    <Icon boxSize={8} color={point.color}>
                      <point.icon />
                    </Icon>
                  </Box>

                  <VStack gap={3}>
                    <Heading 
                      as="h3" 
                      size="md" 
                      color="gray.800"
                    >
                      {point.title}
                    </Heading>
                    
                    <Text 
                      fontSize="sm" 
                      color="gray.600" 
                      lineHeight="tall"
                    >
                      {point.description}
                    </Text>
                  </VStack>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Commitments */}
      <Box py={16} bg="gray.50">
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <VStack gap={12}>
            <VStack gap={4} textAlign="center">
              <Heading 
                as="h2" 
                size="xl" 
                color="gray.800"
              >
                Taahhütlerimiz
              </Heading>
              <Text 
                fontSize="lg" 
                color="gray.600" 
                maxW="600px"
              >
                Misyonumuzu gerçekleştirmek için verdiğimiz sözler
              </Text>
            </VStack>

            <VStack gap={6} w="full" maxW="800px" mx="auto">
              {commitments.map((commitment, index) => (
                <HStack
                  key={index}
                  p={6}
                  bg="white"
                  borderRadius="12px"
                  border="1px solid"
                  borderColor="gray.200"
                  w="full"
                  align="start"
                  gap={4}
                  _hover={{
                    borderColor: "green.200",
                    shadow: "sm",
                    transform: "translateX(8px)"
                  }}
                  transition="all 0.2s ease"
                >
                  <Box
                    bg="green.500"
                    color="white"
                    borderRadius="full"
                    w={8}
                    h={8}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="sm"
                    fontWeight="bold"
                    flexShrink={0}
                  >
                    {index + 1}
                  </Box>
                  
                  <Text 
                    fontSize="lg" 
                    color="gray.700" 
                    lineHeight="tall"
                    fontWeight="medium"
                  >
                    {commitment}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </Container>
      </Box>
    </>
  );
}