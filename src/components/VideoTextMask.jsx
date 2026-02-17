"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const VIDEO_SRC = "/assets/home-aivideo.mp4";

const VideoTextMask = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [zoom, setZoom] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);

  // Start video immediately on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  // Start zoom animation after delay
  useEffect(() => {
    const timer = setTimeout(() => setZoom(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Remove overlay from DOM after animation completes
  useEffect(() => {
    if (zoom) {
      const timer = setTimeout(() => setOverlayVisible(false), 2600);
      return () => clearTimeout(timer);
    }
  }, [zoom]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-black z-50"
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Text knockout — fixed to cover full viewport including navbar */}
      {overlayVisible && (
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
          <h2 className="text-[15vw] md:text-[14vw] font-black leading-[0.85] tracking-tight text-center text-black">
            WESTBROOK
          </h2>
        </motion.div>
      )}
    </section>
  );
};

export default VideoTextMask;
