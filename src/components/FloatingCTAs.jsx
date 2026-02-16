"use client";

export default function FloatingCTAs() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col shadow-lg">
      
      {/* Visit Us */}
      <a
        href="#"
        className="bg-[var(--color-maroon)] text-white text-sm tracking-wider px-3 py-6 writing-mode-vertical rotate-180"
        style={{ writingMode: "vertical-rl" }}
      >
        VISIT US
      </a>

      {/* Apply Now */}
      <a
        href="#"
        className="bg-[var(--color-primary)] text-white text-sm tracking-wider px-3 py-6 writing-mode-vertical rotate-180"
        style={{ writingMode: "vertical-rl" }}
      >
        APPLY NOW
      </a>
    </div>
  );
}
