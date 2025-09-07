"use client";

import { useState, useMemo } from "react";
import { VStack } from "@chakra-ui/react";
import BlogHero from "./BlogHero";
import CategoryFilter from "./CategoryFilter";
import BlogGrid from "./BlogGrid";
import { dummyBlogPosts } from "@/data/dummyBlogData";

export default function BlogContent() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "Tümü") {
      return dummyBlogPosts;
    }
    return dummyBlogPosts.filter(post => post.category === selectedCategory);
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