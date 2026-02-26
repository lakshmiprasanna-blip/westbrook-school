"use client";

import Image from "next/image";

export default function ImageContentSection({
  imageSrc,
  title,
  description,
  bgColor = "#F5F5F5",
  breakText = true,
  primaryBtnText,
  secondaryBtnText,
}) {
  return (
    <section
      className="w-full py-8"
      style={{ backgroundColor: bgColor }}
    >
      <div className="container-custom mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">

        {/* LEFT IMAGE */}
        <div className="w-full md:w-4/5"> {/* 👈 wider column */}
          <div className="relative w-full h-[450px] overflow-hidden">
            <Image
              src={imageSrc}
              alt="section image"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
        {/* RIGHT CONTENT */}
        <div className="w-full md:w-1/2 md:pl-10 text-center md:text-left"> {/* 👈 move right */}

          {/* TITLE */}
          <h2
            className={`text-3xl md:text-5xl font-semibold text-gray-800 ${
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
              <button className="px-6 py-3 bg-maroon text-white rounded-full font-medium transition">
                {primaryBtnText}
              </button>
            )}

            {secondaryBtnText && (
              <button className="px-6 py-3 bg-primary text-white rounded-full font-medium transition">
                {secondaryBtnText}
              </button>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}