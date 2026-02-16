import PageBanner from "../../components/PageBanner";
import ContactCTA from "../../components/ContactCTA";
import ContactSection from "../../components/ContactSection";

export default function Contact() {
  return (
    <>
      <PageBanner image="/assets/explorebanner.webp" />
      <ContactSection />

      {/* Override wrapper */}
      <div className="contact-cta-override">
        <ContactCTA imageSrc="/assets/contact-banner.webp" />
      </div>
    </>
  );
}
