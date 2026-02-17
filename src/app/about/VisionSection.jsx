import Image from "next/image";

export default function VisionSection() {
  return (
    <section className="py-12 md:py-2 bg-white">
      <div className="!container-custom grid grid-cols-1 md:grid-cols-2 items-center gap-14 md:gap-20 lg:gap-2">

        {/* IMAGE SIDE */}
        <div className="relative flex justify-center items-center 
                        h-[420px] md:h-[760px]">

          {/* Perfect Circle (not oval) */}
          <div className="absolute 
                          w-[260px] h-[260px] 
                          md:w-[480px] md:h-[480px] 
                          bg-[var(--color-lightblue)] 
                          rounded-full 
                          -z-10">
          </div>

          {/* Image */}
          <Image
            src="/assets/Vision & Mission.webp"
            alt="Students"
            width={600}
            height={850}
            className="
              w-[340px] 
              md:w-[520px]
              h-auto
              object-contain
            "
            priority
          />

        </div>

        {/* TEXT SIDE */}
        <div className="px-4 md:px-0 md:pl-6 lg:pl-10 text-center md:text-left">

          <h2 className="heading 
                         inline-block 
                         bg-[var(--color-lightblue)] 
                         text-[#2B292A] 
                         px-5 py-2 
                         font-semibold 
                         mb-6">
            OUR VISION
          </h2>

          <p className="paragraph 
                        max-w-lg 
                        text-base md:text-lg 
                        leading-relaxed !text-left">
            To emerge as a world-class institution of learning that nurtures
            curious minds, strong character, and global competence, while
            remaining deeply rooted in Indian values, culture, and ethos,
            shaping responsible, confident, and compassionate leaders of
            tomorrow.
          </p>

        </div>

      </div>
    </section>
  );
}
