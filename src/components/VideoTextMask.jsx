"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/assets/homeaivideo.mp4";

const GRADIENT_STYLE = {
  background:
    "linear-gradient(180deg, rgba(0,0,0,0.7) -15.82%, rgba(220,220,220,0.08) 43.38%, rgba(0,0,0,0.25) 66.47%, rgba(0,0,0,0.7) 104.13%, rgba(82,82,82,0.25) 104.13%)",
};

const OVERLAY_BASE_STYLE = {
  mixBlendMode: "screen",
};

const VideoTextMask = () => {
  const videoRef = useRef(null);
  const [zoom, setZoom] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);

  // ─── Video setup — deferred via requestIdleCallback so FCP fires first ───
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const startVideo = () => {
      video.load();
      video.play().catch(() => {});
    };

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(startVideo, { timeout: 1000 });
      return () => cancelIdleCallback(id);
    }

    const t = setTimeout(startVideo, 0);
    return () => clearTimeout(t);
  }, []);

  // ─── Zoom trigger at 200ms ────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setZoom(true), 200);
    return () => clearTimeout(t);
  }, []);

  // ─── Remove overlay after animation completes ─────────────────────────────
  // 200ms delay + 2500ms animation + 100ms buffer = 2800ms
  useEffect(() => {
    if (!zoom) return;
    const t = setTimeout(() => setOverlayVisible(false), 2800);
    return () => clearTimeout(t);
  }, [zoom]);

  return (
    <>
      <style>{`
        @keyframes vtm-zoom-out {
          from { transform: scale(1);  opacity: 1; }
          to   { transform: scale(40); opacity: 0; }
        }
        .vtm-overlay-zoom {
          animation: vtm-zoom-out 2.5s cubic-bezier(0.7, 0, 0.3, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .vtm-overlay-zoom { animation: none; opacity: 0; }
        }
      `}</style>

      <section className="relative h-[42vh] md:h-screen overflow-hidden bg-black">

        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          className="absolute inset-0 mt-22 w-full h-full object-cover"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>

        <div
          className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply"
          style={GRADIENT_STYLE}
        />

        {overlayVisible && (
          <div
            className={`absolute inset-0 z-50 flex items-center justify-center bg-white select-none pointer-events-none${zoom ? " vtm-overlay-zoom" : ""}`}
            style={OVERLAY_BASE_STYLE}
          >
            <h2 className="font-[Montserrat] !text-[11vw] md:text-[8vw] font-black leading-[0.85] tracking-tight text-center text-black">
              WESTBROOK
            </h2>
          </div>
        )}

        <div className="relative z-20 h-full flex items-end justify-center !p-6 md:pb-24 lg:pb-15">
          <div className="lg:max-w-3xl w-full flex flex-col items-center text-center gap-6">
            <h2
              className="text-white leading-[120%] !text-[20px] sm:text-[22px] md:text-[40px] lg:!text-[48px]"
              style={{ fontWeight: 600 }}
            >
              Education that Forms Minds. Learning that Shapes Character.
            </h2>
          </div>
        </div>

      </section>
    </>
  );
};

export default VideoTextMask;