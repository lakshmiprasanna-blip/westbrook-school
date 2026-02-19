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
      className="py-8 md:py-16 overflow-hidden"
      style={{ backgroundColor: sectionBg }}
    >
      <div className="container-custom">

                {/* ===== MOBILE TITLE ===== */}
                {/* MOBILE TITLE */}
        <div className="md:hidden mb-5 ">
          <div className="bg-lightblue inline-block px-6 py-2">
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                fontSize: "24px",   // force smaller size
                lineHeight: "100%",
                color: "#2B292A",
              }}
            >
              OUR APPROACH
            </h2>
          </div>
        </div>


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
                        {/* ===== MOBILE LAYOUT ===== */}
                        <div className="md:hidden w-full">

                          {/* IMAGE FIRST */}
                          <div className="relative w-full h-[320px]">
                            <Image
                              src={slide.image}
                              alt={slide.title || "Slide image"}
                              fill
                              className="object-cover"
                              priority
                            />
                          </div>

                          {/* CONTENT */}
                          {/* MOBILE CONTENT */}
                  <div
                    className="px-5 py-5"
                    style={{
                      backgroundColor: cardBg,
                      color: cardTextColor,
                      minHeight: "240px",   // smaller fixed height
                    }}
                  >
                    {slide.title && (
                      <div
                        className="mb-3"
                        style={{
                          fontFamily: "Playfair Display, serif",
                          fontWeight: 700,
                          fontSize: "24px",      // force size (avoid global override)
                          lineHeight: "120%",
                        }}
                      >
                        {slide.title}
                      </div>
                    )}

                    {slide.description && (
                      <div
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 400,
                          fontSize: "16px",      // force smaller
                          lineHeight: "140%",
                        }}
                      >
                        {slide.description}
                      </div>
                    )}
                  </div>

                </div>

                {/* ===== DESKTOP LEFT CONTENT (UNCHANGED) ===== */}
                <div
                  className="hidden md:flex w-full md:w-1/2 px-8 md:px-14 py-14 md:py-20 flex-col justify-center"
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

                  {/* INDICATOR (DESKTOP ONLY) */}
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

                {/* ===== DESKTOP IMAGE SIDE (UNCHANGED) ===== */}
                <div
                  className="hidden md:flex w-full md:w-1/2 bg-white items-center justify-center"
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
              className="border-r border-white/30"
            />
            <ScrollButton
              direction="right"
              onClick={nextSlide}
              bgColor={arrowBg}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
