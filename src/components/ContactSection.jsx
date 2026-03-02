"use client";

import Image from "next/image";

import EnquiryForm from "./FormComponent";


export default function ContactSection() {

  return (

    <section className="w-full bg-offwhite py-14 lg:py-20">

      <div className="container-custom">

        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

          {/* IMAGE */}

          <div className="relative w-full h-[350px] sm:h-[450px] lg:h-auto">

            <Image

              src="/assets/contactimg.webp"

              alt="Contact"

              fill

              className="object-cover"

            />

          </div>

          {/* FORM PANEL */}

          <div className="bg-primary px-8 sm:px-12 lg:px-16 py-12 flex flex-col justify-center">

            <h2

              className="text-white mb-10 text-[30px] sm:text-[36px] lg:text-[48px] leading-[100%]"

              style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}

            >

              Contact us

            </h2>
            <EnquiryForm variant="contact" />

          </div>

        </div>

      </div>

    </section>

  );

}