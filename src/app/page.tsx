import { Box, Heading, Text, Button, VStack, HStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box minH="100vh" bg="gray.50" p={8}>
        <VStack gap={8} align="center" justify="center" minH="80vh">
          <Heading 
            as="h1" 
            size="2xl" 
            color="green.500"
            textAlign="center"
          >
            NutriHome Akademi&apos;ye Hoşgeldiniz
          </Heading>
          
          <Text 
            fontSize="xl" 
            color="gray.700"
            textAlign="center"
            maxW="600px"
          >
            Diyetisyen eğitimleri ve beslenme bilgileri ile sağlıklı yaşama adım atın.
          </Text>

          <HStack gap={4} flexWrap="wrap" justify="center">
            <Button 
              colorScheme="green" 
              size="lg" 
              borderRadius="12px"
              bg="green.500"
              _hover={{ bg: "green.600" }}
            >
              Eğitimleri İncele
            </Button>
            
            <Button 
              colorScheme="orange" 
              variant="outline" 
              size="lg" 
              borderRadius="12px"
              borderColor="orange.500"
              color="orange.500"
              _hover={{ bg: "orange.50" }}
            >
              Kayıt Ol
            </Button>
          </HStack>

          <Box p={6} bg="white" borderRadius="12px" shadow="md" maxW="500px">
            <Text color="gray.600" textAlign="center">
              Header component başarıyla eklendi! 🎉
            </Text>
          </Box>
        </VStack>
      </Box>
  );
}
