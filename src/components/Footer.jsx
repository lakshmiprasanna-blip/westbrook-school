"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();

  const isHome = pathname === "/";

  // Home: Blue top / Red bottom
  // Other pages: Red top / Blue bottom
  const topBg = isHome ? "bg-[#0F4D81]" : "bg-[#9B1B2F]";
  const bottomBg = isHome ? "bg-[#b3202a]" : "bg-[#0F4D81]";


  return (
    <footer className="w-full">

      {/* ===== TOP SECTION ===== */}
      <div className={`${topBg} text-white`}>
        <div className="container-custom mx-auto px-6 lg:px-1 py-16 md:py-28">

          {/* ===== MOBILE ===== */}
          <div className="flex flex-col items-center text-center space-y-8 md:hidden">
            {/* Logo */}
            
              <Image
                src={isHome ? "/assets/logoo.png" : "/assets/logo1.svg"}
                alt="Westbrook International School"
                width={500}
                height={120}
                className="w-[360px] lg:w-[600px] h-auto"
              />
            


            <div className="space-y-5 text-[15px] uppercase tracking-wide">
              <Link href="#" className="block">ABOUT US</Link>
              <Link href="#" className="block">ADMISSIONS</Link>
              <Link href="#" className="block">ACADEMICS</Link>
              <Link href="#" className="block">CONTACT US</Link>
            </div>

            <div className="flex gap-8 pt-6">
              {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-14 h-14 flex items-center justify-center border border-white rounded-full hover:bg-white transition"
                  style={{ color: "white" }}
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* ===== DESKTOP ===== */}
          <div className="hidden md:flex md:justify-between md:items-center gap-12">

            {/* Logo */}
            
          <div>
            <Image
              src={isHome ? "/assets/logoo.png" : "/assets/logo1.svg"}
              alt="Westbrook International School"
              width={500}
              height={120}
              className="w-[360px] lg:w-[600px] h-auto"
            />
          </div>


            {/* Links */}
            <div className="flex gap-24 text-[14px] uppercase tracking-wide">
              <div className="space-y-6">
                <Link href="#" className="block hover:opacity-80">ABOUT US</Link>
                <Link href="#" className="block hover:opacity-80">ADMISSIONS</Link>
                <Link href="#" className="block hover:opacity-80">ACADEMICS</Link>
                <Link href="#" className="block hover:opacity-80">CONTACT US</Link>
              </div>

              <div className="space-y-6">
                <Link href="#" className="block hover:opacity-80">GET IN TOUCH</Link>
                <Link href="#" className="block hover:opacity-80">LOCATION</Link>
                <Link href="#" className="block hover:opacity-80">MAIL ID</Link>
                <Link href="#" className="block hover:opacity-80">CONTACT NO.</Link>
              </div>
            </div>

            {/* Social */}
            <div className="flex flex-col gap-6">
              {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-11 h-11 flex items-center justify-center border border-white rounded-full hover:bg-white transition"
                  style={{ color: "white" }}
                >
                  <Icon size={24} />
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ===== BOTTOM STRIP ===== */}
      <div className={`${bottomBg} text-white text-center py-4 text-sm px-4`}>
        © Copyright 2026, All Rights Reserved - Westbrook International School | Designed by 8Views
      </div>

    </footer>
  );
}
