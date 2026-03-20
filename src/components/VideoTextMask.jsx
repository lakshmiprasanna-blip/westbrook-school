"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const VIDEO_SRC = "/assets/homeaivideo.mp4";

// Static constants — defined once at module level, never re-created per render
const ZOOM_TRANSITION = {
  duration: 2.5,
  ease: [0.7, 0, 0.3, 1],
};

const GRADIENT_STYLE = {
  background:
    "linear-gradient(180deg, rgba(0,0,0,0.7) -15.82%, rgba(220,220,220,0.08) 43.38%, rgba(0,0,0,0.25) 66.47%, rgba(0,0,0,0.7) 104.13%, rgba(82,82,82,0.25) 104.13%)",
};

// Animate targets as static objects — avoids Framer recalculating on every render
const ANIMATE_ZOOM = { scale: 40, opacity: 0 };
const ANIMATE_IDLE = { scale: 1, opacity: 1 };

const VideoTextMask = () => {
  const videoRef = useRef(null);
  const [zoom, setZoom] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);

  // ─── Video setup ─────────────────────────────────────────────────────────
  // Uses requestIdleCallback so the video network fetch doesn't compete
  // with FCP — browser paints the white overlay + text first, then loads video.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const startVideo = () => {
      video.load();
      video.play().catch(() => {});
    };

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(startVideo, { timeout: 1000 });
      return () => cancelIdleCallback(id);
    }

    // Fallback for Safari — defers past current call stack so FCP fires first
    const t = setTimeout(startVideo, 0);
    return () => clearTimeout(t);
  }, []);

  // ─── Zoom trigger at 800 ms ───────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setZoom(true), 800);
    return () => clearTimeout(t);
  }, []);

  // ─── Remove overlay from DOM after animation ends (800 + 2500 + 100 buffer)
  // Dropping the node eliminates the composited layer entirely — no ongoing
  // GPU cost from a scale(40) element sitting invisible in the tree.
  useEffect(() => {
    if (!zoom) return;
    const t = setTimeout(() => setOverlayVisible(false), 2600);
    return () => clearTimeout(t);
  }, [zoom]);

  return (
    <section className="relative h-[42vh] md:h-screen overflow-hidden bg-black">
      {/* ── Background video ──────────────────────────────────────────────────
          preload="none"  → no bytes fetched until startVideo() fires via rIC
          autoPlay        → browser starts playback once load() is called
          The ref-based imperative approach (video.load() + video.play()) gives
          us control over exactly when the fetch happens. */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="none"
        className="absolute inset-0 mt-22 w-full h-full object-cover"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* ── Gradient overlay ─────────────────────────────────────────────────
          Moved gradient into a static constant — no new object per render. */}
      <div
        className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply"
        style={GRADIENT_STYLE}
      />

      {/* ── Zoom knockout overlay ─────────────────────────────────────────────
          Conditional render (not opacity:0) — once gone the compositor layer
          is fully dropped. Static animate targets prevent Framer from diffing
          new objects on every parent re-render. */}
      {overlayVisible && (
        <motion.div
          className="absolute inset-0 z-50 flex items-center justify-center bg-white select-none pointer-events-none"
          style={{ mixBlendMode: "screen" }}
          animate={zoom ? ANIMATE_ZOOM : ANIMATE_IDLE}
          transition={ZOOM_TRANSITION}
        >
          <h2 className="font-[Montserrat] !text-[11vw] md:text-[8vw] font-black leading-[0.85] tracking-tight text-center text-black">
            WESTBROOK
          </h2>
        </motion.div>
      )}

      {/* ── Hero text ─────────────────────────────────────────────────────── */}
      <div className="relative z-20 h-full flex items-end justify-center !p-6 md:pb-24 lg:pb-15">
        <div className="lg:max-w-3xl w-full flex flex-col items-center text-center gap-6">
          <h2
            className="text-white leading-[120%] !text-[20px] sm:text-[22px] md:text-[40px] lg:!text-[48px]"
            style={{ fontWeight: 600 }}
          >
            Education that Forms Minds. Learning that Shapes Character.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default VideoTextMask;