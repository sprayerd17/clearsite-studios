import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@/components/icons";
import { availableDocs, docInfo, parseDocKind } from "@/components/project/helpers";
import PrintButton from "@/components/project/PrintButton";
import ProjectDocument from "@/components/project/ProjectDocument";
import { isFirebaseConfigured } from "@/lib/firebase/admin";
import { getLeadByToken, getSettings, toPublicLead } from "@/lib/server/public";

type Props = {
  params: Promise<{ token: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** Loads the lead and checks the requested document exists yet; null otherwise. */
async function load(props: Props) {
  if (!isFirebaseConfigured()) return null;
  const [{ token }, { type }] = await Promise.all([props.params, props.searchParams]);
  const kind = parseDocKind(type);
  if (!kind) return null;
  const [found, settings] = await Promise.all([getLeadByToken(token), getSettings()]);
  if (!found) return null;
  const lead = toPublicLead(found);
  if (!availableDocs(lead)[kind]) return null;
  return { token, kind, lead, settings };
}

// The title becomes the file name when the client saves the page as a PDF,
// e.g. "Quote 1042 - Thabo's Plumbing".
export async function generateMetadata(props: Props): Promise<Metadata> {
  const data = await load(props);
  if (!data) return { title: { absolute: "Document · ClearSite Studios" } };
  return { title: { absolute: docInfo(data.lead, data.kind).fileName } };
}

// A4 page, and only the sheet itself on paper: the toolbar, the floating
// WhatsApp button and the cookie banner are left off the print.
const PRINT_CSS = `
@page { size: A4; margin: 14mm 14mm 16mm; }
@media print {
  html, body { background: #fff !important; }
  .fixed { display: none !important; }
  .doc-sheet, .doc-sheet * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .doc-sheet tr { break-inside: avoid; }
}
`;

export default async function DocumentPage(props: Props) {
  const data = await load(props);
  if (!data) notFound();
  const { token, kind, lead, settings } = data;

  return (
    <div className="min-h-screen bg-paper-dim print:min-h-0 print:bg-white">
      <style>{PRINT_CSS}</style>

      <div className="sticky top-0 z-20 border-b border-line bg-white/85 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-[210mm] items-center justify-between gap-3 px-4 py-3">
          <Link href={`/q/${token}`} className="btn-ghost btn-sm">
            <ArrowLeft size={15} />
            <span className="hidden min-[400px]:inline">Back to project</span>
            <span className="min-[400px]:hidden">Back</span>
          </Link>
          <PrintButton />
        </div>
      </div>

      <div className="px-3 pb-28 pt-6 sm:px-6 sm:pb-16 sm:pt-10 print:p-0">
        <ProjectDocument lead={lead} settings={settings} kind={kind} />
        <p className="mx-auto mt-5 max-w-[210mm] text-center text-xs text-muted print:hidden">
          To download a copy, tap <span className="font-medium text-ink">Save as PDF / Print</span>
          {" and choose “Save as PDF” as the printer."}
        </p>
      </div>
    </div>
  );
}
