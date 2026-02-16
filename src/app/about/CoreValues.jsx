"use client";

import { useState } from "react";
import Image from "next/image";

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
    <section className="bg-[#1F4E79] overflow-hidden py-14 lg:py-18">

      {/* ===== TOP CONTENT (Container Width) ===== */}
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 items-start gap-10 mb-12">

        {/* LEFT STRIP */}
        <div className="bg-[var(--color-lightblue)] px-6 py-2 inline-block w-fit">
          <h2
            className="!text-[26px] md:!text-[34px] lg:!text-[40px] leading-[100%]"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              color: "#2B292A",
            }}
          >
            OUR CORE VALUES
          </h2>
        </div>

        {/* RIGHT TEXT SLIDER */}
        <div className="text-[#F7F6F2] overflow-hidden">
          <div
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((s, i) => (
              <div key={i} className="min-w-full">
                <h3
                  className="!text-[20px] md:!text-[24px] lg:!text-[28px] mb-3 leading-[100%]"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontWeight: 500,
                  }}
                >
                  {s.title}
                </h3>

                <p
                  className="!text-[14px] md:!text-[16px] leading-[24px] opacity-90 max-w-lg"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== FULL WIDTH IMAGE WITH SMALL SIDE MARGIN ===== */}
      <div className="px-6 ">
        <div className="relative w-full h-[320px] md:h-[450px] lg:h-[520px]">
          <Image
  src={slides[current].image}
  alt={slides[current].title}
  fill
  className="object-contain rounded-sm"
  priority
/>

        </div>
      </div>

      {/* ===== ARROWS ===== */}
      <div className="flex justify-center mt-8">
        <div className="flex">
          <button
            onClick={prevSlide}
            className="w-[60px] h-[60px] bg-[var(--color-maroon)] flex items-center justify-center border-r border-white/30 hover:bg-[#7d1423] transition"
          >
            <svg width="36" height="20" viewBox="0 0 46 28">
              <path
                d="M45 14H3M3 14L16 1M3 14L16 27"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="w-[60px] h-[60px] bg-[var(--color-maroon)] flex items-center justify-center hover:bg-[#7d1423] transition"
          >
            <svg width="36" height="20" viewBox="0 0 46 28">
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
