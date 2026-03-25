"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PageBanner from "../../components/PageBanner";
import OurPhilosophySection from "./OurPhilosophySection";
import VisionSection from "./VisionSection";
import CoreValues from "./CoreValues";
import LeaderShipSection from "./LeaderShipSection";
import AboutZoom from "../../components/AboutZoom";
import ImageContentSection from "../../components/ImageContentSection";
import EnquiryForm from "../../components/FormComponent";
import { motion, AnimatePresence } from "framer-motion";
import Internationalschool from "./Internationalschool";
export default function About() {
    const [formType, setFormType] = useState(null);
      const [showPopup, setShowPopup] = useState(false);
      const router = useRouter();
const leadershipData = [
  {
    title: "Mrs. Sanjana Reddy",
    role: "FOUNDER",
    image: "/assets/leader1.webp",
    description:
      "Mrs. Sanjana Reddy is the Founder of Westbrook International School, guided by a strong personal belief in value-led and balanced education. While her professional background lies in a well-established family real estate business, her decision to establish Westbrook grew from her close connection with children and her perspective as a parent. Her focus has been on creating a school where strong academic foundations, personal guidance, and values-based learning come together, allowing children to grow with clarity and without excessive academic pressure."
  },
  {
    title: "Mr. K Madhusudhana",
    role: "CO-FOUNDER & ACADEMIC DIRECTOR",
    image: "/assets/leader3.webp",
    description:
      `Sri Koduru Madhusudhana Reddy is a senior academic leader and education administrator with over four decades of experience in Chemistry education. He has founded and led institutions ranging from CV Raman Educational Institutes in Nellore to Tapasya Educational Institutes in Hyderabad. Renowned for inspiring students and mentoring educators and administrators, he is also versatile across the social sciences, Biology, and English. Respected for his academic rigour and holistic outlook, he remains an avid learner committed to continuous growth and evolution.`
    
  },
  {
    title: "Mrs. K. Padma Praveena",
    role: "CO-FOUNDER & PRINCIPAL",
    image: "/assets/leader2.webp",
   description:
      "Mrs. Koduru Padma Praveena brings over three decades of rich experience in school education. She served as Principal and Teacher at CV Raman Primary School and Suprayoga Residential School in Nellore District from 1992 to 2000. Since 2001, she has been a key pillar at Tapasya High School, Hyderabad, serving as Principal and contributing significantly to academic planning, school administration, and teacher mentoring. Her journey reflects deep commitment, stability, and a child-centric approach to educational leadership."},

];
  return (
    <>-
      <PageBanner image="/assets/about-banner.webp" />
    
      <Internationalschool
        title="At Westbrook International School"
        image="/assets/emblem.png"
        bgClass="bg-white"
        titleClass="text-[22px] sm:text-[26px] md:text-[34px] font-semibold text-[var(--color-primary)] mb-4 leading-tight"
        paragraphs={[
          "Westbrook International School is built on the belief that education must do more than deliver academic results. For families exploring the international school in madhapur, the school focuses on shaping thinking, character, and confidence in a way that supports children throughout their school years and beyond. As parents search for the Best international school in madhapur, they often look for an environment where academic clarity, balanced learning, and strong values come together to support each child’s development.",
          "At Westbrook, every child is recognised as a unique learner, and through close academic leadership, personalised attention, and classroom-focused teaching, the school works to build understanding and confidence within the school day itself. This approach helps reduce dependence on excessive external coaching while ensuring learning remains meaningful, balanced, and student-focused in an approach many parents consider when comparing the best international syllabus school in madhapur."
        ]}
      />
      
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
        imageSrc="/assets/minds-foot.png"
         mobileImageSrc="/assets/minds-foot-mob.png"
          title="We’d love to hear from you!"
          description="Feel free to get in touch, or apply now"
          bgColor="#ffffff"
          primaryBtnText="CONTACT US"
          secondaryBtnText="APPLY NOW"
          breakText={false}
          reverse={true}
        
         onPrimaryClick={() => {
          router.push("/contact"); // ✅ now it works
        }}
        onSecondaryClick={() => {
          setFormType("simple");
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
