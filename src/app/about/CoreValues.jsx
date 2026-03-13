"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollButton from "../../components/ScrollButton";

export default function CoreValuesSection() {
  const slides = [
    {
      title: "Learning at the Child's Pace",
      desc: "Every child is guided based on their pace, strengths, and learning needs through close teacher involvement and mentoring. This helps learning progress steadily without pressure or comparison.",
      image: "/assets/corevaluess2.webp",
    },
    {
      title: "Values That Shape Behaviour",
      desc: "Culture and values are woven into everyday school life through interactions, routines, and expectations, helping children grow with respect, responsibility, and empathy.",
      image: "/assets/core-valuess1.webp",
    },
    {
      title: "Adaptable and Evolving Pedagogy",
      desc: "Teaching practices are reviewed and refined to remain relevant to how children learn today, ensuring learning stays meaningful and effective.",
      image: "/assets/corevaluess3.webp",
    },
    {
      title: "Education Without Burnout",
      desc: "Strong classroom teaching and clear academic foundations reduce the need for excessive after-school coaching, allowing children time for rest, reflection, and balanced growth.",
      image: "/assets/corevaluess4.webp",
    },
  ];

  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));

  const nextSlide = () =>
    setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1));

  return (
<section className="bg-primary py-10 md:py-14 lg:py-18">  {/* removed overflow-hidden */}
  <div className="container-custom overflow-hidden">        {/* moved overflow-hidden here */}
    <div className="grid grid-cols-1 md:grid-cols-[45%_55%] items-center gap-0">

      {/* ===== LEFT: Title + Text + Arrows ===== */}
      <div className="flex flex-col justify-center px-2 sm:px-4 md:px-0 mb-6 md:mb-0">

        {/* Title Strip */}
        <div className="bg-[#A2D5EB] px-4 sm:px-6 py-2 inline-block w-fit mb-6 md:mb-8">
          <h2 className="leading-[100%] text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#2B292A]">
            OUR CORE VALUES
          </h2>
        </div>

        {/* Sliding Text */}
        <div className="text-white overflow-hidden">
          <div
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((s, i) => (
              <div key={i} className="min-w-full pr-4">
                <h3 className="mb-3 md:mb-4 text-white text-lg sm:text-xl md:text-2xl">
                  {s.title}
                </h3>
                <p className="leading-[22px] md:leading-[24px] opacity-90 text-white text-sm sm:text-base max-w-xs sm:max-w-sm">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <div className="flex mt-6 md:mt-8">
          <ScrollButton direction="left" onClick={prevSlide} bgColor="#9B1B2F" className="border-r border-white/30" />
          <ScrollButton direction="right" onClick={nextSlide} bgColor="#9B1B2F" />
        </div>
      </div>

      {/* ===== RIGHT: Image ===== */}
      <div className="relative w-full h-[240px] sm:h-[320px] md:h-[420px] lg:h-[500px] xl:h-[540px]">
        <Image
          src={slides[current].image}
          alt={slides[current].title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 55vw"
          className="object-cover object-top"
        />
      </div>

    </div>
  </div>
</section>
  );
}