"use client";

import Image from "next/image";

export default function MindsSection() {
  return (
    <section className="bg-[#EDEBE8] md:h-[600px]">
      <div className="container-custom h-full flex flex-col md:flex-row items-center justify-between px-4 md:px-0">

        {/* LEFT CONTENT */}
        <div className="max-w-[620px] text-center md:text-left pt-12 md:pt-0">
          <h2 className="text-[24px] leading-[34px] md:text-[48px] md:leading-[66px] text-[var(--color-primary)]">
            <span className="block whitespace-nowrap">
              Education that Forms Minds
            </span>

            <span className="block whitespace-nowrap">
              Learning that Shapes
            </span>

            <span className="block whitespace-nowrap">
              Character.
            </span>
          </h2>

          {/* Buttons */}
<div className="flex flex-col sm:flex-row items-center md:items-start gap-3 md:gap-6 mt-6 md:mt-10 justify-center md:justify-start">
            <button
              className="
                bg-[var(--color-maroon)] text-white
                w-[160px] sm:w-auto
                px-5 py-2 text-xs sm:text-sm
                uppercase tracking-wide
                hover:opacity-90 transition
              "
            >
              Apply Now
            </button>

            <button
              className="
                border border-[var(--color-maroon)] text-[var(--color-maroon)]
                w-[160px] sm:w-auto
                px-5 py-2 text-xs sm:text-sm
                uppercase tracking-wide
                hover:bg-[var(--color-maroon)] hover:text-white transition
              "
            >
              Book a Visit
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full md:w-[937px] h-[300px] md:h-[500px] mt-0 md:mt-25">
          <Image
            src="/assets/minds.png"
            alt="Students"
            fill
            priority
          />
        </div>

      </div>
    </section>
  );
}
