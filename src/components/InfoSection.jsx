import Image from "next/image";
import Button from "./KnowMorebtn";

// Static class strings lifted out — never re-computed on re-render
const ROW_BASE = "flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-24";
const ROW_REVERSE = "flex flex-col md:flex-row-reverse items-start md:items-center gap-6 md:gap-24";
const PT_WITH_LABEL = "container-custom mx-auto px-6 pb-6 pt-24 md:pt-28";
const PT_NO_LABEL = "container-custom mx-auto px-6 pb-6 pt-6 md:pt-24";

export default function InfoSection({
  topLabel,
  introText,
  tag,
  subTag,
  heading,
  description,
  image,
  className = "",
  buttonLink = null,
  onButtonClick = null,
  reverse = false,
  showButton = false,
  buttonText = "DISCOVER MORE",
}) {
  const altText = heading || `${tag ?? "Section"} image`;

  return (
    <section
      className={`relative w-full bg-offwhite overflow-hidden bg-[url('/assets/linesbg.png')] bg-cover bg-center bg-no-repeat ${className}`}
    >
      {/* TOP LABEL */}
      {topLabel && (
        <div className="absolute top-0 left-0 w-full">
          <div className="container-custom mx-auto px-6">
            <div className="bg-primary inline-block px-5 md:px-8 pt-6 md:pt-9 pb-3 md:pb-4">
              <span className="text-white text-xs md:text-sm font-semibold uppercase tracking-wider">
                {topLabel}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className={topLabel ? PT_WITH_LABEL : PT_NO_LABEL}>
        {/* INTRO TEXT */}
        {introText && (
          <p className="paragraph intro-text max-w-[520px] text-dark mb-6 md:mb-10">
            {introText}
          </p>
        )}

        {/* MAIN ROW */}
        <div className={reverse ? ROW_REVERSE : ROW_BASE}>
          {/* IMAGE */}
          <div className="w-full md:w-2/3 order-2 md:order-1">
            <Image
              src={image}
              alt={altText}
              width={1000}
              height={500}
              className="w-full h-[240px] md:h-[500px] object-cover"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 100vw, 66vw"
            />

            {/* MOBILE DESCRIPTION */}
            <p className="md:hidden paragraph text-dark text-base leading-relaxed mt-4 mb-4">
              {description}
            </p>

            {/* BUTTON — MOBILE */}
            {showButton && (
              <div className="md:hidden mt-4">
                <Button
                  text={buttonText}
                  link={buttonLink}
                  onClick={onButtonClick}
                  className="w-[140px] h-[46px] text-sm"
                />
              </div>
            )}
          </div>

          {/* TEXT */}
          <div className="w-full md:w-1/2 order-1 md:order-2">
            {tag && (
              <h3 className="inline-block mb-2 bg-lightblue text-dark md:text-5xl px-3 py-1 uppercase tracking-wider">
                {tag}
              </h3>
            )}

            {/* Only render <br> when both tag and subTag exist */}
            {tag && subTag && <br />}

            {subTag && (
              <h3 className="inline-block mb-4 bg-lightblue text-dark md:text-5xl px-3 py-1 uppercase tracking-wider">
                {subTag}
              </h3>
            )}

            {/* DESKTOP DESCRIPTION */}
            <p className="hidden md:block paragraph max-w-[447px] text-dark text-base md:text-lg leading-relaxed mb-5">
              {description}
            </p>

            {/* BUTTON — DESKTOP */}
            {showButton && (
              <div className="hidden md:block">
                <Button
                  text={buttonText}
                  link={buttonLink}
                  onClick={onButtonClick}
                  className="w-[150px] h-[46px]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}