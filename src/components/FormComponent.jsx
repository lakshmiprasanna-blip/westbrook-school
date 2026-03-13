"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EnquiryForm({
  variant = "simple",
  theme,
  showLogo,
}) {
  const router = useRouter();

  const resolvedTheme    = theme    ?? (variant === "contact" ? "dark"  : "light");
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

  const isLight = resolvedTheme === "light";

  const inputBase =
    "w-full px-4 rounded-md font-medium focus:outline-none text-[14px]";

  const inputTheme = isLight
    ? "h-12 bg-[#f0f4f8] border border-[#9ecae6] placeholder-gray-400 text-gray-700 focus:ring-2 focus:ring-[#1f4e79] rounded-xl py-3"
    : "h-12 bg-[#E5E5E5] text-black placeholder-gray-500";

  const inputStyle = `${inputBase} ${inputTheme}`;

  const errorStyle = isLight
    ? "text-red-500 text-xs mt-1"
    : "text-red-300 text-xs mt-1";

  const submitBtn = isLight
    ? "w-full mt-2 bg-[#1f4e79] text-white py-3 rounded-xl hover:opacity-90 cursor-pointer transition disabled:opacity-50 font-semibold text-base"
    : "w-full sm:w-[260px] h-12 bg-maroon text-white text-[16px] font-bold cursor-pointer hover:bg-[#7f1626] transition disabled:opacity-50";

  const wrapper = isLight ? "w-full px-4 py-6" : "";

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

    if (!formData.grade) newErrors.grade = "Required";

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

  // ─── Grade Select ──────────────────────────────────────────────────────────
  const GradeSelect = () => (
    <div>
      <div className="relative">
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
        <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {errors.grade && <p className={errorStyle}>{errors.grade}</p>}
    </div>
  );

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        /*
          THE APPROACH:
          - input is always type="date" / type="time" — no JS tricks
          - When empty: hide the browser's mm/dd/yyyy text by making it transparent
            and use a CSS ::before on the wrapper label to show "Date" / "Time"
          - When filled: show the real value normally
          - The -webkit-calendar-picker-indicator covers the full input area
            so the ENTIRE field is a tap target — opens picker on first tap on mobile
        */

        /* === DATE === */
        .date-wrapper {
          position: relative;
        }
        /* Fake placeholder via pseudo element on wrapper */
        .date-wrapper::before {
          content: "Date";
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          color: #9ca3af;
          pointer-events: none;
          z-index: 1;
        }
        /* Hide pseudo placeholder once value exists */
        .date-wrapper.has-value::before {
          display: none;
        }

        input.enquiry-date {
          position: relative;
          width: 100%;
        }
        /* Hide the browser's default date text when empty */
        input.enquiry-date:not(.has-value)::-webkit-datetime-edit {
          color: transparent;
        }
        input.enquiry-date:not(.has-value)::-webkit-datetime-edit-fields-wrapper {
          color: transparent;
        }
        /* Show real value when filled */
        input.enquiry-date.has-value::-webkit-datetime-edit {
          color: #374151;
        }
        /* Stretch the calendar icon to cover the entire input → first tap opens picker */
        input.enquiry-date::-webkit-calendar-picker-indicator {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          z-index: 2;
        }

        /* === TIME === */
        .time-wrapper {
          position: relative;
        }
        .time-wrapper::before {
          content: "Time";
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          color: #9ca3af;
          pointer-events: none;
          z-index: 1;
        }
        .time-wrapper.has-value::before {
          display: none;
        }

        input.enquiry-time {
          position: relative;
          width: 100%;
        }
        input.enquiry-time:not(.has-value)::-webkit-datetime-edit {
          color: transparent;
        }
        input.enquiry-time:not(.has-value)::-webkit-datetime-edit-fields-wrapper {
          color: transparent;
        }
        input.enquiry-time.has-value::-webkit-datetime-edit {
          color: #374151;
        }
        input.enquiry-time::-webkit-calendar-picker-indicator {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          z-index: 2;
        }
      `}</style>

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
              />
            </div>
          )}

          {/* ── Parent Name ── */}
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
          {variant === "contact" && <GradeSelect />}

          {/* ── Mobile ── */}
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

          {/* ── Email ── */}
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
         {/* ── simple / detailed: childName + grade ── */}
{(variant === "simple" || variant === "detailed") && (
  variant === "detailed" ? (
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
      <GradeSelect />
    </>
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
      <GradeSelect />
    </>
  )
)}
          {/* ── detailed: Date + Time ── */}
          {variant === "detailed" && (
            <div className="grid grid-cols-2 gap-3">

              {/* DATE */}
              <div>
                <div className={`date-wrapper ${formData.date ? "has-value" : ""}`}>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={(e) => {
                      setFormData({ ...formData, date: e.target.value });
                      setErrors({ ...errors, date: "" });
                    }}
                    className={`enquiry-date ${formData.date ? "has-value" : ""} ${inputStyle} ${errors.date ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.date && <p className={errorStyle}>{errors.date}</p>}
              </div>

              {/* TIME */}
              <div>
                <div className={`time-wrapper ${formData.time ? "has-value" : ""}`}>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={(e) => {
                      setFormData({ ...formData, time: e.target.value });
                      setErrors({ ...errors, time: "" });
                    }}
                    className={`enquiry-time ${formData.time ? "has-value" : ""} ${inputStyle} ${errors.time ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.time && <p className={errorStyle}>{errors.time}</p>}
              </div>

            </div>
          )}

          {/* ── contact: message ── */}
          {variant === "contact" && (
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows={4}
              className={`${inputBase} bg-[#E5E5E5] py-3 resize-none`}
            />
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
    </>
  );
}