"use client";

import Image from "next/image";

export default function ImageContentSection({
  imageSrc,
  mobileImageSrc,
  title,
  description,
  bgColor = "#F5F5F5",
  breakText = true,
  primaryBtnText,
  secondaryBtnText,
  reverse = false,
  onPrimaryClick,
  onSecondaryClick,
}) {
  return (
    <section className="w-full pt-10" style={{ backgroundColor: bgColor }}>
      <div className="container-custom mx-auto px-6">

        {/* MOBILE LAYOUT: text on top, image below */}
        <div className="flex flex-col md:hidden gap-6 items-center text-center">
          {/* CONTENT — top on mobile */}
          <div className="w-full">
            <h2
              className={`text-3xl font-semibold text-gray-800 ${
                breakText ? "" : "whitespace-nowrap"
              }`}
            >
              {title}
            </h2>
            <p className="mt-4 text-gray-600 max-w-lg mx-auto">{description}</p>
            <div className="mt-6 flex flex-row gap-3 justify-center flex-wrap">
              {primaryBtnText && (
                <button
                  onClick={onPrimaryClick}
                  type="button"
                  className="px-5 py-2.5 bg-maroon text-white rounded-full text-sm font-semibold whitespace-nowrap cursor-pointer hover:opacity-90 transition"
                >
                  {primaryBtnText}
                </button>
              )}
              {secondaryBtnText && (
                <button
                  onClick={onSecondaryClick}
                  type="button"
                  className="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-semibold whitespace-nowrap cursor-pointer hover:opacity-90 transition"
                >
                  {secondaryBtnText}
                </button>
              )}
            </div>
          </div>

          {/* IMAGE — bottom on mobile */}
          <div className="w-full relative h-[300px] overflow-hidden">
            <Image
              src={mobileImageSrc || imageSrc}
              alt="section image"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* DESKTOP LAYOUT: side by side */}
        <div
          className={`hidden md:flex flex-row items-center justify-between gap-12 ${
            reverse ? "flex-row-reverse" : ""
          }`}
        >
          {/* IMAGE */}
          <div className="w-full md:w-4/5">
            <div className="relative w-full h-[480px] overflow-hidden">
              <Image
                src={imageSrc}
                alt="section image"
                fill
                priority
                className={`object-cover ${reverse ? "object-[center_85%]" : ""}`}
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="w-full md:w-1/2 md:pl-10 text-left">
            <h2
              className={`text-5xl font-semibold text-gray-800 ${
                breakText ? "" : "whitespace-nowrap"
              }`}
            >
              {title}
            </h2>
            <p className="mt-4 text-gray-600 max-w-lg">{description}</p>
            <div className="mt-6 flex flex-row gap-3 flex-wrap">
              {primaryBtnText && (
                <button
                  onClick={onPrimaryClick}
                  type="button"
                  className="px-5 py-2.5 bg-maroon text-white rounded-full text-sm font-semibold whitespace-nowrap hover:opacity-90 transition cursor-pointer"
            >
                  {primaryBtnText}
                </button>
              )}
              {secondaryBtnText && (
                <button
                  onClick={onSecondaryClick}
                  type="button"
                  className="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-semibold whitespace-nowrap hover:opacity-90 transition cursor-pointer"

>
                  {secondaryBtnText}
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
