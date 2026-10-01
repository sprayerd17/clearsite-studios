/* eslint-disable @next/next/no-img-element -- uploaded files are served from Firebase Storage download URLs */
import { FileText } from "@/components/icons";
import type { UploadedFile } from "@/lib/quote/types";
import { fileSize, isImage, shortDate } from "../format";
import { ExternalLinkIcon } from "../icons";

/** Uploaded files: images as thumbnails, everything else as tappable rows. */
export function FileList({ files, empty }: { files: (UploadedFile & { kind?: string })[]; empty?: string }) {
  if (files.length === 0) return empty ? <p className="text-sm text-muted">{empty}</p> : null;
  const images = files.filter((f) => isImage(f.contentType, f.name));
  const others = files.filter((f) => !isImage(f.contentType, f.name));

  return (
    <div className="space-y-2.5">
      {images.length > 0 && (
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {images.map((f) => (
            <li key={f.id}>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-xl border border-line bg-paper"
                title={`${f.name} · ${fileSize(f.size)}`}
              >
                <img src={f.url} alt={f.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-ink/80 to-transparent px-2 pb-1.5 pt-5 text-[10px] font-medium text-white">
                  {f.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
      {others.length > 0 && (
        <ul className="space-y-2">
          {others.map((f) => (
            <li key={f.id}>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-2.5 transition-colors hover:border-line-strong"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-paper text-muted">
                  <FileText size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink">{f.name}</span>
                  <span className="block text-xs text-muted">
                    {[fileSize(f.size), shortDate(f.uploadedAt)].filter(Boolean).join(" · ")}
                  </span>
                </span>
                <ExternalLinkIcon size={16} className="shrink-0 text-muted-light" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
