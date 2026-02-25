import Image from "next/image";
import CurriculumSection from "../components/CurriculumSection";
import InfoSection from "../components/InfoSection";
import ExperienceSlider from "../components/ExperienceSlider";
import FAQSection from "../components/FAQSection";
import VideoTextMask from "../components/VideoTextMask";
import FloatingCTAs from "../components/FloatingCTAs";

export default function Page() {
  const homefaqData = [
  {
    question: "What curriculum does Westbrook International School follow?",
    answer:
      "Westbrook follows an international curriculum, designed to help students understand ideas deeply rather than rely on memorisation, while progressing at a steady and supported pace across grades.",
  },
  {
    question: "What age groups and grades does the school offer?",
    answer:
      "Westbrook currently offers programmes from Early Years through Primary School, with a structured plan for progression as students move ahead. Grade offerings are designed to grow in alignment with the school’s academic framework and long-term vision.",
  },
  {
    question: "How does Westbrook support students beyond academics?",
    answer:
      "Along with academics, Westbrook places strong emphasis on social, emotional, and value-based development. Through structured classroom practices and guided interactions, students develop empathy, self-awareness, discipline, and interpersonal skills.",
  },
  {
    question: "What makes Westbrook different from other schools in the area?",
    answer:
      "Westbrook combines globally aligned academics with personalised attention, strong academic leadership, and a neighbourhood location. The school prioritises clarity in learning, values in practice, and close involvement from educators to support each child’s growth.",
  },
  {
    question: "Is Westbrook a neighbourhood school?",
    answer:
      "Yes. Westbrook is located within nearby residential areas, offering families access to quality education close to home. This helps reduce long commutes and supports a balanced daily routine for children and parents.",
  },
];
  return (
    <>
    <div className="pt-[80px] lg:pt-[93px]">
      <VideoTextMask />
      </div>
      <FloatingCTAs />

      <section className="relative w-full py-12 md:py-21 overflow-hidden bg-offwhite">
        
        {/* LEFT LEAF */}
        <Image
          src="/assets/right-leaf.png"
          alt="Left Leaf"
          width={180}
          height={300}
          className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block"
        />

        {/* RIGHT LEAF */}
        <Image
          src="/assets/left-leaf.png"
          alt="Right Leaf"
          width={180}
          height={300}
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block"
        />

        <div className="relative container-custom text-center">
          
          <div className="flex justify-center mb-6">
            <Image
              src="/assets/welcome-logo.png"
              alt="Westbrook Logo"
              width={70}
              height={70}
              priority
            />
          </div>

          <h2 className="heading !text-[24px] md:!text-5xl text-[var(--color-primary)] leading-tight mb-6">
            Welcome to <br /> Westbrook International School
          </h2>

          <p className="paragraph max-w-[850px] mx-auto text-base md:text-lg leading-relaxed text-dark">
            At Westbrook, every child is recognised as a unique learner,
            guided with care, respect, and belief in their potential.
            We create a safe and joyful learning environment where children
            are encouraged to question, explore, and grow with confidence.
            By balancing modern teaching practices with strong values,
            we support students in becoming thoughtful individuals,
            prepared for life beyond the classroom, along with academic success.
          </p>

        </div>
      </section>

      <CurriculumSection />

      <InfoSection topLabel="Why Westbrook"
        introText="When values guide learning, students grow with clarity and an understanding of future choices."
        tag="Academic"
        subTag="Excellence"
        description="Strong academics focus on clear teaching, steady progress, and close teacher support. Students are guided to understand concepts, apply ideas meaningfully, and build confidence within the classroom, reducing the need for excessive after-school coaching"
        image="/assets/info1.png"
      />

      <InfoSection tag="Co-Curricular"
        subTag="Opportunities"
        description="Co-curricular learning at Westbrook supports creativity, movement, and problem-solving while complementing academics. Activities such as pottery, gymnastics, and robotics are integrated thoughtfully to maintain balance within the school day."
        image="/assets/info2.png"
        reverse
      />

      <InfoSection
        tag="WellBeing"
        description="A calm and supportive environment helps children learn better. Social and emotional learning is woven into daily school life through guided practices inspired by Roots of Empathy, supporting empathy, self-regulation, and positive classroom relationships."
        image="/assets/info3.png"
      />

      <ExperienceSlider />
      <FAQSection faqData={homefaqData} />
    </>
  );
}
