"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { HeroSlide } from "@prisma/client";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
export default function Hero({ slides }: { slides: HeroSlide[] }) {
  const [isMobile, setIsMobile] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>(
    {}
  );
  const autoplayRef = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    const handlePointerDown = () => {
      // Kullanıcı dokunduğunda autoplay'i durdur
      autoplayRef.current?.stop();
    };

    const handlePointerUp = () => {
      // 5 saniye sonra autoplay'i tekrar başlat
      setTimeout(() => {
        autoplayRef.current?.play();
      }, 5000);
    };

    api.on("select", handleSelect);
    api.on("pointerDown", handlePointerDown);
    api.on("pointerUp", handlePointerUp);

    return () => {
      api.off("select", handleSelect);
      api.off("pointerDown", handlePointerDown);
      api.off("pointerUp", handlePointerUp);
    };
  }, [api]);

  return (
    <div className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16 md:py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <Carousel
          className="w-full"
          setApi={setApi}
          opts={{
            loop: true,
            align: "start",
            containScroll: false,
            dragFree: false,
            duration: 30,
            skipSnaps: false,
            watchDrag: false,
          }}
          plugins={[autoplayRef.current]}
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="basis-full">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 h-[350px] sm:h-[450px] w-full py-8 relative overflow-hidden">
                  {/* Content */}
                  <div className="flex-1 min-w-0 w-full lg:w-auto space-y-6 text-center lg:text-left">
                    <div className="transform transition-none">
                      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight break-words">
                        {slide.titleMain}
                        <span className="block text-green-300 break-words">
                          {slide.titleHighlight}
                        </span>
                      </h1>

                      <p className="text-sm sm:text-base md:text-lg opacity-90 leading-relaxed break-words mt-6">
                        {slide.description}
                      </p>
                    </div>
                  </div>

                  {/* Hero Image */}
                  {!isMobile && (
                    <div className="flex-shrink-0 w-full lg:w-[350px] max-w-[350px]">
                      {!imageErrors[index] ? (
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                          <Image
                            src={slide.imageSrc}
                            alt={slide.imageAlt}
                            width={350}
                            height={280}
                            className="w-full h-[280px] object-cover"
                            priority={index === 0}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                            onError={() => {
                              setImageErrors((prev) => ({
                                ...prev,
                                [index]: true,
                              }));
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-green-700/10" />
                        </div>
                      ) : (
                        <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-green-600/20 to-green-700/20 h-[280px] flex items-center justify-center">
                          <div className="text-white/60 text-center">
                            <svg
                              className="w-16 h-16 mx-auto mb-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <p className="text-sm">Görsel yüklenemedi</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Slider Indicators */}
        <div className="flex justify-center mt-4 sm:mt-6 gap-2 sm:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                current === index
                  ? "bg-white scale-110"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              onClick={() => {
                // Autoplay'i durdur
                autoplayRef.current?.stop();
                api?.scrollTo(index);
                // 5 saniye sonra autoplay'i tekrar başlat
                setTimeout(() => {
                  autoplayRef.current?.play();
                }, 5000);
              }}
              aria-label={`Slide ${index + 1}'e git`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
