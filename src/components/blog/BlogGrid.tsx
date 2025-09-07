import {
  Container,
  SimpleGrid,
  VStack,
  Text,
  Box
} from "@chakra-ui/react";
import BlogCard from "@/components/blog/BlogCard";
import { BlogGridProps } from "@/types";



export default function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <Container maxW="1200px" px={{ base: 4, md: 6 }} py={16}>
        <VStack gap={4} textAlign="center">
          <Text fontSize="xl" color="gray.600">
            Bu kategoride henüz blog yazısı bulunmuyor.
          </Text>
          <Text color="gray.500">
            Yakında yeni içeriklerle karşınızda olacağız!
          </Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Box bg="gray.50" py={16}>
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          gap={8}
          w="full"
        >
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}