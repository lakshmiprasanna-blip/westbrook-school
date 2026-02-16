import PageBanner from "../../components/PageBanner";
import FloatingCTAs from "../../components/FloatingCTAs";

export default function Admissions() {
  return (
    <>
      <PageBanner image="/assets/banner1.webp" />
      <FloatingCTAs />
      
      {/* The Westbrook Way Section */}
<section className="bg-[#F7F6F2] py-20 md:py-22 lg:py-28">
  <div className="container-custom text-center">

    {/* Heading */}
    <h1 className="text-[36px] sm:text-[42px] md:text-[48px] lg:text-[56px] 
                   text-[var(--color-primary)] 
                   leading-[1]">
      The Westbrook Way
    </h1>

    {/* Content */}
    <div className="mt-10 md:mt-12 max-w-4xl mx-auto space-y-5">
      
      <p className="text-[16px] md:text-[18px] leading-relaxed">
        Westbrook doesn’t treat admissions as a selection process, but as the beginning of a partnership. We believe every child deserves the opportunity to learn in an environment that understands their pace, personality, and needs.
      </p>

      <p className="text-[16px] md:text-[18px] leading-relaxed">
        Our focus is on welcoming families, understanding the child, and ensuring alignment between home and school. The process is designed to feel calm, transparent, and supportive, just like the learning environment we aim to create.
      </p>

    </div>

  </div>
</section>

    </>
  );
}
