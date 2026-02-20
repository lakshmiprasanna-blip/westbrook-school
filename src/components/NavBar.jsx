"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const NAV_ITEMS = [
  { name: "About Us", href: "/about" },
  { name: "Academics", href: "/academics" },
  { name: "Admissions", href: "/admissions" },
  { name: "Contact Us", href: "/contact" },
  { name: "Explore", href: "/explore" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white lg:bg-[#0f4c81] shadow-sm lg:shadow-none">
      <div className="container-custom  mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          {/* Mobile + Tablet Logo */}
          <Image
            src="/assets/logo-m.png"
            alt="Westbrook International School"
            width={200}
            height={60}
            className="object-contain lg:hidden"
            priority
          />

          {/* Desktop Logo */}
          <Image
            src="/assets/logoo.png"
            alt="Westbrook International School"
            width={220}
            height={60}
            className="object-contain hidden lg:block"
            priority
          />
        </Link>

        {/* Desktop Navigation (Only Large Screens) */}
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

        {/* Hamburger (Mobile + Tablet) */}
        <button
          className="lg:hidden text-[#1C1B1F]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiOutlineX size={30} /> : <HiOutlineMenu size={30} />}
        </button>
      </div>

      {/* Mobile + Tablet Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white px-6 pb-6 space-y-4 shadow-md">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block text-sm font-semibold uppercase tracking-wide transition
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
      )}
    </header>
  );
}
