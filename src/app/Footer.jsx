"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="bg-[#b3202a] md:bg-primary text-white">
        <div className="container-custom mx-auto px-6 lg:px-8 py-16 md:py-28">
          <div className="flex flex-col items-center text-center space-y-8 md:hidden">
            <Image
              src="/assets/footer-m.png"
              alt="Westbrook International School"
              width={260}
              height={100}
              className="object-contain"
            />
            <div className="space-y-5 text-[15px] uppercase tracking-wide">
              <Link href="#" className="block">ABOUT US</Link>
              <Link href="#" className="block">ADMISSIONS</Link>
              <Link href="#" className="block">ACADEMICS</Link>
              <Link href="#" className="block">CONTACT US</Link>
            </div>
            <div className="flex gap-8 pt-6">
              <Link href="#" className="w-14 h-14 flex items-center justify-center border border-white rounded-full">
                <FaFacebookF size={18} />
              </Link>

              <Link href="#" className="w-14 h-14 flex items-center justify-center border border-white rounded-full">
                <FaInstagram size={18} />
              </Link>

              <Link href="#" className="w-14 h-14 flex items-center justify-center border border-white rounded-full">
                <FaLinkedinIn size={18} />
              </Link>
            </div>
          </div>
          <div className="hidden md:flex md:justify-between md:items-center gap-12">
            <div>
              <Image
                src="/assets/logoo.png"
                alt="Westbrook International School"
                width={500}
                height={120}
                className="w-[360px] lg:w-[600px] h-auto"
              />
            </div>
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
            <div className="flex flex-col gap-6">
              <Link href="#" className="w-12 h-12 flex items-center justify-center border border-white rounded-full hover:bg-white hover:text-primary transition">
                <FaFacebookF size={16} />
              </Link>

              <Link href="#" className="w-12 h-12 flex items-center justify-center border border-white rounded-full hover:bg-white hover:text-primary transition">
                <FaInstagram size={16} />
              </Link>

              <Link href="#" className="w-12 h-12 flex items-center justify-center border border-white rounded-full hover:bg-white hover:text-primary transition">
                <FaLinkedinIn size={16} />
              </Link>
            </div>

          </div>

        </div>
      </div>
      <div className="hidden md:block bg-[#b3202a] text-white text-center py-4 text-sm px-4">
        © Copyright 2026, All Rights Reserved - Westbrook International School | Designed by 8Views
      </div>
    </footer>
  );
}
