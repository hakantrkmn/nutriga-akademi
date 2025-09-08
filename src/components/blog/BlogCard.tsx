import { BlogCardProps } from "@/types";
import {
  Badge,
  Box,
  Card,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FiUser } from "react-icons/fi";

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
          transform: "translateY(-4px)",
        }}
        transition="all 0.3s ease"
        cursor="pointer"
        h="full"
      >
        <Box
          h="200px"
          w="full"
          bg="gray.100"
          position="relative"
          overflow="hidden"
        >
          <Image
            src={post.imageUrl || "/images/blog-default.jpg"}
            alt={post.title}
            width={400}
            height={200}
            loading="lazy"
            style={{
              width: "auto",
              height: "200px",
              objectFit: "cover",
              aspectRatio: "2/1",
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Box>

        <Card.Body p={6}>
          <VStack align="start" gap={4} h="full">
            <Badge
              color="var(--primary)"
              bg="rgba(var(--primary-rgb), 0.08)"
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
              _hover={{ color: "var(--primary)" }}
              transition="color 0.2s ease"
              css={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
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
                overflow: "hidden",
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
            </HStack>

            <Text fontSize="xs" color="gray.400">
              {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Link>
  );
}
