import PageBanner from "../../components/PageBanner";
import ContactCTA from "../../components/ContactCTA";
import ContactSection from "../../components/ContactSection";

export default function Contact() {
  return (
    <>
      <div className="pt-[70px] lg:pt-[80px]">
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
