import PageBanner from "../../components/PageBanner";
import FloatingCTAs from "../../components/FloatingCTAs";
import LearningSpacesSection from "../../components/LearningSpacesSection";
import ContactCTA from "../../components/ContactCTA";

export default function Explore() {
  return (
    <>
      <PageBanner image="/assets/explorebanner.webp" />
      <FloatingCTAs />
      <LearningSpacesSection />

      {/* ================= SAFETY & WELL BEING SECTION ================= */}
        <section className="w-full bg-[#F7F6F2] py-14 lg:py-20">
        <div className="container-custom max-w-7xl">

            {/* ===== Heading ===== */}
            <div className="text-center mb-10 lg:mb-14">
            <div className="inline-block bg-[var(--color-lightblue)] px-5 py-2 mb-5">
                <h2
                className="text-[28px] md:text-[36px] lg:text-[42px] leading-[100%]"
                style={{
                    fontFamily: "Playfair Display, serif",
                    fontWeight: 700,
                    color: "#2B292A",
                }}
                >
                Safety and Well Being
                </h2>
            </div>

            <h3
                className="text-[22px] md:text-[28px] lg:text-[32px] leading-[100%]"
                style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                color: "#9B1B2F",
                }}
            >
                What keeps children secure every day
            </h3>
            </div>

            {/* ===== Cards ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
                {
                title: "A Safe Campus",
                text: "Controlled entry points and CCTV monitoring help maintain a secure school environment throughout the day.",
                },
                {
                title: "Clear Supervision",
                text: "Structured routines and staff presence ensure children are guided, supported, and never left unattended.",
                },
                {
                title: "Respectful School Culture",
                text: "A strict anti-bullying approach supports positive behaviour, inclusion, and mutual respect among students.",
                },
                {
                title: "Emotional Support",
                text: "Social and emotional learning is woven into daily routines, helping children understand feelings and relationships.",
                },
            ].map((item, index) => (
                <div
                key={index}
                className="bg-[#0F4D81] text-center text-[#F7F6F2] px-8 py-8"
                >
                {/* Circle */}
                <div className="w-28 h-28 mx-auto mb-6 bg-[#F7F6F2] rounded-full" />

                <h4
                    className="text-[20px] md:text-[21px] mb-3 leading-[110%]"
                    style={{
                    fontFamily: "Playfair Display, serif",
                    fontWeight: 700,
                    }}
                >
                    {item.title}
                </h4>

                <p
                    className="text-[15px] leading-[22px]"
                    style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 400,
                    }}
                >
                    {item.text}
                </p>
                </div>
            ))}
            </div>
        </div>
        </section>

        <section className="w-full bg-white py-14 lg:py-20">
  <div className="container-custom">

    {/* ===== Grid Layout ===== */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 
                    md:auto-rows-[260px]">

      {/* Top Left */}
      <div className="relative w-full h-[160px] sm:h-[220px] md:h-auto">
        <img
          src="/assets/explore-collage5.webp"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Top Middle */}
      <div className="relative w-full h-[160px] sm:h-[220px] md:h-auto">
        <img
          src="/assets/explore-collage3.webp"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Top Right (Tall on Desktop) */}
      <div className="relative w-full h-[160px] sm:h-[220px] md:h-auto md:row-span-2">
        <img
          src="/assets/explore-collage1.webp"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Left (Tall on Desktop) */}
      <div className="relative w-full h-[160px] sm:h-[220px] md:h-auto md:row-span-2">
        <img
          src="/assets/explore-collage6.webp"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Center Text Block */}
      <div className="flex items-center justify-center bg-white 
                      p-6 sm:p-8 text-center md:h-auto">
        <p
          className="text-[18px] sm:text-[20px] md:text-[24px] leading-[110%]"
          style={{
            fontFamily: "Playfair Display, serif",
            fontWeight: 700,
            color: "#0F4D81",
          }}
        >
          At Westbrook, early learning spaces are designed to feel familiar,
          calm, and inviting, helping young children feel comfortable as they
          begin their school journey.
        </p>
      </div>

      {/* Bottom Middle */}
      <div className="relative w-full h-[160px] sm:h-[220px] md:h-auto">
        <img
          src="/assets/explore-collage2.webp"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Right */}
      <div className="relative w-full h-[160px] sm:h-[220px] md:h-auto">
        <img
          src="/assets/explore-collage4.webp"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  </div>
</section>






<ContactCTA imageSrc="/assets/groupimg-2.webp"/>
    </>
  );
}
