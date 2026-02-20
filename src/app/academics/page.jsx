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
            introText="How Learning Is Guided at Westbrook."
                    tag="SOCIAL AND"
                    subTag="EMOTIONAL"
                    description="At Westbrook, learning begins with emotional awareness and self-understanding. Our pedagogy is inspired by approaches such as Roots of Empathy, where students develop empathy, emotional regulation, and interpersonal skills through guided observation, reflection, and discussion."
                    image="/assets/info1.png"
                />

                <InfoSection
                    tag="VALUES IN"
                    subTag="DAILY PRACTICE"
                    description="Values are not treated as a separate subject. Respect, responsibility, empathy, and integrity are reinforced through classroom interactions, routines, and expectations, helping children internalize behaviour rather than simply follow rules."
                    image="/assets/info2.png"
                    reverse
                />
                <InfoSection
                    tag="CLARITY AND"
                    subTag="DIRECTION"
                    description="By building emotional balance, self-awareness, and responsible decision-making from early years, students develop a stronger sense of direction as they grow. This foundation supports confidence, discipline, and thoughtful choices across academic and personal learning stages."
                    image="/assets/info3.png"
                />
                </div>

            
            <ContactCTA imageSrc="/assets/academics-contactcta.webp"/>
            
        </>
    )
}