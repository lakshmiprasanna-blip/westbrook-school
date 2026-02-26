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
  reverse = false, // 👈 new prop
}) {
  return (
    <section
      className="w-full pt-10"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`container-custom mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >

        {/* IMAGE */}
        <div className="w-full md:w-4/5">
          <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden">
            <Image
            src={imageSrc}
            alt="section image"
            fill
            priority
            className={`object-cover ${
              reverse ? "object-[center_85%]" : ""
            }`}
          />
          </div>
        </div>

        {/* CONTENT */}
        <div className="w-full md:w-1/2 md:pl-10 text-center md:text-left">
          <h2
            className={`text-3xl md:text-5xl font-semibold text-gray-800 ${
              breakText ? "" : "whitespace-nowrap"
            }`}
          >
            {title}
          </h2>

          <p className="mt-4 text-gray-600 max-w-lg mx-auto md:mx-0">
            {description}
          </p>

          <div className="mt-6 flex flex-row gap-3 justify-center md:justify-start flex-wrap">
            {primaryBtnText && (
              <button className="px-5 py-2.5 bg-maroon text-white rounded-full text-sm font-semibold whitespace-nowrap">
                {primaryBtnText}
              </button>
            )}

            {secondaryBtnText && (
              <button className="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-semibold whitespace-nowrap">
                {secondaryBtnText}
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}