import PageBanner from "../../components/PageBanner";
import FloatingCTAs from "../../components/FloatingCTAs";
import Image from "next/image";
import OurPhilosophySection from "./OurPhilosophySection";
import VisionSection from "./VisionSection";
import CoreValues from "./CoreValues";
import LeaderShipSection from "./LeaderShipSection";
import ContactCTA from "../../components/ContactCTA";

export default function About() {
  const leadershipData = [
    {
      title: "Mrs. Sanjana Reddy",
      role:"FOUNDER & DIRECTOR ",
      image: "/assets/leader1.png",
    },
    {
      title: "Mrs. K. Padma Praveena",
      role:"PRINCIPAL & ACADEMIC LEADER",
      image: "/assets/leader2.png",
    },
    {
      title: "Mr. K Madhusudhana",
      role:"FOUNDER & ACADEMIC LEADER",
      image: "/assets/leader3.png",
    },
  ];
  return (
    <>
      <PageBanner image="/assets/about-banner.png" />
      <FloatingCTAs />
      <section className="w-full bg-white py-16">
        <div className="container-custom">

          <div className="flex flex-col md:flex-row items-start md:items-center">

            {/* LEFT CONTENT */}
            <div className="w-[320px] md:w-[78%]">

              {/* MOBILE: logo beside heading */}
              <div className="flex items-start gap-3 md:block">
                <Image
                  src="/assets/emblem.png"
                  alt="Westbrook International School Emblem"
                  width={60}
                  height={60}
                  className="opacity-60 md:hidden"
                />

                <h2 className="text-[24px] md:text-[34px] font-semibold text-[var(--color-primary)] mb-4 leading-tight">
                  At Westbrook International School
                </h2>
              </div>

              <div className="max-w-[950px]">
                <p className="text-[16px] md:text-[18px] leading-[28px] md:leading-[30px] mb-5 text-[#555]">
                  Westbrook International School is built on the belief that education
                  must do more than deliver academic results. It must shape thinking,
                  character, and confidence in a way that supports children throughout
                  their school years and beyond.
                </p>

                <p className="text-[16px] md:text-[18px] leading-[28px] md:leading-[30px] text-[#555]">
                  Westbrook is guided by experienced academicians from the Tapasya School
                  group, whose long-standing work in education forms the academic backbone
                  of the school. Their experience brings clarity, structure, and academic
                  rigour to every aspect of teaching and learning, ensuring that systems,
                  pedagogy, and classroom practices are built on proven educational
                  understanding rather than short-term trends.
                </p>
              </div>
            </div>

            {/* RIGHT LOGO — DESKTOP ONLY */}
            <div className="hidden md:flex md:w-[22%] justify-center">
              <Image
                src="/assets/emblem.png"
                alt="Westbrook International School Emblem"
                width={360}
                height={360}
                className="opacity-40"
              />
            </div>

          </div>

        </div>
      </section>
      
      <OurPhilosophySection/>
      <VisionSection/>
      <CoreValues/>
      <LeaderShipSection
        heading="LEADERSHIP TEAM"
        data={leadershipData}
        sectionBg="bg-[#F3F3F3]"
      />
        <ContactCTA imageSrc="/assets/about-contact.png"/>
    </>
  );
}
