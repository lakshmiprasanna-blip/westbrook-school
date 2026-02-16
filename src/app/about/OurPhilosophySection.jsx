export default function OurPhilosophySection() {
  return (
    <section
      className="relative w-full bg-cover bg-center py-30 md:py-28"
      style={{
        backgroundImage: "url('/assets/philosophy.png')", // your full bg image
      }}
    >
      {/* Top Center Label */}
<div className="absolute top-0 left-1/2 z-10 -translate-x-1/2">
  <div className="bg-white px-6 py-6 text-lg font-semibold tracking-widest text-[#0F4D81] shadow-md text-center">
    OUR PHILOSOPHY
  </div>
</div>
     <div className="relative z-10 mx-auto max-w-4xl px-1 text-center text-white">
    <p className="paragraph mb-6">
      At Westbrook International School, education is guided by strong
      academics and deeply rooted values. We believe learning goes beyond
      academic achievement to include character, discipline, compassion,
      and cultural grounding.
    </p>

    <p className="paragraph">
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
