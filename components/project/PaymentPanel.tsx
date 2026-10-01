"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { uploadProofOfPayment } from "@/app/q/[token]/actions";
import { Check, Clock, FileText, WhatsApp } from "@/components/icons";
import CopyButton from "./CopyButton";
import { shrinkImage } from "./compress";
import type { BankRow, ProofView } from "./helpers";
import { Bank, Spinner, Upload } from "./icons";

export interface PaymentPanelProps {
  token: string;
  /** "Deposit due" / "Balance due". */
  title: string;
  intro: string;
  /** Formatted, e.g. "R1,750.00". */
  amountDue: string;
  /** For banking apps, e.g. "1750.00". */
  amountPlain: string;
  invoiceNumber: string;
  invoiceHref: string;
  /** Payment reference, e.g. "#1042". */
  reference: string;
  /** Empty when the studio hasn't filled in its banking details yet. */
  bank: BankRow[];
  /** Proof already uploaded for this payment. */
  proofs: ProofView[];
  whatsappHref: string;
}

const MAX_BYTES = 4 * 1024 * 1024;
/** Photos bigger than this are shrunk before upload — a proof only has to be readable. */
const SHRINK_ABOVE = 1.5 * 1024 * 1024;

const COPYABLE = new Set(["Account holder", "Account number", "Branch code"]);

/** Amount due, EFT details with copy buttons, and the proof-of-payment upload. */
export default function PaymentPanel(props: PaymentPanelProps) {
  const { token, bank, proofs, reference } = props;
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [justUploaded, setJustUploaded] = useState(false);

  async function upload(file: File | undefined) {
    if (!file) return;
    setError("");
    setJustUploaded(false);
    setUploading(true);
    try {
      let toSend = file;
      if (toSend.size > SHRINK_ABOVE && file.type.startsWith("image/")) toSend = await shrinkImage(file);
      if (toSend.size > MAX_BYTES) {
        setError("That file is too big (max 4 MB). Please use a screenshot or a smaller PDF.");
        return;
      }
      const form = new FormData();
      form.set("token", token);
      form.set("file", toSend);
      const result = await uploadProofOfPayment(form);
      if (result.ok) {
        setJustUploaded(true);
        router.refresh();
      } else {
        setError(result.error);
      }
    } catch {
      setError("The upload failed. Please check your connection and try again.");
    } finally {
      setUploading(false);
      if (input.current) input.current.value = "";
    }
  }

  return (
    <section className="card overflow-hidden">
      {/* ── Amount due ─────────────────────────────────────────────── */}
      <div className="grain relative overflow-hidden bg-ink p-6 text-white sm:p-8">
        <div aria-hidden="true" className="bg-grid-dark mask-radial pointer-events-none absolute inset-0 opacity-70" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(198,242,78,0.22), transparent)" }}
        />
        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                Due now
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
                Invoice {props.invoiceNumber}
              </span>
            </div>
            <h2 className="mt-5 text-lg font-medium tracking-tight text-white/75">{props.title}</h2>
            <p className="mt-1 text-[44px] font-semibold leading-none tracking-tightest tabular-nums text-white sm:text-[56px]">
              {props.amountDue}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">{props.intro}</p>
          </div>
          <a href={props.invoiceHref} className="btn-ghost-dark btn-sm self-start sm:self-auto">
            <FileText size={16} />
            View invoice
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:divide-x md:divide-line">
        {/* ── EFT details ─────────────────────────────────────────── */}
        <div className="p-6 sm:p-8">
          <h3 className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-ink">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-paper text-ink">
              <Bank size={16} />
            </span>
            Pay by EFT
          </h3>

          {bank.length > 0 ? (
            <>
              <dl className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line">
                {bank.map((row) => (
                  <Row key={row.label} label={row.label} value={row.value} copy={COPYABLE.has(row.label) ? (row.copy ?? row.value) : undefined} />
                ))}
                <Row label="Amount" value={props.amountDue} copy={props.amountPlain} />
                <Row label="Reference" value={reference} copy={reference} highlight />
              </dl>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                Please use <span className="font-semibold text-ink">{reference}</span> as the payment reference so I
                can match it to your project.
              </p>
            </>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-line-strong bg-paper/60 p-5">
              <p className="text-[15px] font-medium text-ink">I&apos;ll send banking details on WhatsApp.</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                When you pay, use <span className="font-semibold text-ink">{reference}</span> as the reference.
              </p>
              <a href={props.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm mt-4">
                <WhatsApp size={15} className="text-[#25d366]" />
                Ask for banking details
              </a>
            </div>
          )}
        </div>

        {/* ── Proof of payment ────────────────────────────────────── */}
        <div className="border-t border-line p-6 sm:p-8 md:border-t-0">
          <h3 className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-ink">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-paper text-ink">
              <Upload size={16} />
            </span>
            Proof of payment
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Paid? Upload the confirmation from your banking app and I&apos;ll confirm as soon as it reflects.
          </p>

          {proofs.length > 0 && (
            <ul className="mt-5 space-y-2">
              {proofs.map((p) => (
                <li key={p.id} className="flex items-start gap-3 rounded-2xl border border-line bg-paper/50 px-4 py-3">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ink text-lime">
                    <Check size={15} strokeWidth={2.5} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block truncate text-sm font-medium text-ink underline-offset-4 hover:underline"
                    >
                      {p.name}
                    </a>
                    <p className="mt-0.5 text-xs text-muted">Sent {p.uploadedAt}</p>
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-lime-soft px-2.5 py-1 text-[11px] font-medium text-ink">
                      <Clock size={12} />
                      Received, checking it
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {justUploaded && !error && (
            <p role="status" className="mt-4 flex items-start gap-2 rounded-2xl bg-lime-soft px-4 py-3 text-sm text-ink">
              <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0" />
              Thanks! I&apos;ve been notified and will confirm your payment shortly.
            </p>
          )}

          <button
            type="button"
            onClick={() => input.current?.click()}
            disabled={uploading}
            className={`${proofs.length ? "btn-ghost" : "btn-ink"} mt-5 w-full disabled:pointer-events-none disabled:opacity-70`}
          >
            {uploading ? <Spinner size={17} /> : <Upload size={17} />}
            {uploading ? "Uploading…" : proofs.length ? "Upload another file" : "Upload proof of payment"}
          </button>
          <p className="mt-2.5 text-center text-xs text-muted">A screenshot, photo or PDF · max 4 MB</p>
          {error && (
            <p role="alert" className="mt-3 rounded-2xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink">
              {error}
            </p>
          )}
          <input
            ref={input}
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => upload(e.target.files?.[0])}
          />
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, copy, highlight = false }: { label: string; value: string; copy?: string; highlight?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-3 px-4 py-3 ${highlight ? "bg-lime-soft" : "bg-white"}`}>
      <div className="min-w-0">
        <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">{label}</dt>
        <dd className="mt-0.5 break-words text-[15px] font-medium tabular-nums text-ink">{value}</dd>
      </div>
      {copy && <CopyButton value={copy} label={label.toLowerCase()} />}
    </div>
  );
}
