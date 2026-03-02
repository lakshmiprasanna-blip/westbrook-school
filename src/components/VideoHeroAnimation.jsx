"use client";

import { useEffect, useState } from "react";
import ScrollButton from "./ScrollButton";
import Image from "next/image";
import Link from "next/link";

export default function VideoHeroAnimation({
  videoSrc,
  title,
  slides = [],
}) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  /* ---------------- SCREEN DETECTION ---------------- */
  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  /* ---------------- SMOOTH SCROLL LISTENER ---------------- */
  useEffect(() => {
    if (!isDesktop) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

  /* ---------------- MOBILE NAV ---------------- */
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
              fontSize: "clamp(32px, 6vw, 48px)",
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

  return (
    <>
      {/* ================= DESKTOP ================= */}
      {isDesktop && (
        <section
          className="relative w-full"
          style={{ height: `${(slides.length + 1) * 100}vh` }}
        >
          {/* VIDEO SLIDE */}
          <div className="sticky top-0 h-screen z-10">
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

                      <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.36) 37.51%, rgba(0,0,0,0.54) 51.68%, rgba(0,0,0,0.30) 78.65%, rgba(0,0,0,0) 100%)",
              }}
            />

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
          </div>

          {/* STACKED SLIDES WITH SMOOTH WHITE FADE */}
          {slides.map((slide, index) => {
            const slideHeight =
              typeof window !== "undefined"
                ? window.innerHeight
                : 0;

            const slideStart = (index + 1) * slideHeight;
            const fadeStart = slideStart - slideHeight;

            let progress = 0;

            if (scrollY > fadeStart && scrollY < slideStart) {
              progress =
                (scrollY - fadeStart) / slideHeight;
            }

            progress = Math.max(0, Math.min(1, progress));

            return (
              <div
                key={index}
                className="stack-slide sticky top-0 h-screen relative bg-white"
                style={{ zIndex: index + 20 }}
              >
                {/* SMOOTH WHITE OVERLAY */}
                <div
                  className="absolute inset-0 bg-white pointer-events-none"
                  style={{ opacity: progress }}
                />

            <div className="relative z-10 h-full flex">

              {/* LEFT SIDE */}
              <div className="w-1/2 flex items-center bg-white">
                <div className="max-w-xl mx-auto lg:ml-[2vw] xl:ml-[8vw] 2xl:ml-[26vw]">
                  
                  <Heading
                    top={slide.headingTop}
                    bottom={slide.headingBottom}
                  />

                  {slide.subTitle && (
                    <p className="text-[#9B1B2F] font-bold mb-3">
                      {slide.subTitle}
                    </p>
                  )}

                  {slide.description && (
                    <p className="text-gray-600">
                      {slide.description}
                    </p>
                  )}

                  {slide.button && (
                    <Link href={slide.button.link}>
                      <button
                        className={`mt-6 font-semibold cursor-pointer transition-all duration-300 rounded-full
                          ${
                            slide.button.variant === "filledLarge"
                              ? "px-12 py-4 bg-[#9B1B2F] text-white text-lg hover:scale-105"
                              : "px-8 py-3 border border-[#9B1B2F] text-[#9B1B2F] hover:bg-[#9B1B2F] hover:text-white"
                          }
                        `}
                      >
                        {slide.button.text}
                      </button>
                    </Link>
                  )}

                </div>
              </div>

              {/* RIGHT SIDE IMAGE */}
              <div className="w-1/2 relative">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

            </div>
              </div>
            );
          })}
        </section>
      )}

      {/* ================= MOBILE ================= */}
      {!isDesktop && (
        <>
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
                <h2 className="text-white uppercase text-[36px]">
                  {title}
                </h2>
              </div>
            </div>
          </section>

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
                    <div className="relative w-full h-[280px] md:h-[340px] mb-6">
                      <Image
                        src={slide.image}
                        alt=""
                        fill
                        className="object-cover object-top"
                      />
                    </div>

                    <Heading
                      top={slide.headingTop}
                      bottom={slide.headingBottom}
                    />

                    {slide.subTitle && (
                      <p className="mb-4 text-[#9B1B2F] font-bold">
                        {slide.subTitle}
                      </p>
                    )}

                    {slide.description && (
                      <p className="text-gray-600">
                        {slide.description}
                      </p>
                    )}
                    {slide.button && (
  <Link href={slide.button.link}>
    <button
      className="mt-6 px-8 py-3 rounded-full font-semibold cursor-pointer transition-all duration-300 hover:bg-[#9B1B2F] hover:text-white"
      style={{
        border: "1.5px solid #9B1B2F",
        color: "#9B1B2F",
      }}
    >
      {slide.button.text}
    </button>
  </Link>
)}
                  </div>
                </div>
              ))}
            </div>

            <div className="container-custom mt-4 mb-8">
              <div className="flex">
                <ScrollButton
                  direction="left"
                  onClick={prevMobile}
                  bgColor="#9B1B2F"
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