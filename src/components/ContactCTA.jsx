"use client";
import Link from "next/link";

export default function ContactCTA({
  imageSrc = "/assets/groupimg-1.webp",
}) {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">

      {/* Background Image */}
      <img
        src={imageSrc}
        alt="Group"
        className="absolute inset-0 w-full h-full object-cover"
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
          className="text-white mb-4 text-[36px] md:text-[48px] leading-[1]"
          style={{
            fontFamily: "Playfair Display, serif",
            fontWeight: 700,
          }}
        >
          We’d love to hear from you!
        </h2>

        {/* Sub Text */}
        <p
          className="text-white/90 mb-8 text-[16px] md:text-[18px]"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
          }}
        >
          Feel free to get in touch, or apply now
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">

          {/* Contact Button */}
          <Link href="/contact">
          <button
            className="px-8 py-3 text-white"
            style={{
              backgroundColor: "#9B1B2F",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
            }}
          >
            CONTACT US
          </button>
          </Link>

          {/* Apply Button */}
          <Link href="/">
          <button
            className="px-8 py-3 text-white"
            style={{
              backgroundColor: "#0F4D81",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
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
