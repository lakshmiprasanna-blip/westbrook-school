"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const topBg = isHome ? "bg-primary" : "bg-maroon";
  const bottomBg = isHome ? "bg-maroon" : "bg-primary";

  const socialLinks = [
    { Icon: FaFacebookF, href: "#" },
    { Icon: FaInstagram, href: "#" },
    { Icon: MdEmail, href: "mailto:info@westbrookinternational.com" },
  ];

  return (
    <footer className="w-full">
      {/* TOP SECTION */}
      <div className={`${topBg} text-white`}>
        <div className="container-custom mx-auto px-6 lg:px-4 py-16 md:py-24">

          {/* MOBILE */}
          <div className="flex flex-col items-center text-center space-y-8 md:hidden">
            <Image
              src={isHome ? "/assets/logoo.png" : "/assets/logo1.svg"}
              alt="Westbrook International School"
              width={500}
              height={120}
              className="w-[280px] h-auto"
            />

            <div className="text-sm space-y-4 max-w-xs">
              <p className="text-white">
                <span className="uppercase tracking-wide font-semibold text-white">Location :</span>{" "}
                2-46/2/8/8/20 & 34, Guttala Begumpet, Madhapur, Hyderabad -500081
              </p>
              <p className="text-white">
                <span className="uppercase tracking-wide font-semibold text-white">Mail Us :</span>{" "}
                <a href="mailto:info@westbrookinternational.com" className="underline hover:opacity-80 text-white">info@westbrookinternational.com</a>
              </p>
              <p className="text-white">
                <span className="uppercase tracking-wide font-semibold text-white">Call Us :</span>{" "}
                <a href="tel:+919513190990" className="hover:opacity-80 text-white">+91-95131-90990</a>
              </p>
            </div>

            <div className="space-y-3 text-[15px] uppercase tracking-wide text-white">
              <Link href="/about" className="block hover:opacity-80">ABOUT US</Link>
              <Link href="/admissions" className="block hover:opacity-80">ADMISSIONS</Link>
              <Link href="/academics" className="block hover:opacity-80">ACADEMICS</Link>
              <Link href="/contact" className="block hover:opacity-80">CONTACT US</Link>
            </div>

            <div className="flex gap-4 pt-2">
              {socialLinks.map(({ Icon, href }, i) => (
                <Link key={i} href={href} className="w-11 h-11 flex items-center justify-center border border-white rounded-full hover:bg-white hover:text-primary transition">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:flex md:items-center gap-6">

            {/* Logo */}
            <div className="flex-shrink-0 mr-8">
              <Image
                src={isHome ? "/assets/logoo.png" : "/assets/logo1.svg"}
                alt="Westbrook International School"
                width={500}
                height={120}
                className="w-[380px] lg:w-[460px] h-auto"
              />
            </div>

            {/* Location Info */}
            <div className="space-y-4 text-sm flex-1">
              <p className="text-white">
                <span className="uppercase tracking-wide font-semibold text-white">Location :</span>{" "}
                2-46/2/8/8/20 & 34, Guttala Begumpet, Madhapur, Hyderabad -500081
              </p>
              <p className="text-white">
                <span className="uppercase tracking-wide font-semibold text-white">Mail Us :</span>{" "}
                <a href="mailto:info@westbrookinternational.com" className="underline hover:opacity-80 text-white">info@westbrookinternational.com</a>
              </p>
              <p className="text-white">
                <span className="uppercase tracking-wide font-semibold text-white">Call Us :</span>{" "}
                <a href="tel:+919513190990" className="hover:opacity-80 text-white">+91-95131-90990</a>
              </p>
            </div>

            {/* Navigation */}
            <div className="space-y-4 text-[14px] uppercase tracking-wide text-white ml-6">
              <Link href="/about" className="block hover:opacity-80">ABOUT US</Link>
              <Link href="/admissions" className="block hover:opacity-80">ADMISSIONS</Link>
              <Link href="/academics" className="block hover:opacity-80">ACADEMICS</Link>
              <Link href="/contact" className="block hover:opacity-80">CONTACT US</Link>
            </div>

            {/* Social Icons */}
            <div className="flex flex-col gap-4 ml-6">
              {socialLinks.map(({ Icon, href }, i) => (
                <Link key={i} href={href} className="w-11 h-11 flex items-center justify-center border border-white rounded-full hover:bg-white hover:text-primary transition">
                  <Icon size={20} />
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* BOTTOM STRIP */}
      <div className={`${bottomBg} text-white text-center py-4 text-sm px-4`}>
        © Copyright 2026, All Rights Reserved - Westbrook International School | Designed by 8Views
      </div>
    </footer>
  );
}