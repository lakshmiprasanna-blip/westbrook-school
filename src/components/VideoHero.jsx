"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function VideoHero({
  videoSrc,
  title,
  slides = [],
}) {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const router = useRouter();

  const totalSlides = slides.length + 1;

  // Detect screen size
  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Scroll logic (desktop only)
  useEffect(() => {
    if (!isDesktop) return;

    const handleScroll = () => {
      const el = scrollRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const totalScroll = el.scrollHeight - window.innerHeight;

      if (rect.top <= 0 && Math.abs(rect.top) <= totalScroll) {
        const scrollAmount = Math.abs(rect.top);
        const scrollProgress = scrollAmount / totalScroll;
        setProgress(scrollProgress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

  const translateX = isDesktop
    ? progress * (totalSlides - 1) * -100
    : 0;

  const Heading = ({ top, bottom }) => (
    <div className="mb-6">
      {top && (
        <div className="bg-[#A2D5EB] inline-block px-4 py-2 mb-2">
          <h2
            className="leading-[100%]"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: "48px",
            }}
          >
            {top}
          </h2>
        </div>
      )}

      {bottom && (
        <div className="bg-[#A2D5EB] inline-block px-4 py-2">
          <h2
            className="leading-[100%]"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: "48px",
            }}
          >
            {bottom}
          </h2>
        </div>
      )}
    </div>
  );

  const Discover = ({ show }) => {
    if (!show) return null;

    return (
      <div
        className="flex items-center gap-4 mt-8 uppercase"
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 700,
          fontSize: "16px",
          color: "#0F4D81",
        }}
      >
        DISCOVER MORE

        <div className="w-8 h-8 border-2 border-[#0F4D81] rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5l6 6m0 0l-6 6m6-6H3"
            />
          </svg>
        </div>
      </div>
    );
  };

  const SlideLayout = ({ slide }) => (
    <div className="w-screen h-auto lg:h-screen flex flex-col lg:flex-row">
      {/* Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-10 lg:px-20 py-12 lg:py-0">
        <div className="w-full max-w-xl">
          <Heading
            top={slide.headingTop}
            bottom={slide.headingBottom}
          />

          {slide.subTitle && (
            <p
              className="mb-4 leading-[100%]"
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                fontSize: "24px",
                color: "#9B1B2F",
              }}
            >
              {slide.subTitle}
            </p>
          )}

          {slide.description && (
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "26px",
                color: "#4B5563",
              }}
            >
              {slide.description}
            </p>
          )}

          <Discover show={slide.showDiscover} />

          {slide.button && (
            <button
              onClick={() => {
                if (slide.button.link) {
                  router.push(slide.button.link);
                }
              }}
              className="px-8 py-3 text-white mt-6"
              style={{
                backgroundColor:
                  slide.button.bg || "#9B1B2F",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
              }}
            >
              {slide.button.label}
            </button>
          )}
        </div>
      </div>

      {/* Image */}
      <div className="w-full lg:w-1/2 h-[55vh] sm:h-[65vh] lg:h-full">
        <img
          src={slide.image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );

  return (
    <section
      ref={scrollRef}
      className="relative w-full"
      style={{
        height: isDesktop
          ? `${totalSlides * 100}vh`
          : "auto",
      }}
    >
      <div
        className={
          isDesktop
            ? "sticky top-0 h-screen overflow-hidden"
            : ""
        }
      >
        <div
          className={`flex ${
            isDesktop ? "h-full" : "flex-col"
          }`}
          style={{
            width: isDesktop
              ? `${totalSlides * 100}vw`
              : "100%",
            transform: isDesktop
              ? `translateX(${translateX}vw)`
              : "none",
            transition: "transform 0.1s linear",
          }}
        >
          {/* VIDEO SLIDE */}
          <div className="w-screen h-screen relative">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
              <h2
                className="text-white uppercase text-center leading-[100%] whitespace-nowrap"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 630,
                  fontVariant: "small-caps",
                  fontSize: "clamp(48px, 8vw, 160px)",
                }}
              >
                {title}
              </h2>

            </div>
          </div>

          {/* Dynamic Slides */}
          {slides.map((slide, index) => (
            <SlideLayout key={index} slide={slide} />
          ))}
        </div>
      </div>
    </section>
  );
}
