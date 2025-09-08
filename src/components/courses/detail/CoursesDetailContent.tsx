"use client";

import { Box, Container, Grid } from "@chakra-ui/react";
import React from "react";

import { EgitimDetailContentProps } from "@/types";
import EgitimCTA from "./CoursesCTA";
import EgitimDetailHero from "./CoursesDetailHero";
import EgitimPrice from "./CoursesPriceSection";
import EgitimContent from "./CoursesTiptapSection";

export default function EgitimDetailContent({
  egitim,
}: EgitimDetailContentProps) {
  const [isImageError, setIsImageError] = React.useState(false);

  return (
    <Box bg="var(--background-alt)" minH="100vh">
      {/* Header/Hero Section */}
      <EgitimDetailHero
        egitim={egitim}
        isImageError={isImageError}
        setIsImageError={setIsImageError}
      />

      {/* Main Content */}
      <Container maxW="1200px" px={{ base: 4, md: 6 }} py={{ base: 8, md: 12 }}>
        <Grid
          templateColumns={{ base: "1fr", lg: "2.5fr 1.5fr" }}
          gap={{ base: 12, lg: 10 }}
        >
          {/* Left Column: Course Content */}
          <EgitimContent egitim={egitim} />

          {/* Right Column: Sticky Sidebar */}
          <EgitimPrice egitim={egitim} />
        </Grid>

        {/* CTA Section */}
        <EgitimCTA egitim={egitim} />
      </Container>
    </Box>
  );
}
