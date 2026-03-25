import PageBanner from "../../components/PageBanner";
import ContactCTA from "../../components/ContactCTA";
import ContactSection from "../../components/ContactSection";
export const metadata = {
  title: "Contact Us | Westbrook International School",
  description:
    "Contact Westbrook International School in Madhapur, Hyderabad for admissions, enquiries, or to book a campus visit. Our team is here to assist you.",
  canonical: "https://westbrookinternational.com/contact",
  }

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
