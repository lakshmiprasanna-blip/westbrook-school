"use client";
import Link from "next/link";
import Image from "next/image";

export default function ContactCTA({
  imageSrc = "/assets/groupimg-1.webp",
}) {
  return (
    <section className="relative w-full h-[65vh] md:h-[75vh] lg:h-[80vh] overflow-hidden">

      {/* Background Image */}
      <Image
        src={imageSrc}
        alt="Group"
        fill
        priority
        className="
          object-cover
          object-center
          md:object-[center_top]
          lg:object-center
        "
        sizes="100vw"
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 50%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

        {/* Heading */}
        <h2
          className="text-white mb-4 text-[30px] md:text-[40px] lg:text-[48px] leading-[1]"
          style={{
            fontFamily: "Playfair Display, serif",
            fontWeight: 700,
          }}
        >
          We’d love to hear from you!
        </h2>

        {/* Sub Text */}
        <p
          className="text-white/90 mb-8 text-[14px] md:text-[16px] lg:text-[18px]"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
          }}
        >
          Feel free to get in touch, or apply now
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">

          <Link href="/contact">
            <button
              className="px-8 py-3 text-white text-sm md:text-base font-bold"
              style={{
                backgroundColor: "#9B1B2F",
              }}
            >
              CONTACT US
            </button>
          </Link>

          <Link href="/">
            <button
              className="px-8 py-3 text-white text-sm md:text-base font-bold"
              style={{
                backgroundColor: "#0F4D81",
              }}
            >
              APPLY NOW
            </button>
          </Link>

        </div>
      </div>
    </section>
  );
}
