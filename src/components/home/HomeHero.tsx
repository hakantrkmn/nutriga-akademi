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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>(
    {}
  );
  const autoplayRef = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );
  console.log(slides);

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
    <div className="bg-hero text-hero py-8 md:py-12 relative overflow-hidden border-b border-gray-200">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%234a7c59%22 fill-opacity=%220.15%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        {slides.length > 0 ? (
          <>
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                      {/* Sol Yarı - Metin İçeriği */}
                      <div className="flex items-center justify-center p-6 lg:p-8 bg-hero px-20 min-h-[280px] lg:min-h-[320px]">
                        <div className="text-center lg:text-left max-w-lg w-full">
                          <div className="transform transition-none">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight break-words">
                              {slide.titleMain}
                              <span className="block text-hero-accent break-words">
                                {slide.titleHighlight}
                              </span>
                            </h1>

                            <p className="text-base sm:text-lg md:text-xl text-hero-secondary leading-relaxed break-words mt-6">
                              {slide.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Sağ Yarı - Görsel */}
                      <div className="relative min-h-[280px] lg:min-h-[320px] px-10 flex items-center justify-center">
                        {!imageErrors[index] ? (
                          <div className="relative w-full h-full max-w-full max-h-full rounded-2xl overflow-hidden bg-white/50 flex items-center justify-center">
                            <Image
                              src={slide.imageSrc}
                              alt={slide.imageAlt}
                              fill
                              className="object-contain"
                              priority={true}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              placeholder="blur"
                              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                              onError={() => {
                                setImageErrors((prev) => ({
                                  ...prev,
                                  [index]: true,
                                }));
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary-100/20" />
                          </div>
                        ) : (
                          <div className="relative w-full h-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center rounded-2xl overflow-hidden">
                            <div className="text-gray-500 text-center">
                              <svg
                                className="w-20 h-20 mx-auto mb-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <p className="text-lg">Görsel yüklenemedi</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Slider Indicators */}
            <div className="flex justify-center mt-3 sm:mt-4 gap-2 sm:gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    current === index
                      ? "bg-primary-600 scale-110"
                      : "bg-gray-300 hover:bg-gray-400"
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
          </>
        ) : (
          <div className="flex items-center justify-center min-h-[280px] lg:min-h-[320px] w-full relative">
            {/* Arka plan glow efekti - sürekli animasyon */}
            <div
              className="absolute inset-0 rounded-full animate-background-glow"
              style={{
                background:
                  "radial-gradient(circle, rgba(251, 248, 245, 0.4) 0%, transparent 70%)",
              }}
            />

            <div className="text-center max-w-2xl relative z-10 animate-fade-in">
              {/* Ana başlık - parçalara ayrılmış animasyon */}
              <div className="mb-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                  <span className="inline-block text-gray-900 animate-float-up">
                    Çok yakında
                  </span>{" "}
                  <span className="inline-block font-extrabold text-hero-accent animate-color-shift">
                    eğitimlerimizle
                  </span>{" "}
                  <span className="inline-block text-gray-900 animate-float-down">
                    birlikte buradayız...
                  </span>
                </h1>
              </div>

              {/* Alt açıklama - sürekli hafif pulse efekti */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
