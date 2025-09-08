"use client";

import { COURSE_CATEGORIES, COURSE_LEVELS } from "@/constants";
import {
  Button,
  Container,
  HStack,
  NativeSelectField,
  NativeSelectRoot,
  VStack,
} from "@chakra-ui/react";

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
    <Container maxW="1200px" px={{ base: 4, md: 6 }} py={8}>
      <VStack gap={6} align="center">
        <HStack gap={3} flexWrap="wrap" justify="center" align="center">
          {COURSE_CATEGORIES.map((category) => (
            <Button
              key={category}
              size="md"
              variant={selectedCategory === category ? "solid" : "outline"}
              bg={selectedCategory === category ? "var(--primary)" : "white"}
              color={selectedCategory === category ? "white" : "var(--primary)"}
              borderColor="var(--primary)"
              onClick={() => onCategoryChange(category)}
              borderRadius="20px"
              px={6}
              fontSize="sm"
              fontWeight="medium"
              _hover={{
                transform: "translateY(-2px)",
                shadow: "md",
                bg:
                  selectedCategory === category
                    ? "var(--primary-hover)"
                    : "rgba(var(--primary-rgb), 0.06)",
                color:
                  selectedCategory === category ? "white" : "var(--primary)",
              }}
              transition="all 0.2s ease"
            >
              {category}
            </Button>
          ))}
        </HStack>

        <HStack gap={4} flexWrap="wrap" justify="center">
          <NativeSelectRoot maxW="200px">
            <NativeSelectField
              value={selectedLevel}
              onChange={(e) => onLevelChange(e.target.value)}
              borderColor="var(--primary)"
              _focus={{
                borderColor: "var(--primary-hover)",
                boxShadow: "0 0 0 1px var(--primary-hover)",
              }}
            >
              <option value="">Seviye Seçin</option>
              {COURSE_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level} Seviye
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </HStack>
      </VStack>
    </Container>
  );
}
