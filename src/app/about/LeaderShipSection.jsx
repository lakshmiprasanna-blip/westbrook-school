"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ── Inline Modal (replaces PrincipalModal.jsx) ──
function LeaderModal({ leader, onClose }) {
 useEffect(() => {
     if (leader) document.body.style.overflow = "hidden";
     return () => {
       document.body.style.overflow = "auto";
     };
   }, [leader]);
 
   return (
     <AnimatePresence>
       {leader && (
         <motion.div
           className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           onClick={onClose}
         >
           <motion.div
             initial={{ scale: 0.97, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             exit={{ scale: 0.97, opacity: 0 }}
             transition={{ duration: 0.25 }}
             onClick={(e) => e.stopPropagation()}
             className="relative w-full max-w-5xl bg-[#2E5C88] text-white
                        px-5 py-8
                        sm:px-8 sm:py-10
                        md:px-12 md:py-14
                        lg:px-16 lg:py-16
                        max-h-[90vh] overflow-y-auto"
           >
             {/* Close Button */}
             <button
   onClick={onClose}
   className="absolute 
              top-4 right-4
              sm:top-6 sm:right-6
              md:top-8 md:right-8
              bg-maroon 
              w-10 h-10
              sm:w-12 sm:h-12
              md:w-14 md:h-14
              rounded-full 
              flex items-center justify-center
              z-50 cursor-pointer"
 >
   <span className="text-white text-2xl sm:text-3xl font-semibold leading-none">
     ×
   </span>
 </button>
 
             {/* Content */}
             <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 lg:gap-14">
               
               {/* Left Image */}
               <div className="w-full md:w-[38%]">
                 <div className="relative w-full
                                 h-[360px]
                                 sm:h-[300px]
                                 md:h-[420px]
                                 bg-white">
                   <Image
                     src={leader.image}
                     alt={leader.title}
                     fill
                     className="object-cover"
                   />
                 </div>
               </div>
 
               {/* Right Content */}
               <div className="w-full md:w-[62%]">
 
                 <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                                font-playfair font-semibold
                                mb-3 md:mb-4">
                   {leader.title}
                 </h2>
 
                 <p className="text-white uppercase tracking-[2px] sm:tracking-[3px]
                               text-xs sm:text-sm
                               mb-5 md:mb-8">
                   {leader.role}
                 </p>
 
                 <p className="text-white text-sm sm:text-[15px] md:text-[16px]
                               leading-6 sm:leading-7 md:leading-8">
                   {leader.description}
                 </p>
 
               </div>
             </div>
 
           </motion.div>
         </motion.div>
       )}
     </AnimatePresence>
  );
}

// ── Main Component ──
export default function LeadershipSection({ data }) {
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [current, setCurrent] = useState(0);

  const prevSlide = () => setCurrent((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev === data.length - 1 ? 0 : prev + 1));

  return (
    <section className="w-full bg-[#F3F3F3] py-16">
      <div className="container-custom">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-block bg-lightblue px-5 py-1.5">
            <h2 className="font-playfair font-bold text-5xl">LEADERSHIP TEAM</h2>
          </div>
        </div>

        {/* ── DESKTOP GRID ── */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 items-stretch">
          {data.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="relative w-full h-[380px] flex-shrink-0" onClick={() => setSelectedLeader(item)}>
                <Image src={item.image} alt={item.title} fill sizes="33vw" className="object-cover object-top" />
              </div>
              <div className="bg-primary group-hover:bg-maroon transition-all duration-300 px-6 py-6 flex flex-col justify-between flex-1">
                <h3 className="text-white !text-[26px] leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <p className="paragraph text-white !text-[12px] !font-semibold uppercase tracking-wide">{item.role}</p>
                  <div
                    className="w-7 h-7 border-3 border-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-maroon"
                    onClick={() => setSelectedLeader(item)}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12H16" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 8l4 4-4 4" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── MOBILE SLIDER ── */}
        <div className="md:hidden">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="group cursor-pointer"
          >
            <div className="relative w-full h-[400px]" onClick={() => setSelectedLeader(data[current])}>
              <Image src={data[current].image} alt={data[current].title} fill sizes="100vw" className="object-cover object-top" />
            </div>
            <div className="bg-primary px-5 py-5">
              <h3 className="text-white !text-[26px] font-semibold leading-tight">{data[current].title}</h3>
              <div className="flex items-center justify-between mt-3">
                <p className="paragraph text-white !text-[14px] uppercase tracking-wide">{data[current].role}</p>
                <div
                  className="w-7 h-7 border-3 border-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-maroon"
                  onClick={() => setSelectedLeader(data[current])}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12H16" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 8l4 4-4 4" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center mt-6">
            <button onClick={prevSlide} className="w-14 h-14 bg-maroon flex items-center justify-center border-r border-white/30 cursor-pointer">
              <svg width="28" height="18" viewBox="0 0 46 28"><path d="M45 14H3M3 14L16 1M3 14L16 27" stroke="white" strokeWidth="1.5" /></svg>
            </button>
            <button onClick={nextSlide} className="w-14 h-14 bg-maroon flex items-center justify-center cursor-pointer">
              <svg width="28" height="18" viewBox="0 0 46 28"><path d="M1 14H43M43 14L30 1M43 14L30 27" stroke="white" strokeWidth="1.5" /></svg>
            </button>
          </div>
        </div>

        {/* ── TABLET SLIDER (2 CARDS) ── */}
        <div className="hidden md:block lg:hidden overflow-hidden">
          <motion.div animate={{ x: `-${current * 50}%` }} transition={{ duration: 0.5 }} className="flex">
            {data.map((item, index) => (
              <div key={index} className="w-1/2 px-3 flex-shrink-0">
                <div className="group cursor-pointer">
                  <div className="relative w-full h-[360px]" onClick={() => setSelectedLeader(item)}>
                    <Image src={item.image} alt={item.title} fill sizes="50vw" className="object-cover object-top" />
                  </div>
                  <div className="bg-primary px-6 py-5">
                    <h3 className="text-white !text-[22px] font-semibold leading-tight">{item.title}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <p className="paragraph text-white !text-[13px] uppercase tracking-wide">{item.role}</p>
                      <div
                        className="w-7 h-7 border-3 border-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-maroon"
                        onClick={() => setSelectedLeader(item)}
                      >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12H16" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 8l4 4-4 4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="flex justify-center mt-6">
            <button onClick={prevSlide} className="w-14 h-14 bg-maroon flex items-center justify-center border-r border-white/30 cursor-pointer">
              <svg width="28" height="18" viewBox="0 0 46 28"><path d="M45 14H3M3 14L16 1M3 14L16 27" stroke="white" strokeWidth="1.5" /></svg>
            </button>
            <button onClick={nextSlide} className="w-14 h-14 bg-maroon flex items-center justify-center cursor-pointer">
              <svg width="28" height="18" viewBox="0 0 46 28"><path d="M1 14H43M43 14L30 1M43 14L30 27" stroke="white" strokeWidth="1.5" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <LeaderModal leader={selectedLeader} onClose={() => setSelectedLeader(null)} />
    </section>
  );
}