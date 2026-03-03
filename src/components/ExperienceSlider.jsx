"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollButton from "./ScrollButton";
import { motion, AnimatePresence } from "framer-motion";

export default function ExperienceSection() {
  const images = [
    "/assets/experience1.webp",
    "/assets/experience2.webp",
    "/assets/experience3.webp",
    "/assets/experience4.webp",
    "/assets/experience5.webp",
    "/assets/experience6.webp",
    
  ];

  const [current, setCurrent] = useState(1);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrent((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );

  return (
    <section className="bg-primary py-16 md:py-20 navbar-white-trigger">
      <div className="container-custom">

        {/* Heading */}
        <div className="flex justify-center mb-10 md:mb-12">
          <h2 className="heading bg-lightblue text-dark px-6 md:px-8 py-2 text-4xl md:text-5xl uppercase">
            EXPERIENCE
          </h2>
        </div>

        {/* Carousel */}
        <div className="flex items-center justify-center gap-6">

          {/* Center Image */}
          <div className="relative w-full md:w-[2000px] h-[360px] md:h-[520px] overflow-hidden">
            <AnimatePresence mode="sync">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
              >
                <Image
                  src={images[current]}
                  alt="Experience"
                  fill
                  sizes="100vw"
                  className="object-cover"
                  
                style={{ objectPosition: "center 20%" }}
                  priority
                />
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