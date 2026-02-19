"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ScrollButton from "./ScrollButton";

const spaces = [
  {
    title: "Reading and Story Corner",
    description:
      "A quiet, welcoming space where children listen, look, imagine, and slowly build a love for stories and language.",
    image: "/assets/explore-learningspaceimg1.webp",
  },
  {
    title: "Circle Time Area",
    description:
      "An open space for conversations, songs, group activities, and shared learning that supports listening, confidence, and social interaction.",
    image: "/assets/explore-learningspaceimg2.webp",
  },
  {
    title: "Reading and Story Corner",
    description:
      "A quiet, welcoming space where children listen, look, imagine, and slowly build a love for stories and language.",
    image: "/assets/explore-learningspaceimg3.webp",
  },
];

export default function LearningSpacesSection() {
  const [index, setIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);

  /* ===== Desktop + Tab Scroll ===== */
  const nextSlide = () =>
    setIndex((prev) =>
      prev === spaces.length - 1 ? 0 : prev + 1
    );

  const prevSlide = () =>
    setIndex((prev) =>
      prev === 0 ? spaces.length - 1 : prev - 1
    );

  /* ===== Mobile Scroll (UNCHANGED) ===== */
  const nextMobile = () =>
    setMobileIndex((prev) =>
      prev === spaces.length - 1 ? 0 : prev + 1
    );

  const prevMobile = () =>
    setMobileIndex((prev) =>
      prev === 0 ? spaces.length - 1 : prev - 1
    );

  return (
    <section className="w-full bg-white py-11 lg:py-16">
      <div className="container-custom">

        {/* ===== Section Heading ===== */}
        <div className=" text-start md:text-center mb-10 lg:mb-12">
          <div className="inline-block bg-lightblue px-5 py-1.5 mb-4">
            <h2 className="!font-[Playfair_Display] !font-bold 
                           !text-[28px] md:!text-[34px] lg:!text-[40px] 
                           !leading-[100%]">
              LEARNING SPACES
            </h2>
          </div>

          <p className="max-w-xl mx-auto 
                        !font-[Montserrat] 
                        !text-[16px] md:!text-[17px] 
                        !leading-[24px] 
                        text-dark">
            At Westbrook, early learning spaces are designed to feel familiar,
            calm, and inviting, helping young children feel comfortable as they
            begin their school journey.
          </p>
        </div>

        {/* ================= DESKTOP + TAB SLIDER ================= */}
        <div className="hidden md:block overflow-hidden relative">

          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${index * (100 / 3)}%)`,
            }}
          >
            {spaces.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="
                  px-3
                  w-1/2
                  lg:w-1/3
                  flex-shrink-0
                "
              >
                <div className="bg-offwhite h-full">
                  <div className="relative w-full h-[280px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-5 space-y-2.5">
                    <h3 className="!font-[Playfair_Display] !font-bold 
                                   !text-[22px] !leading-[100%] 
                                   text-maroon">
                      {item.title}
                    </h3>

                    <p className="!font-[Montserrat] 
                                  !text-[16px] 
                                  !leading-[24px] 
                                  text-dark">
                      {item.description}
                    </p>
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

        {/* ================= MOBILE (UNTOUCHED) ================= */}
        <div className="md:hidden relative overflow-hidden">

          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${mobileIndex * 100}%)`,
            }}
          >
            {spaces.map((item, index) => (
              <div key={index} className="min-w-full">

                <div className="relative w-full h-[240px] mb-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="bg-offwhite p-4 space-y-2">
                  <h3 className="!font-[Playfair_Display] !font-bold 
                                 !text-[20px] !leading-[100%] 
                                 text-maroon">
                    {item.title}
                  </h3>

                  <p className="!font-[Montserrat] 
                                 !text-[15px] 
                                 !leading-[22px] 
                                 text-dark">
                    {item.description}
                  </p>
                </div>

              </div>
            ))}
          </div>

          <div className="flex mt-1">
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
