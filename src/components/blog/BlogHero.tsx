import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

export default function BlogHero() {
  return (
    <Box bg="var(--background-alt)" py={16}>
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <VStack gap={6} textAlign="center" maxW="800px" mx="auto">
          <Heading as="h1" size="3xl" color="var(--primary)" fontWeight="bold">
            NutriHome Blog
          </Heading>

          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="gray.700"
            lineHeight="tall"
            maxW="600px"
          >
            Beslenme uzmanlarından güncel makaleler, sağlıklı yaşam ipuçları ve
            beslenme rehberleri ile kendinizi geliştirin.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
