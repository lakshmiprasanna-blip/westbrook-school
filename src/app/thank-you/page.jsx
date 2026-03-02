"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ThankYouClient() {
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-xl mx-auto">

        {/* Animated Tick */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-[#0F4D81] flex items-center justify-center shadow-lg animate-scaleIn">
            <svg
              className="w-12 h-12"
              viewBox="0 0 52 52"
              fill="none"
            >
              <path
                d="M14 27L22 35L38 18"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-draw"
              />
            </svg>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-4xl md:text-5xl mb-4 text-gray-900">
          Thank You!
        </h1>

        <p className="text-lg text-gray-600 mb-3">
          Your submission has been received successfully.
        </p>

        <p className="text-gray-500">
          Our team will get in touch with you shortly.
        </p>

      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes scaleIn {
          0% {
            transform: scale(0.6);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes draw {
          0% {
            stroke-dasharray: 60;
            stroke-dashoffset: 60;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out forwards;
        }

        .animate-draw {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: draw 0.6s ease-out 0.3s forwards;
        }
      `}</style>
    </div>
  );
}