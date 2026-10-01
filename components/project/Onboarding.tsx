"use client";

import { useRouter } from "next/navigation";
import { useCallback, useId, useRef, useState, useTransition } from "react";
import {
  notifyContentReady,
  removeOnboardingFile,
  saveOnboardingResponse,
  uploadOnboardingFile,
} from "@/app/q/[token]/actions";
import { ArrowUpRight, Check, FileText, Plus, WhatsApp } from "@/components/icons";
import { formatBytes, isItemReady, type FileView, type OnboardingItemView } from "./helpers";
import { ChevronDown, Spinner, Trash, Upload } from "./icons";

const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPT = "image/*,application/pdf,.doc,.docx,.txt,.svg";
/** Image types browsers can show as a thumbnail. */
const PREVIEWABLE = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);

interface PendingUpload {
  key: string;
  name: string;
  size: number;
  state: "waiting" | "uploading" | "done" | "error";
  error?: string;
}

/** The content checklist: one expandable card per item, with notes and file uploads. */
export default function Onboarding({
  token,
  items,
  whatsappHref,
}: {
  token: string;
  items: OnboardingItemView[];
  whatsappHref: string;
}) {
  const router = useRouter();
  const [refreshing, startRefresh] = useTransition();
  const refresh = useCallback(() => startRefresh(() => router.refresh()), [router]);

  const ready = items.filter(isItemReady).length;
  const total = items.length;
  const percent = total ? Math.round((ready / total) * 100) : 0;

  const [open, setOpen] = useState<Set<string>>(() => {
    const first = items.find((i) => !isItemReady(i));
    return new Set(first ? [first.id] : []);
  });
  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const [notify, setNotify] = useState<"idle" | "sending" | "sent">("idle");
  const [notifyError, setNotifyError] = useState("");

  async function sendReady() {
    setNotifyError("");
    setNotify("sending");
    try {
      const result = await notifyContentReady(token);
      if (result.ok) {
        setNotify("sent");
        refresh();
      } else {
        setNotify("idle");
        setNotifyError(result.error);
      }
    } catch {
      setNotify("idle");
      setNotifyError("Something went wrong. Please check your connection and try again.");
    }
  }

  if (total === 0) {
    return (
      <section className="card p-6 sm:p-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Your content</span>
        <h2 className="mt-4 text-2xl tracking-tight text-ink">Your content checklist is on its way.</h2>
        <p className="prose-muted mt-3 max-w-xl text-[15px]">
          I&apos;ll add a short list of what I need from you (logo, photos, text) right here. In the meantime you can send
          anything you already have on WhatsApp.
        </p>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm mt-6">
          <WhatsApp size={15} className="text-[#25d366]" />
          Send on WhatsApp
        </a>
      </section>
    );
  }

  return (
    <section aria-labelledby="content-heading" className="scroll-mt-6" id="content">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <span className="eyebrow">Your content</span>
          <h2 id="content-heading" className="mt-4 text-[30px] leading-[1.05] tracking-tightest text-ink sm:text-4xl">
            Send me your <span className="serif-accent">content.</span>
          </h2>
          <p className="prose-muted mt-3 text-[15px]">
            Add your logo, photos and text here whenever it suits you — everything saves as you go. Phone photos are
            fine, and if something isn&apos;t ready yet, just tell me in the box.
          </p>
        </div>
        <div className="w-full shrink-0 sm:w-56">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Progress</span>
            <span className="text-sm font-semibold tabular-nums text-ink">
              {ready} of {total} ready
            </span>
          </div>
          <div
            className="mt-2.5 h-2 overflow-hidden rounded-full bg-ink/[0.07]"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={ready}
            aria-label="Content ready"
          >
            <div className="h-full rounded-full bg-lime-deep transition-[width] duration-500" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>

      <ul className="mt-8 space-y-3">
        {items.map((item, index) => (
          <ItemCard
            key={item.id}
            token={token}
            item={item}
            index={index}
            open={open.has(item.id)}
            onToggle={() => toggle(item.id)}
            onChanged={refresh}
            refreshing={refreshing}
          />
        ))}
      </ul>

      {/* ── Done ─────────────────────────────────────────────────── */}
      <div className="grain relative mt-6 overflow-hidden rounded-3xl bg-ink p-6 text-white shadow-lift sm:p-8">
        <div aria-hidden="true" className="bg-grid-dark mask-radial pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <h3 className="text-xl tracking-tight text-white">Added everything?</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              Let me know and I&apos;ll go through it. You can still add or change things afterwards.
            </p>
          </div>
          {notify === "sent" ? (
            <p role="status" className="flex max-w-sm items-start gap-2.5 text-sm leading-relaxed text-white/85">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime text-ink">
                <Check size={13} strokeWidth={2.75} />
              </span>
              Thanks! I&apos;ll check it and let you know if anything&apos;s missing.
            </p>
          ) : (
            <button
              type="button"
              onClick={sendReady}
              disabled={notify === "sending"}
              className="btn-lime shrink-0 disabled:pointer-events-none disabled:opacity-70"
            >
              {notify === "sending" ? <Spinner size={17} /> : <Check size={17} strokeWidth={2.5} />}
              {notify === "sending" ? "Sending…" : "I've added everything"}
            </button>
          )}
        </div>
        {notifyError && (
          <p role="alert" className="relative z-10 mt-4 text-sm text-white/80">
            {notifyError}
          </p>
        )}
      </div>
    </section>
  );
}

function ItemCard({
  token,
  item,
  index,
  open,
  onToggle,
  onChanged,
  refreshing,
}: {
  token: string;
  item: OnboardingItemView;
  index: number;
  open: boolean;
  onToggle: () => void;
  onChanged: () => void;
  refreshing: boolean;
}) {
  const panelId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  // What's typed in the box. Follows the saved value unless the client has unsaved edits.
  const [text, setText] = useState(item.response);
  const [savedBase, setSavedBase] = useState(item.response);
  if (item.response !== savedBase) {
    setSavedBase(item.response);
    if (text.trim() === savedBase.trim()) setText(item.response);
  }
  const dirty = text.trim() !== item.response.trim();
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");

  const [uploads, setUploads] = useState<PendingUpload[]>([]);
  const [removing, setRemoving] = useState<string | null>(null);
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [error, setError] = useState("");

  const ready = isItemReady(item);
  const files = item.files.filter((f) => !hidden.has(f.id));
  // Finished uploads stay listed until the refreshed file list has arrived.
  const visibleUploads = uploads.filter((u) => u.state !== "done" || refreshing);
  const busy = uploads.some((u) => u.state === "waiting" || u.state === "uploading");

  async function save() {
    setError("");
    setSaveState("saving");
    try {
      const result = await saveOnboardingResponse(token, item.id, text);
      if (result.ok) {
        setSaveState("saved");
        onChanged();
      } else {
        setSaveState("idle");
        setError(result.error);
      }
    } catch {
      setSaveState("idle");
      setError("Couldn't save. Please check your connection and try again.");
    }
  }

  function patch(key: string, change: Partial<PendingUpload>) {
    setUploads((prev) => prev.map((u) => (u.key === key ? { ...u, ...change } : u)));
  }

  async function addFiles(list: FileList | null) {
    const picked = list ? Array.from(list) : [];
    if (inputRef.current) inputRef.current.value = "";
    if (!picked.length) return;
    setError("");

    const stamp = Date.now();
    const entries: PendingUpload[] = picked.map((f, i) => {
      const tooBig = f.size > MAX_BYTES;
      return {
        key: `${stamp}-${i}`,
        name: f.name,
        size: f.size,
        state: tooBig ? "error" : "waiting",
        error: tooBig ? "Too big (max 10 MB). Try a smaller version, or paste a download link in the box above." : undefined,
      };
    });
    setUploads((prev) => [...prev.filter((u) => u.state === "waiting" || u.state === "uploading"), ...entries]);

    // One at a time keeps each request under the upload limit and shows clear progress.
    for (let i = 0; i < picked.length; i++) {
      const entry = entries[i];
      if (entry.state === "error") continue;
      patch(entry.key, { state: "uploading" });
      try {
        const form = new FormData();
        form.set("token", token);
        form.set("itemId", item.id);
        form.set("file", picked[i]);
        const result = await uploadOnboardingFile(form);
        if (result.ok) {
          patch(entry.key, { state: "done" });
          onChanged();
        } else {
          patch(entry.key, { state: "error", error: result.error });
        }
      } catch {
        patch(entry.key, { state: "error", error: "The upload failed. Check your connection and try again." });
      }
    }
  }

  async function remove(file: FileView) {
    if (!window.confirm(`Remove "${file.name}"?`)) return;
    setError("");
    setRemoving(file.id);
    try {
      const result = await removeOnboardingFile(token, item.id, file.id);
      if (result.ok) {
        setHidden((prev) => new Set(prev).add(file.id));
        onChanged();
      } else {
        setError(result.error);
      }
    } catch {
      setError("Couldn't remove the file. Please try again.");
    } finally {
      setRemoving(null);
    }
  }

  const summary = [
    files.length ? `${files.length} file${files.length === 1 ? "" : "s"}` : "",
    item.response.trim() ? "note added" : "",
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <li className={`overflow-hidden rounded-2xl border bg-white transition-shadow ${open ? "border-ink/15 shadow-card" : "border-line"}`}>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5"
        >
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-semibold ${
              item.done
                ? "bg-lime text-ink"
                : ready
                  ? "bg-ink text-lime"
                  : "border border-line bg-paper text-muted"
            }`}
          >
            {item.done || ready ? <Check size={16} strokeWidth={2.5} /> : index + 1}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15.5px] font-medium tracking-tight text-ink">{item.label}</span>
            <span className="mt-0.5 block truncate text-[13px] text-muted">{summary || "Not added yet"}</span>
          </span>
          {item.done ? (
            <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-lime-soft px-2.5 py-1 text-xs font-medium text-ink min-[420px]:inline-flex">
              <Check size={12} strokeWidth={2.75} />
              Checked
            </span>
          ) : ready ? (
            <span className="chip hidden shrink-0 min-[420px]:inline-flex">Added</span>
          ) : null}
          <ChevronDown
            size={18}
            className={`shrink-0 text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </h3>

      {open && (
        <div id={panelId} className="border-t border-line px-4 pb-5 pt-4 sm:px-5 sm:pb-6">
          {item.done && (
            <p className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-lime-soft px-3 py-1 text-xs font-medium text-ink">
              <Check size={12} strokeWidth={2.75} />
              Checked — I&apos;ve got what I need for this one.
            </p>
          )}
          {item.hint && <p className="text-[14.5px] leading-relaxed text-muted">{item.hint}</p>}

          {/* Notes */}
          <label htmlFor={`${panelId}-text`} className="mt-5 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            Notes or details
          </label>
          <textarea
            id={`${panelId}-text`}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (saveState === "saved") setSaveState("idle");
            }}
            maxLength={3000}
            rows={3}
            placeholder="Type here — details, links, or anything I should know."
            className="mt-2 block w-full resize-y rounded-2xl border border-line bg-paper/40 px-4 py-3 text-[15px] leading-relaxed text-ink placeholder:text-muted-light focus:border-ink/40 focus:bg-white focus:outline-none focus:ring-4 focus:ring-lime/30"
          />
          <div className="mt-2.5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={save}
              disabled={!dirty || saveState === "saving"}
              className="btn-ink btn-sm disabled:pointer-events-none disabled:opacity-40"
            >
              {saveState === "saving" && <Spinner size={15} />}
              {saveState === "saving" ? "Saving…" : "Save"}
            </button>
            <span aria-live="polite" className="text-[13px] text-muted">
              {saveState === "saved" && !dirty ? (
                <span className="inline-flex items-center gap-1.5 font-medium text-ink">
                  <Check size={14} strokeWidth={2.5} className="text-lime-deep" />
                  Saved
                </span>
              ) : dirty ? (
                "Unsaved changes"
              ) : null}
            </span>
          </div>

          {/* Files */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Files</span>
            <span className="text-xs text-muted">Images, PDF, Word or text · up to 10 MB each</span>
          </div>

          {(files.length > 0 || visibleUploads.length > 0) && (
            <ul className="mt-3 space-y-2">
              {files.map((file) => (
                <li key={file.id} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-2 pr-3">
                  <Thumb file={file} />
                  <div className="min-w-0 flex-1">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block truncate text-sm font-medium text-ink underline-offset-4 hover:underline"
                    >
                      {file.name}
                    </a>
                    <span className="text-xs text-muted">{formatBytes(file.size)}</span>
                  </div>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${file.name}`}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-paper hover:text-ink"
                  >
                    <ArrowUpRight size={16} />
                  </a>
                  {!item.done && (
                    <button
                      type="button"
                      onClick={() => remove(file)}
                      disabled={removing === file.id}
                      aria-label={`Remove ${file.name}`}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-paper hover:text-ink disabled:opacity-50"
                    >
                      {removing === file.id ? <Spinner size={15} /> : <Trash size={16} />}
                    </button>
                  )}
                </li>
              ))}
              {visibleUploads.map((u) => (
                <li
                  key={u.key}
                  className={`flex items-center gap-3 rounded-2xl border p-2 pr-3 ${
                    u.state === "error" ? "border-ink/20 bg-paper" : "border-dashed border-line-strong bg-paper/50"
                  }`}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-muted">
                    {u.state === "uploading" ? (
                      <Spinner size={18} />
                    ) : u.state === "done" ? (
                      <Check size={18} strokeWidth={2.5} className="text-ink" />
                    ) : u.state === "error" ? (
                      <span className="text-base font-semibold text-ink">!</span>
                    ) : (
                      <Upload size={17} />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-ink">{u.name}</span>
                    <span className={`block text-xs ${u.state === "error" ? "text-ink" : "text-muted"}`}>
                      {u.state === "error"
                        ? u.error
                        : u.state === "uploading"
                          ? `Uploading · ${formatBytes(u.size)}`
                          : u.state === "done"
                            ? "Uploaded"
                            : `Waiting · ${formatBytes(u.size)}`}
                    </span>
                  </div>
                  {u.state === "error" && (
                    <button
                      type="button"
                      onClick={() => setUploads((prev) => prev.filter((x) => x.key !== u.key))}
                      className="shrink-0 text-xs font-medium text-muted underline-offset-4 hover:text-ink hover:underline"
                    >
                      Dismiss
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}

          <label
            className={`mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line-strong bg-paper/40 px-4 py-6 text-center transition-colors hover:border-ink/30 hover:bg-paper focus-within:border-ink/40 ${
              busy ? "pointer-events-none opacity-60" : ""
            }`}
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-lime">
              {busy ? <Spinner size={18} /> : <Plus size={18} strokeWidth={2.25} />}
            </span>
            <span className="text-sm font-medium text-ink">{busy ? "Uploading…" : files.length ? "Add more files" : "Add files"}</span>
            <span className="text-xs text-muted">You can pick several at once</span>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept={ACCEPT}
              disabled={busy}
              className="sr-only"
              onChange={(e) => addFiles(e.target.files)}
            />
          </label>

          {error && (
            <p role="alert" className="mt-3 rounded-2xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink">
              {error}
            </p>
          )}
        </div>
      )}
    </li>
  );
}

function Thumb({ file }: { file: FileView }) {
  if (PREVIEWABLE.has(file.contentType)) {
    return (
      // Storage download URLs aren't configured for next/image, and these are tiny previews anyway.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={file.url}
        alt=""
        loading="lazy"
        className="h-11 w-11 shrink-0 rounded-xl border border-line bg-paper object-cover"
      />
    );
  }
  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-paper text-ink">
      <FileText size={18} />
    </span>
  );
}
