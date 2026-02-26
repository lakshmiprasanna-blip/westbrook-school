import PageBanner from "../../components/PageBanner";
import ContactCTA from "../../components/ContactCTA";
import ContactSection from "../../components/ContactSection";

export default function Contact() {
  return (
    <>
      <PageBanner image="/assets/contactbanner.webp" />
      <ContactSection />

      {/* Override wrapper */}
      <div className="contact-cta-override">
        <ContactCTA imageSrc="/assets/contactfooter.webp" />
      </div>
    </>
  );
}
