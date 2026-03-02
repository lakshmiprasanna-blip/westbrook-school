"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnquiryForm from "./FormComponent"; // adjust path if needed

export default function FloatingCTAs() {
  const [formType, setFormType] = useState(null);

  return (
    <>
      <div className="fixed right-0 top-[60%] -translate-y-1/2 z-50">

        {/* Outer Wrapper */}
        <div className="flex flex-col overflow-hidden rounded-l-2xl shadow-lg">

          {/* VISIT US */}
          <button
            onClick={() => setFormType("detailed")}
            className="
              bg-maroon text-white
              text-[11px] font-semibold tracking-wide
              w-[44px] h-[100px]
              flex items-center cursor-pointer justify-center
              rotate-180
              [writing-mode:vertical-rl]
            "
          >
            VISIT US
          </button>

          {/* APPLY NOW */}
          <button
            onClick={() => setFormType("simple")}
            className="
              bg-primary text-white
              text-[11px] font-semibold tracking-wide
              w-[44px] h-[100px]
              flex items-center cursor-pointer justify-center
              rotate-180
              [writing-mode:vertical-rl]
            "
          >
            APPLY NOW
          </button>

        </div>
      </div>

      {/* ✅ POPUP MODAL */}
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
                className="absolute -top-3 -right-3 bg-white rounded-full w-8 h-8 shadow flex items-center justify-center text-black font-bold"
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