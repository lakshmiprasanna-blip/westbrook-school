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
            bg-[#F7F6F2]
            px-3 py-2
            md:px-6 md:py-6
            font-semibold
            tracking-widest
            text-[#0F4D81]
            text-center
            border border-[#F7F6F2]
          "
        >
          OUR PHILOSOPHY
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-5 text-left text-white">

        <p className="mb-6 text-white">
          At Westbrook International School, education is guided by strong
          academics and deeply rooted values. We believe learning goes beyond
          academic achievement to include character, discipline, compassion,
          and cultural grounding.
        </p>

        <p className="text-white">
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