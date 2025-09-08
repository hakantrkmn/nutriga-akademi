"use client";

import { Egitim } from "@/types";
import { Box, VStack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import CategoryFilter from "./CoursesCategoryFilter";
import EgitimlerGrid from "./CoursesGrid";
import EgitimlerHero from "./CoursesHero";

interface EgitimlerContentProps {
  egitimler: Egitim[];
}
export default function EgitimlerContent({ egitimler }: EgitimlerContentProps) {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [selectedLevel, setSelectedLevel] = useState("");

  const filteredEgitimler = useMemo(() => {
    let filtered = egitimler;

    if (selectedCategory !== "Tümü") {
      filtered = filtered.filter(
        (egitim) => egitim.category === selectedCategory
      );
    }

    if (selectedLevel) {
      filtered = filtered.filter((egitim) => egitim.level === selectedLevel);
    }

    return filtered;
  }, [egitimler, selectedCategory, selectedLevel]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
  };

  return (
    <Box bg="var(--background-alt)" w="full" minH="100vh">
      <VStack gap={0} w="full">
        <EgitimlerHero />
        <CategoryFilter
          selectedCategory={selectedCategory}
          selectedLevel={selectedLevel}
          onCategoryChange={handleCategoryChange}
          onLevelChange={handleLevelChange}
        />
        <EgitimlerGrid egitimler={filteredEgitimler} />
      </VStack>
    </Box>
  );
}
