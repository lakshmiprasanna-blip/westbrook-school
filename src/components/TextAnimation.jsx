"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ZoomOverlay({ text = "WESTBROOK", delay = 0.8 }) {
  const [zoom, setZoom] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setZoom(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  // Remove from DOM after animation completes
  useEffect(() => {
    if (zoom) {
      const timer = setTimeout(() => setVisible(false), 2600);
      return () => clearTimeout(timer);
    }
  }, [zoom]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white select-none pointer-events-none"
      style={{ mixBlendMode: "screen" }}
      animate={{
        scale: zoom ? 40 : 1,
        opacity: zoom ? 0 : 1,
      }}
      transition={{
        duration: 2.5,
        ease: [0.7, 0, 0.3, 1],
      }}
    >
      <h2 className="text-[15vw] md:text-[14vw]  leading-[0.85] text-black tracking-tight text-center">
        {text}
      </h2>
    </motion.div>
  );
}