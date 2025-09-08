import { Box, Button, Link, Text, VStack } from "@chakra-ui/react";

export default function BlogDetailFooter() {
  return (
    <>
      <Box
        bg="rgba(var(--primary-rgb), 0.06)"
        p={6}
        borderRadius="12px"
        w="full"
        border="1px solid"
        borderColor="rgba(var(--primary-rgb), 0.2)"
      >
        <VStack gap={3} align="start">
          <Text fontWeight="semibold" color="var(--primary)">
            Bu yazıyı beğendiniz mi?
          </Text>
          <Text fontSize="sm" color="gray.600" lineHeight="tall">
            Daha fazla beslenme rehberi ve sağlıklı yaşam ipuçları için blog
            sayfamızı takip edin!
          </Text>
          <Link href="/blog">
            <Button
              bg="var(--primary)"
              color="white"
              _hover={{ bg: "var(--primary-hover)" }}
              size="sm"
            >
              Diğer Yazıları İncele
            </Button>
          </Link>
        </VStack>
      </Box>
    </>
  );
}
