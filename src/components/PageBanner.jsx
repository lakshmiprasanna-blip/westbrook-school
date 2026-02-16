"use client";

export default function PageBanner({ image }) {
  return (
    <section className="relative w-full">
      <div className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden">
        <img
          src={image}
          alt="Page Banner"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
