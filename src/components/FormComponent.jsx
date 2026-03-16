"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EnquiryForm({ variant = "simple", theme, showLogo }) {
  const router = useRouter();

  const resolvedTheme    = theme    ?? (variant === "contact" ? "dark"  : "light");
  const resolvedShowLogo = showLogo ?? (variant === "contact" ? false   : true);
  const isLight          = resolvedTheme === "light";

  const [formData, setFormData] = useState({
    parentName: "", childName: "", grade: "",
    mobile: "", email: "", date: "", time: "", message: "",
  });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);

  // ─── Styles ────────────────────────────────────────────────────────────────
  const inputBase  = "w-full px-4 rounded-md font-medium focus:outline-none text-[14px]";
  const inputTheme = isLight
    ? "h-12 bg-[#f0f4f8] border border-[#9ecae6] placeholder-gray-400 text-gray-700 focus:ring-2 focus:ring-[#1f4e79] rounded-xl py-3"
    : "h-12 bg-[#E5E5E5] text-black placeholder-gray-500";
  const inputStyle = `${inputBase} ${inputTheme}`;
  const errorStyle = isLight ? "text-red-500 text-xs mt-1" : "text-red-300 text-xs mt-1";
  const submitBtn  = isLight
    ? "w-full mt-2 bg-[#1f4e79] text-white py-3 rounded-xl hover:opacity-90 cursor-pointer transition disabled:opacity-50 font-semibold text-base"
    : "w-full sm:w-[260px] h-12 bg-maroon text-white text-[16px] font-bold cursor-pointer hover:bg-[#7f1626] transition disabled:opacity-50";
  const wrapper    = isLight ? "w-full px-4 py-6" : "";
  const card       = isLight
    ? "bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg mx-auto space-y-4 shadow-lg"
    : "space-y-5";

  // ─── Helpers ───────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const val = e.target.name === "parentName" && variant === "contact"
      ? e.target.value.replace(/[^a-zA-Z\s]/g, "")
      : e.target.value;
    setFormData((p) => ({ ...p, [e.target.name]: val }));
    setErrors((p)  => ({ ...p, [e.target.name]: "" }));
  };

  // ─── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    const nameRe = /^[A-Za-z ]+$/;

    if (!formData.parentName.trim() || formData.parentName.trim().length < 2)
      e.parentName = "Please enter a valid parent name.";
    else if (!nameRe.test(formData.parentName.trim()))
      e.parentName = "Only letters allowed";

    if (variant !== "contact") {
      if (!formData.childName.trim())             e.childName = "Required";
      else if (!nameRe.test(formData.childName.trim())) e.childName = "Only letters allowed";
    }

    if (!formData.grade) e.grade = "Required";

    if (!/^[0-9]{10}$/.test(formData.mobile.trim()))
      e.mobile = "Enter valid 10-digit number";

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim()))
      e.email = "Enter valid email address";

    if (variant === "detailed") {
      if (!formData.date) e.date = "Required";
      if (!formData.time) e.time = "Required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ─── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      const res  = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, variant }),
      });
      const data = await res.json();
      data.success ? router.push("/thank-you") : alert(data.message || "Something went wrong.");
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Reusable field ────────────────────────────────────────────────────────
  const Field = ({ name, type = "text", placeholder }) => (
    <div>
      <input
        type={type}
        name={name}
        value={formData[name]}
        placeholder={placeholder}
        onChange={handleChange}
        className={`${inputStyle} ${errors[name] ? "border-red-500" : ""}`}
      />
      {errors[name] && <p className={errorStyle}>{errors[name]}</p>}
    </div>
  );

  // ─── Grade Select ──────────────────────────────────────────────────────────
  const GradeSelect = () => (
    <div>
      <div className="relative">
        <select
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          className={`${inputStyle} appearance-none pr-10 ${errors.grade ? "border-red-500" : ""} ${!formData.grade ? "text-gray-400 sm:text-gray-500" : ""}`}
        >
          <option value="" disabled hidden>Grade</option>
          {["Nursery","Pre-Primary 1","Pre-Primary 2","Grade 1","Grade 2","Grade 3","Grade 4","Grade 5"]
            .map((g) => <option key={g} value={g}>{g}</option>)}
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

  // ─── Date / Time picker ────────────────────────────────────────────────────
  const DateTimePicker = ({ type }) => {
    const isDate   = type === "date";
    const name     = isDate ? "date" : "time";
    const hasValue = !!formData[name];
    return (
      <div style={{ width: "100%", minWidth: 0 }}>
        <div className={`${isDate ? "date-wrapper" : "time-wrapper"} ${hasValue ? "has-value" : ""}`}>
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={(e) => {
              setFormData((p) => ({ ...p, [name]: e.target.value }));
              setErrors((p)  => ({ ...p, [name]: "" }));
            }}
            className={`${isDate ? "enquiry-date" : "enquiry-time"} ${hasValue ? "has-value" : ""} ${inputStyle} ${errors[name] ? "border-red-500" : ""}`}
            style={{ width: "100%", boxSizing: "border-box" }}
          />
        </div>
        {errors[name] && <p className={errorStyle}>{errors[name]}</p>}
      </div>
    );
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        .date-wrapper, .time-wrapper {
          position: relative; width: 100%; overflow: hidden; box-sizing: border-box;
        }
        .date-wrapper::before { content: "Date"; position: absolute; left: 16px; top: 50%; transform: translateY(-50%); font-size: 14px; color: #9ca3af; pointer-events: none; z-index: 1; }
        .time-wrapper::before { content: "Time"; position: absolute; left: 16px; top: 50%; transform: translateY(-50%); font-size: 14px; color: #9ca3af; pointer-events: none; z-index: 1; }
        .date-wrapper.has-value::before, .time-wrapper.has-value::before { display: none; }

        input.enquiry-date, input.enquiry-time {
          position: relative; width: 100% !important; min-width: 0 !important;
          box-sizing: border-box !important; -webkit-appearance: none;
        }
        input.enquiry-date:not(.has-value)::-webkit-datetime-edit,
        input.enquiry-date:not(.has-value)::-webkit-datetime-edit-fields-wrapper,
        input.enquiry-time:not(.has-value)::-webkit-datetime-edit,
        input.enquiry-time:not(.has-value)::-webkit-datetime-edit-fields-wrapper { color: transparent; }

        input.enquiry-date.has-value::-webkit-datetime-edit,
        input.enquiry-time.has-value::-webkit-datetime-edit { color: #374151; }

        input.enquiry-date::-webkit-calendar-picker-indicator,
        input.enquiry-time::-webkit-calendar-picker-indicator {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          width: 100%; height: 100%; opacity: 0; cursor: pointer; z-index: 2;
        }
      `}</style>

      <div className={wrapper}>
        <form onSubmit={handleSubmit} className={card}>

          {resolvedShowLogo && (
            <div className="flex justify-center mb-4 sm:mb-6">
              <Image src="/assets/westbrookschool.svg" alt="Westbrook International School"
                width={300} height={60} className="object-contain w-auto max-w-[220px] sm:max-w-[300px]" />
            </div>
          )}

          <Field name="parentName" placeholder="Parent name" />
          {variant === "contact" && <GradeSelect />}
          <Field name="mobile" type="tel" placeholder="Mobile number" />
          <Field name="email" type="email" placeholder="Email address" />

          {(variant === "simple" || variant === "detailed") && (
            <>
              <Field name="childName" placeholder="Child name" />
              <GradeSelect />
            </>
          )}

          {variant === "detailed" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", width: "100%" }}>
              <DateTimePicker type="date" />
              <DateTimePicker type="time" />
            </div>
          )}

          {variant === "contact" && (
            <textarea name="message" value={formData.message} onChange={handleChange}
              placeholder="Message" rows={4} className={`${inputBase} bg-[#E5E5E5] py-3 resize-none`} />
          )}

          <button type="submit" disabled={loading} className={submitBtn}>
            {loading ? "Submitting..." : "SUBMIT"}
          </button>

        </form>
      </div>
    </>
  );
}