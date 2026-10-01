"use client";

import { Printer } from "./icons";

export default function PrintButton({ className = "btn-ink btn-sm" }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      <Printer size={16} />
      Save as PDF / Print
    </button>
  );
}
