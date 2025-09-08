"use client";

import { BlogPost } from "@/types";
import { Box, VStack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import CategoryFilter from "./BlogCategoryFilter";
import BlogGrid from "./BlogGrid";
import BlogHero from "./BlogHero";

interface BlogContentProps {
  posts: BlogPost[];
}
export default function BlogContent({ posts }: BlogContentProps) {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "Tümü") {
      return posts;
    }
    return posts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory, posts]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Box bg="var(--background-alt)">
      <VStack gap={0} w="full">
        <BlogHero />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <BlogGrid posts={filteredPosts} />
      </VStack>
    </Box>
  );
}
