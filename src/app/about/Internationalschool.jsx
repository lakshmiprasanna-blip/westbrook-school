"use client";

import Image from "next/image";

export default function Internationalschool({
  title = "",
  paragraphs = [],
  image = null, // optional
  bgClass = "bg-white",
  titleClass = "text-[20px] sm:text-[26px] md:text-[34px] font-semibold text-primary leading-tight",
  highlightTitle = false,
  titleMaxWidth = "max-w-[800px]",
  paragraphMaxWidth="",
highlightClass = "bg-lightblue px-3 py-1",
  textClass = "text-[15px] sm:text-[16px] md:text-[16px] leading-[26px] md:leading-[30px] text-[#555]",
}) {
  return (
    <section className={`w-full py-12 md:py-25 ${bgClass}`}>
      <div className="container-custom">

        <div className="flex flex-col md:flex-row items-start md:items-center gap-10">

          {/* LEFT CONTENT */}
          <div className={`w-full ${titleMaxWidth}`}>

            {/* MOBILE: logo beside heading */}
            <div className="flex items-start gap-3 md:block">
              
              {/* Optional Image (Mobile) */}
              {image && (
                <Image
                  src={image}
                  alt="section image"
                  width={60}
                  height={60}
                  className="opacity-60 md:hidden"
                />
              )}

             <h2 className={`${titleClass} ${titleMaxWidth}  md:whitespace-nowrap`}>
              {highlightTitle ? (
                <span className={`inline-block ${highlightClass}`}>
                  {title}
                </span>
              ) : (
                title
              )}
            </h2>
            </div>

            <div className={`space-y-5 ${paragraphMaxWidth}`}>
  {paragraphs.map((text, i) => (
    // FIXED — renders HTML correctly
<p key={i} className={`blog-content ${textClass}`} dangerouslySetInnerHTML={{ __html: text }} />  ))}
</div>
          </div>

          {/* RIGHT IMAGE — DESKTOP */}
          <div className="hidden md:flex md:w-1/4 justify-center">
            {image && (
              <Image
                src={image}
                alt="section image"
                width={280}
                height={280}
                className="opacity-40 w-full max-w-[280px] h-auto"
              />
            )}
          </div>

        </div>

      </div>
    </section>
  );
}