import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Icon,
} from "@chakra-ui/react";
import { HiEye } from "react-icons/hi";

export default function VisionHero() {
  return (
    <Box bg="orange.50" pt={20} pb={16}>
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <VStack gap={8} textAlign="center" maxW="900px" mx="auto">
          <Box
            bg="orange.100"
            p={6}
            borderRadius="20px"
            display="inline-block"
          >
            <Icon boxSize={12} color="orange.500">
              <HiEye />
            </Icon>
          </Box>
          
          <VStack gap={6}>
            <Heading 
              as="h1" 
              size="3xl" 
              color="orange.500"
              fontWeight="bold"
            >
              Vizyonumuz
            </Heading>
            
            <Text 
              fontSize="2xl" 
              color="gray.700" 
              lineHeight="tall"
              fontWeight="medium"
            >
              Türkiye&apos;nin beslenme alanında önde gelen eğitim platformu olmak ve 
              dünya standartlarında diyetisyen uzmanlar yetiştirmek.
            </Text>

            <Text 
              fontSize="lg" 
              color="gray.600" 
              lineHeight="tall"
              maxW="700px"
            >
              Geleceğe bakışımız, beslenme bilimindeki liderliğimizi pekiştirerek, 
              küresel standartlarda eğitim veren, yenilikçi ve sürdürülebilir bir 
              akademi olmaktır.
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}