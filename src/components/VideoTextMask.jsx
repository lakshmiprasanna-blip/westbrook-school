"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const VIDEO_SRC = "/assets/home-aivideo.mp4";

const VideoTextMask = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [zoom, setZoom] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setZoom(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (zoom) {
      const timer = setTimeout(() => setOverlayVisible(false), 2600);
      return () => clearTimeout(timer);
    }
  }, [zoom]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-black"
    >
      {/* Background Video */}
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Knockout Animation */}
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
          <h2 className="font-[Montserrat] text-[20vw] md:text-[8vw] font-black leading-[0.85] tracking-tight text-center text-black">
            WESTBROOK
          </h2>
        </motion.div>
      )}

      {/* Hero Content — ALWAYS visible */}
     <div className="relative z-20 h-full flex items-end pb-12 md:pb-20 lg:pb-34 md:pl-0 lg:pl-54">
  <div className="container-custom w-full 
    flex flex-col 
    items-center text-center 
    md:items-start md:text-left 
    lg:flex-row lg:justify-start lg:gap-54 
    gap-6">

    {/* LEFT TEXT */}
    <div className="max-w-[320px] sm:max-w-md md:max-w-[600px] lg:max-w-xl">
      <h2
        className="text-white leading-[120%] 
        text-[18px] 
        sm:text-[22px] 
        md:text-[40px] 
        lg:!text-[34px]"
        style={{
          fontFamily: "Playfair Display",
          fontWeight: 600,
        }}
      >
        Education that Forms Minds.
        <br />
        Learning that Shapes Character.
      </h2>
    </div>

    {/* RIGHT BUTTONS */}
    <div className="flex flex-col gap-3 
      w-full max-w-[240px] 
      md:max-w-[260px] 
      lg:max-w-none lg:w-auto">

      <button className="bg-maroon text-white py-3 flex items-center justify-center gap-3 text-[13px] md:text-[15px] lg:text-[14px] font-semibold tracking-wide">
        VISIT US
        <span className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </button>

      <button className="bg-white px-2 text-maroon py-3 flex items-center justify-center gap-3 text-[13px] md:text-[15px] lg:text-[14px] font-semibold tracking-wide">
        APPLY NOW
        <span className="w-5 h-5 rounded-full border-2 border-maroon flex items-center justify-center">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </button>

    </div>
  </div>
</div>


    </section>
  );
};

export default VideoTextMask;
