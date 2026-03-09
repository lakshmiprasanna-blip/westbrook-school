import Link from "next/link";

export default function Button({
  text = "KNOW MORE",
  link = null,
  onClick = null,
  className = "",
}) {
  const baseStyle =
    "w-[150px] h-[46px] border border-maroon text-maroon rounded-full text-md font-semibold hover:bg-[#F7CAC9] hover:border-[#F7CAC9] transition cursor-pointer";

  if (link) {
    return (
      <Link href={link}>
        <button className={`${baseStyle} ${className}`}>
          {text}
        </button>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyle} ${className}`}>
      {text}
    </button>
  );
}