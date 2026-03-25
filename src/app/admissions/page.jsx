"use client";

import { useState } from "react";
import PageBanner from "../../components/PageBanner";
import FAQSection from "../../components/FAQSection";
import ContactCTA from "../../components/ContactCTA";
import VideoHeroAnimation from "../../components/VideoHeroAnimation";
import EnquiryForm from "../../components/FormComponent";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { admissionsfaqData } from "../../data/faqsData";

export default function Admissions() {
  const [formType, setFormType] = useState(null);

  

  return (
    <>
      <div className="pt-[70px] lg:pt-[80px]">
        <PageBanner image="/assets/banner1.webp" />
      </div>

      

      {/* The Westbrook Way Section */}
      <section className="bg-offwhite py-14 sm:py-16 md:py-20 lg:py-22">
        <div className="container-custom text-center">
          <h1 className="font-playfair font-bold text-[28px] sm:text-[34px] md:text-[42px] lg:text-[48px] leading-[110%] text-[var(--color-primary)]">
            The Westbrook Way
          </h1>

          <div className="paragraph mt-6 sm:mt-8 md:mt-10 max-w-4xl mx-auto space-y-4">
            <p>
              Westbrook doesn’t treat admissions as a selection process, but as the beginning of a partnership. We believe every child deserves the opportunity to learn in an environment that understands their pace, personality, and needs.
</p>
            <p>
              Our focus is on welcoming families, understanding the child, and ensuring alignment between home and school. The process is designed to feel calm, transparent, and supportive, just like the learning environment we aim to create. This approach is especially helpful for parents navigating School Admissions in Madhapur and exploring options for International school admissions for their children.
            </p>
          </div>
        </div>
      </section>

      
      <VideoHeroAnimation
        videoSrc="/assets/admission.aivideo.mp4"
        title="ADMISSIONS"
        onPopupOpen={(type) => setFormType(type)}
        slides={[
          {
            headingTop: "OUR ADMISSION",
            headingBottom: "PROCESS",
            subTitle: "Simple. Personal. Child-first.",
            description:
              `There are no entrance exams or qualification tests at Westbrook. Each admission is approached with care and individual attention, supporting families who are exploring School Admissions in Madhapur and beginning their journey with International school admissions.`,
            image: "/assets/our_admission_1x.webp",
            button: {
              text: "KNOW MORE",
              action: "popup",
            },
          },
          {
            headingTop: "START",
            headingBottom: "A CONVERSATION",
            subTitle: "Step One",
            description:
              "Reach out to us through the enquiry form or contact our admissions team. This helps us understand your interest and answer your initial questions.",
            image: "/assets/our_admission_2x.webp",
            button: {
              text: "KNOW MORE",
              action: "popup",
            },
          },
          {
            headingTop: "SCHOOL",
            headingBottom: "INTERACTION",
            subTitle: "Step Two",
            description:
              "Parents are invited for a conversation with our team to understand the school’s approach, daily routines, and academic framework.",
            image: "/assets/our_admission_3x.webp",
            button: {
              text: "KNOW MORE",
              action: "popup",
            },
          },
          {
            headingTop: "CHILD",
            headingBottom: "INTERACTION",
            subTitle: "Step Three",
            description:
              "A relaxed interaction with the child helps us understand comfort levels and readiness, without pressure or assessment.",
            image: "/assets/our_admission_4x.webp",
            button: {
              text: "KNOW MORE",
              action: "popup",
            },
          },
          {
            headingTop: "ADMISSION",
            headingBottom: "CONFIRMATION",
            subTitle:
              "Every admission matters to us, and each family is guided through the process with clarity and care.",
            description:
              "Every admission matters to us, and each family is guided through the process with clarity and care, especially for parents exploring School Admissions in Madhapur and seeking guidance through International school admissions.",
            image: "/assets/our_admission_5x.webp",
            button: {
              text: "APPLY NOW",
              link: "/contact",
              variant: "filledLarge",
            },
          },
        ]}
      />

      <FAQSection faqData={admissionsfaqData} />

      <ContactCTA
  imageSrc="/assets/admissions-footer-banner.png"
  title={
  <>
    Begin Your Child’s Journey <br />
    with Westbrook
  </>
}
  subtitle={`Please share your details, and our admissions team will be in touch to guide you through the next steps.

Visits can be scheduled at your convenience, particularly for families considering School Admissions in Madhapur or planning their child’s International school admissions journey.`}
/>
      {/* POPUP MODAL */}
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