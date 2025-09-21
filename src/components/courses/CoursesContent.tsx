"use client";

import { Egitim } from "@/types";
// Chakra UI imports removed
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
    <div className="bg-background-alt w-full min-h-screen">
      <div className="flex flex-col gap-0 w-full">
        <EgitimlerHero />
        <CategoryFilter
          selectedCategory={selectedCategory}
          selectedLevel={selectedLevel}
          onCategoryChange={handleCategoryChange}
          onLevelChange={handleLevelChange}
        />
        <EgitimlerGrid egitimler={filteredEgitimler} />
      </div>
    </div>
  );
}
