"use client";

import Image from "next/image";

export default function PageBanner({ image }) {
  return (
    <section className="relative w-full">
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden">
        <Image
          src={image}
          alt="Page Banner"
          fill
          priority
          className="object-cover"
        />
      </div>
    </section>
  );
}
