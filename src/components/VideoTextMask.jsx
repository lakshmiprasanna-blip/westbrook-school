"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const VIDEO_SRC = "/assets/homeaivideo.mp4";

// Animation transition defined outside component — no re-creation on each render
const ZOOM_TRANSITION = {
  duration: 2.5,
  ease: [0.7, 0, 0.3, 1],
};

const VideoTextMask = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [zoom, setZoom] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);

  // Video setup — lazy play after mount, non-blocking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    // Use requestIdleCallback so video load doesn't block first paint
    const startVideo = () => {
      video.load();
      video.play().catch(() => {});
    };

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(startVideo, { timeout: 1000 });
      return () => cancelIdleCallback(id);
    } else {
      // Fallback: slight defer so FCP paint happens first
      const t = setTimeout(startVideo, 0);
      return () => clearTimeout(t);
    }
  }, []);

  // Zoom trigger at 800ms
  useEffect(() => {
    const timer = setTimeout(() => setZoom(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Unmount overlay after animation completes (800 + 2500 + ~100ms buffer)
  useEffect(() => {
    if (!zoom) return;
    const timer = setTimeout(() => setOverlayVisible(false), 2600);
    return () => clearTimeout(timer);
  }, [zoom]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[42vh] md:h-screen overflow-hidden bg-black"
    >
      {/* Background Video — fetchpriority low, loads after paint */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="none"          // ← was "auto"; prevents parser-blocking network fetch
        className="absolute inset-0 mt-22 w-full h-full object-cover"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Linear Gradient Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.7) -15.82%, rgba(220,220,220,0.08) 43.38%, rgba(0,0,0,0.25) 66.47%, rgba(0,0,0,0.7) 104.13%, rgba(82,82,82,0.25) 104.13%)",
        }}
      />

      {/* Knockout Animation Overlay */}
      {overlayVisible && (
        <motion.div
          className="absolute inset-0 z-50 flex items-center justify-center bg-white select-none pointer-events-none"
          style={{ mixBlendMode: "screen" }}
          animate={{
            scale: zoom ? 40 : 1,
            opacity: zoom ? 0 : 1,
          }}
          transition={ZOOM_TRANSITION}
        >
          <h2 className="font-[Montserrat] !text-[11vw] md:text-[8vw] font-black leading-[0.85] tracking-tight text-center text-black">
            WESTBROOK
          </h2>
        </motion.div>
      )}

      {/* Hero Content */}
      <div className="relative z-20 h-full flex items-end justify-center !p-6 md:pb-24 lg:pb-15">
        <div className="lg:max-w-3xl w-full flex flex-col items-center text-center gap-6">
          <div>
            <h2
              className="text-white leading-[120%] !text-[20px] sm:text-[22px] md:text-[40px] lg:!text-[48px]"
              style={{ fontWeight: 600 }}
            >
              Education that Forms Minds. Learning that Shapes Character.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoTextMask;