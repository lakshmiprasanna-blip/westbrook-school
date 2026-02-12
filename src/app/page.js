import Image from "next/image";

export default function Page() {
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat py-20 md:py-28"
      style={{ backgroundImage: "url('/assets/welcome.png')" }} // <-- your bg image path
    >
      {/* Overlay (optional soft tint like screenshot) */}
      <div className="absolute inset-0 bg-white/70"></div>

      {/* Content */}
      <div className="relative container-custom text-center">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/assets/welcome-logo.png"   // <-- your logo path
            alt="Westbrook Logo"
            width={70}
            height={70}
            priority
          />
        </div>
        <h2 className="text-2xl md:text-5xl text-[var(--color-primary)] leading-tight mb-6">
         Welcome to<br/> Westbrook International School
        </h2>
        <p className="max-w-[850px] mx-auto text-base md:text-lg leading-relaxed text-[var(--color-dark)]">
          At Westbrook, every child is recognised as a unique learner, guided with care, respect, and belief in their potential. We create a safe and joyful learning environment where children are encouraged to question, explore, and grow with confidence. By balancing modern teaching practices with strong values, we support students in becoming thoughtful individuals, prepared for life beyond the classroom, along with academic success.

        </p>
      </div>
    </section>
  );
}