"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const NAV_ITEMS = [
  { name: "About Us", href: "/about" },
  { name: "Academics", href: "/academics" },
  { name: "Admissions", href: "/admissions" },
  {
    name: "Explore",
    href: "/explore",
    dropdown: [
      { name: "Blogs", href: "/blogs" },
    ],
  },
  { name: "Contact Us", href: "/contact" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white lg:bg-[#0f4c81] z-40 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
        <div className="container-custom mx-auto flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/westbrookschool.svg"
              alt="Westbrook International School"
              width={200}
              height={60}
              className="object-contain lg:hidden"
            />
            <Image
              src="/assets/westbrook.svg"
              alt="Westbrook International School"
              width={220}
              height={60}
              className="object-contain hidden lg:block"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              if (item.dropdown) {
                return (
                  <div key={item.name} className="relative group">
                    <Link
                      href={item.href}
                      className={`inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide transition
                        ${isActive ? "text-white border-b-2 border-white pb-1" : "text-white/90 hover:text-white"}
                      `}
                    >
                      {item.name}
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </Link>
                    <div className="absolute left-0 top-full w-full h-3" />
                    <div className="absolute left-0 top-[calc(100%+12px)] w-36 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-semibold uppercase tracking-wide transition
                    ${isActive ? "text-white border-b-2 border-white pb-1" : "text-white/90 hover:text-white"}
                  `}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Hamburger */}
          <button className="lg:hidden text-[#1C1B1F]" onClick={() => setIsOpen(true)}>
            <HiOutlineMenu size={30} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`
          lg:hidden fixed inset-0 bg-white z-40 flex flex-col
          transition-transform duration-500 ease-in-out
          ${isOpen ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <Image src="/assets/logo-m.png" alt="Westbrook International School" width={180} height={50} />
          <button onClick={() => setIsOpen(false)} className="text-[#1C1B1F]">
            <HiOutlineX size={30} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-start px-6 py-9 flex-1 space-y-8">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            if (item.dropdown) {
              const isDropdownOpen = openDropdown === item.name;
              return (
                <div key={item.name} className="flex flex-col items-center space-y-4">

                  {/* Toggle button for Explore */}
                  <button
                    onClick={() => setOpenDropdown(isDropdownOpen ? null : item.name)}
                    className={`text-xl font-semibold uppercase tracking-wide transition flex items-center gap-2
                      ${isActive ? "text-[#1C1B1F] border-b border-[#1C1B1F] pb-1" : "text-gray-700 hover:text-[#1C1B1F]"}
                    `}
                  >
                    {item.name}
                    {/* Arrow rotates when open */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {/* Dropdown items — same style as nav items */}
                  {isDropdownOpen && (
                    <div className="flex flex-col items-center space-y-4">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => {
                            setIsOpen(false);
                            setOpenDropdown(null);
                          }}
                          className="text-xl font-semibold uppercase tracking-wide text-gray-700 hover:text-[#1C1B1F] transition" // ✅ same as other nav items
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-xl font-semibold uppercase tracking-wide transition
                  ${isActive ? "text-[#1C1B1F] border-b border-[#1C1B1F] pb-1" : "text-gray-700 hover:text-[#1C1B1F]"}
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}