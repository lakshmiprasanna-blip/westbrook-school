"use client";
import Link from "next/link";
import Image from "next/image";

export default function ContactCTA({
  imageSrc = "/assets/groupimg-1.webp",
  align = "center",
}) {
  const isLeft = align === "left";
  return (
    <section className="relative w-full h-[65vh] md:h-[75vh] lg:h-[80vh] overflow-hidden">

      {/* Background Image */}
      <Image
        src={imageSrc}
        alt="Group"
        fill  sizes="100vw"
        
        className="
          object-cover
          object-center
          md:object-[center_top]
          lg:object-center
        "
       
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.11) 0%, rgba(0,0,0,0.12) 40%)",
        }}
      />

      {/* Content */}
      <div
  className={`
    relative z-10 h-full px-6
    flex flex-col justify-center
    ${isLeft ? "items-start text-left" : "items-center text-center"}
  `}
>

        {/* Heading */}
        <h2
  className="font-playfair font-bold text-white mb-4 text-[30px] md:text-[40px] lg:text-[40px] leading-[1]"
        >
          We’d love to hear from you!
        </h2>

        {/* Sub Text */}
       <p
  className="font-montserrat font-medium text-white/90 mb-8 text-[14px] md:text-[16px] lg:text-[18px]"
>
          Feel free to get in touch, or apply now
        </p>

        {/* Buttons */}
        <div
  className={`flex flex-col sm:flex-row gap-4 ${
    isLeft ? "justify-start" : "justify-center"
  }`}
>

          <Link href="/contact">
            <button
              className="px-7 py-3 text-white text-sm md:text-base font-semibold bg-maroon cursor-pointer"
            >
              CONTACT US
            </button>
          </Link>

          <Link href="/">
            <button
              className="px-7 py-3 text-white text-sm md:text-base font-semibold bg-primary cursor-pointer"
            >
              APPLY NOW
            </button>
          </Link>

        </div>
      </div>
    </section>
  );
}
