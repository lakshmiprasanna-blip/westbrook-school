"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const topBg = isHome ? "bg-primary" : "bg-maroon";
  const bottomBg = isHome ? "bg-maroon" : "bg-primary";

  return (
    <footer className="w-full">
      {/* ================= TOP SECTION ================= */}
      <div className={`${topBg} text-white`}>
        <div className="container-custom mx-auto px-6 lg:px-4 py-16 md:py-24">

          {/* ================= MOBILE ================= */}
          <div className="flex flex-col items-center text-center space-y-8 md:hidden">

            {/* Logo */}
            <Image
              src={isHome ? "/assets/logoo.png" : "/assets/logo1.svg"}
              alt="Westbrook International School"
              width={500}
              height={120}
              className="w-[320px] h-auto"
            />
{/* Location Section */}
            <div className="text-sm space-y-4 max-w-xs">
             <p className="text-white">
  <span className="uppercase tracking-wide">Location :</span><br />
  2-46/2/B/8/2 & 34, Guttala Begumpet,
  Madhapur, Hyderabad - 500081
</p>

  <p>
    <span className="uppercase tracking-wide text-white">Mail Us :</span><br />
    <a
      href="mailto:info@westbrookinternational.com"
      className="underline hover:opacity-80 text-white"
    >
      info@westbrookinternational.com
    </a>
  </p>

  <p>
    <span className="uppercase tracking-wide text-white">Call Us :</span><br />
    <a
      href="tel:+919513190990"
      className="hover:opacity-80 text-white"
    >
      +91-95131-90990
    </a>
  </p>
            </div>
            {/* Navigation Links */}
            <div className="space-y-4 text-[15px] uppercase tracking-wide">
              <Link href="/about" className="block">ABOUT US</Link>
              <Link href="/admissions" className="block">ADMISSIONS</Link>
              <Link href="/academics" className="block">ACADEMICS</Link>
              <Link href="/contact" className="block">CONTACT US</Link>
            </div>

            

            {/* Social Icons */}
            <div className="flex gap-6 pt-4">
              {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-12 h-12 flex items-center justify-center border border-white rounded-full hover:bg-white hover:text-primary transition"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* ================= DESKTOP ================= */}
          <div className="hidden md:flex md:justify-between md:items-start gap-12">

            {/* Logo */}
            <div>
              <Image
                src={isHome ? "/assets/logoo.png" : "/assets/logo1.svg"}
                alt="Westbrook International School"
                width={500}
                height={120}
                className="w-[420px] lg:w-[520px] h-auto"
              />
            </div>

            {/* Center Section */}
            <div className="flex gap-20">
{/* Location Info */}
             <div className="space-y-6 text-sm max-w-[400px] text-white">
 <p className="text-white">
  <span className="uppercase tracking-wide">Location : </span>
  2-46/2/B/8/2 & 34, Guttala Begumpet,
  Madhapur, Hyderabad - 500081
</p>

  <p>
    <span className="uppercase tracking-wide text-white">Mail Us : </span>
    <a
      href="mailto:info@westbrookinternational.com"
      className="underline hover:opacity-80 text-white"
    >
      info@westbrookinternational.com
    </a>
  </p>

  <p>
    <span className="uppercase tracking-wide text-white">Call Us : </span>
    <a
      href="tel:+919513190990"
      className="hover:opacity-80 text-white"
    >
      +91-95131-90990
    </a>
  </p>
</div>
              {/* Navigation */}
              <div className="space-y-6 text-[14px] uppercase tracking-wide">
                <Link href="/about" className="block hover:opacity-80">ABOUT US</Link>
                <Link href="/admissions" className="block hover:opacity-80">ADMISSIONS</Link>
                <Link href="/academics" className="block hover:opacity-80">ACADEMICS</Link>
                <Link href="/contact" className="block hover:opacity-80">CONTACT US</Link>
              </div>

              

            </div>

            {/* Social Icons */}
            <div className="flex flex-col gap-6">
              {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-11 h-11 flex items-center justify-center border border-white rounded-full hover:bg-white hover:text-primary transition"
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ================= BOTTOM STRIP ================= */}
      <div className={`${bottomBg} text-white text-center py-4 text-sm px-4`}>
        © Copyright 2026, All Rights Reserved - Westbrook International School | Designed by 8Views
      </div>
    </footer>
  );
}