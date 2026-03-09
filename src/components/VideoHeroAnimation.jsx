"use client";

import { useEffect, useState } from "react";
import ScrollButton from "./ScrollButton";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryForm from "./FormComponent";
import Button from "./KnowMorebtn";

export default function VideoHeroAnimation({
  videoSrc,
  title,
  slides = [],
  onPopupOpen,
}) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

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
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

  const nextMobile = () =>
    setMobileIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );

  const prevMobile = () =>
    setMobileIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

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
      <br/>
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
          <div className="sticky top-[72px] h-screen z-10">
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

          {slides.map((slide, index) => {
            return (
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
                        top={
                          <>
                            {slide.headingTop}
                            
                          </>
                        }
                        bottom={slide.headingBottom}
                      />
                      

                      {slide.subTitle && (
                        <h3 className=" text-[#9B1B2F] font-bold leading-[1.5] mb-6">
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
                          onClick={() => setShowPopup(true)}
                          className={`mt-6 
                            
                          `}
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
                        onClick={() => setShowPopup(true)}
                        className="mt-6 "
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