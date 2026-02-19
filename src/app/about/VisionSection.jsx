import Image from "next/image";

export default function VisionSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16 lg:gap-8">

        {/* IMAGE SIDE */}
        <div className="relative flex justify-center items-center">

          {/* Perfect Circle Background */}
          <div className="
            absolute 
            w-[260px] h-[260px] 
            md:w-[360px] md:h-[360px] 
            lg:w-[480px] lg:h-[480px]
            bg-lightblue 
            rounded-full 
            -z-10
          " />

          {/* Image */}
          <Image
            src="/assets/Vision-Mission.webp"
            alt="Students"
            width={600}
            height={850}
            className="
              w-[320px] 
              md:w-[420px]
              lg:w-[520px]
              h-auto
              object-contain
            "
            priority
          />

        </div>

        {/* TEXT SIDE */}
        <div className="text-center md:text-left">

          <h2 className="heading 
            inline-block 
            bg-lightblue 
            text-dark 
            px-5 py-2 
            font-semibold 
            mb-6">
            OUR VISION
          </h2>

          <p className="paragraph 
            max-w-lg 
            text-base md:text-lg 
            leading-relaxed">
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
