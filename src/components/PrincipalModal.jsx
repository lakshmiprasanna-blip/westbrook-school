"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function PrincipalModal({ leader, onClose }) {
  useEffect(() => {
    if (leader) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [leader]);

  return (
    <AnimatePresence>
      {leader && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-[#2E5C88] text-white
                       px-5 py-8
                       sm:px-8 sm:py-10
                       md:px-12 md:py-14
                       lg:px-16 lg:py-16
                       max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
  onClick={onClose}
  className="absolute 
             top-4 right-4
             sm:top-6 sm:right-6
             md:top-8 md:right-8
             bg-maroon 
             w-10 h-10
             sm:w-12 sm:h-12
             md:w-14 md:h-14
             rounded-full 
             flex items-center justify-center
             z-50"
>
  <span className="text-white text-2xl sm:text-3xl font-semibold leading-none">
    ×
  </span>
</button>

            {/* Content */}
            <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 lg:gap-14">
              
              {/* Left Image */}
              <div className="w-full md:w-[38%]">
                <div className="relative w-full
                                h-[260px]
                                sm:h-[300px]
                                md:h-[420px]
                                bg-white">
                  <Image
                    src={leader.image}
                    alt={leader.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Right Content */}
              <div className="w-full md:w-[62%]">

                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                               font-playfair font-semibold
                               mb-3 md:mb-4">
                  {leader.title}
                </h2>

                <p className="text-white uppercase tracking-[2px] sm:tracking-[3px]
                              text-xs sm:text-sm
                              mb-5 md:mb-8">
                  {leader.role}
                </p>

                <p className="text-white text-sm sm:text-[15px] md:text-[16px]
                              leading-6 sm:leading-7 md:leading-8">
                  {leader.description}
                </p>

              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}