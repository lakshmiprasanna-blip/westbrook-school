import Image from "next/image";
import CurriculumSection from "../components/CurriculumSection";
import InfoSection from "../components/InfoSection";
import ExperienceSlider from "../components/ExperienceSlider";
import MindsSection from "../components/MindsSection";
export default function Page() {
  return (
    <>
      <section
        className="relative w-full bg-cover bg-center bg-no-repeat py-20 md:py-28"
        style={{ backgroundImage: "url('/assets/welcome.png')" }}
      >
        <div className="absolute inset-0 bg-white/70"></div>

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
          <p className="max-w-[850px] mx-auto text-base md:text-lg leading-relaxed text-[var(--color-dark)]">
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
      <ExperienceSlider/>
      <MindsSection/>
    </>
  );
}
