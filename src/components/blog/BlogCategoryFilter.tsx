"use client";

import { blogCategories } from "@/data/dummyBlogData";
import { CategoryFilterProps } from "@/types";
import { Button, Container, HStack } from "@chakra-ui/react";

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <Container maxW="1200px" px={{ base: 4, md: 6 }} py={8}>
      <HStack gap={3} flexWrap="wrap" justify="center" align="center">
        {blogCategories.map((category) => (
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
              color: selectedCategory === category ? "white" : "var(--primary)",
            }}
            transition="all 0.2s ease"
          >
            {category}
          </Button>
        ))}
      </HStack>
    </Container>
  );
}
