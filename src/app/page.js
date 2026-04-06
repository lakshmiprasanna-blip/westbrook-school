import { lazy, Suspense } from "react";
import Image from "next/image";
import VideoTextMask from "../components/VideoTextMask";
import CurriculumSection from "../components/CurriculumSection";
import InfoSection from "../components/InfoSection";
import { homeFAQs } from "../data/faqsData";

// ─── Lazy-load heavy below-fold components ────────────────────────────────────
const ExperienceSlider = lazy(() => import("../components/ExperienceSlider"));
const FAQSection = lazy(() => import("../components/FAQSection"));

const experienceItems = [
  { type: "image", src: "/assets/experience1.webp", alt: "Experience 1" },
  { type: "image", src: "/assets/experience2.webp", alt: "Experience 2" },
  { type: "image", src: "/assets/experience3.webp", alt: "Experience 3" },
  { type: "image", src: "/assets/experience4.webp", alt: "Experience 4" },
  { type: "image", src: "/assets/experience5.webp", alt: "Experience 5" },
  { type: "image", src: "/assets/experience6.webp", alt: "Experience 6" },
];

const visionariesItems = [
  {
    type: "video",
    embedUrl: "https://www.youtube.com/embed/00AzEo0uu-0",
    title: "Visionary 1",
  },
  {
    type: "video",
    embedUrl: "https://www.youtube.com/embed/kbkc3jvbEDI",
    title: "Visionary 2",
  },
  {
    type: "video",
    embedUrl: "https://www.youtube.com/embed/4OMiUjfwF-o",
    title: "Visionary 3",
  },
];

export default function Page() {
  return (
    <>
      <VideoTextMask />

      <section className="relative w-full py-12 md:py-21 overflow-hidden bg-offwhite">

        {/* LEFT LEAF */}
        <Image
          src="/assets/right-leaf.png"
          alt="Left Leaf"
          width={180}
          height={300}
          className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block"
          loading="lazy"
        />

        {/* RIGHT LEAF */}
        <Image
          src="/assets/left-leaf.png"
          alt="Right Leaf"
          width={180}
          height={300}
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block"
          loading="lazy"
        />

        <div className="relative container-custom text-center">

          <div className="flex justify-center mb-6">
            <Image
              src="/assets/home-logo.svg"
              alt="Westbrook Logo"
              width={70}
              height={70}
              priority={false}
              loading="lazy"
            />
          </div>

          <h2 className="heading !text-[24px] md:!text-5xl text-[var(--color-primary)] leading-tight mb-6">
            Welcome to <br /> Westbrook International School
          </h2>

          <p className="paragraph max-w-[850px] mx-auto text-base md:text-lg leading-relaxed text-dark">
            A balanced approach to learning guided by values and academic clarity. Westbrook International School is recognised by many families as the Best international school in Madhapur, Hyderabad, offering a thoughtful environment where academic learning and character development grow together. Located within the neighbourhoods of Madhapur, the school provides accessible, balanced education close to home, making it one of the Best International schools in Hyderabad for families seeking strong academics supported by values, care, and consistent teacher guidance.
          </p>

        </div>
      </section>

      <CurriculumSection />

      <InfoSection
        topLabel="Why Westbrook"
        introText="When values guide learning, students grow with clarity and an understanding of future choices."
        tag="Academic"
        subTag="Excellence"
        description="As families look for the Best international school in Madhapur, Hyderabad, strong academics remain central at Westbrook. Children are encouraged to understand ideas deeply, ask questions freely, and grow in confidence with steady guidance."
        image="/assets/info1.png"
        showButton
        buttonText="KNOW MORE"
        buttonLink="/academics"
      />

      <InfoSection
        tag="Co-Curricular"
        subTag="Opportunities"
        description="Co-curricular learning at Westbrook supports creativity, movement, and problem-solving while complementing academics. Activities such as pottery, gymnastics, and robotics are integrated thoughtfully to maintain balance within the school day."
        image="/assets/info2.png"
        reverse
        showButton
        buttonText="KNOW MORE"
        buttonLink="/explore"
      />

      <InfoSection
        tag="WellBeing"
        description="A calm and supportive environment helps children learn better. Social and emotional learning is woven into daily school life through guided practices inspired by Roots of Empathy, supporting empathy, self-regulation, and positive classroom relationships."
        image="/assets/info3.png"
        className="lg:pb-20"
        showButton
        buttonText="KNOW MORE"
        buttonLink="/admissions"
      />

      {/* ─── Below-fold: lazy loaded ─────────────────────────────────────────── */}
      <Suspense fallback={<div className="bg-primary py-16 md:py-20" style={{ minHeight: 400 }} />}>
        <ExperienceSlider
          items={experienceItems}
          title="EXPERIENCE"
          bgColor="bg-primary"
        />
      </Suspense>

      <Suspense fallback={<div className="bg-white py-16 md:py-20" style={{ minHeight: 400 }} />}>
        <ExperienceSlider
          items={visionariesItems}
          title="THE VISIONARIES"
          subtitle="Founded with the belief that the right balance of care, structure, and thoughtful teaching can shape a child's early learning journey."
          bgColor="bg-white"
        />
      </Suspense>

      <Suspense fallback={<div className="bg-offwhite py-20" style={{ minHeight: 300 }} />}>
        <FAQSection faqData={homeFAQs} />
      </Suspense>
    </>
  );
}