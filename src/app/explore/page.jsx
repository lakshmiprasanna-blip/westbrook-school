"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import PageBanner from "../../components/PageBanner";
import FloatingCTAs from "../../components/FloatingCTAs";
import LearningSpacesSection from "../../components/LearningSpacesSection";
import ImageContentSection from "../../components/ImageContentSection";
import ScrollButton from "../../components/ScrollButton";
import GallerySection from "./gallery";
import EnquiryForm from "../../components/FormComponent";

export default function Explore() {
  const [formType, setFormType] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
  const sliderRef = useRef(null);
       const router = useRouter();

  const cards = [
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

  return (
    <>
      
      <div className="pt-[70px] lg:pt-[80px]">
        <PageBanner image="/assets/explorebanner.webp" />
      </div>
      
      <FloatingCTAs />
      <LearningSpacesSection />

  
       {/* ================= SAFETY & WELL BEING SECTION ================= */}
       
        <section className="w-full bg-offwhite py-12 md:py-16 lg:py-20">
          <div className="container-custom">

            {/* ===== Heading ===== */}
            <div className="text-center mb-6 md:mb-12 lg:mb-14">

              <div className="inline-block bg-lightblue px-3 sm:px-5 py-1 sm:py-2 mb-3 sm:mb-5">
                <div
                  className="leading-[110%] text-[20px] sm:text-[26px] md:text-[32px] lg:text-[40px]"
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
                className="leading-[120%] text-[16px] sm:text-[20px] md:text-[24px] lg:text-[30px]"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 700,
                  color: "#9B1B2F",
                }}
              >
                What keeps children secure every day
              </div>

            </div>

            {/* ================= DESKTOP (UNCHANGED) ================= */}
            <div className="hidden lg:grid grid-cols-4 gap-6">
              {cards.map((item, index) => (
                <div
                  key={index}
                  className="bg-primary text-center text-offwhite px-8 py-8"
                >
                  <div className="w-28 h-28 mx-auto mb-6 bg-offwhite rounded-full flex items-center justify-center">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>

                  <div className="mb-3 text-[21px] font-bold font-playfair">
                    {item.title}
                  </div>

                  <div className="text-[15px] leading-[24px] font-montserrat">
                    {item.text}
                  </div>
                </div>
              ))}
            </div>

            {/* ================= TAB + MOBILE SLIDER ================= */}
            <div className="lg:hidden relative overflow-hidden">

              <div
                ref={sliderRef}
                className="flex overflow-x-auto scroll-smooth no-scrollbar"
              >
                {cards.map((item, index) => (
                 <div
                  key={index}
                  className="
                    min-w-full 
                    md:min-w-[50%] 
                    px-2
                    flex
                  "
                >
                   <div className="bg-primary text-center text-offwhite px-8 py-10 md:py-12 h-full flex flex-col">

                      {/* Bigger Circle */}
                      <div className="w-28 h-28 md:w-32 md:h-32 mx-auto mb-6 bg-offwhite rounded-full flex items-center justify-center">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={72}
                        height={72}
                        className="object-contain"
                      />
                    </div>

                      <div className="mb-4 text-[20px] md:text-[22px] font-bold font-playfair">
                        {item.title}
                      </div>

                      <div className="text-[15px] md:text-[16px] leading-[24px] md:leading-[26px] font-montserrat">
                        {item.text}
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex justify-center mt-8">
                <ScrollButton
                    direction="left"
                    onClick={() => {
                      const slider = sliderRef.current;
                      if (!slider) return;

                      slider.scrollBy({
                        left: -slider.offsetWidth / (window.innerWidth >= 768 ? 2 : 1),
                        behavior: "smooth",
                      });
                    }}
                    className="border-r border-white/30"
                  />
                <ScrollButton
                  direction="right"
                  onClick={() => {
                    const slider = sliderRef.current;
                    if (!slider) return;

                    slider.scrollBy({
                      left: slider.offsetWidth / (window.innerWidth >= 768 ? 2 : 1),
                      behavior: "smooth",
                    });
                  }}
                />
              </div>

            </div>

          </div>
        </section>



        <GallerySection/>


        <ImageContentSection
  imageSrc="/assets/footer-exploree.png"
  mobileImageSrc="/assets/explore-mobile.png"
  title="We'd love to hear from you!"
  description="Feel free to get in touch, or apply now"
  bgColor="#ffffff"
  primaryBtnText="CONTACT US"
  secondaryBtnText="APPLY NOW"
  breakText={false}
  onPrimaryClick={() => {
          router.push("/contact"); // ✅ now it works
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
