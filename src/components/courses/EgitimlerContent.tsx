"use client";

import { useState, useMemo } from "react";
import { VStack } from "@chakra-ui/react";
import EgitimlerHero from "./EgitimlerHero";
import CategoryFilter from "./CategoryFilter";
import EgitimlerGrid from "./EgitimlerGrid";
import { dummyEgitimler } from "@/data/dummyEgitimData";

export default function EgitimlerContent() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [selectedLevel, setSelectedLevel] = useState("");

  const filteredEgitimler = useMemo(() => {
    let filtered = dummyEgitimler;
    
    if (selectedCategory !== "Tümü") {
      filtered = filtered.filter(egitim => egitim.category === selectedCategory);
    }
    
    if (selectedLevel) {
      filtered = filtered.filter(egitim => egitim.level === selectedLevel);
    }
    
    return filtered;
  }, [selectedCategory, selectedLevel]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
  };

  return (
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
  );
}