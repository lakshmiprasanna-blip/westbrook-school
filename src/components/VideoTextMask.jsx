"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const VIDEO_SRC = "/assets/Westbrook Website Video.mp4";

const VideoTextMask = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [zoom, setZoom] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setZoom(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (zoom) {
      const timer = setTimeout(() => setOverlayVisible(false), 2600);
      return () => clearTimeout(timer);
    }
  }, [zoom]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen z-40 overflow-hidden bg-black "
    >
      {/* Background Video */}
      {/* Background Video */}
      <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          className="absolute  inset-0 w-full h-full object-cover"
          priority="true"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>

          {/* ✅ Custom Linear Gradient Overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.7) -15.82%, rgba(220,220,220,0.08) 43.38%, rgba(0,0,0,0.25) 66.47%, rgba(0,0,0,0.7) 104.13%, rgba(82,82,82,0.25) 104.13%)",
          }}
        />

      {/* Dark overlay */}
      

      {/* Knockout Animation */}
      {overlayVisible && (
        <motion.div
  className="absolute inset-0 z-30 flex items-center justify-center bg-white select-none pointer-events-none"
          style={{ mixBlendMode: "screen" }}
          animate={{
            scale: zoom ? 40 : 1,
            opacity: zoom ? 0 : 1,
          }}
          transition={{
            duration: 2.5,
            ease: [0.7, 0, 0.3, 1],
          }}
        >
          <h2 className="font-[Montserrat] !text-[11vw] md:text-[8vw] font-black leading-[0.85] tracking-tight text-center text-black">
            WESTBROOK
          </h2>
        </motion.div>
      )}

      {/* Hero Content — ALWAYS visible */}
     <div className="relative z-20 h-full flex items-end justify-center pb-12 md:pb-20 lg:pb-34">
  <div className="lg:max-w-3xl w-full 
  flex flex-col 
  items-center 
  text-center 
  gap-6">

    {/* LEFT TEXT */}
    <div >
      <h2
        className="text-white leading-[120%] 
        text-[18px] 
        sm:text-[22px] 
        md:text-[40px] 
        lg:!text-[48px]"
        style={{
         
          fontWeight: 600,
        }}
      >
        Education that Forms Minds. Learning that Shapes Character.
      </h2>
    </div>

  
  </div>
</div>


    </section>
  );
};

export default VideoTextMask;
