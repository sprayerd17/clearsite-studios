"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-150 focus:ring-2 bg-white";
const inputStyle = { borderColor: "#e4e4e7", color: "#27272a" };
const focusRingStyle = { "--tw-ring-color": "#7c3aed" } as React.CSSProperties;
const labelClass = "block text-sm font-semibold mb-1.5";

type Status = "idle" | "submitting" | "success" | "error";

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    websiteType: "",
    pageCount: "",
    description: "",
    timeline: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("https://formspree.io/f/mpqolnaq", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          "Full Name": form.fullName,
          "Business Name": form.businessName,
          "Email Address": form.email,
          "Phone Number": form.phone || "Not provided",
          "Type of Website": form.websiteType,
          "Number of Pages": form.pageCount,
          "Business Description": form.description,
          "Timeline": form.timeline,
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-16 px-8 rounded-2xl border" style={{ borderColor: "#e4e4e7", backgroundColor: "#fafafa" }}>
        <div className="text-5xl mb-5">🎉</div>
        <h3 className="text-2xl font-extrabold mb-3" style={{ color: "#111827" }}>
          You&apos;re all set!
        </h3>
        <p className="text-base leading-relaxed max-w-md mx-auto" style={{ color: "#6b7280" }}>
          Thanks! I&apos;ll review your details and get back to you within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Row 1 — Full Name + Business Name */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} style={{ color: "#374151" }}>
            Full Name <span style={{ color: "#7c3aed" }}>*</span>
          </label>
          <input
            type="text"
            name="fullName"
            required
            placeholder="Jane Smith"
            value={form.fullName}
            onChange={handleChange}
            className={inputClass}
            style={{ ...inputStyle, ...focusRingStyle }}
          />
        </div>
        <div>
          <label className={labelClass} style={{ color: "#374151" }}>
            Business Name <span style={{ color: "#7c3aed" }}>*</span>
          </label>
          <input
            type="text"
            name="businessName"
            required
            placeholder="Jane's Bakery"
            value={form.businessName}
            onChange={handleChange}
            className={inputClass}
            style={{ ...inputStyle, ...focusRingStyle }}
          />
        </div>
      </div>

      {/* Row 2 — Email + Phone */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} style={{ color: "#374151" }}>
            Email Address <span style={{ color: "#7c3aed" }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="jane@example.com"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            style={{ ...inputStyle, ...focusRingStyle }}
          />
        </div>
        <div>
          <label className={labelClass} style={{ color: "#374151" }}>
            Phone Number{" "}
            <span className="font-normal text-xs" style={{ color: "#9ca3af" }}>(optional)</span>
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+27 82 000 0000"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
            style={{ ...inputStyle, ...focusRingStyle }}
          />
        </div>
      </div>

      {/* Row 3 — Website Type + Page Count */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} style={{ color: "#374151" }}>
            Type of Website <span style={{ color: "#7c3aed" }}>*</span>
          </label>
          <select
            name="websiteType"
            required
            value={form.websiteType}
            onChange={handleChange}
            className={inputClass}
            style={{ ...inputStyle, ...focusRingStyle }}
          >
            <option value="" disabled>Select an option</option>
            <option>Brand New Website</option>
            <option>Website Redesign</option>
            <option>Landing Page</option>
            <option>Website Maintenance</option>
            <option>Not Sure Yet</option>
          </select>
        </div>
        <div>
          <label className={labelClass} style={{ color: "#374151" }}>
            Number of Pages <span style={{ color: "#7c3aed" }}>*</span>
          </label>
          <select
            name="pageCount"
            required
            value={form.pageCount}
            onChange={handleChange}
            className={inputClass}
            style={{ ...inputStyle, ...focusRingStyle }}
          >
            <option value="" disabled>Select an option</option>
            <option>1–3 pages</option>
            <option>4–6 pages</option>
            <option>7–10 pages</option>
            <option>Not Sure</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={labelClass} style={{ color: "#374151" }}>
          Tell me about your business and what you need{" "}
          <span style={{ color: "#7c3aed" }}>*</span>
        </label>
        <textarea
          name="description"
          required
          rows={5}
          placeholder="e.g. I run a small bakery in Cape Town and need a website to show my products and allow customers to place orders..."
          value={form.description}
          onChange={handleChange}
          className={inputClass}
          style={{ ...inputStyle, ...focusRingStyle, resize: "vertical" }}
        />
      </div>

      {/* Timeline */}
      <div>
        <label className={labelClass} style={{ color: "#374151" }}>
          How soon do you need it? <span style={{ color: "#7c3aed" }}>*</span>
        </label>
        <select
          name="timeline"
          required
          value={form.timeline}
          onChange={handleChange}
          className={inputClass}
          style={{ ...inputStyle, ...focusRingStyle }}
        >
          <option value="" disabled>Select an option</option>
          <option>As soon as possible</option>
          <option>Within a month</option>
          <option>Within 3 months</option>
          <option>Just exploring</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {status === "submitting" ? "Sending…" : "Send my quote request →"}
      </button>

      {status === "error" && (
        <p className="text-sm text-center pt-2" style={{ color: "#dc2626" }}>
          Something went wrong. Please try again or email us directly at{" "}
          <a href="mailto:clearsitestudios@outlook.com" className="underline">
            clearsitestudios@outlook.com
          </a>
        </p>
      )}
    </form>
  );
}
