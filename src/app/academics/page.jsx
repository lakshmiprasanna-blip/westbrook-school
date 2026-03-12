"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageBanner from "../../components/PageBanner";
import VideoHero from "../../components/VideoHero";
import InfoSection from "../../components/InfoSection";
import FloatingCTAs from "../../components/FloatingCTAs";
import ScrollSlider from "../../components/AcademicsScrollSection";
import ImageContentSection from "../../components/ImageContentSection";
import EnquiryForm from "../../components/FormComponent";
import { motion, AnimatePresence } from "framer-motion";

export default function Academics() {
  
    const [formType, setFormType] = useState(null);
     const router = useRouter();


  return (
    <>
    <div className="pt-[70px] lg:pt-[80px]">
      <PageBanner image="/assets/academic-banner.webp" />
        </div>
      <FloatingCTAs />

      <ScrollSlider
        slides={[
          {
            smallTitle: "Our Curriculum",
            title: "What we follow",
            description: (
              <>
                The <span className="font-bold">international</span> curriculum
                forms the academic framework at Westbrook, supporting concept
                clarity, application, and clear communication.
              </>
            ),
            image: "/assets/academicsscroll.webp",
          },
          {
            title: "How learning progresses ?",
            description:
              "Subjects are structured to build understanding gradually across grades, allowing students to connect ideas and strengthen foundations over time.",
            image: "/assets/academicsscroll2.webp",
          },
          {
            title: "Why this matters ?",
            description:
              "This approach helps students move beyond memorization and develop confidence in applying what they learn.",
            image: "/assets/academicsscroll3.webp",
          },
        ]}
      />
      
      <VideoHero
        videoSrc="/assets/academic-aivideo.mp4"
        title="LEARNING JOURNEY"
        slides={[
          {
            headingTop: "EARLY YEARS",
            subTitle: "Empathy, Healthy,",
            description:
              "The early years are shaped around warmth, security, and gentle exploration. Children are encouraged to observe, ask questions, and engage with the world through play, stories, movement, and conversation. Learning experiences are thoughtfully guided to help children develop language, social awareness, and early thinking skills. With consistent routines and a caring environment, children begin to feel safe, confident, and ready to learn.",
            image: "/assets/academicsanimation1.webp",
          },
          {
            headingTop: "PRIMARY YEARS",
            subTitle: "Simple. Personal. Child-first.",
            description:
              "The primary years focus on building strong academic foundations while developing independence and curiosity. Learning becomes more structured, helping children make connections, express ideas clearly, and develop confidence in their abilities.Teachers support students in understanding concepts deeply rather than memorizing outcomes. Equal importance is given to academic growth, emotional development, and responsible behaviour, allowing children to grow into thoughtful and capable learners.",
            image: "/assets/academicsanimation2.webp",
          },
        ]}
      />
      

      {/* INFO SECTIONS */}
      <div>
       <InfoSection
        topLabel="Pedagogy"
        introText="How Learning Is Guided at Westbrook"
        tag="SOCIAL AND"
        subTag="EMOTIONAL"
        description="At Westbrook, learning begins with emotional awareness and self-understanding. Our pedagogy is inspired by approaches such as Roots of Empathy, where students develop empathy, emotional regulation, and interpersonal skills through guided observation, reflection, and discussion."
        image="/assets/academics-info1.webp"
        showButton
        buttonText="KNOW MORE"
        onButtonClick={() => {
          setFormType("simple");
        }}
      />

      <InfoSection
        tag="VALUES IN"
        subTag="DAILY PRACTICE"
        description="Values are not treated as a separate subject. Respect, responsibility, empathy, and integrity are reinforced through classroom interactions, routines, and expectations, helping children internalize behaviour rather than simply follow rules."
        image="/assets/academics-info2.webp"
        reverse
        showButton
        buttonText="KNOW MORE"
        onButtonClick={() => {
          setFormType("simple");
        }}
      />

        <InfoSection
  tag="CLARITY AND"
  subTag="DIRECTION"
  description="By building emotional balance, self-awareness, and responsible decision-making from early years, students develop a stronger sense of direction as they grow. This foundation supports confidence, discipline, and thoughtful choices across academic and personal learning stages."
  image="/assets/academics-info3.webp"
  className="lg:pb-20"
  showButton
  buttonText="KNOW MORE"
  onButtonClick={() => {
    setFormType("simple");
  }}
/>
      </div>

      {/* FOOTER ABOVE / IMAGE CONTENT SECTION */}
      <ImageContentSection
        imageSrc="/assets/footer-above1.png"
        mobileImageSrc="/assets/footer-above1.png"
        title="We’d love to hear from you!"
        description="Feel free to get in touch, or apply now"
        bgColor="#EDEBE8"
        breakText
        primaryBtnText="CONTACT US"
        secondaryBtnText="APPLY NOW"
         onPrimaryClick={() => {
          router.push("/contact"); // ✅ now it works
        }}
        onSecondaryClick={() => {
  setFormType("simple");
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