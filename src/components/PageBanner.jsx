import Image from "next/image";

export default function PageBanner({ image, alt = "Page Banner" }) {
  return (
    <section className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        fetchPriority="high"
        className="object-cover"
        sizes="100vw"
        quality={85}
      />
    </section>
  );
}