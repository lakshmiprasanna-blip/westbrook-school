import PageBanner from "../../components/PageBanner"
import VideoHero from "../../components/VideoHero"
import InfoSection from "../../components/InfoSection"
import ContactCTA from "../../components/ContactCTA"
import ScrollSlider from "../../components/AcademicsScrollSection"
export default function Academics() {
    return (
        <>
            <PageBanner image="/assets/academic-banner.webp" />
             <ScrollSlider
                slides={[
                    {
                    smallTitle: "Our Curriculum",
                    title: "What we follow",
                    description:
                        "The IGCSE curriculum forms the academic framework at Westbrook, supporting concept clarity, application, and clear communication.",
                    image: "/assets/academicsscroll1.webp",
                    },
                    {
                    title: "How learning progresses ?",
                    description:
                        "Subjects are structured to build understanding gradually across grades, allowing students to connect ideas and strengthen foundations over time.",
                    image: "/assets/info1.png",
                    },
                    {
                    title: "Why this matters ?",
                    description:
                        "This approach helps students move beyond memorization and develop confidence in applying what they learn.",
                    image: "/assets/explore-collage1.webp",
                    },
                ]}
            />
 
            <VideoHero videoSrc="/assets/academic-aivideo.mp4"
                title="LEARNING JOURNEY"
                slides={[
                    {
                    headingTop: "EARLY YEARS",
                    subTitle: "Empathy, Healthy,",
                    description:
                        "The early years are shaped around warmth, security, and gentle exploration. Children are encouraged to observe, ask questions, and engage with the world through play, stories, movement, and conversation. Learning experiences are thoughtfully guided to help children develop language, social awareness, and early thinking skills. With consistent routines and a caring environment, children begin to feel safe, confident, and ready to learn.",
                    image: "/assets/scroll-img1.webp",
                    },
                    {
                    headingTop: "PRIMARY YEARS",
                    subTitle: "Simple. Personal. Child-first.",
                    description:
                        "The primary years focus on building strong academic foundations while developing independence and curiosity. Learning becomes more structured, helping children make connections, express ideas clearly, and develop confidence in their abilities. Teachers support students in understanding concepts deeply rather than memorizing outcomes. Equal importance is given to academic growth, emotional development, and responsible behaviour, allowing children to grow into thoughtful and capable learners.",
                    image: "/assets/scroll-img5.webp",
                    },
                ]}
            />

            {/* InfoSection */}
            <div>
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
                </div>

            
            <ContactCTA imageSrc="/assets/academics-contactcta.webp"/>
            
        </>
    )
}