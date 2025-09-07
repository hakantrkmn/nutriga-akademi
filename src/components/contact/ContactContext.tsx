import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import {
  Box,
  Container,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function IletisimContent() {
  return (
    <Box bg="gray.50" minH="100vh" pt={20} pb={12}>
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        {/* Page Header */}
        <VStack gap={4} textAlign="center" mb={12}>
          <Heading as="h1" size="2xl" color="green.500" fontWeight="bold">
            İletişime Geçin
          </Heading>
          <Text fontSize="xl" color="gray.600" maxW="600px" lineHeight="tall">
            Beslenme eğitimlerimiz ve hizmetlerimiz hakkında merak ettikleriniz
            için bizimle iletişime geçin. Size yardımcı olmaktan mutluluk
            duyarız.
          </Text>
        </VStack>

        {/* Main Content */}
        <Box>
          {/* Desktop Layout */}
          <HStack align="start" gap={12} display={{ base: "none", lg: "flex" }}>
            <ContactInfo />
            <ContactForm />
          </HStack>

          {/* Mobile Layout */}
          <VStack gap={8} display={{ base: "flex", lg: "none" }}>
            <ContactForm />
            <ContactInfo />
          </VStack>
        </Box>

        {/* Additional Info */}
        <Box
          mt={16}
          p={8}
          bg="white"
          borderRadius="12px"
          shadow="sm"
          borderLeft="4px solid"
          borderColor="green.500"
        >
          <VStack align="start" gap={4}>
            <Heading as="h3" size="md" color="gray.800">
              💡 Sık Sorulan Sorular
            </Heading>

            <VStack align="start" gap={3} w="full">
              <Box>
                <Text fontWeight="semibold" color="gray.700" mb={1}>
                  Eğitimleriniz online mı gerçekleşiyor?
                </Text>
                <Text color="gray.600" fontSize="sm">
                  Evet, tüm eğitimlerimiz online platform üzerinden canlı olarak
                  gerçekleşmektedir.
                </Text>
              </Box>

              <Box>
                <Text fontWeight="semibold" color="gray.700" mb={1}>
                  Eğitim materyallerine nasıl erişebilirim?
                </Text>
                <Text color="gray.600" fontSize="sm">
                  Kayıt olduktan sonra size özel panel üzerinden tüm
                  materyallere erişim sağlayabilirsiniz.
                </Text>
              </Box>

              <Box>
                <Text fontWeight="semibold" color="gray.700" mb={1}>
                  Eğitim sonrası destek alabilir miyim?
                </Text>
                <Text color="gray.600" fontSize="sm">
                  Tabii ki! Eğitim sonrası 30 gün boyunca ücretsiz destek
                  hizmeti sunuyoruz.
                </Text>
              </Box>
            </VStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
