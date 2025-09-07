"use client";

import { BlogDetailContentProps } from "@/types";
import { Box, Container, VStack } from "@chakra-ui/react";
import BlogDetailContentTipTap from "./BlogDetailContentTipTap";
import BlogDetailFooter from "./BlogDetailFooter";
import BlogDetailHeader from "./BlogDetailHeader";

export default function BlogDetailContent({ post }: BlogDetailContentProps) {
  return (
    <Box bg="white" minH="100vh">
      <Container maxW="800px" px={{ base: 4, md: 6 }} py={8}>
        <VStack gap={8} align="start" w="full">
          <BlogDetailHeader post={post} />

          <BlogDetailContentTipTap
            formData={post}
            setFormData={() => {}}
            isEditing={false}
            content={post.content as object}
          />

          <BlogDetailFooter />
        </VStack>
      </Container>
    </Box>
  );
}
