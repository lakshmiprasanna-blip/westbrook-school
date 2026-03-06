"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollButton from "../../components/ScrollButton";

export default function CoreValuesSection() {
  const slides = [
    {
      title: "Learning at the Child’s Pace",
      desc: "Every child is guided based on their pace, strengths, and learning needs through close teacher involvement and mentoring. This helps learning progress steadily without pressure or comparison.",
      image: "/assets/corevalues1.webp",
    },
    {
      title: "Values That Shape Behaviour",
      desc: "Culture and values are woven into everyday school life through interactions, routines, and expectations, helping children grow with respect, responsibility, and empathy.",
      image: "/assets/corevalues2 (2).webp",
    },
    {
      title: "Adaptable and Evolving Pedagogy",
      desc: "Teaching practices are reviewed and refined to remain relevant to how children learn today, ensuring learning stays meaningful and effective.",
      image: "/assets/corevalues3.webp",
    },
    {
      title: "Education Without Burnout",
      desc: "Strong classroom teaching and clear academic foundations reduce the need for excessive after-school coaching, allowing children time for rest, reflection, and balanced growth.",
      image: "/assets/corevalues4.webp",
    },
  ];

  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));

  const nextSlide = () =>
    setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1));

  return (
    <section className="bg-primary overflow-hidden py-14 lg:py-18 ">

      {/* ===== TOP CONTENT ===== */}
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 items-start md:mt-15 gap-10 mb-8 md:mb-12">

        {/* LEFT STRIP */}
        <div className="flex justify-center md:justify-start">
  <div className="bg-[#A2D5EB] px-6 py-2 inline-block w-fit">
    <h2 className="leading-[100%] text-2xl min-[361px]:!text-3xl text-[#2B292A]">
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
      {/* ===== IMAGE ===== */}
<div className="container-custom">
  <div className="relative w-full h-[280px] md:h-[450px] lg:h-[520px]">
    <Image
      src={slides[current].image}
      alt={slides[current].title}
      fill
      sizes="(max-width: 768px) 100vw,
            (max-width: 1024px) 100vw,
            100vw"
      className="object-cover"
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