"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollButton from "./ScrollButton";

export default function ScrollSlider({
  slides = [],
  sectionBg = "#F7F6F2",
  cardBg = "#0F4D81",
  cardTextColor = "#FFFFFF",
  arrowBg = "#9B1B2F",
  indicatorWidth = "25%",
  minHeight = 520,
}) {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  const nextSlide = () =>
    setCurrent((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );

  return (
    <section
      className="py-16 md:py-20 overflow-hidden"
      style={{ backgroundColor: sectionBg }}
    >
      <div className="container-custom">

        {/* ===== SLIDER WRAPPER ===== */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="min-w-full flex flex-col md:flex-row"
              >
                {/* ===== LEFT CONTENT ===== */}
                <div
                  className="w-full md:w-1/2 px-8 md:px-14 py-14 md:py-20 flex flex-col justify-center"
                  style={{
                    backgroundColor: cardBg,
                    color: cardTextColor,
                    minHeight: `${minHeight}px`,
                  }}
                >
                  {slide.smallTitle && (
                    <div
                      className="text-[16px] md:text-[18px] mb-6"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {slide.smallTitle}
                    </div>
                  )}

                  {slide.title && (
                    <div
                      className="text-[32px] md:text-[40px] lg:text-[48px] leading-[100%] mb-6"
                      style={{
                        fontFamily: "Playfair Display, serif",
                        fontWeight: 700,
                      }}
                    >
                      {slide.title}
                    </div>
                  )}

                  {slide.description && (
                    <div
                      className="text-[16px] md:text-[20px] leading-[150%] max-w-lg"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {slide.description}
                    </div>
                  )}

                  {/* ===== Indicator ===== */}
                  <div className="mt-10 w-[60%] h-[2px] bg-white/30 relative overflow-hidden">
                    <div
                      className="absolute top-0 h-[2px] bg-white transition-all duration-500"
                      style={{
                        width: indicatorWidth,
                        transform: `translateX(${current * 100}%)`,
                      }}
                    />
                  </div>
                </div>

                {/* ===== IMAGE SIDE ===== */}
                <div
                  className="w-full md:w-1/2 bg-white flex items-center justify-center"
                  style={{ minHeight: `${minHeight}px` }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={slide.image}
                      alt={slide.title || "Slide image"}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== ARROWS ===== */}
       
<div className="flex justify-center mt-10">
  <div className="flex">

    <ScrollButton
      direction="left"
      onClick={prevSlide}
      bgColor={arrowBg}
      size={70}
      className="border-r border-white/30"
    />

    <ScrollButton
      direction="right"
      onClick={nextSlide}
      bgColor={arrowBg}
      size={70}
    />

  </div>
</div>


      </div>
    </section>
  );
}
