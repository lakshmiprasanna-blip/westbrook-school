"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollButton from "./ScrollButton";

export default function ScrollSlider({
  slides = [],
  sectionBgClass = "bg-[#F7F6F2]",
  cardBgClass = "bg-[#0F4D81]",
  cardTextClass = "text-white",
  arrowBgClass = "bg-[#9B1B2F]",
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
    <section className={`py-8 md:py-16 overflow-hidden ${sectionBgClass}`}>
      <div className="container-custom">

        {/* MOBILE TITLE */}
        <div className="md:hidden mb-5">
          <div className="bg-[#A2D5EB] inline-block px-6 py-2">
            <h2 className="text-[#2B292A]">
              OUR APPROACH
            </h2>
          </div>
        </div>

        {/* SLIDER WRAPPER */}
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

                {/* MOBILE */}
                <div className="md:hidden w-full">
                  <div className="relative w-full h-[320px]">
                    <Image
                      src={slide.image}
                      alt={slide.title || "Slide image"}
                      fill   sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      
                    />
                  </div>

                  <div
                    className={`px-5 py-5 ${cardBgClass} ${cardTextClass}`}
                    style={{ minHeight: "240px" }}
                  >
                    {slide.title && (
                      <h3 className={`mb-3 ${cardTextClass}`}>
                        {slide.title}
                      </h3>
                    )}

                    {slide.description && (
                      <p className={cardTextClass}>
                        {slide.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* DESKTOP CONTENT */}
                <div
                  className={`hidden md:flex w-full md:w-1/2 px-8 md:px-14 py-14 md:py-20 flex-col justify-center ${cardBgClass} ${cardTextClass}`}
                  style={{ minHeight: `${minHeight}px` }}
                >
                  {slide.smallTitle && (
                    <p className={`mb-6 ${cardTextClass} font-medium`}>
                      {slide.smallTitle}
                    </p>
                  )}

                  {slide.title && (
                    <h2 className={`mb-6 ${cardTextClass}`}>
                      {slide.title}
                    </h2>
                  )}

                  {slide.description && (
                    <p className={`max-w-lg ${cardTextClass}`}>
                      {slide.description}
                    </p>
                  )}

                  {/* INDICATOR */}
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

                {/* DESKTOP IMAGE */}
                <div
                  className="hidden md:flex w-full md:w-1/2 bg-white items-center justify-center"
                  style={{ minHeight: `${minHeight}px` }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={slide.image}
                      alt={slide.title || "Slide image"}
                      fill sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      
                    />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* ARROWS */}
        <div className="flex justify-center mt-10">
          <div className="flex">
            <ScrollButton
              direction="left"
              onClick={prevSlide}
              bgColorClass={arrowBgClass}
              className="border-r border-white/30"
            />
            <ScrollButton
              direction="right"
              onClick={nextSlide}
              bgColorClass={arrowBgClass}
            />
          </div>
        </div>

      </div>
    </section>
  );
}