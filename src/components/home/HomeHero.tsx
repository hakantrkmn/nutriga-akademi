"use client";

import { Button } from "@/components/ui/button";
import { heroData } from "@/data/heroData";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16 md:py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 min-h-[500px]">
          {/* Content */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-[600px]">
              {heroData.title.main}
              <span className="block text-green-300">
                {heroData.title.highlight}
              </span>
            </h1>

            <p className="text-lg md:text-xl max-w-[500px] opacity-90 leading-relaxed">
              {heroData.description}
            </p>

            <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
              <Link href={heroData.buttons.primary.href}>
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-semibold rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                  {heroData.buttons.primary.text}
                </Button>
              </Link>

              <Link href={heroData.buttons.secondary.href}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-6 text-lg font-semibold rounded-xl hover:-translate-y-0.5 transition-all"
                >
                  {heroData.buttons.secondary.text}
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4 flex-wrap justify-center lg:justify-start">
              {heroData.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl font-bold text-green-300">
                    {stat.value}
                  </p>
                  <p className="text-sm opacity-80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          {!isMobile && (
            <div className="flex-1 max-w-[500px]">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={heroData.image.src}
                  alt={heroData.image.alt}
                  width={500}
                  height={400}
                  className="w-full h-[400px] object-cover"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-green-700/10" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
