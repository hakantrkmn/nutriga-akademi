"use client";

import { Button } from "@/components/ui/button";
import { BLOG_CATEGORIES } from "@/constants";
import { CategoryFilterProps } from "@/types";

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="flex gap-3 flex-wrap justify-center items-center">
        {BLOG_CATEGORIES.map((category) => (
          <Button
            key={category}
            size="sm"
            variant={selectedCategory === category ? "default" : "outline"}
            className={`rounded-full px-6 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-md ${
              selectedCategory === category
                ? "bg-primary hover:bg-primary-hover text-white"
                : "border-primary text-primary hover:bg-primary-50"
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
