"use client";

import {
  HStack,
  Button,
  Container
} from "@chakra-ui/react";
import { blogCategories } from "@/data/dummyBlogData";
import { CategoryFilterProps } from "@/types";


export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <Container maxW="1200px" px={{ base: 4, md: 6 }} py={8}>
      <HStack
        gap={3}
        flexWrap="wrap"
        justify="center"
        align="center"
      >
        {blogCategories.map((category) => (
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
    </Container>
  );
}