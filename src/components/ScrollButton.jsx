export default function ScrollButton({
  onClick,
  direction = "left",
  bgColor = "#9B1B2F",
  hoverColor = "#7d1423",
  className = "",
}) {
  const isLeft = direction === "left";

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center
        w-[50px] h-[50px]
        sm:w-[55px] sm:h-[55px]
        md:w-[60px] md:h-[60px]
        transition-colors duration-300 transition cursor-pointer
        ${className}
      `}
      style={{ backgroundColor: bgColor }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = hoverColor)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = bgColor)
      }
    >
      <svg
        className="
          w-[28px] h-[16px]
          sm:w-[32px] sm:h-[18px]
          md:w-[36px] md:h-[20px]
        "
        viewBox="0 0 46 28"
        style={{
          transform: isLeft ? "none" : "rotate(180deg)",
        }}
      >
        <path
          d="M45 14H3M3 14L16 1M3 14L16 27"
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
}
