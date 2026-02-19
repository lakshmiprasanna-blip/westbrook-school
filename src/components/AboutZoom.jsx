  "use client";

  import { useEffect, useRef, useState } from "react";
  import Image from "next/image";

  export default function AboutZoom() {
    const sectionRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    /* ---------------- SCREEN DETECTION ---------------- */
    useEffect(() => {
      const checkScreen = () => {
        setIsMobile(window.innerWidth < 768);
      };

      checkScreen();
      window.addEventListener("resize", checkScreen);
      return () => window.removeEventListener("resize", checkScreen);
    }, []);

    /* ---------------- SCROLL LOGIC (DESKTOP + TAB ONLY) ---------------- */
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

    /* ---------------- DRAMATIC ZOOM (DESKTOP + TAB) ---------------- */

    let scale = 1;
    let opacity = 1;

    if (!isMobile) {
      if (progress < 0.2) {
        scale = 1 + progress * 2.5;
        opacity = 0.25 + progress * 3.75;
      } else if (progress < 0.8) {
        scale = 1.5 + (progress - 0.2) * 6;
        opacity = 1;
      } else {
        scale = 5.1 + (progress - 0.8) * 10;
        opacity = 1 - (progress - 0.8) / 0.2;
      }
    }

    /* ---------------- SCROLL INDICATOR ---------------- */

    const trackHeight = 220;
    const thumbHeight = 40;
    const maxMove = trackHeight - thumbHeight;
    const thumbPosition = progress * maxMove - 10;

    return (
      <section
        ref={sectionRef}
        className="relative w-full"
        style={{
          height: isMobile ? "55vh" : "250vh",
        }}
      >
        <div
          className={`${
            isMobile
              ? "relative h-full"
              : "sticky top-0 h-screen"
          } overflow-hidden flex items-center justify-center`}
        >
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src="/assets/scroll-img1.webp"
              alt=""
              fill
              priority
              className="object-cover object-top"
            />
          </div>

          {/* Soft overlay */}
          <div className="absolute inset-0 bg-white/65" />

          {/* TEXT */}
          <div
            className="relative z-10 text-center px-6"
            style={
              isMobile
                ? {}
                : {
                    transform: `scale(${scale})`,
                    opacity: opacity,
                    transition:
                      "transform 0.05s linear, opacity 0.1s linear",
                  }
            }
          >
            <h2 className="uppercase font-serif font-bold text-[36px] sm:text-[50px] md:text-[80px] lg:text-[70px] text-maroon leading-[90%]">
              LEARNING
            </h2>

            {/* CHARACTER */}
            <div
              className={`uppercase tracking-[6px] text-[14px] sm:text-[16px] md:text-[20px] ${
                isMobile ? "text-primary" : "text-maroon"
              }`}
            >
              CHARACTER
            </div>

            <h2 className="uppercase font-serif font-bold text-[36px] sm:text-[50px] md:text-[80px] lg:text-[70px] text-maroon leading-[90%]">
              THAT SHAPES
            </h2>
          </div>

          {/* Scroll Indicator */}
          {!isMobile && (
            <div
              className="absolute right-6 top-[45%]"
              style={{
                height: `${trackHeight}px`,
                width: "3px",
              }}
            >
              <div
                className="absolute left-1/2 -translate-x-1/2 w-3 bg-maroon rounded-full transition-transform duration-75"
                style={{
                  height: `${thumbHeight}px`,
                  transform: `translate(-50%, ${thumbPosition}px)`,
                }}
              />
            </div>
          )}
        </div>
      </section>
    );
  }
