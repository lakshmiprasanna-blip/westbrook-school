import Image from "next/image";

export default function VisionSection() {
  return (
    <section className="py-global bg-white">
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 items-center gap-12">


<div className="relative flex justify-center items-center h-[850px]">
  {/* Blue circle */}
  <div className="absolute w-[520px] h-[780px] bg-[var(--color-lightblue)] rounded-full -z-10"></div>

  <Image
    src="/assets/vision.png"
    alt="Students"
    width={600}
    height={850}
    className="w-[600px] h-[850px]"
  />
</div>




        {/* RIGHT CONTENT */}
        <div>
          <h2 className="heading inline-block bg-[var(--color-lightblue)] text-[var(--color-primary)] px-4 py-1 font-semibold mb-4">
            OUR VISION
          </h2>

          <p className="paragraph mt-4 max-w-lg">
            To emerge as a world-class institution of learning that nurtures curious minds, strong character, and global competence, while remaining deeply rooted in Indian values, culture, and ethos, shaping responsible, confident, and compassionate leaders of tomorrow.
          </p>
        </div>

      </div>
    </section>
  );
}
