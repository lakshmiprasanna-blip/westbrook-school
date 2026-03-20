import PageBanner from "../../components/PageBanner";
import LearningSpacesSection from "../../components/LearningSpacesSection";

export default function blogs (){

    const spacesData = [
  {
    title: "What makes Westbrook a preferred school in Madhapur?",
    image: "/assets/learningspacessection1.webp",
    slug: "westbrook-preferred-school",
  },
  {
    title: "How to identify the right school in Madhapur, Hyderabad",
    image: "/assets/learningspacessection2.webp",
      slug: "choosing-right-school-madhapur",
  },
  {
    title: "Role of STEM programs in holistic student development",
    image: "/assets/learningspacessection3.webp",
      slug: "choosing-right-school-madhapur",
  },

];
    return(
        <>
        <div className="pt-[70px] lg:pt-[80px]">
                <PageBanner image="/assets/banner1.webp" />
              </div>
              <LearningSpacesSection
            heading="BLOGS"
            data={spacesData}
            titleClass="!font-montserrat font-medium !text-[20px] !leading-1.2 text-primary"
            hoverEffect={true}
          />
    
        </>
    )
}