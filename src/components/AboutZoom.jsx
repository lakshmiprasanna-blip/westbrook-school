"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AboutZoom() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  /* ---------------- SCREEN DETECTION ---------------- */
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width <= 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  

  /* ---------------- SCROLL SYNC ---------------- */
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const totalScroll = el.offsetHeight - window.innerHeight;

      if (rect.top <= 0 && Math.abs(rect.top) <= totalScroll) {
        const scrollAmount = Math.abs(rect.top);
        setProgress(scrollAmount / totalScroll);
      } else if (rect.top > 0) {
        setProgress(0);
      } else {
        setProgress(1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  /* ---------------- DRAG TO SCROLL ---------------- */
  useEffect(() => {
    if (!isDragging || isMobile) return;

    const handleMove = (e) => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const trackRect = track.getBoundingClientRect();
      const thumbHeight = 40;

      let offsetY = e.clientY - trackRect.top;
      offsetY = Math.max(0, Math.min(offsetY, trackRect.height - thumbHeight));

      const percent = offsetY / (trackRect.height - thumbHeight);

      const totalScroll = section.offsetHeight - window.innerHeight;

      window.scrollTo({
        top: section.offsetTop + percent * totalScroll,
        behavior: "auto",
      });
    };

    const stopDrag = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stopDrag);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", stopDrag);
    };
  }, [isDragging, isMobile]);

  /* ---------------- CONFIG ---------------- */

  const fadeStart = 0.35;
  const fadeEnd = 0.7;

  /* ---------------- ZOOM ---------------- */

  let scale = 1;
  if (!isMobile) {
    const clamped = Math.min(progress, fadeEnd);
    scale = isTablet ? 1 + clamped * 2 : 1 + clamped * 3;
  }

  /* ---------------- TEXT OPACITY ---------------- */

  let contentOpacity = 0.3;
  if (!isMobile) {
    contentOpacity = progress < 0.15 ? 0.3 + progress * 4 : 1;
  }

  let titleOpacity = 1;
  if (!isMobile) {
    if (progress <= fadeStart) titleOpacity = 1;
    else if (progress >= fadeEnd) titleOpacity = 0;
    else {
      const fadeProgress =
        (progress - fadeStart) / (fadeEnd - fadeStart);
      titleOpacity = 1 - fadeProgress;
    }
  }

  /* ---------------- SCROLL INDICATOR ---------------- */

  const trackHeight = isTablet ? 180 : 220;
  const thumbHeight = 40;
  const maxMove = trackHeight - thumbHeight;
  const thumbPosition = progress * maxMove;

  return (
  <section
    ref={sectionRef}
    className="relative w-full"
    style={{
      height: isMobile
        ? "55vh"
        : isTablet
        ? "180vh"
        : "250vh",
    }}
  >
    <div
      className={`${
        isMobile ? "relative h-full" : "sticky top-0 h-screen"
      } overflow-hidden flex items-center justify-center`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/assets/scroll-img1.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70" />

      {/* ================= MOBILE LAYOUT (FIGMA EXACT) ================= */}
      {isMobile && (
        <div className="relative z-10 text-center px-1">
          <h2 className="uppercase font-serif font-bold !text-[30px] text-maroon !leading-[95%]">
            LEARNING
          </h2>

          <div className="uppercase !text-[20px] text-[#0F4D81]">
            CHARACTER
          </div>

          <h2 className="uppercase font-serif font-bold !text-[30px] text-maroon leading-[95%]">
            THAT SHAPES
          </h2>
        </div>
      )}

      {/* ================= DESKTOP LAYOUT (UNCHANGED) ================= */}
      {!isMobile && (
        <>
          <div
            className="relative z-10 text-center px-6"
            style={{
              transform: `scale(${scale})`,
              transition: "transform 0.2s ease-out",
            }}
          >
            <h2
              className="uppercase font-serif font-bold text-[36px] sm:text-[50px] md:text-[80px] lg:text-[70px] text-maroon leading-[90%]"
              style={{
                opacity:
                  progress > fadeStart
                    ? titleOpacity
                    : contentOpacity,
                transition: "opacity 0.3s ease-out",
              }}
            >
              LEARNING
            </h2>

            <div
              className="uppercase tracking-[2px] text-[14px] sm:text-[16px] md:text-[20px] text-maroon"
              style={{
                opacity: contentOpacity,
                transition: "opacity 0.3s ease-out",
              }}
            >
              CHARACTER
            </div>

            <h2
              className="uppercase font-serif font-bold text-[36px] sm:text-[50px] md:text-[80px] lg:text-[70px] text-maroon leading-[90%]"
              style={{
                opacity:
                  progress > fadeStart
                    ? titleOpacity
                    : contentOpacity,
                transition: "opacity 0.3s ease-out",
              }}
            >
              THAT SHAPES
            </h2>
          </div>

          {/* Scroll Indicator */}
          <div
            ref={trackRef}
            className={`absolute right-6 ${
              isTablet ? "top-16" : "top-20"
            }`}
            style={{
              height: `${trackHeight}px`,
              width: "4px",
            }}
          >
            <div
              onMouseDown={() => setIsDragging(true)}
              className="absolute left-1/2 -translate-x-1/2 w-4 bg-maroon rounded-full cursor-pointer"
              style={{
                height: `${thumbHeight}px`,
                transform: `translate(-50%, ${thumbPosition}px)`,
                transition: isDragging
                  ? "none"
                  : "transform 0.1s linear",
              }}
            />
          </div>
        </>
      )}
    </div>
  </section>
);
}