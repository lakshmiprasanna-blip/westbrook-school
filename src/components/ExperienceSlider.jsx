"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import ScrollButton from "./ScrollButton";

// Lightweight fade using CSS — avoids AnimatePresence JS overhead
const slideStyle = (isVisible) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? "scale(1)" : "scale(1.04)",
  transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)",
  position: "absolute",
  inset: 0,
  willChange: "opacity, transform",
});

// Lazy YouTube facade — shows thumbnail, loads iframe only on click
function YouTubeFacade({ embedUrl, title }) {
  const [loaded, setLoaded] = useState(false);

  // Extract video ID for thumbnail
  const videoId = embedUrl?.split("/embed/")[1]?.split("?")[0];
  const thumbSrc = videoId
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : null;

  if (loaded) {
    return (
      <iframe
        src={`${embedUrl}?autoplay=1`}
        title={title || "Video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="w-full h-full border-0"
      />
    );
  }

  return (
    <button
      onClick={() => setLoaded(true)}
      className="relative w-full h-full flex items-center justify-center bg-black cursor-pointer group"
      aria-label={`Play ${title || "video"}`}
      style={{ border: "none", padding: 0 }}
    >
      {thumbSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumbSrc}
          alt={title || "Video thumbnail"}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      )}
      {/* Play button overlay */}
      <div className="relative z-10 w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200">
        <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </button>
  );
}

export default function ExperienceSlider({
  items = [],
  title = "EXPERIENCE",
  subtitle = null,
  bgColor = "bg-primary",
}) {
  const [current, setCurrent] = useState(0);

  const prevSlide = useCallback(
    () => setCurrent((prev) => (prev === 0 ? items.length - 1 : prev - 1)),
    [items.length]
  );

  const nextSlide = useCallback(
    () => setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1)),
    [items.length]
  );

  return (
    <section className={`${bgColor} py-16 md:py-20`}>
      <div className="container-custom">

        {/* Heading */}
        <div className="flex flex-col items-center mb-10 md:mb-12">
          <h2 className="heading bg-lightblue text-dark px-6 md:px-8 py-2 md:text-5xl uppercase">
            {title}
          </h2>
          {subtitle && (
            <p className="text-center text-dark mt-4 max-w-4xl text-sm md:text-base">
              {subtitle}
            </p>
          )}
        </div>

        {/* Carousel */}
        <div className="flex items-center justify-center gap-6">
          <div className="relative w-full md:w-[940px] overflow-hidden">
            <div className="relative w-full aspect-video">
              {items.map((item, index) => (
                <div
                  key={index}
                  style={slideStyle(index === current)}
                  aria-hidden={index !== current}
                >
                  {item?.type === "video" ? (
                    <YouTubeFacade embedUrl={item.embedUrl} title={item.title} />
                  ) : (
                    <Image
                      src={item?.src}
                      alt={item?.alt || title}
                      fill
                      sizes="(max-width: 768px) 100vw, 940px"
                      className="object-cover"
                      style={{ objectPosition: "center 20%" }}
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-12">
          <div className="flex">
            <ScrollButton
              direction="left"
              onClick={prevSlide}
              bgColor="maroon"
              className="border-r border-white/30"
            />
            <ScrollButton
              direction="right"
              onClick={nextSlide}
              bgColor="maroon"
            />
          </div>
        </div>

      </div>
    </section>
  );
}