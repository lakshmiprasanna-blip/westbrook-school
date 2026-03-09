"use client";

import Image from "next/image";

export default function MindsSection({ onContactClick, onApplyClick }) {
  return (
    <section className="relative w-full bg-[#B38A67] overflow-hidden">
      <div className="relative flex items-center min-h-[420px] lg:min-h-[500px]">

        {/* TEXT SECTION */}
        <div className="!container-custom relative z-10">
          <div className="max-w-4xl lg:pl-48 py-16 lg:py-0">
            <h2 className="font-playfair font-bold text-white text-[28px] md:text-[40px] lg:text-[44px] leading-[1.2] mb-4">
              We’d love to hear from you!
            </h2>

            <p className="font-montserrat text-white/90 text-[15px] md:text-[17px] lg:text-[18px] mb-8">
              Feel free to get in touch, or apply now
            </p>

            <div className="flex gap-4 flex-wrap">
              <button
                onClick={onContactClick}
                className="px-7 py-3 rounded-full text-white font-semibold bg-maroon hover:opacity-90 transition"
              >
                CONTACT US
              </button>

              <button
                onClick={onApplyClick}
                className="px-7 py-3 rounded-full text-white font-semibold bg-primary hover:opacity-90 transition"
              >
                APPLY NOW
              </button>
            </div>
          </div>
        </div>

        {/* IMAGE */}
        <div className="absolute right-34 -bottom-10 h-[155%] w-[85%] hidden lg:block">
          <Image
            src="/assets/minds.webp"
            alt="Student"
            fill
            prioriy
            className="object-contain object-bottom-right"
          />
        </div>
      </div>
    </section>
  );
}