"use client";

import { useState } from "react";
import PageBanner from "../../components/PageBanner";
import FloatingCTAs from "../../components/FloatingCTAs";
import FAQSection from "../../components/FAQSection";
import ContactCTA from "../../components/ContactCTA";
import VideoHeroAnimation from "../../components/VideoHeroAnimation";
import EnquiryForm from "../../components/FormComponent";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Admissions() {
  const [formType, setFormType] = useState(null);

  const admissionsfaqData = [
    {
      question: "Which grades are open for admission?",
      answer: "Admissions are currently open for Nursery to Grade 5.",
    },
    {
      question: "Is there any entrance test for children?",
      answer:
        "No. Westbrook does not conduct entrance exams. Admissions are based on interaction and alignment, not testing.",
    },
    {
      question: "Is the school suitable for first-time school-goers?",
      answer:
        "Yes. The Early Years Programme is designed to help children transition into school comfortably and confidently.",
    },
    {
      question: "Can parents meet the school leadership?",
      answer:
        "Yes. Parents can interact with the school leadership for guidance and clarity at any stage of the admission process.",
    },
    {
      question: "Is transport available?",
      answer:
        "Transportation is planned within a 5–10 km radius and will be communicated during the admissions process.",
    },
  ];

  return (
    <>
      <div className="pt-[70px] lg:pt-[80px]">
        <PageBanner image="/assets/banner1.webp" />
      </div>

      <FloatingCTAs />

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
              Our focus is on welcoming families, understanding the child, and ensuring alignment between home and school. The process is designed to feel calm, transparent, and supportive, just like the learning environment we aim to create.
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
              "There are no entrance exams or qualification tests at Westbrook.",
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
              "Reach out to us through the enquiry form or contact our admissions team.",
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
              "Parents are invited for a conversation with our team.",
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
              "A relaxed interaction with the child helps us understand readiness.",
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
              "Every admission matters to us, and each family is guided carefully.",
            description:
              "Once aligned, admissions are confirmed through a simple documentation process.",
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
        title="Begin Your Child’s Journey with Westbrook"
        subtitle="Please share your details, and our admissions team will be in touch."
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