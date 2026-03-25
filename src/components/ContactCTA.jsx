"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./KnowMorebtn";

// ─── Lazy-load EnquiryForm — zero cost until popup opens ─────────────────────
const EnquiryForm = dynamic(() => import("./FormComponent"), { ssr: false });

// ─── Static constants — never re-created per render ──────────────────────────
const MOBILE_OVERLAY = {
  background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.40) 85%)",
};
const DESKTOP_OVERLAY = {
  background: "linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.25) 70%)",
};
const BACKDROP_VARIANTS = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const MODAL_VARIANTS = {
  hidden: { scale: 0.85, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
  exit:    { scale: 0.85, opacity: 0 },
};
const MODAL_TRANSITION = { duration: 0.25 };

export default function ContactCTA({
  imageSrc = "/assets/groupimg-1.webp",
  align = "center",
  title = "We'd love to hear from you!",
  subtitle = "Feel free to get in touch, or apply now",
  primaryBtnText,
  secondaryBtnText,
}) {
  const [formType, setFormType] = useState(null);
  const router = useRouter();

  // ─── Stable callbacks — not re-created on every render ───────────────────
  const closePopup     = useCallback(() => setFormType(null), []);
  const openApply      = useCallback(() => setFormType("simple"), []);
  const stopPropagation = useCallback((e) => e.stopPropagation(), []);

  const handleContactClick = useCallback(() => {
    if (window.location.pathname === "/contact") {
      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/contact");
    }
  }, [router]);

  return (
    <>
      <section className="relative w-full min-h-[60vh] md:h-[75vh] lg:h-[80vh] overflow-hidden flex items-center">

        {/* Background image — loading="lazy" since this section is below the fold */}
        <Image
          src={imageSrc}
          alt="Group"
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover object-center md:object-[center_top] lg:object-center"
        />

        {/* Mobile overlay */}
        <div className="absolute inset-0 md:hidden" style={MOBILE_OVERLAY} />

        {/* Desktop overlay */}
        <div className="absolute inset-0 hidden md:block" style={DESKTOP_OVERLAY} />

        {/* Content */}
       <div className="w-full max-w-6xl relative z-10 px-2 mb-2 mt-2 mx-auto flex flex-col justify-center items-center text-center">
  
  {/* H2 stays normal */}
  <h2 className="font-playfair font-bold text-white mb-4 text-[30px] md:text-[40px] leading-[1.3]">
    {title}
  </h2>

  {/* Subtitle gets more width */}
  <div className="w-full">
    <p className="whitespace-pre-line text-white leading-relaxed max-w-5xl mx-auto">
      {subtitle}
    </p>
  </div>


          <div className="mt-6 flex flex-row gap-3 justify-center flex-wrap">
            <Button
              text="CONTACT US"
              onClick={handleContactClick}
              className="!bg-maroon !text-white !border-none !text-sm hover:!opacity-90"
            />
            <Button
              text="APPLY NOW"
              onClick={openApply}
              className="!bg-primary !text-white !border-none !text-sm hover:!opacity-90"
            />
          </div>
        </div>
      </section>

      {/* Popup — EnquiryForm only fetched when formType is set */}
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

              <EnquiryForm variant={formType} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}