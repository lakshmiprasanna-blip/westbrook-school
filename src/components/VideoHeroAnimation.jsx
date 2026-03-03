"use client";

import { useEffect, useState } from "react";
import ScrollButton from "./ScrollButton";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryForm from "./FormComponent";

export default function VideoHeroAnimation({
  videoSrc,
  title,
  slides = [],
}) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  /* ---------------- SCREEN DETECTION ---------------- */
  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  /* ---------------- SCROLL LISTENER ---------------- */
  useEffect(() => {
    if (!isDesktop) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
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

  /* ---------------- HEADING COMPONENT ---------------- */
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

  /* ---------------- BUTTON COMPONENT ---------------- */
  const ActionButton = ({ button }) => {
    if (!button) return null;

    const baseClass =
      "mt-6 font-semibold cursor-pointer transition-all duration-300 rounded-full";

    const filledClass =
      "px-12 py-4 bg-[#9B1B2F] text-white text-lg hover:scale-105";

    const outlineClass =
      "px-8 py-3 border border-[#9B1B2F] text-[#9B1B2F] hover:bg-[#9B1B2F] hover:text-white";

    if (button.popup) {
      return (
        <button
          onClick={() => setShowPopup(true)}
          className={`${baseClass} ${
            button.variant === "filledLarge"
              ? filledClass
              : outlineClass
          }`}
        >
          {button.text}
        </button>
      );
    }

    if (button.link) {
      return (
        <Link href={button.link}>
          <button
            className={`${baseClass} ${
              button.variant === "filledLarge"
                ? filledClass
                : outlineClass
            }`}
          >
            {button.text}
          </button>
        </Link>
      );
    }

    return null;
  };

  return (
    <>
      {/* ================= DESKTOP ================= */}
      {isDesktop && (
        <section
          className="relative w-full"
          style={{ height: `${(slides.length + 1) * 100}vh` }}
        >
          {/* VIDEO SECTION */}
          <div className="sticky top-0 h-screen z-10">
            <div className="w-full h-screen relative">
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
                <h2 className="text-white uppercase text-[clamp(36px,8vw,160px)]">
                  {title}
                </h2>
              </div>
            </div>
          </div>

          {/* STACKED SLIDES */}
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
                className="sticky top-0 h-screen relative bg-white"
                style={{ zIndex: index + 20 }}
              >
                <div
                  className="absolute inset-0 bg-white"
                  style={{ opacity: progress }}
                />

                <div className="relative z-10 h-full flex">
                  {/* LEFT */}
                  <div className="w-1/2 flex items-center bg-white">
                    <div
                      className="max-w-xl"
                      style={{
                        marginLeft:
                          "max(1.5rem, calc((100vw - 80rem) / 2))",
                      }}
                    >
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

                      <ActionButton button={slide.button} />
                    </div>
                  </div>

                  {/* RIGHT IMAGE */}
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
          {/* VIDEO */}
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

          {/* SLIDER */}
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
                    <div className="relative w-full h-[280px] mb-6">
                      <Image
                        src={slide.image}
                        alt=""
                        fill
                        className="object-cover"
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

                    <ActionButton button={slide.button} />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-4 mb-8">
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
          </section>
        </>
      )}

      {/* ================= POPUP ================= */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md"
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 shadow flex items-center justify-center text-black font-bold"
              >
                ✕
              </button>

              <EnquiryForm variant="simple" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}