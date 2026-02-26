"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const sections = [
  {
    title: "OUR CURRICULUM",
    topLabel: "CURRICULUM",
    description:
      "A thoughtful beginning to learning that builds curiosity, early skills, and confidence through guided play, structured routines, and close teacher support.",
    image: "/assets/2bce95a20276a61e5788948d06e10463d657c0aa.png",
  },
  {
    title: "PRE PRIMARY",
    topLabel: "EARLY YEARS",
    description:
      "Early learning that focuses on language, movement, play, and social development through clear routines and guided exploration.",
    image: "/assets/Frame 2610539.png",
  },
  {
    title: "PRIMARY SCHOOL",
    topLabel: "GRADE 1-5",
    description:
      "Encouraging exploration, academic growth, and values that prepare students for lifelong success.",
    image: "/assets/curriculum3.png",
  },
];

export default function CurriculumSection() {
  const [active, setActive] = useState(null);

  const getWidth = (index) => {
    if (active === null) return "33.3333%";
    return active === index ? "58%" : "21%";
  };

  return (
    <section className="w-full bg-white py-9">
      <div className="container-custom">

        {/* ================= DESKTOP ================= */}
        <div
          className="hidden md:flex h-[600px] overflow-hidden"
          onMouseLeave={() => setActive(null)}
        >
          {sections.map((item, index) => {
            const isActive = active === index;

            return (
              <motion.div
                key={index}
                onMouseEnter={() => setActive(index)}
                animate={{ width: getWidth(index) }}
                transition={{
                  duration: 0.9,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="relative h-full overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <motion.div
                  className="absolute inset-0 bg-[#00213D]"
                  animate={{ opacity: isActive ? 0.72 : 0.35 }}
                  transition={{
                    duration: 0.9,
                    ease: "easeInOut",
                  }}
                />

                {/* TOP LABEL */}
                <div className="absolute top-0 left-0 right-0 flex justify-center z-20">
                  <motion.div
                    animate={{
                      backgroundColor: isActive
                        ? "#9B1B2F"
                        : "#0F4D81",
                    }}
                    transition={{ duration: 0.7 }}
                    className="w-[200px] h-[64px] flex items-center justify-center text-white uppercase text-[15px]  font-semibold"
                  >
                    {item.topLabel}
                  </motion.div>
                </div>

                {/* COLLAPSED SIDE TITLE */}
                <motion.div
                  animate={{
                    opacity: isActive ? 0 : 1,
                    x: isActive ? 80 : 0,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="absolute inset-y-0 right-8 flex items-center z-20"
                >
                  <h3 className="text-white tracking-[1px] rotate-180 [writing-mode:vertical-rl] uppercase">
                    {item.title}
                  </h3>
                </motion.div>

                {/* ACTIVE CONTENT */}
                <motion.div
                  className="absolute bottom-28 left-16 z-20 max-w-xl text-white"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : -80,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: isActive ? 0.25 : 0,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  style={{
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <motion.h2
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: isActive ? 0.3 : 0 }}
                    className="mb-6 text-white"
                  >
                    {item.title}
                  </motion.h2>

                  <motion.p
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: isActive ? 0.3 : 0 }}
                    className="leading-relaxed mb-8 text-white/90"
                  >
                    {item.description}
                  </motion.p>

                  
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden flex flex-col">
          {sections.map((item, index) => {
            const isActive = active === index;

            return (
              <div
                key={index}
                onClick={() => setActive(isActive ? null : index)}
                className="relative w-full h-[240px] overflow-hidden cursor-pointer will-change-transform"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-[center_20%]"
                />

                <motion.div
                  className="absolute inset-0 bg-[#00213D]"
                  animate={{
                    opacity: isActive ? 0.6 : 0.72,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />

                {/* TOP LABEL */}
                <div className="absolute right-4 top-4 z-20">
                  <div className="px-4 h-[32px] flex items-center justify-center bg-[#0F4D81] text-white text-sm font-medium uppercase">
                    {item.topLabel}
                  </div>
                </div>

                {/* TITLE */}
                <motion.div
                  animate={{
                    opacity: isActive ? 0 : 1,
                    y: isActive ? 18 : 0,
                    scale: isActive ? 0.96 : 1,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute bottom-6 left-6 right-6 z-20 text-white"
                >
                  <h2 className="uppercase text-white">
                    {item.title}
                  </h2>
                </motion.div>

                {/* DESCRIPTION PANEL */}
                <motion.div
                  initial={false}
                  animate={{
                    y: isActive ? 0 : 180,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-6 pt-12 text-white"
                >
                  <h3 className="uppercase mb-3 text-white">
                    {item.title}
                  </h3>

                  <p className="leading-relaxed text-white/90">
                    {item.description}
                  </p>

                 
                  
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}