"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollButton from "./ScrollButton";
import { motion, AnimatePresence } from "framer-motion";

export default function ExperienceSlider({
  items = [],
  title = "EXPERIENCE",
  subtitle = null,
  bgColor = "bg-primary",
}) {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? items.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1));

  const item = items[current];

  return (
    <section className={`${bgColor} py-16 md:py-20`}>
      <div className="container-custom">

        {/* Heading */}
        <div className="flex flex-col items-center mb-10 md:mb-12">
          <h2 className="heading bg-lightblue text-dark px-6 md:px-8 py-2  md:text-5xl uppercase">
            {title}
          </h2>
          {subtitle && (
            <p className="text-center text-dark mt-4 max-w-4xl text-sm md:text-base">
              {subtitle}
            </p>
          )}
        </div>

        {/* Carousel */}
        <div className="flex items-center justify-center gap-6">
          <div className="relative w-full md:w-[940px] h-[360px] md:h-[520px] overflow-hidden">
            <AnimatePresence mode="sync">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {item?.type === "video" ? (
                  <iframe
                    src={item.embedUrl}
                    title={item.title || "Video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <Image
                    src={item?.src}
                    alt={item?.alt || title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    style={{ objectPosition: "center 20%" }}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-12">
          <div className="flex">
            <ScrollButton
              direction="left"
              onClick={prevSlide}
              bgColor="maroon"
              className="border-r border-white/30"
            />
            <ScrollButton
              direction="right"
              onClick={nextSlide}
              bgColor="maroon"
            />
          </div>
        </div>

      </div>
    </section>
  );
}