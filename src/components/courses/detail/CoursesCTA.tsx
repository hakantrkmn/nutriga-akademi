import { EgitimCTAProps } from "@/types";
import {
  Box,
  Button,
  Card,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiAward, FiCheckCircle, FiUsers } from "react-icons/fi";

export default function EgitimCTA({ egitim }: EgitimCTAProps) {
  return (
    <Box mt={{ base: 12, md: 20 }}>
      <Card.Root
        bg="linear-gradient(90deg, rgba(var(--primary-rgb), 0.06), rgba(var(--primary-rgb), 0.12))"
        borderRadius="20px"
        w="full"
        border="1px solid"
        borderColor="rgba(var(--primary-rgb), 0.2)"
        shadow="lg"
        _hover={{ shadow: "xl" }}
        transition="all 0.3s ease"
      >
        <Card.Body p={{ base: 10, md: 12 }}>
          <VStack gap={6} textAlign="center" maxW="700px" mx="auto">
            <VStack gap={3}>
              <Icon as={FiAward} color="var(--primary)" boxSize={12} />
              <Heading
                as="h3"
                size="xl"
                color="var(--primary)"
                fontFamily="Poppins, sans-serif"
              >
                Kariyerinde Bir Sonraki Adımı At
              </Heading>
            </VStack>

            <Text
              maxW="600px"
              fontSize="lg"
              color="gray.700"
              lineHeight="tall"
              fontFamily="Inter, sans-serif"
            >
              Bu eğitim ile beslenme alanındaki bilginizi derinleştirin ve
              profesyonel kariyerinizde fark yaratın. Uzman eğitmenlerden
              öğrenin, sertifikanızı alın.
            </Text>

            <HStack gap={4} flexWrap="wrap" justify="center" pt={2}>
              <Button
                bg="var(--primary)"
                color="white"
                size="lg"
                px={10}
                py={7}
                borderRadius="12px"
                fontSize="md"
                fontWeight="semibold"
                _hover={{
                  bg: "var(--primary-hover)",
                  transform: "translateY(-2px)",
                  shadow: "xl",
                }}
                transition="all 0.3s ease"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Hemen Başla - ₺{egitim.price?.toString()}
              </Button>

              <Button
                variant="outline"
                size="lg"
                px={8}
                py={7}
                borderRadius="12px"
                fontSize="md"
                fontWeight="semibold"
                borderColor="var(--accent)"
                color="var(--accent)"
                _hover={{
                  bg: "rgba(var(--accent-rgb), 0.08)",
                  borderColor: "var(--accent)",
                  transform: "translateY(-2px)",
                }}
                transition="all 0.3s ease"
              >
                Detayları İncele
              </Button>
            </HStack>

            <HStack
              gap={8}
              pt={4}
              fontSize="sm"
              color="gray.600"
              flexWrap="wrap"
              justify="center"
            >
              <HStack gap={2}>
                <Icon as={FiCheckCircle} color="var(--primary)" boxSize={4} />
                <Text fontWeight="medium">7 gün iade garantisi</Text>
              </HStack>
              <HStack gap={2}>
                <Icon as={FiUsers} color="var(--primary)" boxSize={4} />
                <Text fontWeight="medium">Sınırsız erişim</Text>
              </HStack>
              <HStack gap={2}>
                <Icon as={FiAward} color="var(--primary)" boxSize={4} />
                <Text fontWeight="medium">Sertifika dahil</Text>
              </HStack>
            </HStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
