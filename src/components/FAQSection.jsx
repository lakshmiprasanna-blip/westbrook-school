"use client";

import { useState } from "react";

const faqData = [
  {
    question: "What curriculum does Westbrook International School follow?",
    answer:
      "Westbrook follows an international curriculum, designed to help students understand ideas deeply rather than rely on memorisation, while progressing at a steady and supported pace across grades.",
  },
  {
    question: "What age groups and grades does the school offer?",
    answer:
      "Westbrook currently offers programmes from Early Years through Primary School, with a structured plan for progression as students move ahead. Grade offerings are designed to grow in alignment with the school’s academic framework and long-term vision.",
  },
  {
    question: "How does Westbrook support students beyond academics?",
    answer:
      "Along with academics, Westbrook places strong emphasis on social, emotional, and value-based development. Through structured classroom practices and guided interactions, students develop empathy, self-awareness, discipline, and interpersonal skills.",
  },
  {
    question: "What makes Westbrook different from other schools in the area?",
    answer:
      "Westbrook combines globally aligned academics with personalised attention, strong academic leadership, and a neighbourhood location. The school prioritises clarity in learning, values in practice, and close involvement from educators to support each child’s growth.",
  },
  {
    question: "Is Westbrook a neighbourhood school?",
    answer:
      "Yes. Westbrook is located within nearby residential areas, offering families access to quality education close to home. This helps reduce long commutes and supports a balanced daily routine for children and parents.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      className="relative py-20 md:py-26 bg-offwhite 
      bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px)] 
      bg-[size:40px_40px]"
    >
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-12 items-center">

          {/* Left Heading */}
          <div className="flex justify-center md:justify-start">
            <div className="bg-lightblue px-8 py-4">
              <h2 className="text-[36px] md:text-[48px] leading-[1] text-dark">
                FAQ’s
              </h2>
            </div>
          </div>

          {/* Accordion */}
          <div className="md:col-span-2 bg-white shadow-md rounded-lg overflow-hidden">

            {faqData.map((item, index) => {
              const isActive = index === activeIndex;
              const isRedDefault = index === 1 || index === 2;

              return (
                <div key={index}>

                  <button
                    onClick={() =>
                      setActiveIndex(isActive ? null : index)
                    }
                    className={`w-full flex justify-between items-center gap-4 px-6 md:px-8 py-6 text-left transition-colors duration-300
                      ${
                        isActive
                          ? "bg-primary text-white"
                          : isRedDefault
                          ? "text-maroon hover:bg-maroon hover:text-white"
                          : "text-dark hover:bg-maroon hover:text-white"
                      }
                    `}
                  >

                    {/* Question */}
                    <span className="flex-1 text-[18px] md:text-[20px] font-medium break-words">
                      {item.question}
                    </span>

                    {/* Chevron */}
                    <span className="flex-shrink-0">
                      {isActive ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 15.75 7.5-7.5 7.5 7.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      )}
                    </span>
                  </button>

                  {isActive && (
                    <div className="bg-white px-6 md:px-8 py-6 text-[16px] leading-relaxed">
                      {item.answer}
                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </div>
      </div>
    </section>
  );
}
