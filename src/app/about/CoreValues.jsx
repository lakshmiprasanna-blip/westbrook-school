"use client";

import { useState } from "react";
import Image from "next/image";

export default function CoreValuesSection() {
  const slides = [
    {
      title: "Learning at the Child’s Pace",
      desc: "Every child is guided based on their pace, strengths, and learning needs through close teacher involvement and mentoring.",
      image: "/assets/experience1.png",
    },
    {
      title: "Holistic Development",
      desc: "We focus on emotional, physical, and intellectual growth through structured activities.",
      image: "/assets/experience2.png",
    },
    {
      title: "Safe & Nurturing Environment",
      desc: "Children learn best in a secure, caring, and joyful atmosphere.",
      image: "/assets/experience3.png",
    },
  ];

  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));

  const nextSlide = () =>
    setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1));

  return (
    <section className="bg-[#114d7a] overflow-hidden py-16 md-h-[1000px]">

      {/* TOP STRIP */}
      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 items-center gap-12">

        {/* OUR CORE VALUES */}
        <div
          className="bg-[#cfefff] text-black flex items-center justify-center"
          style={{ width: 440, height: 64 }}
        >
          <h2 className="text-3xl font-bold">OUR CORE VALUES</h2>
        </div>

        {/* Sliding Text */}
        <div className="text-white overflow-hidden">
          <div
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((s, i) => (
              <div key={i} className="min-w-full">
                <span
                  className="block text-[32px] mb-4"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {s.title}
                </span>
                <p className="text-sm leading-relaxed opacity-90 max-w-xl">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* IMAGE (slightly reduced width) */}
      <div className="max-w-[92%] mx-auto mt-10 relative h-[480px] overflow-hidden rounded-md">
        <div
          className="flex h-full transition-transform duration-700"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div key={i} className="min-w-full h-full relative">
              <Image
                src={s.image}
                alt={s.title}
                fill
              />
            </div>
          ))}
        </div>
      </div>

      {/* ARROWS */}
      <div className="flex justify-center mt-10">
        <div className="flex">
          <button
            onClick={prevSlide}
            className="w-[73px] h-[73px] bg-[var(--color-maroon)] flex items-center justify-center border-r border-white/30 hover:bg-[#7d1423] transition"
          >
            <svg width="46" height="28" viewBox="0 0 46 28">
              <path
                d="M45 14H3M3 14L16 1M3 14L16 27"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="w-[73px] h-[73px] bg-[var(--color-maroon)] flex items-center justify-center hover:bg-[#7d1423] transition"
          >
            <svg width="46" height="28" viewBox="0 0 46 28">
              <path
                d="M1 14H43M43 14L30 1M43 14L30 27"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
