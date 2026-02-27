"use client";

import { useState } from "react";
import Image from "next/image";
import EnquiryForm from "./FormComponent";
import { motion, AnimatePresence } from "framer-motion";

export default function FooterAbove({
  desktopImage,
  mobileImage,
  heading,
  description,
  primaryBtnText = "BOOK A VISIT",
  secondaryBtnText = "APPLY NOW",
  bgColor = "#C8C8C8",
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [formType, setFormType] = useState("simple");

  return (
    <>
      {/* MAIN SECTION */}
      <section className="w-full py-8" style={{ backgroundColor: bgColor }}>
        <div className="container-custom mx-auto px-6 flex flex-col lg:flex-row items-center gap-10">

          {/* LEFT / IMAGE */}
          <div className="w-full lg:w-3/5 relative">

            {/* DESKTOP IMAGE */}
            <div className="hidden lg:block relative h-[500px]">
              <Image
                src={desktopImage}
                alt="Desktop Image"
                fill
                className="object-cover"
              />
            </div>

            {/* MOBILE IMAGE */}
            <div className="lg:hidden relative h-[300px] mt-4">
              <Image
                src={mobileImage}
                alt="Mobile Image"
                fill
                className="object-cover"
              />

              {/* MOBILE BUTTONS ON IMAGE */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                <button
                  onClick={() => {
                    setFormType("detailed");
                    setShowPopup(true);
                  }}
                  className="bg-[#9B1B2F] text-white px-4 py-2 rounded-full text-xs font-medium"
                >
                  {primaryBtnText}
                </button>

                <button
                  onClick={() => {
                    setFormType("simple");
                    setShowPopup(true);
                  }}
                  className="bg-[#0F4D81] text-white px-4 py-2 rounded-full text-xs font-medium"
                >
                  {secondaryBtnText}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT / CONTENT */}
          <div className="w-full lg:w-2/5 text-center lg:text-left">

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mb-4">
              {heading}
            </h2>

            <p className="text-gray-500 mb-6">
              {description}
            </p>

            {/* DESKTOP BUTTONS */}
            <div className="hidden lg:flex gap-4">
              <button
                onClick={() => {
                  setFormType("detailed");
                  setShowPopup(true);
                }}
                className="bg-[#9B1B2F] text-white px-6 py-3 rounded-full font-medium hover:opacity-90"
              >
                {primaryBtnText}
              </button>

              <button
                onClick={() => {
                  setFormType("simple");
                  setShowPopup(true);
                }}
                className="bg-[#0F4D81] text-white px-6 py-3 rounded-full font-medium hover:opacity-90"
              >
                {secondaryBtnText}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* POPUP MODAL */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              className="relative w-full max-w-md"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute -top-3 -right-3 bg-white rounded-full w-8 h-8 shadow flex items-center justify-center font-bold"
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