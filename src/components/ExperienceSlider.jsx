"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollButton from "./ScrollButton"

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
        <div className="flex justify-center mb-10 md:mb-12">
          <h2 className="heading bg-lightblue text-dark px-6 md:px-8 py-2 text-4xl md:text-5xl uppercase">
            EXPERIENCE
          </h2>
        </div>
        <div className="flex items-center justify-center gap-6">
          <div className="hidden md:block relative w-[220px] h-[480px] overflow-hidden">
            <Image
              src={images[leftIndex]}
              alt="Left"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full md:w-[820px] h-[400px] md:h-[480px] overflow-hidden">
            <Image
              src={images[current]}
              alt="Center"
              fill
              className="object-cover"
            />
          </div>
          <div className="hidden md:block relative w-[220px] h-[480px] overflow-hidden">
            <Image
              src={images[rightIndex]}
              alt="Right"
              fill
              className="object-cover"
            />
          </div>

        </div> 

      <div className="flex justify-center mt-12">
      <div className="flex">

        <ScrollButton
          direction="left"
          onClick={prevSlide}
          bgColor="var(--color-maroon)"
          className="border-r border-white/30"
        />

        <ScrollButton
          direction="right"
          onClick={nextSlide}
          bgColor="var(--color-maroon)"
        />

      </div>
    </div>

      </div>
    </section>
  );
}
