"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LeadershipSection({ data }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full bg-[#F3F3F3] py-16">
      <div className="container-custom">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[var(--color-lightblue)] px-5 py-1.5">
            <h2 className="font-[Playfair_Display] font-bold text-5xl">
              LEADERSHIP TEAM
            </h2>
          </div>
        </div>

        {/* ================= DESKTOP GRID ================= */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 items-stretch">
          {data.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              {/* Image */}
              <div
                className="relative w-full h-[320px] flex-shrink-0"
                onClick={() => setSelectedImage(item.image)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Blue Section */}
              <div className="bg-[#1F4E79] group-hover:bg-[var(--color-maroon)] transition-all duration-300 px-6 py-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-white !text-[26px] leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-white !text-[12px] !font-semibold uppercase tracking-wide">
                    {item.role}
                  </p>

                  <div className="w-7 h-7 border-3 border-white rounded-full  flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--color-maroon)]">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12H16" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 8l4 4-4 4" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= MOBILE SLIDER ================= */}
        <div className="md:hidden">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="group cursor-pointer"
          >
            <div
              className="relative w-full h-[380px]"
              onClick={() => setSelectedImage(data[current].image)}
            >
              <Image
                src={data[current].image}
                alt={data[current].title}
                fill
                className="object-cover"
              />
            </div>

            <div className="bg-[#1F4E79] px-5 py-5">
              <h3 className="text-white !text-[26px] font-semibold leading-tight">
                {data[current].title}
              </h3>

              <div className="flex items-center justify-between mt-3">
                <p className="text-white !text-[14px] uppercase tracking-wide">
                  {data[current].role}
                </p>

                <div className="w-8 h-8 rounded-full bg-[#2E5C88] flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12H16" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 8l4 4-4 4" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Slider Arrows */}
          <div className="flex justify-center mt-6">
            <div className="flex">
              <button
                onClick={prevSlide}
                className="w-14 h-14 bg-[var(--color-maroon)] flex items-center justify-center border-r border-white/30"
              >
                <svg width="28" height="18" viewBox="0 0 46 28">
                  <path
                    d="M45 14H3M3 14L16 1M3 14L16 27"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="w-14 h-14 bg-[var(--color-maroon)] flex items-center justify-center"
              >
                <svg width="28" height="18" viewBox="0 0 46 28">
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

        {/* ================= TABLET SLIDER (2 CARDS) ================= */}
<div className="hidden md:block lg:hidden overflow-hidden">
  <motion.div
    animate={{ x: `-${current * 50}%` }}
    transition={{ duration: 0.5 }}
    className="flex"
  >
    {data.map((item, index) => (
      <div key={index} className="w-1/2 px-3 flex-shrink-0">
        <div className="group cursor-pointer">
          <div
            className="relative w-full h-[360px]"
            onClick={() => setSelectedImage(item.image)}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="bg-[#1F4E79] px-6 py-5">
            <h3 className="text-white !text-[22px] font-semibold leading-tight">
              {item.title}
            </h3>

            <div className="flex items-center justify-between mt-3">
              <p className="text-white !text-[13px] uppercase tracking-wide">
                {item.role}
              </p>

              <div className="w-8 h-8 rounded-full bg-[#2E5C88] flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 12H16" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 8l4 4-4 4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </motion.div>

  {/* Arrows */}
  <div className="flex justify-center mt-6">
    <div className="flex">
      <button
        onClick={prevSlide}
        className="w-14 h-14 bg-[var(--color-maroon)] flex items-center justify-center border-r border-white/30"
      >
        <svg width="28" height="18" viewBox="0 0 46 28">
          <path
            d="M45 14H3M3 14L16 1M3 14L16 27"
            stroke="white"
            strokeWidth="1.5"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="w-14 h-14 bg-[var(--color-maroon)] flex items-center justify-center"
      >
        <svg width="28" height="18" viewBox="0 0 46 28">
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

      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl h-[75vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Preview"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
