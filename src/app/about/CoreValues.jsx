"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollButton from "../../components/ScrollButton";

export default function CoreValuesSection() {
  const slides = [
    {
      title: "Learning at the Child’s Pace",
      desc: "Every child is guided based on their pace, strengths, and learning needs through close teacher involvement and mentoring. This helps learning progress steadily without pressure or comparison.",
      image: "/assets/corevalues1.png",
    },
    {
      title: "Holistic Development",
      desc: "We focus on emotional, physical, and intellectual growth through structured activities.",
      image: "/assets/corevalues2.png",
    },
    {
      title: "Safe & Nurturing Environment",
      desc: "Children learn best in a secure, caring, and joyful atmosphere.",
      image: "/assets/corevalues4.png",
    },
  ];

  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));

  const nextSlide = () =>
    setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1));

  return (
    <section className="bg-primary overflow-hidden py-14 lg:py-18">

      {/* ===== TOP CONTENT ===== */}
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 items-start gap-10 mb-8 md:mb-12">

        {/* LEFT STRIP */}
        <div className="flex justify-center md:justify-start">
          <div className="bg-[#A2D5EB] px-6 py-2 inline-block w-fit">
            <h2 className="leading-[100%] text-[#2B292A]">
              OUR CORE VALUES
            </h2>
          </div>
        </div>

        {/* RIGHT TEXT SLIDER (DESKTOP ONLY) */}
        <div className="hidden md:block text-white overflow-hidden">
          <div
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((s, i) => (
              <div key={i} className="min-w-full">
                <h3 className="mb-4  text-white">
                  {s.title}
                </h3>

                <p className="leading-[24px] opacity-90 max-w-lg text-white">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== IMAGE ===== */}
      <div className="px-6">
        <div className="relative w-full h-[280px] md:h-[450px] lg:h-[520px]">
          <Image
  src={slides[current].image}
  alt={slides[current].title}
  fill
  sizes="(max-width: 768px) 100vw,
         (max-width: 1024px) 100vw,
         100vw"
  className="object-cover rounded-sm"
/>
        </div>
      </div>

      {/* ===== MOBILE TEXT (BELOW IMAGE) */}
      <div className="container-custom mt-6 md:hidden text-white min-h-[170px]">
        <h3 className="mb-3 leading-[100%] text-white">
          {slides[current].title}
        </h3>

        <p className="leading-[24px] opacity-90 text-white">
          {slides[current].desc}
        </p>
      </div>

      {/* ===== ARROWS ===== */}
      <div className="flex justify-center mt-8">
        <div className="flex">
          <ScrollButton
            direction="left"
            onClick={prevSlide}
            bgColor="#9B1B2F"
            className="border-r border-white/30"
          />

          <ScrollButton
            direction="right"
            onClick={nextSlide}
            bgColor="#9B1B2F"
          />
        </div>
      </div>

    </section>
  );
}