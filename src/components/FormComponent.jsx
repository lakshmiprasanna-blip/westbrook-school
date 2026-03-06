"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

/**
 * Unified EnquiryForm
 *
 * variant="simple"   → parentName, childName, grade, mobile, email
 * variant="detailed" → same + date, time
 * variant="contact"  → parentName, grade, mobile, email, message
 *                      (renders inside ContactSection's dark panel)
 *
 * Props:
 *  - variant: "simple" | "detailed" | "contact"  (default: "simple")
 *  - theme:   "light" | "dark"                   (default: "light")
 *             "light" → white card with shadow (EnquiryForm look)
 *             "dark"  → transparent, inherits dark bg (ContactSection look)
 *  - showLogo: boolean (default: true for light, false for dark)
 */
export default function EnquiryForm({
  variant = "simple",
  theme,
  showLogo,
}) {
  const router = useRouter();

  // Resolve defaults based on variant
  const resolvedTheme   = theme    ?? (variant === "contact" ? "dark"  : "light");
  const resolvedShowLogo = showLogo ?? (variant === "contact" ? false   : true);

  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    grade: "",
    mobile: "",
    email: "",
    date: "",
    time: "",
    message: "",
  });

  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  // ─── Styles ────────────────────────────────────────────────────────────────
  const isLight = resolvedTheme === "light";

  const inputBase =
    "w-full px-4 rounded-md font-medium focus:outline-none text-[14px]";

  const inputTheme = isLight
    ? "h-12 bg-[#f0f4f8] border border-[#9ecae6] placeholder-gray-400 text-gray-700 focus:ring-2 focus:ring-[#1f4e79] rounded-xl py-3"
    : "h-12 bg-[#E5E5E5] text-black placeholder-gray-500";

  const inputStyle = `${inputBase} ${inputTheme}`;

  const errorStyle = isLight ? "text-red-500 text-xs mt-1" : "text-red-300 text-xs mt-1";

  const submitBtn = isLight
    ? "w-full mt-2 bg-[#1f4e79] text-white py-3 rounded-xl hover:opacity-90 cursor-pointer transition disabled:opacity-50 font-semibold text-base"
    : "w-full sm:w-[260px] h-12 bg-maroon text-white text-[16px] font-bold cursor-pointer hover:bg-[#7f1626] transition disabled:opacity-50";

  const wrapper = isLight
    ? "w-full px-4 py-6"
    : "";

  const card = isLight
    ? "bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg mx-auto space-y-4 shadow-lg"
    : "space-y-5";

  // ─── Helpers ───────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleParentNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setFormData({ ...formData, parentName: value });
    setErrors({ ...errors, parentName: "" });
  };

  // ─── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z ]+$/;

    if (!formData.parentName.trim() || formData.parentName.trim().length < 2) {
      newErrors.parentName = "Please enter a valid parent name.";
    } else if (!nameRegex.test(formData.parentName.trim())) {
      newErrors.parentName = "Only letters allowed";
    }

    if (variant !== "contact") {
      if (!formData.childName.trim()) {
        newErrors.childName = "Required";
      } else if (!nameRegex.test(formData.childName.trim())) {
        newErrors.childName = "Only letters allowed";
      }
    }

    if (!formData.grade) newErrors.grade = "Please select a grade.";

    if (!/^[0-9]{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Enter valid 10-digit number";
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
      newErrors.email = "Enter valid email address";
    }

    if (variant === "detailed") {
      if (!formData.date) newErrors.date = "Required";
      if (!formData.time) newErrors.time = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── Submit ────────────────────────────────────────────────────────────────
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
          childName:  formData.childName.trim(),
          grade:      formData.grade,
          mobile:     formData.mobile.trim(),
          email:      formData.email.trim(),
          message:    formData.message.trim(),
          date:       formData.date,
          time:       formData.time,
          variant,
        }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/thank-you");
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Grade options (shared) ─────────────────────────────────────────────────
  const GradeSelect = ({ twoCol = false }) => (
    <div className={twoCol ? "" : "relative"}>
      <select
        name="grade"
        value={formData.grade}
        onChange={handleChange}
        className={`${inputStyle} appearance-none pr-10 ${
          errors.grade ? "border-red-500" : ""
        } ${!formData.grade ? "text-gray-400 sm:text-gray-500" : ""}`}
      >
        <option value="" disabled hidden>Grade</option>
        <option value="Nursery">Nursery</option>
        <option value="Pre-Primary 1">Pre-Primary 1</option>
        <option value="Pre-Primary 2">Pre-Primary 2</option>
        <option value="Grade 1">Grade 1</option>
        <option value="Grade 2">Grade 2</option>
        <option value="Grade 3">Grade 3</option>
        <option value="Grade 4">Grade 4</option>
        <option value="Grade 5">Grade 5</option>
      </select>
      {/* chevron */}
      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {errors.grade && <p className={errorStyle}>{errors.grade}</p>}
    </div>
  );
// ─── Date Input with fake placeholder (works on iOS + Android) ────────────
  const DateInput = () => (
    <div className="relative">
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className={`${inputStyle} ${errors.date ? "border-red-500" : ""} ${
          !formData.date ? "text-transparent" : ""
        }`}
        style={{ colorScheme: "light" }}
      />
      {/* Fake placeholder — hidden once a value is picked */}
      {!formData.date && (
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[14px]">
          Date
        </span>
      )}
      {errors.date && <p className={errorStyle}>{errors.date}</p>}
    </div>
  );

  // ─── Time Input with fake placeholder (works on iOS + Android) ────────────
  const TimeInput = () => (
    <div className="relative">
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        className={`${inputStyle} ${errors.time ? "border-red-500" : ""} ${
          !formData.time ? "text-transparent" : ""
        }`}
        style={{ colorScheme: "light" }}
      />
      {/* Fake placeholder — hidden once a value is picked */}
      {!formData.time && (
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[14px]">
          Time
        </span>
      )}
      {errors.time && <p className={errorStyle}>{errors.time}</p>}
    </div>
  );
  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className={wrapper}>
      <form onSubmit={handleSubmit} className={card}>

        {/* Logo */}
        {resolvedShowLogo && (
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
        )}

        {/* ── Parent Name (all variants) ── */}
        <div>
          <input
            type="text"
            name="parentName"
            value={formData.parentName}
            placeholder="Parent name"
            onChange={variant === "contact" ? handleParentNameChange : handleChange}
            className={`${inputStyle} ${errors.parentName ? "border-red-500" : ""}`}
          />
          {errors.parentName && <p className={errorStyle}>{errors.parentName}</p>}
        </div>

        {/* ── Contact: grade before mobile ── */}
        {variant === "contact" && (
          <div className="relative">
            <GradeSelect />
          </div>
        )}
{/* ── detailed: date + time (FIXED for mobile) ── */}
        {variant === "detailed" && (
          <div className="grid grid-cols-2 gap-3">
            <DateInput />
            <TimeInput />
          </div>
        )}
        {/* ── Mobile (all variants) ── */}
        <div>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            placeholder="Mobile number"
            onChange={handleChange}
            className={`${inputStyle} ${errors.mobile ? "border-red-500" : ""}`}
          />
          {errors.mobile && <p className={errorStyle}>{errors.mobile}</p>}
        </div>

        {/* ── Email (all variants) ── */}
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email address"
            onChange={handleChange}
            className={`${inputStyle} ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && <p className={errorStyle}>{errors.email}</p>}
        </div>

        {/* ── simple / detailed: childName + grade ── */}
        {(variant === "simple" || variant === "detailed") && (
          variant === "detailed" ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  name="childName"
                  value={formData.childName}
                  placeholder="Child name"
                  onChange={handleChange}
                  className={`${inputStyle} ${errors.childName ? "border-red-500" : ""}`}
                />
                {errors.childName && <p className={errorStyle}>{errors.childName}</p>}
              </div>
              <div className="relative"><GradeSelect twoCol /></div>
            </div>
          ) : (
            <>
              <div>
                <input
                  type="text"
                  name="childName"
                  value={formData.childName}
                  placeholder="Child name"
                  onChange={handleChange}
                  className={`${inputStyle} ${errors.childName ? "border-red-500" : ""}`}
                />
                {errors.childName && <p className={errorStyle}>{errors.childName}</p>}
              </div>
              <div className="relative"><GradeSelect /></div>
            </>
          )
        )}

        {/* ── detailed: date + time ── */}
        {variant === "detailed" && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                name="date"
                value={formData.date}
                placeholder="Date"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
                onChange={handleChange}
                className={`${inputStyle} ${errors.date ? "border-red-500" : ""}`}
              />
              {errors.date && <p className={errorStyle}>{errors.date}</p>}
            </div>
            <div>
              <input
                type="text"
                name="time"
                value={formData.time}
                placeholder="Time"
                onFocus={(e) => (e.target.type = "time")}
                onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
                onChange={handleChange}
                className={`${inputStyle} ${errors.time ? "border-red-500" : ""}`}
              />
              {errors.time && <p className={errorStyle}>{errors.time}</p>}
            </div>
          </div>
        )}
        {/* {variant === "detailed" && (
        <div className="grid grid-cols-2 gap-3">
          <DateInput />
          <TimeInput />
        </div>
      )} */}
        {/* ── contact: message ── */}
        {variant === "contact" && (
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows={4}
              className={`${inputBase} bg-[#E5E5E5] py-3 resize-none`}
            />
          </div>
        )}

        {/* ── Submit ── */}
        <button
          type="submit"
          disabled={loading}
          className={submitBtn}
        >
          {loading ? "Submitting..." : "SUBMIT"}
        </button>

      </form>
    </div>
  );
}