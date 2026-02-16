"use client";

import { useState } from "react";
import Image from "next/image";

export default function ExperienceSection() {
  const images = [
    "/assets/experience1.png",
    "/assets/experience2.png",
    "/assets/experience3.png",
    "/assets/experience4.png",
    "/assets/experience5.png",
    "/assets/experience6.png",
    "/assets/experience7.png",
  ];

  const [current, setCurrent] = useState(1);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const leftIndex = current === 0 ? images.length - 1 : current - 1;
  const rightIndex = current === images.length - 1 ? 0 : current + 1;

  return (
    <section className="bg-[var(--color-primary)] py-16 md:py-20">
      <div className="container-custom">

        {/* Title */}
        <div className="flex justify-center mb-10 md:mb-12">
          <h2 className="bg-[var(--color-lightblue)] text-[var(--color-dark)] px-6 md:px-8 py-2 text-4xl md:text-5xl uppercase">
            EXPERIENCE
          </h2>
        </div>

        {/* Images */}
        <div className="flex items-center justify-center gap-6">

          {/* Left - hidden on mobile */}
          <div className="hidden md:block relative w-[220px] h-[480px] overflow-hidden">
            <Image
              src={images[leftIndex]}
              alt="Left"
              fill
              className="object-cover"
            />
          </div>

          {/* Center - always visible */}
          <div className="relative w-full md:w-[820px] h-[400px] md:h-[480px] overflow-hidden">
            <Image
              src={images[current]}
              alt="Center"
              fill
              className="object-cover"
            />
          </div>

          {/* Right - hidden on mobile */}
          <div className="hidden md:block relative w-[220px] h-[480px] overflow-hidden">
            <Image
              src={images[rightIndex]}
              alt="Right"
              fill
              className="object-cover"
            />
          </div>

        </div>
{/* Buttons */}
<div className="flex justify-center mt-12">
  <div className="flex">

    {/* Left Button */}
    <button
      onClick={prevSlide}
      className="w-[73px] h-[73px] bg-[var(--color-maroon)] flex items-center justify-center border-r border-white/30 hover:bg-[#7d1423] transition"
    >
      <svg
        width="45.19"
        height="27.82"
        viewBox="0 0 46 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M45 14H3M3 14L16 1M3 14L16 27"
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
    </button>

    {/* Right Button */}
    <button
      onClick={nextSlide}
      className="w-[73px] h-[73px] bg-[var(--color-maroon)] flex items-center justify-center hover:bg-[#7d1423] transition"
    >
      <svg
        width="45.19"
        height="27.82"
        viewBox="0 0 46 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 14H43M43 14L30 1M43 14L30 27"
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
    </button>

  </div>
</div>

      </div>
    </section>
  );
}
