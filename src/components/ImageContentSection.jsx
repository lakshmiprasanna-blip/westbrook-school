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
    <section className="w-full pt-10 overflow-hidden" style={{ backgroundColor: bgColor }}>
      <div className="container-custom mx-auto">

        <div className="flex flex-col md:hidden items-center text-center gap-0">
  {/* CONTENT */}
  <div className="w-full px-6">
    <h2 className="text-2xl min-[375px]:text-2xl font-semibold text-gray-800 min-[375px]:whitespace-nowrap">
      {title}
    </h2>
    <p className="mt-4 text-gray-600 max-w-lg mx-auto">{description}</p>

    <div className="mt-6 flex flex-row gap-3 justify-center items-center">
      {primaryBtnText && (
        <Button
          text={primaryBtnText}
          onClick={onPrimaryClick}
          className="!bg-maroon !text-white !border-none !text-sm hover:!opacity-90 !px-4 !py-2 whitespace-nowrap"
        />
      )}
      {secondaryBtnText && (
        <Button
          text={secondaryBtnText}
          onClick={onSecondaryClick}
          className="!bg-primary !text-white !border-none !text-sm hover:!opacity-90 !px-4 !py-2 whitespace-nowrap"
        />
      )}
    </div>
  </div>

  {/* MOBILE IMAGE */}
  {/* MOBILE IMAGE */}
{mobileImageSrc ? (
  <div className="w-full relative aspect-[4/3]">
    <Image
      src={mobileImageSrc}
      alt="section image"
      fill
      className="object-contain object-top"
    />
  </div>
) : (
  <div className="w-[110%] relative aspect-[4/3]">
    <Image
      src={imageSrc}
      alt="section image"
      fill
      className="object-cover object-top"
    />
  </div>
)}
</div>

        {/* ── DESKTOP LAYOUT (>= md) ── */}
        <div
          className={`hidden md:flex flex-row items-center justify-between ${
            reverse ? "flex-row-reverse" : ""
          }`}
        >
          {/* IMAGE — always uses imageSrc on desktop */}
          <div className="w-[58%] shrink-0">
            <div className="relative w-full h-[320px] md:h-[380px] lg:h-[450px] xl:h-[480px]">
              <Image
                src={imageSrc}
                alt="section image"
                fill
                className="object-contain object-bottom"
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="w-[42%] pl-4 pr-6 lg:pl-6 lg:pr-10 text-left">
            <h2
              className={`text-3xl lg:text-4xl xl:text-5xl font-semibold text-gray-800 leading-tight ${
                breakText ? "" : "xl:whitespace-nowrap"
              }`}
            >
              {title}
            </h2>
            <p className="mt-4 text-gray-600 max-w-sm">{description}</p>
            <div className="mt-6 flex flex-row gap-3 flex-wrap">
              {primaryBtnText && (
                <Button
                  text={primaryBtnText}
                  onClick={onPrimaryClick}
                  className="!bg-maroon !text-white !border-none !text-sm hover:!opacity-90"
                />
              )}
              {secondaryBtnText && (
                <Button
                  text={secondaryBtnText}
                  onClick={onSecondaryClick}
                  className="!bg-primary !text-white !border-none !text-sm hover:!opacity-90"
                />
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}