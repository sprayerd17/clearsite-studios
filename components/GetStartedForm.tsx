"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const inputClass =
  "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-150 focus:ring-2 bg-white";
const inputStyle = { borderColor: "#e4e4e7", color: "#27272a" };
const focusRingStyle = { "--tw-ring-color": "#7c3aed" } as React.CSSProperties;
const labelClass = "block text-sm font-semibold mb-1.5";

type Status = "idle" | "submitting" | "success" | "error";

const PLAN_OPTIONS = ["Starter", "Business", "Professional", "E-Commerce", "Unsure"];

const RETAINER_OPTIONS = [
  { value: "yes", label: "Yes — I'd like to add the monthly retainer (R500/month)" },
  { value: "no", label: "No — just the once-off package for now" },
  { value: "not-sure", label: "Not sure yet" },
];

const WEBSITE_TYPES = [
  "E-Commerce Store",
  "Restaurant or Café",
  "Tradesperson or Contractor",
  "Salon or Barber",
  "Health or Wellness",
  "Professional Services (Lawyer, Accountant etc.)",
  "Real Estate or Property",
  "Church or Non-Profit",
  "Portfolio or Personal Brand",
  "Other",
];

export default function GetStartedForm() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan") ?? "";
  const retainerParam = searchParams.get("retainer") ?? "";
  const initialPlan = PLAN_OPTIONS.includes(planParam) ? planParam : "";
  const initialRetainer = RETAINER_OPTIONS.some((o) => o.value === retainerParam) ? retainerParam : "";

  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    plan: initialPlan,
    retainer: initialRetainer,
    websiteType: "",
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    comments: "",
  });

  useEffect(() => {
    setForm((f) => ({
      ...f,
      plan: initialPlan || f.plan,
      retainer: initialRetainer || f.retainer,
    }));
  }, [initialPlan, initialRetainer]);

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
          "Plan Type": form.plan,
          "Monthly Retainer": RETAINER_OPTIONS.find((o) => o.value === form.retainer)?.label ?? "Not answered",
          "Type of Website": form.websiteType,
          "Full Name": form.fullName,
          "Business Name": form.businessName,
          "Email Address": form.email,
          "Phone Number": form.phone || "Not provided",
          "Additional Comments": form.comments || "None",
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
      <div
        className="text-center py-16 px-8 rounded-2xl border"
        style={{ borderColor: "#e4e4e7", backgroundColor: "#fafafa" }}
      >
        <div className="text-5xl mb-5">🎉</div>
        <h3 className="text-2xl font-extrabold mb-3" style={{ color: "#111827" }}>
          You&apos;re all set!
        </h3>
        <p className="text-base leading-relaxed max-w-md mx-auto" style={{ color: "#6b7280" }}>
          Thanks! We&apos;ll review your details and get back to you within 1 business day with our recommendation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Plan Type */}
      <div>
        <label className={labelClass} style={{ color: "#374151" }}>
          Plan Type <span style={{ color: "#7c3aed" }}>*</span>
        </label>
        <select
          name="plan"
          required
          value={form.plan}
          onChange={handleChange}
          className={inputClass}
          style={{ ...inputStyle, ...focusRingStyle }}
        >
          <option value="" disabled>Select a plan</option>
          {PLAN_OPTIONS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Monthly Retainer */}
      <div>
        <p className={labelClass} style={{ color: "#374151" }}>
          Monthly Retainer <span style={{ color: "#7c3aed" }}>*</span>
        </p>
        <div className="space-y-2.5">
          {RETAINER_OPTIONS.map((opt) => {
            const selected = form.retainer === opt.value;
            return (
              <label
                key={opt.value}
                className="flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-all duration-150"
                style={{
                  borderColor: selected ? "#7c3aed" : "#e4e4e7",
                  backgroundColor: selected ? "#ede9fe" : "#ffffff",
                }}
              >
                <input
                  type="radio"
                  name="retainer"
                  value={opt.value}
                  required
                  checked={selected}
                  onChange={handleChange}
                  className="shrink-0 accent-violet-700"
                />
                <span className="text-sm" style={{ color: selected ? "#5b21b6" : "#374151", fontWeight: selected ? 600 : 400 }}>
                  {opt.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Type of Website */}
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
          {WEBSITE_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Full Name + Business Name */}
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

      {/* Email + Phone */}
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

      {/* Additional Comments */}
      <div>
        <label className={labelClass} style={{ color: "#374151" }}>
          Additional Comments{" "}
          <span className="font-normal text-xs" style={{ color: "#9ca3af" }}>(optional)</span>
        </label>
        <textarea
          name="comments"
          rows={4}
          placeholder="Anything else you'd like us to know before we get in touch?"
          value={form.comments}
          onChange={handleChange}
          className={inputClass}
          style={{ ...inputStyle, ...focusRingStyle, resize: "vertical" }}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {status === "submitting" ? "Sending…" : "Send My Request"}
      </button>

      {status === "error" && (
        <p className="text-sm text-center pt-2" style={{ color: "#dc2626" }}>
          Something went wrong. Please try again or email us at{" "}
          <a href="mailto:clearsitestudios@outlook.com" className="underline">
            clearsitestudios@outlook.com
          </a>
        </p>
      )}
    </form>
  );
}
