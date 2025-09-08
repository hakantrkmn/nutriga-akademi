"use client";

import { BlogPost } from "@/types";
// Chakra UI imports removed
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
    <div className="bg-gray-50">
      <div className="flex flex-col gap-0 w-full">
        <BlogHero />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <BlogGrid posts={filteredPosts} />
      </div>
    </div>
  );
}
