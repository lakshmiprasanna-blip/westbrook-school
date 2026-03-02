"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EnquiryForm({ variant = "simple" }) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    grade: "",
    mobile: "",
    email: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border bg-[#f0f4f8] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1f4e79] text-gray-700";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};
    const nameRegex = /^[A-Za-z ]+$/;

    if (!formData.parentName.trim()) {
      newErrors.parentName = "Required";
    } else if (!nameRegex.test(formData.parentName.trim())) {
      newErrors.parentName = "Only letters allowed";
    }

    if (!formData.childName.trim()) {
      newErrors.childName = "Required";
    } else if (!nameRegex.test(formData.childName.trim())) {
      newErrors.childName = "Only letters allowed";
    }

    if (!formData.grade) newErrors.grade = "Required";

    if (!formData.mobile) {
      newErrors.mobile = "Required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Enter valid 10 digit number";
    }

    if (!formData.email) {
      newErrors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      newErrors.email = "Enter valid email";
    }

    if (variant === "detailed") {
      if (!formData.date) newErrors.date = "Required";
      if (!formData.time) newErrors.time = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: formData.parentName.trim(),
          childName: formData.childName.trim(),
          grade: formData.grade,
          mobile: formData.mobile.trim(),
          email: formData.email.trim(),
          date: formData.date,
          time: formData.time,
          variant,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ Redirect to thank you page
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
    <div className="w-full px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg mx-auto space-y-4 shadow-lg"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <Image
            src="/assets/westbrookschool.svg"
            alt="Westbrook International School"
            width={300}
            height={60}
            className="object-contain w-auto max-w-[220px] sm:max-w-[300px]"
            priority
          />
        </div>

        {/* ── SIMPLE VARIANT ── */}
        {variant === "simple" && (
          <>
            <div>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                placeholder="Parent name"
                onChange={handleChange}
                className={`${inputStyle} ${
                  errors.parentName ? "border-red-500" : "border-[#9ecae6]"
                }`}
              />
              {errors.parentName && (
                <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="childName"
                value={formData.childName}
                placeholder="Child name"
                onChange={handleChange}
                className={`${inputStyle} ${
                  errors.childName ? "border-red-500" : "border-[#9ecae6]"
                }`}
              />
              {errors.childName && (
                <p className="text-red-500 text-xs mt-1">{errors.childName}</p>
              )}
            </div>

            <div>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className={`${inputStyle} ${
                  errors.grade ? "border-red-500" : "border-[#9ecae6]"
                }`}
              >
                <option value="">Grade</option>
                <option value="1">Grade 1</option>
                <option value="2">Grade 2</option>
              </select>
              {errors.grade && (
                <p className="text-red-500 text-xs mt-1">{errors.grade}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                placeholder="Mobile number"
                onChange={handleChange}
                className={`${inputStyle} ${
                  errors.mobile ? "border-red-500" : "border-[#9ecae6]"
                }`}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
                className={`${inputStyle} ${
                  errors.email ? "border-red-500" : "border-[#9ecae6]"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </>
        )}

        {/* ── DETAILED VARIANT ── */}
        {variant === "detailed" && (
          <>
            <div>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                placeholder="Parent name"
                onChange={handleChange}
                className={`${inputStyle} ${
                  errors.parentName ? "border-red-500" : "border-[#9ecae6]"
                }`}
              />
              {errors.parentName && (
                <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                placeholder="Mobile number"
                onChange={handleChange}
                className={`${inputStyle} ${
                  errors.mobile ? "border-red-500" : "border-[#9ecae6]"
                }`}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
                className={`${inputStyle} ${
                  errors.email ? "border-red-500" : "border-[#9ecae6]"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  name="childName"
                  value={formData.childName}
                  placeholder="Child name"
                  onChange={handleChange}
                  className={`${inputStyle} ${
                    errors.childName ? "border-red-500" : "border-[#9ecae6]"
                  }`}
                />
                {errors.childName && (
                  <p className="text-red-500 text-xs mt-1">{errors.childName}</p>
                )}
              </div>
              <div>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className={`${inputStyle} ${
                    errors.grade ? "border-red-500" : "border-[#9ecae6]"
                  }`}
                >
                  <option value="">Grade</option>
                  <option value="1">Grade 1</option>
                  <option value="2">Grade 2</option>
                </select>
                {errors.grade && (
                  <p className="text-red-500 text-xs mt-1">{errors.grade}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  placeholder="Date"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                  }}
                  onChange={handleChange}
                  className={`${inputStyle} ${
                    errors.date ? "border-red-500" : "border-[#9ecae6]"
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  placeholder="Time"
                  onFocus={(e) => (e.target.type = "time")}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                  }}
                  onChange={handleChange}
                  className={`${inputStyle} ${
                    errors.time ? "border-red-500" : "border-[#9ecae6]"
                  }`}
                />
                {errors.time && (
                  <p className="text-red-500 text-xs mt-1">{errors.time}</p>
                )}
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-[#1f4e79] text-white py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50 font-semibold text-base"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}