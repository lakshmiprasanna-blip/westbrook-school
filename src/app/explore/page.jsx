"use client";

import { useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PageBanner from "../../components/PageBanner";
import LearningSpacesSection from "../../components/LearningSpacesSection";
import ImageContentSection from "../../components/ImageContentSection";
import ScrollButton from "../../components/ScrollButton";


const GallerySection = dynamic(() => import("./gallery"), { ssr: false });

// EnquiryForm + Framer — only needed when popup opens, not on initial load
const EnquiryForm = dynamic(() => import("../../components/FormComponent"), { ssr: false });
const MotionDiv = dynamic(() => import("framer-motion").then((m) => m.motion.div), { ssr: false });
const AnimatePresence = dynamic(() => import("framer-motion").then((m) => m.AnimatePresence), { ssr: false });

// ─── Static constants — defined once at module level, never re-created ────────
const BACKDROP_VARIANTS = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const MODAL_VARIANTS = {
  hidden:  { scale: 0.85, opacity: 0 },
  visible: { scale: 1,    opacity: 1 },
  exit:    { scale: 0.85, opacity: 0 },
};
const MODAL_TRANSITION = { duration: 0.25 };

// ─── Cards + spaces moved to module level — never re-created on render ────────
const CARDS = [
  {
    title: "A Safe Campus",
    text: "Controlled entry points and CCTV monitoring help maintain a secure school environment throughout the day.",
    icon: "/assets/explore-icon2.svg",
  },
  {
    title: "Clear Supervision",
    text: "Structured routines and staff presence ensure children are guided, supported, and never left unattended.",
    icon: "/assets/explore-icon3.svg",
  },
  {
    title: "Respectful School Culture",
    text: "A strict anti-bullying approach supports positive behaviour, inclusion, and mutual respect among students.",
    icon: "/assets/explore-icon1.svg",
  },
  {
    title: "Emotional Support",
    text: "Social and emotional learning is woven into daily routines, helping children understand feelings and relationships.",
    icon: "/assets/explore-icon4.svg",
  },
];

const SPACES = [
  {
    title: "Reading and Story Corner",
    description:
      "A quiet, welcoming space where children listen, look, imagine, and slowly build a love for stories and language.",
    image: "/assets/learningspacessection1.webp",
  },
  {
    title: "Circle Time Area",
    description:
      "An open space for conversations, songs, group activities, and shared learning that supports listening, confidence, and social interaction.",
    image: "/assets/learningspacessection2.webp",
  },
  {
    title: "Creative Expression Space",
    description: "Used for drawing, colouring, simple crafts, and hands-on activities that allow children to express ideas freely.",
    image: "/assets/learningspacessection3.webp",
  },
  {
    title: "Activity and Play Zone",
    description: "A structured play area that supports motor skills, coordination, and learning through guided play.",
    image: "/assets/learningspacessection4.webp",
  },
  {
    title: "Teacher Guidance Area",
    description: "A focused space where teachers work closely with small groups or individual children, offering reassurance, support, and direction.",
    image: "/assets/learningspacessection5.webp",
  },
  {
    title: "Calm and Comfort Corner",
    description:
      "A soft, quiet area where children can pause, settle, and feel emotionally secure during the school day.",
    image: "/assets/learningspacessection6.webp",
  },
];

export default function Explore() {
  const [formType, setFormType] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const sliderRef = useRef(null);
  const router = useRouter();

  // ─── Stable callbacks — not re-created on every render ───────────────────
  const closePopup      = useCallback(() => setFormType(null), []);
  const stopPropagation = useCallback((e) => e.stopPropagation(), []);
  const handlePrimary   = useCallback(() => router.push("/contact"), [router]);
  const handleSecondary = useCallback(() => {
    setFormType("simple");
    setShowPopup(true);
  }, []);

  const handlePrevSlide = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const slideWidth = slider.offsetWidth / (window.innerWidth >= 768 ? 2 : 1);
    const isAtStart = slider.scrollLeft <= 0;
    slider.scrollTo({
      left: isAtStart ? slider.scrollWidth - slider.offsetWidth : slider.scrollLeft - slideWidth,
      behavior: "smooth",
    });
  }, []);

  const handleNextSlide = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const slideWidth = slider.offsetWidth / (window.innerWidth >= 768 ? 2 : 1);
    const isAtEnd = slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 5;
    slider.scrollTo({
      left: isAtEnd ? 0 : slider.scrollLeft + slideWidth,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="pt-[70px] lg:pt-[80px]">
        <PageBanner image="/assets/explorebanner.webp" />
      </div>

      <LearningSpacesSection
        heading="LEARNING SPACES"
        subText="At Westbrook, early learning spaces are designed to feel familiar, calm, and inviting, helping young children feel comfortable as they begin their school journey."
        data={SPACES}
      />

      {/* ================= SAFETY & WELL BEING SECTION ================= */}
      <section className="w-full bg-offwhite py-12 md:py-16 lg:py-20">
        <div className="container-custom">

          {/* ===== Heading ===== */}
          <div className="text-center mb-6 md:mb-12 lg:mb-14">
            <div className="inline-block bg-lightblue px-3 sm:px-5 py-1 sm:py-2 mb-3 sm:mb-5">
              <div
                className="font-playfair !font-bold !text-[24px] md:!text-[34px] lg:!text-[48px] !leading-[100%]"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 700,
                  color: "#2B292A",
                }}
              >
                SAFETY AND WELL BEING
              </div>
            </div>

            <div
              className="leading-[120%] text-[18px] sm:text-[20px] md:text-[24px] lg:text-[30px]"
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 800,
                color: "#9B1B2F",
              }}
            >
              What keeps children secure every day
            </div>
          </div>

          {/* ================= DESKTOP ================= */}
          <div className="hidden lg:grid grid-cols-4 gap-6">
            {CARDS.map((item, index) => (
              <div key={index} className="bg-primary text-center text-offwhite px-8 py-8">
                <div className="w-28 h-28 mx-auto mb-6 bg-offwhite rounded-full flex items-center justify-center">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <div className="mb-3 text-[21px] font-bold font-playfair">{item.title}</div>
                <div className="text-[15px] leading-[24px] font-montserrat">{item.text}</div>
              </div>
            ))}
          </div>

          {/* ================= MOBILE + TAB SLIDER ================= */}
          <div className="lg:hidden relative overflow-hidden">
            <div
              ref={sliderRef}
              className="flex overflow-x-hidden snap-x snap-mandatory"
            >
              {CARDS.map((item, index) => (
                <div
                  key={index}
                  className="min-w-full md:min-w-[50%] px-2 flex snap-start"
                >
                  <div className="bg-primary text-center text-offwhite px-8 py-10 md:py-12 h-full flex flex-col">
                    <div className="w-28 h-28 md:w-32 md:h-32 mx-auto mb-6 bg-offwhite rounded-full flex items-center justify-center">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={72}
                        height={72}
                        className="object-contain"
                      />
                    </div>
                    <div className="mb-4 text-[20px] md:text-[22px] font-bold font-playfair">{item.title}</div>
                    <div className="text-[15px] md:text-[16px] leading-[24px] md:leading-[26px] font-montserrat">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-center mt-8">
              <ScrollButton
                direction="left"
                onClick={handlePrevSlide}
                className="border-r border-white/30"
              />
              <ScrollButton
                direction="right"
                onClick={handleNextSlide}
              />
            </div>
          </div>

        </div>
      </section>

      <GallerySection />

      <ImageContentSection
        imageSrc="/assets/footer-exploree.png"
        mobileImageSrc="/assets/explore-mob-footer.webp"
        title="We'd love to hear from you!"
        description="Feel free to get in touch, or apply now"
        bgColor="#ffffff"
        primaryBtnText="CONTACT US"
        secondaryBtnText="APPLY NOW"
        breakText={false}
        onPrimaryClick={handlePrimary}
        onSecondaryClick={handleSecondary}
      />

      {/* ✅ POPUP MODAL */}
      <AnimatePresence>
        {formType && (
          <MotionDiv
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            variants={BACKDROP_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closePopup}
          >
            <MotionDiv
              variants={MODAL_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={MODAL_TRANSITION}
              onClick={stopPropagation}
              className="relative w-full max-w-md"
            >
              {/* Close Button */}
              <button
                onClick={closePopup}
                className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 shadow flex items-center justify-center text-black font-bold"
              >
                ✕
              </button>

              <EnquiryForm variant={formType} />
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
}