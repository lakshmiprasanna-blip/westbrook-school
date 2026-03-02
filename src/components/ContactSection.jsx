"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ContactSection() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    parentName: "",
    grade: "",
    mobile: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.parentName.trim() || formData.parentName.length < 2) {
      newErrors.parentName = "Please enter a valid parent name.";
    }

    if (!formData.grade) {
      newErrors.grade = "Please select a grade.";
    }

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits.";
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: formData.parentName.trim(),
          childName: "",
          grade: formData.grade,
          mobile: formData.mobile.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          date: "",
          time: "",
          variant: "contact",
        }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/thank-you");
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

          {/* FORM */}
          <div className="bg-primary px-8 sm:px-12 lg:px-16 py-12 flex flex-col justify-center">
            <h2
              className="text-white mb-10 text-[30px] sm:text-[36px] lg:text-[48px] leading-[100%]"
              style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
            >
              Contact us
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>

              {/* Parent Name */}
              <div>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                    setFormData({ ...formData, parentName: value });
                  }}
                  placeholder="Parent name"
                  className="w-full h-12 px-4 bg-[#E5E5E5] rounded-md text-[14px] font-medium focus:outline-none"
                />
                {errors.parentName && (
                  <p className="text-red-300 text-xs mt-1">{errors.parentName}</p>
                )}
              </div>

              {/* Grade */}
              <div className="relative">
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className={`w-full h-12 px-4 pr-10 bg-[#E5E5E5] rounded-md text-[14px] font-medium focus:outline-none appearance-none ${
                    formData.grade ? "text-black" : "text-gray-500"
                  }`}
                >
                  <option value="" disabled hidden>Grade</option>
                  <option value="Pre Primary">Pre Primary</option>
                  <option value="Grade 1">Grade 1</option>
                  <option value="Grade 2">Grade 2</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {errors.grade && (
                  <p className="text-red-300 text-xs mt-1">{errors.grade}</p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile number"
                  className="w-full h-12 px-4 bg-[#E5E5E5] rounded-md text-[14px] font-medium focus:outline-none"
                />
                {errors.mobile && (
                  <p className="text-red-300 text-xs mt-1">{errors.mobile}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full h-12 px-4 bg-[#E5E5E5] rounded-md text-[14px] font-medium focus:outline-none"
                />
                {errors.email && (
                  <p className="text-red-300 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Message - NO validation */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={4}
                  className="w-full px-4 py-3 bg-[#E5E5E5] rounded-md text-[14px] font-medium focus:outline-none resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-[260px] h-12 bg-maroon text-white text-[16px] font-bold hover:bg-[#7f1626] transition disabled:opacity-50"
              >
                {loading ? "Submitting..." : "SUBMIT"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}