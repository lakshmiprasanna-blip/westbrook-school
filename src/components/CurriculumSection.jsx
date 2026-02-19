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
          ease: [0.25, 1, 0.5, 1], // smooth figma curve
        }}
        className="relative h-full overflow-hidden cursor-pointer"
      >
        {/* IMAGE */}
        {/* IMAGE */}
      <div className="absolute inset-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>


        {/* OVERLAY */}
        <motion.div
          className="absolute inset-0 bg-[#00213D]"
          animate={{ opacity: isActive ? 0.92 : 0.35 }}
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
                ? "var(--color-maroon)"
                : "var(--color-primary)",
            }}
            transition={{ duration: 0.4 }}
            className="w-[200px] h-[64px] flex items-center justify-center text-white uppercase text-[13px] tracking-[2px] font-semibold"
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
          <h3 className="text-white !text-[28px] tracking-[1px] rotate-180 [writing-mode:vertical-rl] uppercase">
            {item.title}
          </h3>
        </motion.div>

        {/* ACTIVE CONTENT */}
        <motion.div
          className="absolute bottom-28 left-16 z-20 max-w-xl text-white"
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
            x: isActive ? 0 : -80, // FROM LEFT ONLY
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
          {/* TITLE */}
          <motion.h2
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.4, delay: isActive ? 0.3 : 0 }}
            className="text-4xl mb-6 leading-tight"
          >
            {item.title}
          </motion.h2>

          {/* DESCRIPTION */}
          <motion.p
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.4, delay: isActive ? 0.35 : 0 }}
            className="text-lg leading-relaxed mb-8 text-white/90"
          >
            {item.description}
          </motion.p>

         
            {/* BUTTON */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{
              opacity: isActive ? 1 : 0,
              x: isActive ? 25 : -60,   // 👈 strong visible right movement
            }}
            transition={{
              duration: 0.6,
              delay: isActive ? 0.4 : 0,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="flex items-center gap-4 text-sm font-semibold tracking-wide"
          >
            DISCOVER MORE

            <motion.span
              animate={{
                x: isActive ? 10 : 0,   // 👈 arrow moves more
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className="w-7 h-7 rounded-full border border-white flex items-center justify-center"
            >
              →
            </motion.span>
          </motion.div>



                </motion.div>
              </motion.div>
    );
  })}
</div>


        {/* ================= MOBILE ================= */}

{/* ================= MOBILE ================= */}
<div className="md:hidden flex flex-col">
  {sections.map((item, index) => (
    <div
      key={index}
      className="relative w-full h-[240px] overflow-hidden"
    >
      {/* IMAGE */}
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover object-[center_20%]"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-[#00213D]/85" />

      {/* TOP LABEL */}
      <div className="absolute right-4 z-20">
        <div className="px-4 h-[32px] flex items-center justify-center 
          bg-[var(--color-primary)] 
          text-offwhite 
          !text-[14px] 
          font-medium 
          uppercase 
          tracking-normal">
          {item.topLabel}
        </div>
      </div>

      {/* TITLE */}
      <div className="absolute bottom-6 left-6 right-6 z-20 text-offwhite">
        <h2 className="
          heading
          !text-[24px] 
          !leading-[100%] 
          font-bold 
          uppercase
        ">
          {item.title}
        </h2>
      </div>
    </div>
  ))}
</div>




      </div>
    </section>
  );
}
