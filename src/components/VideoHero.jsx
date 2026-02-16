"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoHero({ videoSrc, title, slides = [] }) {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const totalSlides = slides.length + 1; // +1 for video slide

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleScroll = () => {
      const el = scrollRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const totalScroll = el.offsetHeight - window.innerHeight;

      if (rect.top <= 0 && Math.abs(rect.top) <= totalScroll) {
        const scrollAmount = Math.abs(rect.top);
        const scrollProgress = scrollAmount / totalScroll;
        setProgress(scrollProgress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

  const translateX = isDesktop ? progress * -(100 * (totalSlides - 1)) : 0;

  const Heading = ({ top, bottom }) => (
    <div className="mb-6">
      {top && (
        <div className="bg-[#A2D5EB] inline-block px-4 py-2 mb-2">
          <h2
            className="text-[32px] md:text-[44px] lg:text-[48px] leading-[100%]"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
            }}
          >
            {top}
          </h2>
        </div>
      )}

      {bottom && (
        <div className="bg-[#A2D5EB] inline-block px-4 py-2">
          <h2
            className="text-[32px] md:text-[44px] lg:text-[48px] leading-[100%]"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
            }}
          >
            {bottom}
          </h2>
        </div>
      )}
    </div>
  );

  const Discover = () => (
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

      <div className="w-9 h-9 border-2 border-[#0F4D81] rounded-full flex items-center justify-center">
        <svg
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

  const SlideLayout = ({ slide }) => (
    <div className="w-screen h-auto lg:h-screen flex flex-col lg:flex-row">
      {/* Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-10 lg:px-20 py-12 lg:py-0">
        <div className="w-full max-w-xl">

          <Heading top={slide.heading} bottom={slide.subHeading} />

          {slide.highlightText && (
            <p
              className="mb-4"
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                fontSize: "24px",
                color: "#9B1B2F",
              }}
            >
              {slide.highlightText}
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

          {slide.showDiscover && <Discover />}

          {slide.buttonText && (
            <button
              className="mt-8 px-8 py-3 text-white"
              style={{
                backgroundColor: "#9B1B2F",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
              }}
            >
              {slide.buttonText}
            </button>
          )}
        </div>
      </div>

      {/* Image */}
      <div className="w-full lg:w-1/2 h-[55vh] sm:h-[65vh] lg:h-full">
        <img
          src={slide.image}
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );

  return (
    <section
      ref={scrollRef}
      className="relative w-full"
      style={{ height: isDesktop ? `${totalSlides * 100}vh` : "auto" }}
    >
      <div className={isDesktop ? "sticky top-0 h-screen overflow-hidden" : ""}>
        <div
          className="flex"
          style={{
            width: isDesktop ? `${totalSlides * 100}vw` : "100%",
            transform: isDesktop ? `translateX(${translateX}vw)` : "none",
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

            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />

            <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
              <h2
                className="text-white uppercase text-[44px] sm:text-[75px] md:text-[110px] lg:text-[135px] leading-[100%]"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 620,
                  fontVariant: "small-caps",
                }}
              >
                {title}
              </h2>
            </div>
          </div>

          {/* DYNAMIC SLIDES */}
          {slides.map((slide, index) => (
            <SlideLayout key={index} slide={slide} />
          ))}
        </div>
      </div>
    </section>
  );
}
