"use client";

import Image from "next/image";
import Button from "./KnowMorebtn";

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
        <div
          className={`flex flex-col md:hidden items-center text-center ${
            reverse ? "gap-1" : "gap-6"
          }`}
        >
          {/* CONTENT — top on mobile */}
          <div className="w-full">
            <h2
              className={`text-3xl font-semibold text-gray-800 ${
                breakText ? "" : "whitespace-nowrap"
              }`}
            >
              {title}
            </h2>

            <p className="mt-4 text-gray-600 max-w-lg mx-auto">
              {description}
            </p>

            <div className="mt-6 flex flex-row gap-3 justify-center flex-wrap">
              {primaryBtnText && (
                <Button
                text={primaryBtnText}
                onClick={onPrimaryClick}
                className=" !bg-maroon !text-white !border-none !text-sm hover:!opacity-90"
              />
                            )}

                                          {secondaryBtnText && (
                <Button
                text={secondaryBtnText}
                onClick={onSecondaryClick}
                className=" !bg-primary !text-white !border-none !text-sm hover:!opacity-90"
              />
              )}
            </div>
          </div>

          {/* IMAGE — bottom on mobile */}
          <div
              className={`w-[110%] relative overflow-hidden
                ${
                  reverse
                    ? "h-[360px] min-[425px]:h-[400px]"
                    : "h-[300px] min-[425px]:h-[460px]"
                }
              `}
            >
              <Image
                src={mobileImageSrc || imageSrc}
                alt="section image"
                fill
                priority
                className="object-cover object-bottom"
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
              className={`
                object-contain
                lg:object-cover
                ${reverse ? "object-[center_69%]" : ""}
              `}
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
                  <Button
                  text={primaryBtnText}
                  onClick={onPrimaryClick}
                  className=" !bg-maroon !text-white !border-none !text-sm hover:!opacity-90"
                />
                )}
                              {secondaryBtnText && (
                  <Button
                  text={secondaryBtnText}
                  onClick={onSecondaryClick}
                  className=" !bg-primary !text-white !border-none !text-sm hover:!opacity-90"
                />
                )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
