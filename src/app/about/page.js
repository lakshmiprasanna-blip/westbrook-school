"use client";
import { useRef, useState } from "react";
import PageBanner from "../../components/PageBanner";
import FloatingCTAs from "../../components/FloatingCTAs";
import Image from "next/image";
import OurPhilosophySection from "./OurPhilosophySection";
import VisionSection from "./VisionSection";
import CoreValues from "./CoreValues";
import LeaderShipSection from "./LeaderShipSection";
import AboutZoom from "../../components/AboutZoom";
import ImageContentSection from "../../components/ImageContentSection";
import EnquiryForm from "../../components/FormComponent";
import { motion, AnimatePresence } from "framer-motion";
export default function About() {
    const [formType, setFormType] = useState(null);
      const [showPopup, setShowPopup] = useState(false);
const leadershipData = [
  {
    title: "Mrs. Sanjana Reddy",
    role: "FOUNDER & DIRECTOR",
    image: "/assets/leader1.webp",
    description:
      "Mrs. Koduru Padma Praveena brings over three decades of rich experience in school education. She served as Principal and Teacher at CV Raman Primary School and Suprayoga Residential School in Nellore District from 1992 to 2000. Since 2001, she has been a key pillar at Tapasya High School, Hyderabad, serving as Principal and contributing significantly to academic planning, school administration, and teacher mentoring. Her journey reflects deep commitment, stability, and a child-centric approach to educational leadership."
  },
  {
    title: "Mrs. K. Padma Praveena",
    role: "PRINCIPAL & ACADEMIC LEADER",
    image: "/assets/leader2.webp",
    description:
      `Mrs. Koduru Padma Praveena brings over three decades of rich experience in school education. She served as Principal and Teacher at CV Raman Primary School and Suprayoga Residential School in Nellore District from 1992 to 2000. Since 2001, she has been a key pillar at Tapasya High School, Hyderabad, serving as Principal and contributing significantly to academic planning, school administration, and teacher mentoring. Her journey reflects deep commitment, stability, and a child-centric approach to educational leadership.`
  },
  {
    title: "Mr. K Madhusudhana",
    role: "FOUNDER & ACADEMIC LEADER",
    image: "/assets/leader3.webp",
    description:
      "Sri Koduru Madhusudhana Reddy is a senior academic leader and education administrator with over four decades of experience in Chemistry education. He has founded and led institutions ranging from CV Raman Educational Institutes in Nellore to Tapasya Educational Institutes in Hyderabad. Renowned for inspiring students and mentoring educators and administrators, he is also versatile across the social sciences, Biology, and English. Respected for his academic rigour and holistic outlook, he remains an avid learner committed to continuous growth and evolution."
  }
];
  return (
    <>
      <PageBanner image="/assets/about-banner.webp" />
      <FloatingCTAs />
      <section className="w-full bg-white py-12 md:py-25">
  <div className="container-custom ">

    <div className="flex flex-col md:flex-row items-start md:items-center gap-10">

      {/* LEFT CONTENT */}
      <div className="w-full md:w-3/4">

        {/* MOBILE: logo beside heading */}
        <div className="flex items-start gap-3 md:block">
          <Image
            src="/assets/emblem.png"
            alt="Westbrook International School Emblem"
            width={60}
            height={60}
            className="opacity-60 md:hidden"
          />

          <h2 className="text-[22px] sm:text-[26px] md:text-[34px] font-semibold text-[var(--color-primary)] mb-4 leading-tight">
            At Westbrook International School
          </h2>
        </div>

        <div className="max-w-[950px]">
          <p className="text-[15px] sm:text-[16px] md:text-[18px] leading-[26px] md:leading-[30px] mb-5 text-[#555]">
            Westbrook International School is built on the belief that education
            must do more than deliver academic results. It must shape thinking,
            character, and confidence in a way that supports children throughout
            their school years and beyond.
          </p>

          <p className="text-[15px] sm:text-[16px] md:text-[18px] leading-[26px] md:leading-[30px] text-[#555]">
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
      <div className="hidden md:flex md:w-1/4 justify-center">
        <Image
          src="/assets/emblem.png"
          alt="Westbrook International School Emblem"
          width={280}
          height={280}
          className="opacity-40 w-full max-w-[280px] h-auto"
        />
      </div>

    </div>

  </div>
</section>
      
      <OurPhilosophySection/>
      <AboutZoom/>
      <VisionSection/>
      <CoreValues/>
      <LeaderShipSection
        heading="LEADERSHIP TEAM"
        data={leadershipData}
        sectionBg="bg-[#F3F3F3]"
      />
        
        <ImageContentSection
        imageSrc="/assets/minds.webp"
          title="We’d love to hear from you!"
          description="Feel free to get in touch, or apply now"
          bgColor="#ffffff"
          primaryBtnText="CONTACT US"
          secondaryBtnText="APPLY NOW"
          breakText={false}
          reverse={true}
        
        onPrimaryClick={() => {
        setFormType("simple");
          setShowPopup(true);
        }}
        onSecondaryClick={() => {
          setFormType("detailed");
          setShowPopup(true);
        }}
      />

  {/* ✅ POPUP MODAL */}
      <AnimatePresence>
        {formType && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFormType(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md"
            >
              {/* Close Button */}
               <button
    onClick={() => setFormType(null)}
    className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 shadow flex items-center justify-center text-black font-bold"
  >
    ✕
  </button>

              <EnquiryForm variant={formType} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
