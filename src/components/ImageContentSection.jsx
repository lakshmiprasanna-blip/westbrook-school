"use client";

import Image from "next/image";

export default function ImageContentSection({
  imageSrc,
  title,
  description,
  bgColor = "#F5F5F5",
  breakText = true, // true = allow break, false = no break
  primaryBtnText,
  secondaryBtnText,
}) {
  return (
    <section
      className="w-full py-16 md:py-24"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">

        {/* LEFT IMAGE */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full h-[350px] md:h-[450px]">
            <Image
              src={imageSrc}
              alt="section image"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-1/2 text-center md:text-left">

          {/* TITLE */}
          <h2
            className={`text-3xl md:text-4xl font-semibold text-gray-800 ${
              breakText ? "" : "whitespace-nowrap"
            }`}
          >
            {title}
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-4 text-gray-600 max-w-lg">
            {description}
          </p>

          {/* BUTTONS */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

            {primaryBtnText && (
              <button className="px-6 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition">
                {primaryBtnText}
              </button>
            )}

            {secondaryBtnText && (
              <button className="px-6 py-3 bg-blue-700 text-white rounded-full font-medium hover:bg-blue-800 transition">
                {secondaryBtnText}
              </button>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}