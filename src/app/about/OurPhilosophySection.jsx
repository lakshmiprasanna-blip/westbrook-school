export default function OurPhilosophySection() {
  return (
    <section
      className="relative w-full bg-cover bg-center py-20 md:py-28"
      style={{
        backgroundImage: "url('/assets/philosophy.png')",
      }}
    >
      {/* Top Center Label */}
      <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2">

        <div
          className="
            bg-offwhite
            px-3 py-2
            md:px-6 md:py-6
            text-md
            md:text-lg
            font-semibold
            tracking-widest
            text-primary
            text-center
            border-1 border-offwhite 
          "
        >
          OUR PHILOSOPHY
        </div>

      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-5 text-left text-white">

        <p className="text-[15px] md:text-[18px] leading-[26px] md:leading-[30px] mb-6">
          At Westbrook International School, education is guided by strong
          academics and deeply rooted values. We believe learning goes beyond
          academic achievement to include character, discipline, compassion,
          and cultural grounding.
        </p>

        <p className="text-[15px] md:text-[18px] leading-[26px] md:leading-[30px]">
          Modern, globally aligned teaching practices are balanced with values
          such as integrity, respect, responsibility, and empathy drawn from
          India’s heritage. Each child is supported in a safe and engaging
          environment that encourages clear thinking, confidence, and a sense
          of responsibility, preparing learners not only for the classroom but
          for life beyond it.
        </p>

      </div>
    </section>
  );
}
