"use client";

import {
  HStack,
  Button,
  Container,
  VStack,
  NativeSelectField,
  NativeSelectRoot
} from "@chakra-ui/react";
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
  onLevelChange 
}: CategoryFilterProps) {
  return (
    <Container maxW="1200px" px={{ base: 4, md: 6 }} py={8}>
      <VStack gap={6} align="center">
        <HStack
          gap={3}
          flexWrap="wrap"
          justify="center"
          align="center"
        >
          {COURSE_CATEGORIES.map((category) => (
            <Button
              key={category}
              size="md"
              variant={selectedCategory === category ? "solid" : "outline"}
              colorScheme={selectedCategory === category ? "green" : undefined}
              bg={selectedCategory === category ? "green.500" : "white"}
              color={selectedCategory === category ? "white" : "green.600"}
              borderColor="green.500"
              onClick={() => onCategoryChange(category)}
              borderRadius="20px"
              px={6}
              fontSize="sm"
              fontWeight="medium"
              _hover={{
                transform: "translateY(-2px)",
                shadow: "md",
                bg: selectedCategory === category ? "green.600" : "green.50",
                color: selectedCategory === category ? "white" : "green.700"
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
              borderColor="green.500"
              _focus={{
                borderColor: "green.600",
                boxShadow: "0 0 0 1px var(--chakra-colors-green-600)"
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