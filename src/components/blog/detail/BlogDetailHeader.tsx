import { Button, Icon, Link, VStack, Badge, Heading, HStack, Text, Image } from "@chakra-ui/react";
import { FiArrowLeft, FiUser } from "react-icons/fi";
import { BlogPost } from "@/types";

interface BlogDetailHeaderProps {
  post: BlogPost;
}


export default function BlogDetailHeader({ post }: BlogDetailHeaderProps) {
  return (
    <>
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
        {new Date(post.createdAt).toLocaleDateString('tr-TR', {
          year: 'numeric',
          month: 'long', 
          day: 'numeric'
        })}
      </Text>
    </HStack>
  </VStack>

  <Image
    src={post.imageUrl || ''}
    alt={post.title}
    w="full"
    h="400px"
    objectFit="cover"
    borderRadius="12px"
  />
  </>
  )
}