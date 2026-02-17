"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/assets/home-aivideo.mp4";

const VideoTextMask = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
  const timer = setTimeout(() => {
    setZoom(true);
  }, 500); // delay before zoom starts

  return () => clearTimeout(timer);
}, []);

  // Observe visibility — only play when in viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  // Pause offscreen, play when visible
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      aria-label="VSR Vriksha brand showcase"
      className="relative isolate h-[50vh] md:h-[70vh] lg:h-[80vh] bg-white overflow-hidden"
    >
      {/* Video – lazy: only metadata until visible */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlayThrough={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Text knockout layer */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center bg-white select-none transition-transform duration-[1800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          mixBlendMode: "screen",
         
        }}
      >

        <h2 className="!text-[15vw] md:text-[14vw] font-black !leading-[0.85] text-black !tracking-tight">
          WESTBROOK
        </h2>
        <p className="text-[5vw] md:text-[3.5vw] font-bold tracking-widest text-black mt-1 md:mt-2">
          
        </p>
      </div>
    </section>
  );
};

export default VideoTextMask;
