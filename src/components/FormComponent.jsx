"use client";

import { useState } from "react";
import Image from "next/image";

export default function EnquiryForm({ variant = "simple" }) {
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
  const [honeypot, setHoneypot] = useState("");

  const inputStyle =
    "w-full px-5 py-3 rounded-xl border bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1f4e79]";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // ✅ VALIDATION
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
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email.trim()
      )
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

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parentName: formData.parentName.trim(),
          childName: formData.childName.trim(),
          grade: formData.grade,
          mobile: formData.mobile.trim(),
          email: formData.email.trim(),
          message: "",
          variant,
          honeypot,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Lead submitted successfully!");

        setFormData({
          parentName: "",
          childName: "",
          grade: "",
          mobile: "",
          email: "",
          date: "",
          time: "",
        });

        setHoneypot("");
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
    <form
      onSubmit={handleSubmit}
      className="bg-[#f4f4f4] rounded-3xl p-8 max-w-lg mx-auto"
    >
      {/* Honeypot */}
      <input
        type="text"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Parent Name */}
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
          <p className="text-red-500 text-xs mt-1">
            {errors.parentName}
          </p>
        )}
      </div>

      {variant === "simple" && renderCommonFields()}

      {variant === "detailed" && (
        <>
          {renderCommonFields()}
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-6 bg-[#1f4e79] text-white py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );

  function renderCommonFields() {
    return (
      <>
        <div className="mt-4">
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
            <p className="text-red-500 text-xs mt-1">
              {errors.childName}
            </p>
          )}
        </div>

        <div className="mt-4">
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
            <p className="text-red-500 text-xs mt-1">
              {errors.grade}
            </p>
          )}
        </div>

        <div className="mt-4">
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
            <p className="text-red-500 text-xs mt-1">
              {errors.mobile}
            </p>
          )}
        </div>

        <div className="mt-4">
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
            <p className="text-red-500 text-xs mt-1">
              {errors.email}
            </p>
          )}
        </div>
      </>
    );
  }
}