import {
  Box,
  Card,
  Image,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Icon
} from "@chakra-ui/react";
import Link from "next/link";
import { FiClock, FiUser } from "react-icons/fi";
import { BlogPost } from "@/data/dummyBlogData";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card.Root
        bg="white"
        borderRadius="12px"
        overflow="hidden"
        shadow="md"
        _hover={{
          shadow: "lg",
          transform: "translateY(-4px)"
        }}
        transition="all 0.3s ease"
        cursor="pointer"
        h="full"
      >
        <Box h="200px" w="full" bg="gray.100" position="relative" overflow="hidden">
          <Image
            src={post.image_url}
            alt={post.title}
            h="full"
            w="full"
            objectFit="cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <VStack 
            position="absolute"
            top="0"
            left="0"
            h="full" 
            w="full"
            justify="center" 
            bg="gray.100"
            color="gray.400"
            css={{
              '&:has(+ img)': {
                display: 'none'
              }
            }}
          >
            <Text fontSize="sm">Görsel Bulunamadı</Text>
          </VStack>
        </Box>
        
        <Card.Body p={6}>
          <VStack align="start" gap={4} h="full">
            <Badge
              colorScheme="green"
              fontSize="xs"
              px={2}
              py={1}
              borderRadius="6px"
            >
              {post.category}
            </Badge>
            
            <Heading
              as="h3"
              size="lg"
              color="gray.800"
              lineHeight="short"
              _hover={{ color: "green.500" }}
              transition="color 0.2s ease"
              css={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden"
              }}
            >
              {post.title}
            </Heading>
            
            <Text
              color="gray.600"
              fontSize="sm"
              lineHeight="tall"
              flex="1"
              css={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden"
              }}
            >
              {post.excerpt}
            </Text>
            
            <HStack justify="space-between" w="full" pt={2}>
              <HStack gap={2} fontSize="xs" color="gray.500">
                <Icon boxSize={4}>
                  <FiUser />
                </Icon>
                <Text>{post.author}</Text>
              </HStack>
              
              <HStack gap={2} fontSize="xs" color="gray.500">
                <Icon boxSize={4}>
                  <FiClock />
                </Icon>
                <Text>{post.reading_time} dk okuma</Text>
              </HStack>
            </HStack>
            
            <Text fontSize="xs" color="gray.400">
              {new Date(post.created_at).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long', 
                day: 'numeric'
              })}
            </Text>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Link>
  );
}