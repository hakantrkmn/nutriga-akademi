import { Box, VStack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

export default function BlogDetailFooter() {
  return (
    <>
              <Box 
            bg="green.50" 
            p={6} 
            borderRadius="12px" 
            w="full"
            border="1px solid"
            borderColor="green.200"
          >
            <VStack gap={3} align="start">
              <Text fontWeight="semibold" color="green.700">
                Bu yazıyı beğendiniz mi?
              </Text>
              <Text fontSize="sm" color="gray.600" lineHeight="tall">
                Daha fazla beslenme rehberi ve sağlıklı yaşam ipuçları için 
                blog sayfamızı takip edin!
              </Text>
              <Link href="/blog">
                <Button colorScheme="green" size="sm">
                  Diğer Yazıları İncele
                </Button>
              </Link>
            </VStack>
          </Box>
    </>
  )
}