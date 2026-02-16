"use client";

import { useState } from "react";
import Image from "next/image";

export default function AcademicsScrollSection() {
  const slides = [
    {
      smallTitle: "Our Curriculum",
      title: "What we follow",
      description:
        "The IGCSE curriculum forms the academic framework at Westbrook, supporting concept clarity, application, and clear communication.",
      image: "/assets/academicsscroll1.webp",
    },
    {
      title: "How learning progresses ?",
      description:
        "Subjects are structured to build understanding gradually across grades, allowing students to connect ideas and strengthen foundations over time.",
      image: "/assets/info1.png",
    },
    {
      title: "Why this matters ?",
      description:
        "This approach helps students move beyond memorization and develop confidence in applying what they learn.",
      
        image: "/assets/explore-collage1.webp",
    },
  ];

  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <section className="bg-[#F7F6F2] py-16 md:py-20 overflow-hidden">
      <div className="container-custom">

        {/* ===== SLIDER WRAPPER ===== */}
        <div className="overflow-hidden">

          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="min-w-full flex flex-col md:flex-row"
              >
                {/* ===== FIXED HEIGHT CARD ===== */}
                <div className="w-full md:w-1/2 bg-[#0F4D81] text-white px-8 md:px-14 py-14 md:py-20 flex flex-col justify-center min-h-[520px]">

                  {slide.smallTitle && (
                    <p className="text-[16px] md:text-[18px] font-medium mb-6">
                      {slide.smallTitle}
                    </p>
                  )}

                  <h2
                    className="text-[32px] md:text-[40px] lg:text-[48px] leading-[100%] mb-6"
                    style={{
                      fontFamily: "Playfair Display, serif",
                      fontWeight: 700,
                    }}
                  >
                    {slide.title}
                  </h2>

                  <p
                    className="text-[16px] md:text-[20px] leading-[150%] max-w-lg"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {slide.description}
                  </p>

                  {/* Moving Indicator Line */}
                  <div className="mt-10 w-[60%] h-[2px] bg-white/30 relative overflow-hidden">
                    <div
                      className="absolute top-0 h-[2px] w-[25%] bg-white transition-all duration-500"
                      style={{
                        transform: `translateX(${current * 100}%)`,
                      }}
                    />
                  </div>
                </div>

                {/* ===== IMAGE SIDE (Same Height Always) ===== */}
                <div className="w-full md:w-1/2 bg-white flex items-center justify-center min-h-[520px] ">
                  <div className="relative w-full h-full max-h-[520px]">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover object-[center_30%]"
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

            <button
              onClick={prevSlide}
              className="w-[70px] h-[70px] bg-[#9B1B2F] flex items-center justify-center border-r border-white/30"
            >
              <svg width="40" height="24" viewBox="0 0 46 28">
                <path
                  d="M45 14H3M3 14L16 1M3 14L16 27"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="w-[70px] h-[70px] bg-[#9B1B2F] flex items-center justify-center"
            >
              <svg width="40" height="24" viewBox="0 0 46 28">
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
