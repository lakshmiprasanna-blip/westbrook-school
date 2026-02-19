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
    <section className="bg-offwhite py-14 sm:py-16 md:py-20 lg:py-22">
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
  slides={[
    {
      headingTop: "OUR ADMISSION",
      headingBottom: "PROCESS",
      subTitle: "Simple. Personal. Child-first.",
      description:
        "There are no entrance exams or qualification tests at Westbrook. Each admission is approached with care and individual attention.",
      image: "/assets/scroll-img1.webp",
      showDiscover: true,
    },
    {
      headingTop: "START",
      headingBottom: "A CONVERSATION",
      subTitle: "Step One",
      description:
        "Reach out to us through the enquiry form or contact our admissions team. This helps us understand your interest and answer your initial questions.",
      image: "/assets/scroll-img2.webp",
      showDiscover: true,
    },
    {
      headingTop: "SCHOOL",
      headingBottom: "INTERACTION",
      subTitle: "Step Two",
      description:
        "Parents are invited for a conversation with our team to understand the school’s approach, daily routines, and academic framework.",
      image: "/assets/scroll-img3.webp",
      showDiscover: true,
    },
    {
      headingTop: "CHILD",
      headingBottom: "INTERACTION",
      subTitle: "Step Three",
      description:
        "A relaxed interaction with the child helps us understand comfort levels and readiness, without pressure or assessment.",
      image: "/assets/scroll-img5.webp",
      showDiscover: true,
    },
    {
      headingTop: "ADMISSION",
      headingBottom: "CONFIRMATION",
      subTitle:
        "Every admission matters to us, and each family is guided through the process with clarity and care.",
      description:
        "Once aligned, admissions are confirmed through a simple documentation process.",
      image: "/assets/scroll-img4.webp",
      button: {
        label: "APPLY NOW",
        bg: "#9B1B2F",
        link: "/apply-now",   // ✅ pass link instead
      },
    },
  ]}
/>





       <FAQSection/>
    <ContactCTA/>
    </>
  );
}
