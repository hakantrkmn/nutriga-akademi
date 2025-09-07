"use client";

import React from "react";
import {
  Box,
  Container,

  Grid,

} from "@chakra-ui/react";

import { EgitimDetailContentProps } from "@/types";
import EgitimContent from "./egitimContent";
import EgitimDetailHero from "./egitimDetailHero";
import EgitimPrice from "./egitimPrice";
import EgitimCTA from "./egitimCTA";



export default function EgitimDetailContent({ egitim }: EgitimDetailContentProps) {
  const [isImageError, setIsImageError] = React.useState(false);

  return (
    <Box bg="gray.50" minH="100vh">
      {/* Header/Hero Section */}
      <EgitimDetailHero egitim={egitim} isImageError={isImageError} setIsImageError={setIsImageError} />

      {/* Main Content */}
      <Container maxW="1200px" px={{ base: 4, md: 6 }} py={{ base: 8, md: 12 }}>
        <Grid templateColumns={{ base: "1fr", lg: "2.5fr 1.5fr" }} gap={{ base: 12, lg: 10 }}>
          
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