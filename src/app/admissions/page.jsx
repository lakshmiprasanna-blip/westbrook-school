import PageBanner from "../../components/PageBanner";
import FloatingCTAs from "../../components/FloatingCTAs";
import VideoHero from "../../components/VideoHero";
import FAQSection from "../../components/FAQSection";
import ContactCTA from "../../components/ContactCTA";

export default function Admissions() {
  return (
    <>
      <PageBanner image="/assets/banner1.webp" />
      <FloatingCTAs />
      
      {/* The Westbrook Way Section */}
    <section className="bg-[#F7F6F2] py-14 sm:py-16 md:py-20 lg:py-24">
  <div className="container-custom text-center">

    {/* Heading */}
    <h1
      className="!font-[Playfair_Display] !font-bold
                 !text-[28px] sm:!text-[34px] md:!text-[42px] lg:!text-[48px]
                 !leading-[110%] text-[var(--color-primary)]"
    >
      The Westbrook Way
    </h1>

    {/* Content */}
    <div className="mt-6 sm:mt-8 md:mt-10 max-w-3xl mx-auto space-y-4">

      <p
        className="!font-[Montserrat] !font-normal
                   !text-[15px] sm:!text-[16px] md:!text-[17px]
                   !leading-[24px] sm:!leading-[26px] md:!leading-[28px]"
      >
        Westbrook doesn’t treat admissions as a selection process, but as the beginning of a partnership. We believe every child deserves the opportunity to learn in an environment that understands their pace, personality, and needs.
      </p>

      <p
        className="!font-[Montserrat] !font-normal
                   !text-[15px] sm:!text-[16px] md:!text-[17px]
                   !leading-[24px] sm:!leading-[26px] md:!leading-[28px]"
      >
        Our focus is on welcoming families, understanding the child, and ensuring alignment between home and school. The process is designed to feel calm, transparent, and supportive, just like the learning environment we aim to create.
      </p>

    </div>

  </div>
</section>


    <VideoHero
    videoSrc="/assets/admission.aivideo.mp4"
    title="ADMISSIONS"
    />
    <FAQSection/>
    <ContactCTA/>
    </>
  );
}
