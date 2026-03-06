"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {

  const socialLinks = [
    { Icon: FaFacebookF, href: "https://www.facebook.com/people/Westbrook-International/61587468690648/?mibextid=wwXIfr&rdid=UlZsXZhVgZmh3bnR&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F176fFCGBXj%2F%3Fmibextid%3DwwXIfr" },
    { Icon: FaInstagram, href: "https://www.instagram.com/westbrookinternational?igsh=MXMwNHd0OWc1Z21ueA==" },
    { Icon: MdEmail, href: "mailto:info@westbrookinternational.com" },
  ];

  return (
    <footer className="w-full pb-12 md:pb-0">

      {/* ================= TOP SECTION ================= */}
      <div className="bg-primary text-white ">
        <div className="container-custom mx-auto px-6 lg:px-4 py-16 md:py-24 text-white">

          {/* ================= MOBILE + TABLET ================= */}
          <div className="flex flex-col items-center text-center space-y-8 lg:hidden text-white">

            <Image
              src="/assets/logoo.png"
              alt="Westbrook International School"
              width={500}
              height={120}
              className="w-[280px] h-auto"
            />

            {/* Contact Info */}
            <div className="text-sm space-y-4 max-w-sm text-white">
              <p className="text-white">
                <span className="uppercase tracking-wide font-semibold text-white">
                  Location :
                </span>{" "}
                2-46/2/8/8/20 & 34, Guttala Begumpet, Madhapur, Hyderabad -500081
              </p>

              <p className="text-white">
                <span className="uppercase tracking-wide font-semibold text-white">
                  Mail Us :
                </span>{" "}
                <a
                  href="mailto:info@westbrookinternational.com"
                  className="underline hover:opacity-80 text-white"
                >
                  info@westbrookinternational.com
                </a>
              </p>

              <p className="text-white">
                <span className="uppercase tracking-wide font-semibold text-white">
                  Call Us :
                </span>{" "}
                <a
                  href="tel:+919513190990"
                  className="hover:opacity-80 text-white"
                >
                  +91-95131-90990
                </a>
              </p>
            </div>

            {/* Navigation */}
            <div className="space-y-3 text-[15px] uppercase tracking-wide text-white">
              <Link href="/about" className="block hover:opacity-80 text-white">
                ABOUT US
              </Link>
              <Link href="/admissions" className="block hover:opacity-80 text-white">
                ADMISSIONS
              </Link>
              <Link href="/academics" className="block hover:opacity-80 text-white">
                ACADEMICS
              </Link>
              <Link href="/contact" className="block hover:opacity-80 text-white">
                CONTACT US
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {socialLinks.map(({ Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  className="w-11 h-11 flex items-center justify-center border border-white rounded-full hover:bg-white hover:text-primary transition text-white"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* ================= DESKTOP ================= */}
          <div className="hidden lg:flex lg:items-center gap-6 text-white">

            {/* Logo */}
            <div className="flex-shrink-0 mr-8">
              <Image
                src="/assets/logoo.png"
                alt="Westbrook International School"
                width={500}
                height={120}
                className="w-[320px] xl:w-[420px] h-auto"
              />
            </div>

            {/* Contact Info */}
            <div className="space-y-4 text-sm flex-1 text-white">
              <p className="text-white">
                <span className="uppercase tracking-wide font-semibold text-white">
                  Location :
                </span>{" "}
                2-46/2/8/8/20 & 34, Guttala Begumpet, Madhapur, Hyderabad -500081
              </p>

              <p className="text-white">
                <span className="uppercase tracking-wide font-semibold text-white">
                  Mail Us :
                </span>{" "}
                <a
                  href="mailto:info@westbrookinternational.com"
                  className="underline hover:opacity-80 text-white"
                >
                  info@westbrookinternational.com
                </a>
              </p>

              <p className="text-white">
                <span className="uppercase tracking-wide font-semibold text-white">
                  Call Us :
                </span>{" "}
                <a
                  href="tel:+919513190990"
                  className="hover:opacity-80 text-white"
                >
                  +91-95131-90990
                </a>
              </p>
            </div>

            {/* Navigation */}
            <div className="space-y-5 text-[14px] uppercase tracking-wide ml-6 flex-shrink-0 text-white">
              <Link href="/about" className="block hover:opacity-80 text-white">
                ABOUT US
              </Link>
              <Link href="/admissions" className="block hover:opacity-80 text-white">
                ADMISSIONS
              </Link>
              <Link href="/academics" className="block hover:opacity-80 text-white">
                ACADEMICS
              </Link>
              <Link href="/contact" className="block hover:opacity-80 text-white">
                CONTACT US
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex flex-col gap-4 ml-6 flex-shrink-0">
              {socialLinks.map(({ Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  className="w-11 h-11 flex items-center justify-center border border-white rounded-full hover:bg-white hover:text-primary transition text-white"
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ================= BOTTOM STRIP ================= */}
      <div className="bg-maroon text-white text-center py-4 text-sm px-4">
        © Copyright 2026, All Rights Reserved - Westbrook International School 
      </div>

    </footer>
  );
}