"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import ScrollButton from "./ScrollButton";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./KnowMorebtn";

// ─── Lazy-load EnquiryForm — never fetched until popup opens ─────────────────
const EnquiryForm = dynamic(() => import("./FormComponent"), { ssr: false });

// ─── Heading defined OUTSIDE component — never re-created on render ──────────
function Heading({ top, bottom }) {
  return (
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
      <br />
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
}

// ─── Video overlay gradient — static object, never re-created ────────────────
const OVERLAY_STYLE = {
  background:
    "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.36) 37.51%, rgba(0,0,0,0.54) 51.68%, rgba(0,0,0,0.30) 78.65%, rgba(0,0,0,0) 100%)",
};

// ─── Popup animation variants — static, never re-created ────────────────────
const BACKDROP_VARIANTS = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const MODAL_VARIANTS = {
  hidden: { scale: 0.85, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
  exit: { scale: 0.85, opacity: 0 },
};
const MODAL_TRANSITION = { duration: 0.25 };

export default function VideoHeroAnimation({
  videoSrc,
  title,
  slides = [],
  onPopupOpen,
}) {
  // ─── Use null initial state to avoid SSR mismatch ───────────────────────
  const [isDesktop, setIsDesktop] = useState(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  // ─── Screen detection ────────────────────────────────────────────────────
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // ─── Removed: unused scrollY state + its scroll listener ────────────────
  //     The original setScrollY(window.scrollY) caused a React re-render on
  //     every single pixel scrolled on desktop. scrollY was never consumed.

  // ─── Stable slider callbacks ─────────────────────────────────────────────
  const nextMobile = useCallback(
    () =>
      setMobileIndex((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      ),
    [slides.length]
  );

  const prevMobile = useCallback(
    () =>
      setMobileIndex((prev) =>
        prev === 0 ? slides.length - 1 : prev - 1
      ),
    [slides.length]
  );

  const openPopup = useCallback(() => setShowPopup(true), []);
  const closePopup = useCallback(() => setShowPopup(false), []);
  const stopPropagation = useCallback((e) => e.stopPropagation(), []);

  // ─── Render nothing until client screen size is known (avoids hydration
  //     mismatch between SSR=false and client=true for isDesktop) ────────────
  if (isDesktop === null) return null;

  return (
    <>
      {/* ================= DESKTOP ================= */}
      {isDesktop && (
        <section
          className="relative w-full"
          style={{ height: `${(slides.length + 1) * 100}vh`, contain: "layout style" }}
        >
          <div className="sticky top-[72px] h-screen z-10">
            <div className="w-full h-screen relative">

              {/* preload="metadata" — was "auto" which downloaded entire video
                  file before first paint, causing 3–6 s LCP on mobile 4G     */}
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>

              <div
                className="absolute inset-0 pointer-events-none"
                style={OVERLAY_STYLE}
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

          {slides.map((slide, index) => (
            <div
              key={index}
              className="sticky top-[72px] h-screen relative bg-white"
              style={{ zIndex: index + 20 }}
            >
              <div className="relative z-10 h-full flex w-full max-w-full">
                <div className="w-1/2 flex items-center bg-white">
                  <div
                    className="max-w-xl"
                    style={{
                      marginLeft: "max(1rem, calc((100vw - 1280px) / 2))",
                    }}
                  >
                    <Heading
                      top={slide.headingTop}
                      bottom={slide.headingBottom}
                    />

                    {slide.subTitle && (
                      <h3 className="text-[#9B1B2F] font-bold leading-[1.5] mb-6">
                        {slide.subTitle}
                      </h3>
                    )}

                    {slide.description && (
                      <p
                        className="text-gray-600 [&_b]:text-primary [&_b]:font-semibold"
                        dangerouslySetInnerHTML={{ __html: slide.description }}
                      />
                    )}

                    {slide.button &&
                      (slide.button.action === "popup" ? (
                        <Button
                          text={slide.button.text}
                          onClick={openPopup}
                          className="mt-6"
                        />
                      ) : (
                        <Button
                          text={slide.button.text}
                          link={slide.button.link}
                          className="mt-6 bg-[#9B1B2F] text-white !border-none hover:!bg-[#9B1B2F] hover:!border-none"
                        />
                      ))}
                  </div>
                </div>

                <div className="w-1/2 relative">
                  <Image
                    src={slide.image}
                    alt={slide.headingTop || "slide image"}
                    fill
                    sizes="50vw"
                    loading={index === 0 ? "eager" : "lazy"}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* ================= MOBILE ================= */}
      {!isDesktop && (
        <>
          <section className="relative w-full">
            <div className="w-full h-[70vh] relative">

              {/* Same fix: preload="metadata" instead of "auto" */}
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
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
              className="flex transition-transform duration-500 will-change-transform"
              style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="min-w-full">
                  <div className="container-custom py-10">

                    <div className="relative w-full h-[280px] mb-6">
                      <Image
                        src={slide.image}
                        alt={slide.headingTop || "slide image"}
                        fill
                        sizes="100vw"
                        loading={index === 0 ? "eager" : "lazy"}
                        className="object-cover md:object-fill lg:object-cover"
                      />
                    </div>

                    <Heading
                      top={slide.headingTop}
                      bottom={slide.headingBottom}
                    />

                    {slide.subTitle && (
                      <p className="!font-playfair text-[#9B1B2F] font-bold mb-4">
                        {slide.subTitle}
                      </p>
                    )}

                    {slide.description && (
                      <p
                        className="text-gray-600 [&_b]:text-primary [&_b]:font-semibold"
                        dangerouslySetInnerHTML={{ __html: slide.description }}
                      />
                    )}

                    {slide.button &&
                      (slide.button.action === "popup" ? (
                        <Button
                          text={slide.button.text}
                          onClick={openPopup}
                          className="mt-6"
                        />
                      ) : (
                        <Button
                          text={slide.button.text}
                          link={slide.button.link}
                          className="mt-6 bg-[#9B1B2F] text-white !border-none hover:!bg-[#9B1B2F] hover:!border-none"
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="container-custom flex justify-center mt-4 mb-8">
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

      {/* ================= POPUP ================= */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            variants={BACKDROP_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closePopup}
          >
            <motion.div
              variants={MODAL_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={MODAL_TRANSITION}
              onClick={stopPropagation}
              className="relative w-full max-w-md"
            >
              <button
                onClick={closePopup}
                className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 shadow flex items-center justify-center text-black font-bold"
              >
                ✕
              </button>

              {/* EnquiryForm is lazy-loaded — zero cost until popup opens */}
              <EnquiryForm variant="simple" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}