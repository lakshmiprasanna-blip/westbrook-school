"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const spaces = [
  {
    title: "Reading and Story Corner",
    description:
      "A quiet, welcoming space where children listen, look, imagine, and slowly build a love for stories and language.",
    image: "/assets/explore-learningspaceimg1.webp",
  },
  {
    title: "Circle Time Area",
    description:
      "An open space for conversations, songs, group activities, and shared learning that supports listening, confidence, and social interaction.",
    image: "/assets/explore-learningspaceimg2.webp",
  },
  {
    title: "Reading and Story Corner",
    description:
      "A quiet, welcoming space where children listen, look, imagine, and slowly build a love for stories and language.",
    image: "/assets/explore-learningspaceimg3.webp",
  },
];

export default function LearningSpacesSection() {
  return (
    <section className="w-full bg-white py-14 lg:py-20">
      <div className="container-custom">

        {/* ===== Section Heading ===== */}
        <div className="text-center mb-10 lg:mb-12">
          <div className="inline-block bg-[var(--color-lightblue)] px-5 py-1.5 mb-4">
            <h2 className="text-[28px] md:text-[34px] lg:text-[40px] leading-[100%]">
              LEARNING SPACES
            </h2>
          </div>

          <p className="max-w-xl mx-auto text-[16px] md:text-[17px] leading-[24px] text-[var(--color-dark)]">
            At Westbrook, early learning spaces are designed to feel familiar,
            calm, and inviting, helping young children feel comfortable as they
            begin their school journey.
          </p>
        </div>

        {/* ===== Desktop Layout ===== */}
        <div className="hidden md:grid grid-cols-3 gap-6">

          {spaces.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-[#F7F6F2]"
            >
              <div className="relative w-full h-[280px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5 space-y-2.5">
                <h3 className="text-[22px] leading-[100%] text-[var(--color-maroon)]">
                  {item.title}
                </h3>

                <p className="text-[16px] leading-[24px] text-[var(--color-dark)]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ===== Mobile Layout ===== */}
        <div className="md:hidden flex flex-col gap-6">

          {spaces.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-[#F7F6F2]"
            >
              <div className="relative w-full h-[220px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-[20px] leading-[100%] text-[var(--color-maroon)]">
                  {item.title}
                </h3>

                <p className="text-[15px] leading-[22px] text-[var(--color-dark)]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
