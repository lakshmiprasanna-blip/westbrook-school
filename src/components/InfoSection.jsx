import Image from "next/image";

export default function InfoSection({
  topLabel,
  introText,
  tag,
  subTag,
  heading,
  description,
  image,
  reverse = false,
}) {
  return (
    <section
      className="relative w-full  bg-[#faf7f2] overflow-hidden"
      style={{
        backgroundImage: "url('/assets/linesbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* TOP LABEL */}
      {topLabel && (
        <div className="absolute top-0 left-0 w-full">
          <div className="container-custom mx-auto px-6">
            <span className="inline-flex items-center px-6 py-4 bg-[var(--color-primary)] text-white text-xs font-semibold uppercase tracking-wider">
              {topLabel}
            </span>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="container-custom mx-auto px-6 pt-6 md:pt-20 pb-6 md:pb-6">
        {/* INTRO TEXT */}
        {introText && (
          <p className="paragraph intro-text max-w-[520px] text-dark mb-6 md:mb-10 mt-11 md:mt-0">
                      {introText}
          </p>
        )}

        {/* MAIN ROW */}
        <div
          className={`flex flex-col md:flex-row ${
            reverse ? "md:flex-row-reverse" : ""
          } items-start md:items-center gap-3 md:gap-24 `}
        >
          {/* IMAGE */}
          <div className="w-full md:w-1/2">
            <Image
              src={image}
              alt={heading || `${tag || "Section"} image`}
              width={800}
              height={500}
              className="w-full h-[240px] md:h-[500px] object-cover"
            />
          </div>

          {/* TEXT */}
          <div className="w-full md:w-1/2">
            {tag && (
              <h3 className="heading inline-block mb-2 bg-lightblue text-dark text-3xl md:text-5xl px-3 py-1 uppercase tracking-wider">
                {tag}
              </h3>
            )}

            {subTag && (
              <h3 className="heading inline-block mb-4 bg-lightblue text-dark text-3xl md:text-5xl px-3 py-1 uppercase tracking-wider">
                {subTag}
              </h3>
            )}

            <p className="paragraph max-w-[447px] text-dark text-base md:text-lg leading-relaxed mb-5">
              {description}
            </p>

            <div className="hidden md:block">
            <button className="border border-maroon text-maroon px-5 py-3 rounded-full text-sm font-semibold hover:bg-maroon hover:text-white transition">
              KNOW MORE
            </button>
          </div>
          </div>

          <div className="md:hidden">
              <button className="flex items-center gap-3 text-primary text-md font-bold tracking-wide">
                DISCOVER MORE
                <span className="w-5 h-5 rounded-full border-2 border-[var(--color-primary)] flex items-center justify-center text-[12px]">
                  →
                </span>
              </button>
            </div>
        </div>
      </div>
    </section>
  );
}
