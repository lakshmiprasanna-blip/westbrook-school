"use client";

import Image from "next/image";

export default function MindsSection() {
  return (
    <section className="lg:h-[600px] bg-offwhite">
      <div className="container-custom  h-full flex flex-col md:flex-col lg:flex-row items-center justify-between">
        
        {/* TEXT SECTION */}
        <div className="max-w-[480px] text-center lg:text-left pt-12 lg:pt-0">
          <h2 className="heading 
              !text-[26px] 
              md:!text-[42px] 
              lg:!text-[48px] 
              leading-[34px] 
              md:leading-[52px] 
              lg:leading-[62px] 
              text-primary"
>

            
            <span className="block whitespace-nowrap">
              Education that Forms Minds.
            </span>

            <span className="block whitespace-nowrap">
              Learning that Shapes
            </span>

            <span className="block whitespace-nowrap">
              Character.
            </span>

          </h2>

          <div className="flex flex-row items-center lg:items-start gap-4 lg:gap-6 mt-6 lg:mt-10 justify-center lg:justify-start">
            
            <button
              className="
                border-2 border-maroon
                bg-maroon text-white
                w-[160px]
                px-5 py-2 text-sm
                uppercase tracking-wide
                hover:opacity-90 transition font-semibold cursor-pointer
              "
            >
              Apply Now
            </button>

            <button
              className="
                border-2 border-maroon
                text-maroon
                w-[160px]
                px-5 py-2 text-sm
                uppercase tracking-wide
                hover:bg-maroon hover:text-white transition font-bold cursor-pointer
              "
            >
              Book a Visit
            </button>

          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="relative w-full md:w-full lg:w-[1300px] h-[300px] md:h-[420px] lg:h-[500px] lg:ml-25 mt-10 md:mt-16 lg:mt-25">
          <Image
            src="/assets/minds.png"
            alt="Students"
            fill
            priority
            className="object-cover md:object-contain lg:object-fill"
          />
        </div>

      </div>
    </section>
  );
}
