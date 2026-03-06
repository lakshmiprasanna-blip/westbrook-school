"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryForm from "./FormComponent";
import { useEffect } from "react";

export default function FloatingCTAs() {
  const [formType, setFormType] = useState(null);
  
  useEffect(() => {
  document.body.classList.add("has-floating-cta");

  return () => {
    document.body.classList.remove("has-floating-cta");
  };
}, []);
  return (
    <div className="pb-[60px] md:pb-0">
      {/* CTA Position */}
      <div className="fixed bottom-0 left-0 w-full md:w-auto md:left-auto md:right-0 md:top-[60%] md:-translate-y-1/2 z-50">

        {/* Outer Wrapper */}
        <div className="flex flex-row md:flex-col bg-white md:bg-transparent md:overflow-hidden md:rounded-l-2xl shadow-[0_12px_32px_rgba(0,0,0,0.45)] md:shadow-none">
           


          {/* VISIT US */}
          <button
            onClick={() => setFormType("detailed")}
            className="
              flex-1 md:flex-none
              bg-maroon text-white cursor-pointer
              text-[15px] md:text-[12px] font-semibold tracking-wide
              h-[50px] md:h-[100px] md:w-[44px]
              flex items-center justify-center
              md:rotate-180
              md:[writing-mode:vertical-rl]
            "
          >
            VISIT US
          </button>

          {/* APPLY NOW */}
          <button
            onClick={() => setFormType("simple")}
            className="
              flex-1 md:flex-none
              bg-primary text-white cursor-pointer
              text-[15px] md:text-[12px] font-semibold tracking-wide
              h-[50px] md:h-[100px] md:w-[44px]
              flex items-center justify-center
              md:rotate-180
              md:[writing-mode:vertical-rl]
            "
          >
            APPLY NOW
          </button>

        </div>
      </div>

      {/* POPUP MODAL */}
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
    </div>
  );
}