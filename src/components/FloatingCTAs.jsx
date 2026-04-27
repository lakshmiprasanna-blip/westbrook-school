"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// ─── Lazy-load EnquiryForm — zero cost until a button is tapped ──────────────
const EnquiryForm = dynamic(() => import("./FormComponent"), { ssr: false });

// ─── Static animation constants — never re-created per render ────────────────
const BACKDROP_VARIANTS = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const MODAL_VARIANTS = {
  hidden: { scale: 0.85, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
  exit:    { scale: 0.85, opacity: 0 },
};
const MODAL_TRANSITION = { duration: 0.25 };

export default function FloatingCTAs() {
  const router = useRouter();
  const [formType, setFormType] = useState(null);

  // ─── Body class for layout offset ────────────────────────────────────────
  useEffect(() => {
    document.body.classList.add("has-floating-cta");
    return () => document.body.classList.remove("has-floating-cta");
  }, []);

  // ─── Stable callbacks — not re-created on every render ───────────────────
  const openVisit       = useCallback(() => setFormType("detailed"), []);
  const openApply       = useCallback(() => setFormType("simple"), []);
  const closePopup      = useCallback(() => setFormType(null), []);
  const stopPropagation = useCallback((e) => e.stopPropagation(), []);

  // ─── Close modal then navigate to thank-you ───────────────────────────────
  const handleSuccess   = useCallback(() => {
    setFormType(null);
    router.push("/thank-you");
  }, [router]);

  return (
    <>
      {/* ── Fixed CTA bar ──────────────────────────────────────────────────
          will-change: transform promotes this to its own GPU layer so
          page content behind it doesn't repaint on every scroll frame.   */}
      <div
        className="fixed bottom-0 left-0 w-full md:w-auto md:left-auto md:right-0 md:top-[60%] md:-translate-y-1/2 z-50"
        style={{ willChange: "transform" }}
      >
        <div className="flex flex-row md:flex-col bg-white md:bg-transparent md:overflow-hidden md:rounded-l-2xl shadow-[0_12px_32px_rgba(0,0,0,0.45)] md:shadow-none">

          <button
            onClick={openVisit}
            className="flex-1 md:flex-none bg-maroon text-white cursor-pointer text-[15px] md:text-[12px] font-semibold tracking-wide h-[50px] md:h-[100px] md:w-[44px] flex items-center justify-center md:rotate-180 md:[writing-mode:vertical-rl]"
          >
            VISIT US
          </button>

          <button
            onClick={openApply}
            className="flex-1 md:flex-none bg-primary text-white cursor-pointer text-[15px] md:text-[12px] font-semibold tracking-wide h-[50px] md:h-[100px] md:w-[44px] flex items-center justify-center md:rotate-180 md:[writing-mode:vertical-rl]"
          >
            APPLY NOW
          </button>

        </div>
      </div>

      {/* ── Popup — EnquiryForm only fetched when a button is tapped ─────── */}
      <AnimatePresence>
        {formType && (
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

              <EnquiryForm variant={formType} onSuccess={handleSuccess} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}