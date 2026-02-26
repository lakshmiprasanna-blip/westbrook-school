"use client";

import Image from "next/image";

export default function FooterAbove({
  imageSrc,
  heading,
  description,
  primaryBtnText = "CONTACT US",
  secondaryBtnText = "APPLY NOW",
  bgColor = "#C8C8C8",
  imageHeight = "500px",
  imageWidthClass = "lg:w-3/5",
}) {
  return (
    <section
      className="w-full py-6"
      style={{ backgroundColor: bgColor }}
    >
      <div className="container-custom mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* LEFT IMAGE */}
        {/* LEFT IMAGE */}
<div
  className={`w-full ${imageWidthClass} relative overflow-hidden`}
  style={{ height: imageHeight }}
>
  <Image
    src={imageSrc}
    alt="Section Image"
    fill
    className="object-cover object-center scale-110"
    priority
  />
</div>

        {/* RIGHT CONTENT */}
        <div className="w-full lg:w-2/5 flex items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 leading-tight mb-6">
              {heading}
            </h2>

            <p className="text-gray-500 mb-8">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-[#9B1B2F]  text-white px-6 py-3 rounded-full font-medium transition">
                {primaryBtnText}
              </button>

              <button className="bg-[#0F4D81] text-white px-6 py-3 rounded-full font-medium transition">
                {secondaryBtnText}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}