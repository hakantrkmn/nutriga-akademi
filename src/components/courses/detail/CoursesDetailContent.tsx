"use client";

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
    <div className="bg-background-alt min-h-screen">
      {/* Header/Hero Section */}
      <EgitimDetailHero
        egitim={egitim}
        isImageError={isImageError}
        setIsImageError={setIsImageError}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1.5fr] gap-12 lg:gap-10">
          {/* Left Column: Course Content */}
          <EgitimContent egitim={egitim} />

          {/* Right Column: Sticky Sidebar */}
          <EgitimPrice egitim={egitim} />
        </div>

        {/* CTA Section */}
        <EgitimCTA egitim={egitim} />
      </div>
    </div>
  );
}
