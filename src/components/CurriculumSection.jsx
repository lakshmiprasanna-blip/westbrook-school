"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const sections = [
  {
    title: "OUR CURRICULUM",
    topLabel: "CURRICULUM",
    description:
      "A thoughtful beginning to learning that builds curiosity, early skills, and confidence through guided play, structured routines, and close teacher support.",
    image: "/assets/curriculum1.png",
  },
  {
    title: "PRE PRIMARY",
    topLabel: "EARLY YEARS",
    description:
      "Early learning that focuses on language, movement, play, and social development through clear routines and guided exploration.",
    image: "/assets/curriculum2.png",
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
    if (active === null) return "33.333%";
    return active === index ? "58%" : "21%";
  };

  return (
    <section className="w-full bg-white py-24">
      <div className="container-custom">
        <div className="hidden md:flex h-[600px] overflow-hidden">
          {sections.map((item, index) => {
            const isActive = active === index;

            return (
              <motion.div
                key={index}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                animate={{ width: getWidth(index) }}
                transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                className="relative h-full overflow-hidden cursor-pointer"
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  transition={{ duration: 1 }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    backgroundColor: isActive
                      ? "#00213DE5"
                      : "rgba(0,0,0,0.25)",
                  }}
                  transition={{ duration: 0.7 }}
                />
                <motion.div
                  className="absolute top-0 z-20"
                  animate={{
                    left: isActive ? "20px" : "50%",
                    x: isActive ? 0 : "-50%",
                  }}
                  transition={{ duration: 0.7 }}
                >
                  <div
                    className={`flex items-center justify-center w-[200px] h-[64px] text-white uppercase text-[13px] tracking-[2px] font-semibold
                    ${
                      isActive
                        ? "bg-[var(--color-maroon)]"
                        : "bg-[var(--color-primary)]"
                    }`}
                  >
                    {item.topLabel}
                  </div>
                </motion.div>
                {!isActive && (
                  <div className="absolute inset-y-0 right-8 flex items-center z-20">
                    <h3 className="text-white text-[26px] tracking-[6px] rotate-180 [writing-mode:vertical-rl] uppercase">
                      {item.title}
                    </h3>
                  </div>
                )}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 60 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.9 }}
                      className="absolute bottom-28 left-16 z-20 max-w-xl text-white"
                    >
                      <h2 className="text-4xl mb-6 leading-tight">
                        {item.title}
                      </h2>
                      <p className="text-lg leading-relaxed mb-8 text-white/90">
                        {item.description}
                      </p>
                      <a
                        href="#"
                        className="flex items-center gap-4 text-sm font-semibold tracking-wide group"
                      >
                        DISCOVER MORE
                        <span className="w-7 h-7 rounded-full border border-white flex items-center justify-center transition-all duration-500 group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        <div className="md:hidden flex flex-col">

          {sections.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full h-[280px] overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#00213DE5]" />
              <div className="absolute top-6 right-8 z-20">
                <div
                  className="w-[200px] h-[64px] flex items-center justify-center bg-[var(--color-primary)] text-white uppercase text-[13px] tracking-[2px] font-semibold"
                >
                  {item.topLabel}
                </div>
              </div>
              <div className="absolute inset-y-0 left-6 flex items-center z-20">
                <h2 className="text-white text-[30px] leading-[38px] font-serif uppercase">
                  {item.title}
                </h2>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
