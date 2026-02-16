"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoHero({ videoSrc, title }) {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

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

  const translateX = isDesktop ? progress * -500 : 0;

  const Heading = ({ top, bottom }) => (
    <div className="mb-6">
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

  const SlideLayout = ({ children, img }) => (
    <div className="w-screen h-auto lg:h-screen flex flex-col lg:flex-row">
      {/* Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-10 lg:px-20 py-12 lg:py-0">
        <div className="w-full max-w-xl">{children}</div>
      </div>

      {/* Image */}
      <div className="w-full lg:w-1/2 h-[55vh] sm:h-[65vh] lg:h-full">
        <img
          src={img}
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
      style={{ height: isDesktop ? "600vh" : "auto" }}
    >
      <div
        className={isDesktop ? "sticky top-0 h-screen overflow-hidden" : ""}
      >
        <div
          className={`flex ${
            isDesktop ? "h-full" : "flex-col"
          }`}
          style={{
            width: isDesktop ? "600vw" : "100%",
            transform: isDesktop ? `translateX(${translateX}vw)` : "none",
            transition: "transform 0.1s linear",
          }}
        >
          {/* SLIDE 1 */}
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
                className="text-white uppercase text-[44px] sm:text-[75px] md:text-[110px] lg:text-[145px] leading-[100%]"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  fontVariant: "small-caps",
                }}
              >
                {title}
              </h2>
            </div>
          </div>

          {/* SLIDE 2 */}
          <SlideLayout img="/assets/scroll-img1.webp">
            <Heading top="OUR ADMISSION" bottom="PROCESS" />
            <p
              className="mb-4"
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "100%",
                color: "#9B1B2F",
              }}
            >
              Simple. Personal. Child-first.
            </p>
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "26px",
                color: "#4B5563",
              }}
            >
              There are{" "}
              <span style={{ fontWeight: 600 }}>
                no entrance exams or qualification tests
              </span>{" "}
              at Westbrook. Each admission is approached with care and
              individual attention.
            </p>
            <Discover />
          </SlideLayout>

          {/* SLIDE 3 */}
          <SlideLayout img="/assets/scroll-img2.webp">
            <Heading top="START" bottom="A CONVERSATION" />
            <p
              className="mb-4"
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                fontSize: "24px",
                color: "#9B1B2F",
              }}
            >
              Step One
            </p>
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "26px",
              }}
            >
              Reach out to us through the enquiry form or contact our admissions
              team. This helps us understand your interest and answer your
              initial questions.
            </p>
            <Discover />
          </SlideLayout>

          {/* SLIDE 4 */}
          <SlideLayout img="/assets/scroll-img3.webp">
            <Heading top="SCHOOL" bottom="INTERACTION" />
            <p
              className="mb-4"
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                fontSize: "24px",
                color: "#9B1B2F",
              }}
            >
              Step Two
            </p>
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "26px",
              }}
            >
              Parents are invited for a conversation with our team to understand
              the school’s approach, daily routines, and academic framework.
            </p>
            <Discover />
          </SlideLayout>

          {/* SLIDE 5 */}
          <SlideLayout img="/assets/scroll-img5.webp">
            <Heading top="CHILD" bottom="INTERACTION" />
            <p
              className="mb-4"
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                fontSize: "24px",
                color: "#9B1B2F",
              }}
            >
              Step Three
            </p>
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "26px",
              }}
            >
              A relaxed interaction with the child helps us understand comfort
              levels and readiness, without pressure or assessment.
            </p>
            <Discover />
          </SlideLayout>

          {/* SLIDE 6 */}
          <SlideLayout img="/assets/scroll-img4.webp">
            <Heading top="ADMISSION" bottom="CONFIRMATION" />
            <p
              className="mb-4"
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                fontSize: "24px",
                color: "#9B1B2F",
              }}
            >
              Every admission matters to us, and each family is guided through
              the process with clarity and care.
            </p>
            <p
              className="mb-6"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "26px",
              }}
            >
              Once aligned, admissions are confirmed through a simple
              documentation process.
            </p>
            <button
              className="px-8 py-3 text-white"
              style={{
                backgroundColor: "#9B1B2F",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
              }}
            >
              APPLY NOW
            </button>
          </SlideLayout>
        </div>
      </div>
    </section>
  );
}
