import Image from "next/image";
import CurriculumSection from "../components/CurriculumSection";
import InfoSection from "../components/InfoSection";
import ExperienceSlider from "../components/ExperienceSlider";
import MindsSection from "../components/MindsSection";
import VideoTextMask from "../components/VideoTextMask";
import FloatingCTAs from "../components/FloatingCTAs";

export default function Page() {
  return (
    <>
      <VideoTextMask />
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

          <p className="max-w-[850px] mx-auto text-base md:text-lg leading-relaxed text-dark">
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

      <InfoSection
        topLabel="Why Westbrook"
        introText="When values guide learning, students grow with clarity and an understanding of future choices."
        tag="Academic"
        subTag="Excellence"
        description="Strong academics focus on clear teaching, steady progress, and close teacher support. Students are guided to understand concepts, apply ideas meaningfully, and build confidence within the classroom, reducing the need for excessive after-school coaching"
        image="/assets/info1.png"
      />

      <InfoSection
        tag="Co-Curricular"
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
      <MindsSection />
    </>
  );
}
