"use client";

import { dummyBlogPosts } from "@/data/dummyBlogData";
import { VStack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import CategoryFilter from "./BlogCategoryFilter";
import BlogGrid from "./BlogGrid";
import BlogHero from "./BlogHero";

export default function BlogContent() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "Tümü") {
      return dummyBlogPosts;
    }
    return dummyBlogPosts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <VStack gap={0} w="full">
      <BlogHero />
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <BlogGrid posts={filteredPosts} />
    </VStack>
  );
}
