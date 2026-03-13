import PageBanner from "../../components/PageBanner";
import ContactCTA from "../../components/ContactCTA";
import ContactSection from "../../components/ContactSection";
import FloatingCTAs from "../../components/FloatingCTAs";

export default function Contact() {
  return (
    <>
      <div className="pt-[70px] lg:pt-[80px]">
        <FloatingCTAs />
      <PageBanner image="/assets/contactbanner.webp" />
        </div>
      <ContactSection />

      {/* Override wrapper */}
      <div className="contact-cta-override">
        <ContactCTA imageSrc="/assets/contactfooter.webp" />
      </div>
    </>
  );
}
