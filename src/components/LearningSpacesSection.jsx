"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ScrollButton from "./ScrollButton";
import { useRouter } from "next/navigation";

export default function LearningSpacesSection({
  heading = "LEARNING SPACES",
  subText = "",
  data = [],
  titleClass = "!font-bold !text-[22px] !leading-[100%] text-maroon",
  hoverEffect = false,
}) {
  const [index, setIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const router = useRouter();

  /* ===== Desktop + Tab Scroll ===== */
  const nextSlide = () =>
    setIndex((prev) =>
      prev === data.length - 1 ? 0 : prev + 1
    );

  const prevSlide = () =>
    setIndex((prev) =>
      prev === 0 ? data.length - 1 : prev - 1
    );

  /* ===== Mobile Scroll ===== */
  const nextMobile = () =>
    setMobileIndex((prev) =>
      prev === data.length - 1 ? 0 : prev + 1
    );

  const prevMobile = () =>
    setMobileIndex((prev) =>
      prev === 0 ? data.length - 1 : prev - 1
    );

  return (
    <section className="w-full bg-white py-11 lg:py-16">
      <div className="container-custom">

        {/* ===== Section Heading ===== */}
        <div className="text-center mb-10 lg:mb-12">
          <div className="inline-block bg-lightblue px-5 py-1.5 mb-4">
            <h2 className="font-playfair !font-bold md:text-5xl !leading-[100%]">
              {heading}
            </h2>
          </div>

          {subText && (
            <p className="paragraph max-w-4xl mx-auto font-montserrat md:text-center !text-[16px] md:!text-[17px] !leading-[24px] text-dark">
              {subText}
            </p>
          )}
        </div>

        {/* ================= DESKTOP + TAB ================= */}
        <div className="hidden md:block overflow-hidden relative">

          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${index * (100 / 3)}%)`,
            }}
          >
            {data.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="px-3 w-1/2 lg:w-1/3 flex-shrink-0"
              >
               <div
  onClick={() => item.slug && router.push(`/blogs/${item.slug}`)}
  className={`h-full transition-all duration-700 ${
    hoverEffect
      ? "bg-offwhite group hover:bg-primary cursor-pointer transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl"
      : "bg-offwhite"
  }`}
>
                  <div className="relative w-full h-[280px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-5 space-y-2.5">
                    <h3
                    className={`${titleClass} ${
                      hoverEffect ? "transition-colors duration-300 group-hover:text-white" : ""
                    }`}
                  >
                    {item.title}
                  </h3>

                    {item.description && (
                      <p
                        className={`paragraph font-montserrat !text-[16px] !leading-[24px] ${
                          hoverEffect
                            ? "text-dark transition-colors duration-300 group-hover:text-white"
                            : "text-dark"
                        }`}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Buttons */}
          <div className="flex justify-center mt-11">
            <ScrollButton
              direction="left"
              onClick={prevSlide}
              className="border-r border-white/30"
            />
            <ScrollButton
              direction="right"
              onClick={nextSlide}
            />
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden relative overflow-hidden">

          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${mobileIndex * 100}%)`,
            }}
          >
            {data.map((item, i) => (
              <div
  key={i}
  onClick={() => item.slug && router.push(`/blogs/${item.slug}`)}
  className="min-w-full cursor-pointer"
>

                <div className="relative w-full h-[240px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="bg-offwhite p-4 space-y-2">
                  <h3
                    className={`${titleClass} ${
                      hoverEffect ? "transition-colors duration-300 group-hover:text-white" : ""
                    }`}
                  >
                    {item.title}
                  </h3>

                  {item.description && (
                  <p className="paragraph font-montserrat !text-[15px] !leading-[22px] text-dark">
                    {item.description}
                  </p>
                )}
                </div>

              </div>
            ))}
          </div>

          <div className="flex mt-8 justify-center">
            <ScrollButton
              direction="left"
              onClick={prevMobile}
              className="border-r border-white/30"
            />
            <ScrollButton
              direction="right"
              onClick={nextMobile}
            />
          </div>

        </div>

      </div>
    </section>
  );
}