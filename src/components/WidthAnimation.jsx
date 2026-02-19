"use client";
import { imageUrl } from "@/utils/common";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function WidthAnimation({ sections }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSectionClick = (index) => {
    if (isMobile) {
      setActiveIndex(activeIndex === index ? -1 : index);
    }
  };

  const handleSectionHover = (index) => {
    if (!isMobile) {
      setActiveIndex(index);
    }
  };

  const getWidth = (index, isActive) => {
    if (isActive) return 50;
    const remainingWidth = 50;
    const inactiveCount = sections.length - 1;
    return remainingWidth / inactiveCount;
  };

  /* ===================== DESKTOP (UNCHANGED) ===================== */
  if (!isMobile) {
    return (
      <div className="relative h-96 flex overflow-hidden">
        {sections.map((section, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={index}
              animate={{ width: `${getWidth(index, isActive)}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onMouseEnter={() => handleSectionHover(index)}
              className="relative overflow-hidden h-full"
              style={{ flexShrink: 0 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${imageUrl(section.backgroundImage)}')`,
                }}
              />

              <motion.div
                className="absolute inset-0 z-10"
                animate={{
                  backgroundColor: isActive
                    ? "rgba(132, 11, 85, 0.65)"
                    : "rgba(0, 0, 0, 0)",
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />

              <motion.div
                className="absolute bottom-0 left-0 right-0 z-20 h-48 bg-gradient-to-t from-black via-black/70 to-transparent"
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                className="absolute bottom-0 left-0 z-30 p-6"
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-max">
                  <Image
                    src={imageUrl(section.logourl)}
                    alt="logo"
                    height={40}
                    width={40}
                    className="w-10 h-10 mb-3"
                  />
                  <p className="paragraph text-white font-semibold text-lg whitespace-nowrap">
                    {section.title}
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 z-30 p-6"
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{
                  duration: 0.3,
                  delay: isActive ? 0.5 : 0,
                }}
              >
                <div className="min-w-72 max-w-md">
                  <Image
                    src={imageUrl(section.logourl)}
                    alt="logo"
                    height={56}
                    width={56}
                    className="w-14 h-14 mb-3"
                  />
                  <p className="paragraph text-white font-bold text-2xl mb-2 whitespace-nowrap">
                    {section.title}
                  </p>
                  <p className="paragraph text-white/90 text-sm leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  /* ===================== MOBILE (EXACT AS REQUESTED) ===================== */
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col gap-4 items-center">
        {sections.map((section, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={index}
              onClick={() => handleSectionClick(index)}
              animate={{ height: isActive ? 320 : 131 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="relative overflow-hidden cursor-pointer"
              style={{ width: 343 }}
            >
              {/* Background */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${imageUrl(section.backgroundImage)}')`,
                }}
              />

              {/* Overlay */}
              <motion.div
                className="absolute inset-0 z-10"
                animate={{
                  backgroundColor: isActive
                    ? "rgba(132, 11, 85, 0.65)"
                    : "rgba(0, 0, 0, 0.35)",
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Top label (inside container) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30">
                <div
                  className="text-white text-xs font-semibold tracking-widest"
                  style={{
                    backgroundColor: "#0B4A7A",
                    padding: "16px 24px",
                  }}
                >
                  CURRICULUM
                </div>
              </div>

              {/* Collapsed state */}
              <motion.div
                className="absolute bottom-4 left-4 right-12 z-30"
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <p className="paragraph text-white font-medium text-lg">
                  {section.title}
                </p>
              </motion.div>

              {/* Expanded state */}
              <motion.div
                className="absolute bottom-4 left-4 right-4 z-30"
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.3, delay: isActive ? 0.2 : 0 }}
              >
                <Image
                  src={imageUrl(section.logourl)}
                  alt="logo"
                  height={40}
                  width={40}
                  className="mb-2"
                />
                <p className="paragraph text-white font-bold text-xl mb-2">
                  {section.title}
                </p>
                <p className="paragraph text-white/90 text-sm leading-relaxed">
                  {section.description}
                </p>
              </motion.div>

              {/* Arrow */}
              <motion.div
                animate={{ rotate: isActive ? 180 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-4 right-4 z-30 w-7 h-7 rounded-full border border-white flex items-center justify-center text-white"
              >
                ↓
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
