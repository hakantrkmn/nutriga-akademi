"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COURSE_CATEGORIES, COURSE_LEVELS } from "@/constants";

interface CategoryFilterProps {
  selectedCategory: string;
  selectedLevel: string;
  onCategoryChange: (category: string) => void;
  onLevelChange: (level: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  selectedLevel,
  onCategoryChange,
  onLevelChange,
}: CategoryFilterProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col gap-6 items-center">
        <div className="flex gap-3 flex-wrap justify-center items-center">
          {COURSE_CATEGORIES.map((category) => (
            <Button
              key={category}
              size="sm"
              variant={selectedCategory === category ? "default" : "outline"}
              className={`rounded-full px-6 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-md ${
                selectedCategory === category
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "border-green-600 text-green-600 hover:bg-green-50"
              }`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          <Select value={selectedLevel} onValueChange={onLevelChange}>
            <SelectTrigger className="w-48 focus:border-green-500 focus:ring-1 focus:ring-green-500">
              <SelectValue placeholder="Seviye seçin..." />
            </SelectTrigger>
            <SelectContent>
              {COURSE_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
