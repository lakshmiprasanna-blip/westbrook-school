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
            h-16 md:h-20
            px-3
            md:px-6
            md:py-4
            font-semibold
            tracking-widest
            text-[#0F4D81]
            border border-[#F7F6F2]
            flex items-end justify-center
          "
        >
          OUR PHILOSOPHY
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl md:max-w-6xl px-6 md:px-0 text-center text-white">
        <p className="mt-4 mb-6 text-white md:text-lg leading-relaxed">
          At Westbrook International School, education is guided by strong
          academics and deeply rooted values. We believe learning goes beyond
          academic achievement to include character, discipline, compassion,
          and cultural grounding.
        </p>

        <p className="text-white md:text-lg leading-relaxed">
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