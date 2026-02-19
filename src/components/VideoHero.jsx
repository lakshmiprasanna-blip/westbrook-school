"use client";

import { useEffect, useRef, useState } from "react";
import ScrollButton from "./ScrollButton";
import Image from "next/image";

export default function VideoHero({
  videoSrc,
  title,
  slides = [],
}) {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);

  const totalSlides = slides.length + 1;

  /* ---------------- SCREEN DETECTION ---------------- */
  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  /* ---------------- DESKTOP SCROLL LOGIC (UNCHANGED) ---------------- */
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

  const nextMobile = () =>
    setMobileIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );

  const prevMobile = () =>
    setMobileIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  /* ---------------- HEADING ---------------- */
  const Heading = ({ top, bottom }) => (
    <div className="mb-4">
      {top && (
        <div className="bg-lightblue inline-block px-4 py-2 mb-2">
          <h2
            className="leading-[100%]"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: "clamp(32px, 6vw, 48px)", // Increased for mobile/tablet
            }}
          >
            {top}
          </h2>
        </div>
      )}

      {bottom && (
        <div className="bg-lightblue inline-block px-4 py-2">
          <h2
            className="leading-[100%]"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: "clamp(32px, 6vw, 48px)",
            }}
          >
            {bottom}
          </h2>
        </div>
      )}
    </div>
  );

  /* ---------------- DESKTOP SLIDE LAYOUT (UNTOUCHED) ---------------- */
  const SlideLayout = ({ slide }) => (
    <div className="w-screen h-auto lg:h-screen flex flex-col lg:flex-row">
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
                fontSize: "clamp(18px, 2.5vw, 24px)",
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
                fontSize: "clamp(17px, 2vw, 18px)",
                lineHeight: "clamp(22px, 2.5vw, 26px)",
                color: "#4B5563",
              }}
            >
              {slide.description}
            </p>
          )}
        </div>
      </div>

     <div className="relative w-full lg:w-1/2 h-[55vh] sm:h-[65vh] lg:h-full">
        <Image
          src={slide.image}
          alt=""
          fill
          className="object-cover"
        />
      </div>

    </div>
  );

  return (
    <>
      {/* ================= DESKTOP VERSION (UNCHANGED) ================= */}
      {isDesktop && (
        <section
          ref={scrollRef}
          className="relative w-full"
          style={{ height: `${totalSlides * 100}vh` }}
        >
          <div className="sticky top-0 h-screen overflow-hidden">
            <div
              className="flex h-full"
              style={{
                width: `${totalSlides * 100}vw`,
                transform: `translateX(${translateX}vw)`,
                transition: "transform 0.1s linear",
              }}
            >
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
                    className="text-white uppercase leading-[100%]"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 630,
                      fontVariant: "small-caps",
                      fontSize: "clamp(36px, 8vw, 160px)",
                    }}
                  >
                    {title}
                  </h2>
                </div>
              </div>

              {slides.map((slide, index) => (
                <SlideLayout key={index} slide={slide} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= MOBILE + TABLET VERSION ================= */}
      {!isDesktop && (
        <>
          {/* Video */}
          <section className="relative w-full">
            <div className="w-full h-[70vh] relative">
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

              <div className="relative z-10 flex items-center justify-center h-full text-center">
                <h2
                  className="text-white uppercase leading-[100%]"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 630,
                    fontVariant: "small-caps",
                    fontSize: "36px",
                  }}
                >
                  {title}
                </h2>
              </div>
            </div>
          </section>

          {/* Slides */}
          <section className="overflow-hidden relative">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${mobileIndex * 100}%)`,
              }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="min-w-full">
                  <div className="container-custom py-10">

                    {/* IMAGE */}
                   <div className="relative w-full h-[280px] md:h-[340px] mb-6">
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    className="object-cover object-top"
                  />
                </div>


                    {/* TITLE */}
                    <Heading
                      top={slide.headingTop}
                      bottom={slide.headingBottom}
                    />

                    {/* SUBTITLE */}
                    {slide.subTitle && (
                      <p
                        className="mb-4"
                        style={{
                          fontFamily: "Playfair Display, serif",
                          fontWeight: 700,
                          fontSize: "clamp(20px, 4.5vw, 24px)",
                          color: "#9B1B2F",
                        }}
                      >
                        {slide.subTitle}
                      </p>
                    )}

                    {/* DESCRIPTION */}
                    {slide.description && (
                      <p
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 400,
                          fontSize: "clamp(16px, 3vw, 18px)",
                          color: "#4B5563",
                        }}
                      >
                        {slide.description}
                      </p>
                    )}

                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="container-custom mt-4 mb-8">
              <div className="flex">
                <ScrollButton
                  direction="left"
                  onClick={prevMobile}
                  bgColor="#9B1B2F"
                  className="border-r border-white/30"
                />
                <ScrollButton
                  direction="right"
                  onClick={nextMobile}
                  bgColor="#9B1B2F"
                />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
