"use client";
import Link from "next/link";
import Image from "next/image";
import EnquiryForm from "./FormComponent"; // adjust path if needed


export default function ContactCTA({
  imageSrc = "/assets/groupimg-1.webp",
  align = "center",
  title ="We’d love to hear from you!",
  subtitle = "Feel free to get in touch, or apply now",
}) {
  
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
    "linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.25) 70%)",
}}
      />

      {/* Content */}
     <div
  className="
    max-w-xl
    relative z-10 h-full px-6
    mx-auto
    flex flex-col justify-center items-center text-center
  "
>
  {/* Heading */}
  <h2 className="font-playfair font-bold text-white mb-4 text-[30px] md:text-[40px] lg:text-[40px] leading-[1.3]">
    {title}
  </h2>

  {/* Sub Text */}
  <p className="font-montserrat font-medium text-white/90 mb-8 text-[14px] md:text-[16px] lg:text-[18px]">
    {subtitle}
  </p>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <button
  onClick={() => setFormType("detailed")}
  className="px-7 py-3 rounded-full text-white text-sm md:text-base font-semibold bg-maroon cursor-pointer"
>
  CONTACT US
</button>

<button
  onClick={() => setFormType("simple")}
  className="px-7 py-3 rounded-full text-white text-sm md:text-base font-semibold bg-primary cursor-pointer"
>
  APPLY NOW
</button>
  </div>



</div>
    </section>
  );
}
