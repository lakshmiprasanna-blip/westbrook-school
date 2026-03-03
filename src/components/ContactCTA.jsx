"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import EnquiryForm from "./FormComponent";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactCTA({
  imageSrc = "/assets/groupimg-1.webp",
  align = "center",
  title = "We’d love to hear from you!",
  subtitle = "Feel free to get in touch, or apply now",
}) {
  const [formType, setFormType] = useState(null);
  const router = useRouter();

  return (
    <>
      <section className="relative w-full min-h-[60vh] md:h-[75vh] lg:h-[80vh] overflow-hidden flex items-center">
        
        {/* Background Image */}
        <Image
          src={imageSrc}
          alt="Group"
          fill
          sizes="100vw"
          className="object-cover object-center md:object-[center_top] lg:object-center"
        />

        {/* ✅ Mobile Darker Overlay */}
       {/* ✅ Mobile Very Light Overlay */}
       <div
  className="absolute inset-0 md:hidden"
  style={{
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.40) 85%)",
  }}
/>

        {/* ✅ Desktop Lighter Overlay */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.25) 70%)",
          }}
        />

        {/* Content */}
        <div className="max-w-xl relative z-10 w-full px-6 mx-auto flex flex-col justify-center items-center text-center">
          <h2 className="font-playfair font-bold text-white mb-4 text-[30px] md:text-[40px] leading-[1.3]">
            {title}
          </h2>

          <p className="font-montserrat font-medium text-white/90 mb-8 text-[14px] md:text-[16px] lg:text-[18px]">
            {subtitle}
          </p>

          {/* Buttons */}
          <div className="flex !flex-row gap-4 justify-center">
            
            {/* CONTACT US */}
            <button
              onClick={() => {
                if (
                  typeof window !== "undefined" &&
                  window.location.pathname === "/contact"
                ) {
                  document
                    .getElementById("contact-form")
                    ?.scrollIntoView({ behavior: "smooth" });
                } else {
                  router.push("/contact");
                }
              }}
              className="!px-4 py-4 rounded-full text-white !text-sm md:text-base font-semibold bg-maroon cursor-pointer"
            >
              CONTACT US
            </button>

            {/* APPLY NOW */}
            <button
              onClick={() => setFormType("simple")}
              className="!px-4 py-4 rounded-full text-white !text-sm md:text-base font-semibold bg-primary cursor-pointer"
            >
              APPLY NOW
            </button>
          </div>
        </div>
      </section>

      {/* ✅ POPUP */}
      <AnimatePresence>
        {formType && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFormType(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md"
            >
              {/* Close Button */}
              <button
                onClick={() => setFormType(null)}
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