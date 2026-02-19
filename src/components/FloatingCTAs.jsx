"use client";

export default function FloatingCTAs() {
  return (
    <div className="fixed right-0 top-[70%] -translate-y-1/2 z-50">

      {/* Outer Wrapper */}
      <div className="flex flex-col overflow-hidden rounded-l-2xl shadow-lg">

        {/* VISIT US */}
        <a
          href="#"
          className="
            bg-maroon text-white
            text-[11px] font-semibold tracking-wide
            w-[44px] h-[100px]
            flex items-center justify-center
            rotate-180
            [writing-mode:vertical-rl]
          "
        >
          VISIT US
        </a>

        {/* APPLY NOW */}
        <a
          href="#"
          className="
            bg-primary text-white
            text-[11px] font-semibold tracking-wide
            w-[44px] h-[100px]
            flex items-center justify-center
            rotate-180
            [writing-mode:vertical-rl]
          "
        >
          APPLY NOW
        </a>

      </div>
    </div>
  );
}
