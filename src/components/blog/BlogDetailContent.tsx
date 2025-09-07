import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Image,
  Badge,
  Icon,
  Button
} from "@chakra-ui/react";
import Link from "next/link";
import { FiUser, FiArrowLeft } from "react-icons/fi";
import { BlogDetailContentProps } from "@/types";
import TipTapWrapper from "@/components/common/TipTapWrapper";

export default function BlogDetailContent({ post }: BlogDetailContentProps) {
  return (
    <Box bg="white" minH="100vh">
      <Container maxW="800px" px={{ base: 4, md: 6 }} py={8}>
        <VStack gap={8} align="start" w="full">
          <Link href="/blog">
            <Button
              variant="ghost"
              color="green.600"
              _hover={{ bg: "green.50" }}
            >
              <Icon mr={2}>
                <FiArrowLeft />
              </Icon>
              Blog&apos;a Dön
            </Button>
          </Link>

          <VStack gap={6} align="start" w="full">
            <Badge
              colorScheme="green"
              fontSize="sm"
              px={3}
              py={1}
              borderRadius="8px"
            >
              {post.category}
            </Badge>

            <Heading
              as="h1"
              size="2xl"
              color="gray.800"
              lineHeight="short"
            >
              {post.title}
            </Heading>

            <HStack justify="space-between" w="full" flexWrap="wrap" gap={4}>
              <HStack gap={4} fontSize="sm" color="gray.600">
                <HStack gap={2}>
                  <Icon boxSize={4}>
                    <FiUser />
                  </Icon>
                  <Text>{post.author}</Text>
                </HStack>
              </HStack>
              
              <Text fontSize="sm" color="gray.500">
                {new Date(post.created_at).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric'
                })}
              </Text>
            </HStack>
          </VStack>

          <Image
            src={post.image_url}
            alt={post.title}
            w="full"
            h="400px"
            objectFit="cover"
            borderRadius="12px"
          />

          <TipTapWrapper 
            content={post.content}
            className="blog-content"
          />

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
        </VStack>
      </Container>
    </Box>
  );
}