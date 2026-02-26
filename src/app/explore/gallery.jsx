"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function GallerySection() {

  /* ---------------- IMAGE ARRAYS ---------------- */

  const topImages = [
    "/assets/explore-collage5.webp",
    "/assets/explore-collage3.webp",
    "/assets/explore-collage1.webp",
  ];

  const bottomImages = [
    "/assets/explore-collage6.webp",
    "/assets/explore-collage2.webp",
    "/assets/explore-collage4.webp",
  ];

  /* ---------------- STATE ---------------- */

  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);

  /* ---------------- AUTO SCROLL (MOBILE) ---------------- */

  useEffect(() => {
    const topTimer = setInterval(() => {
      setTopIndex((prev) => (prev + 1) % topImages.length);
    }, 1500);

    const bottomTimer = setInterval(() => {
      setBottomIndex((prev) => (prev + 1) % bottomImages.length);
    }, 1500);

    return () => {
      clearInterval(topTimer);
      clearInterval(bottomTimer);
    };
  }, [topImages.length, bottomImages.length]);


  return (
    <section className="w-full bg-primary py-14 lg:py-20">
      <div className="container-custom">

        {/* ================= DESKTOP VERSION (UNCHANGED) ================= */}
        <div
          className="
            hidden lg:grid
            grid-cols-3 
            gap-4
            auto-rows-[260px]
          "
        >

          <div className="relative">
            <Image src="/assets/explore-gallery1.webp" alt="" fill  sizes="(max-width: 768px) 100vw,
         (max-width: 1024px) 50vw,
         33vw" className="object-cover object-top" />
          </div>

          <div className="relative">
            <Image src="/assets/explore-gallery2.webp" alt="" fill  sizes="(max-width: 768px) 100vw,
         (max-width: 1024px) 50vw,
         33vw" className="object-cover object-top" />
          </div>

          <div className="relative row-span-2">
            <Image src="/assets/explore-gallery3.webp" alt="" fill  sizes="(max-width: 768px) 100vw,
         (max-width: 1024px) 50vw,
         33vw" className="object-cover" />
          </div>

          <div className="relative row-span-2">
            <Image src="/assets/explore-gallery6.webp" alt="" fill  sizes="(max-width: 768px) 100vw,
         (max-width: 1024px) 50vw,
         33vw" className="object-cover" />
          </div>

          <div className="flex items-center justify-center text-center p-6">
            <h2 className="paragraph font-playfair !font-bold !text-[24px] !leading-[110%] text-offwhite">
              At Westbrook, early learning spaces are designed to feel familiar,
              calm, and inviting, helping young children feel comfortable as they
              begin their school journey.
            </h2>
          </div>

          <div className="relative">
            <Image src="/assets/explore-gallery5.webp" alt="" fill  sizes="(max-width: 768px) 100vw,
         (max-width: 1024px) 50vw,
         33vw" className="object-cover" />
          </div>

          <div className="relative">
            <Image src="/assets/explore-gallery4.webp" alt="" fill  sizes="(max-width: 768px) 100vw,
         (max-width: 1024px) 50vw,
         33vw" className="object-cover" />
          </div>
        </div>

        {/* ================= TABLET VERSION ================= */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">

          <div className="relative h-[260px]">
            <Image src="/assets/explore-collage5.webp" alt="" fill  sizes="(max-width: 768px) 100vw,
         (max-width: 1024px) 50vw,
         33vw" className="object-cover rounded-sm" />
          </div>

          <div className="relative h-[260px]">
            <Image src="/assets/explore-collage3.webp" alt="" fill  sizes="(max-width: 768px) 100vw,
         (max-width: 1024px) 50vw,
         33vw" className="object-cover rounded-sm" />
          </div>

          <div className="col-span-2 flex items-center justify-center text-center px-10 py-6">
            <p className="paragraph font-playfair !font-bold !text-[26px] !leading-[120%] text-offwhite">
              At Westbrook, early learning spaces are designed to feel familiar,
              calm, and inviting, helping young children feel comfortable as they
              begin their school journey.
            </p>
          </div>

          <div className="relative h-[260px]">
            <Image src="/assets/explore-collage6.webp" alt="" fill   sizes="(max-width: 768px) 100vw,
         (max-width: 1024px) 50vw,
         33vw" className="object-cover rounded-sm" />
          </div>

          <div className="relative h-[260px]">
            <Image src="/assets/explore-collage2.webp" alt="" fill  sizes="(max-width: 768px) 100vw,
         (max-width: 1024px) 50vw,
         33vw" className="object-cover rounded-sm" />
          </div>

        </div>

        {/* ================= MOBILE VERSION (UNCHANGED) ================= */}
        <div className="md:hidden space-y-10">

          {/* TOP SLIDER */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${topIndex * 100}%)` }}
            >
              {topImages.map((img, i) => (
                <div key={i} className="min-w-full relative h-[300px]">
                  <Image src={img} alt="" fill sizes="100vw" className="object-cover" />
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-4 gap-2">
              {topImages.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setTopIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-colors ${
                    topIndex === i ? "bg-gray-400" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CENTER TEXT */}
          <div className="px-4 text-center">
            <p className="paragraph font-playfair !font-bold !text-[20px] !leading-[120%] !text-offwhite">
              At Westbrook, early learning spaces are designed to feel familiar,
              calm, and inviting, helping young children feel comfortable as they
              begin their school journey.
            </p>
          </div>

          {/* BOTTOM SLIDER */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${bottomIndex * 100}%)` }}
            >
              {bottomImages.map((img, i) => (
                <div key={i} className="min-w-full relative h-[300px]">
                  <Image src={img} alt="" fill sizes="100vw" className="object-cover" />
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-4 gap-2">
              {bottomImages.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setBottomIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-colors ${
                    bottomIndex === i ? "bg-gray-400" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
