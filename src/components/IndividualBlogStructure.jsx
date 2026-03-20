"use client";

import Image from "next/image";
import PageBanner from "./PageBanner";
import Internationalschool from "../app/about/Internationalschool";
import FAQSection from "./FAQSection"

export default function IndividualBlogStructure({
  sections = [],
  sideImages = [],
    faqs = [],
}) {
  return (
    <>
     <div className="pt-[70px] lg:pt-[80px]">
                    <PageBanner image="/assets/banner1.webp" />
                  </div>
    <Internationalschool
            title="What Makes Westbrook a Preferred School in Madhapur ?"
            highlightTitle={true}
            bgClass="bg-offwhite"
            titleMaxWidth="max-w-full"
            titleClass="text-[22px] sm:text-[28px] md:text-[42px] font-semibold mb-4 leading-tight"
            paragraphMaxWidth = "max-w-[950px]"
            paragraphs={[
              "When families begin looking for a school, the search usually starts with logistics, distance, timings, and grades offered. But somewhere along the way, the questions change. Parents begin to wonder how their child will feel walking into the classroom each morning, whether learning will feel steady or overwhelming, and whether the school will understand their child as they are, not as a benchmark. At Westbrook, we have spent a long time thinking about these questions. Not as a checklist, but as something that keeps returning. And over the years, this way of thinking has quietly shaped what Westbrook has become.",
              
            ]}
            textClass="text-[15px] sm:text-[16px] !md:text-[16px] md:leading-[25px] text-[#555]"
          />
    <section className="w-full py-12 md:py-16">
      <div className="container-custom">

        <div className="flex flex-col lg:flex-row gap-10 items-stretch">

          {/* LEFT CONTENT */}
          <div className="w-full lg:w-2/3">

            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index}>

                  {/* SECTION HEADING */}
                  <h3 className="text-primary mb-2">
                    {section.heading}
                  </h3>

                  {/* PARAGRAPHS */}
                  <div className="space-y-4">
                    {section.paragraphs.map((para, i) => (
                      <p
                        key={i}
                        className="text-[15px] md:text-[16px] leading-[26px] text-dark"
                        dangerouslySetInnerHTML={{ __html: para }}
                      />
                    ))}
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* RIGHT IMAGES */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">

            {sideImages.map((img, i) => (
              <div
                key={i}
                className="relative flex-1 min-h-[150px] overflow-hidden rounded-md"
              >
                <Image
                  src={img}
                  alt={`blog image ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
    {faqs?.length > 0 && <FAQSection faqData={faqs} />}
    </>
  );
}