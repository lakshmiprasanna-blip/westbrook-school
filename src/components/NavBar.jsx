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
  { name: "Explore", href: "/explore" },
  { name: "Contact Us", href: "/contact" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showShadow, setShowShadow] = useState(false);

  /* Lock background scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  /* Show shadow only when overlapping .navbar-white-trigger */
  useEffect(() => {
    const handleScroll = () => {
      const trigger = document.querySelector(".navbar-white-trigger");
      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();

      // Navbar height ~80px
      if (rect.top <= 80 && rect.bottom >= 80) {
        setShowShadow(true);
      } else {
        setShowShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 w-full z-50
          bg-white lg:bg-[#0f4c81]
          transition-shadow duration-300
          ${showShadow ? "lg:shadow-[0_8px_20px_rgba(255,255,255,0.35)]" : ""}
        `}
      >
        <div className="container-custom mx-auto flex items-center justify-between px-6 py-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/westbrookschool.svg"
              alt="Westbrook International School"
              width={200}
              height={60}
              className="object-contain lg:hidden"
              priority
            />

            <Image
              src="/assets/westbrook.svg"
              alt="Westbrook International School"
              width={220}
              height={60}
              className="object-contain hidden lg:block"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-semibold uppercase tracking-wide transition
                    ${
                      isActive
                        ? "text-white border-b-2 border-white pb-1"
                        : "text-white/90 hover:text-white"
                    }
                  `}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Hamburger */}
          <button
            className="lg:hidden text-[#1C1B1F]"
            onClick={() => setIsOpen(true)}
          >
            <HiOutlineMenu size={30} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU (unchanged) */}
      <div
        className={`
          lg:hidden fixed inset-0 bg-white z-50 flex flex-col
          transition-transform duration-500 ease-in-out
          ${isOpen ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <Image
            src="/assets/logo-m.png"
            alt="Westbrook International School"
            width={180}
            height={50}
          />
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#1C1B1F]"
          >
            <HiOutlineX size={30} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-start px-6 py-9 flex-1 space-y-8">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-xl font-semibold uppercase tracking-wide transition
                  ${
                    isActive
                      ? "text-[#1C1B1F] border-b border-[#1C1B1F] pb-1"
                      : "text-gray-700 hover:text-[#1C1B1F]"
                  }
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