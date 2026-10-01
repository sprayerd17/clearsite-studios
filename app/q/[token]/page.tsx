import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  Check,
  Clock,
  Code,
  FileText,
  Key,
  MessageCircle,
  Plus,
  WhatsApp,
  Zap,
} from "@/components/icons";
import AcceptQuote from "@/components/project/AcceptQuote";
import AutoRefresh from "@/components/project/AutoRefresh";
import { BriefList, ContactList } from "@/components/project/BriefList";
import {
  availableDocs,
  bankRows,
  docHref,
  docInfo,
  isItemReady,
  onboardingViews,
  plainAmount,
  proofViews,
  type DocKind,
} from "@/components/project/helpers";
import NewRequestBanner from "@/components/project/NewRequestBanner";
import Onboarding from "@/components/project/Onboarding";
import PaymentPanel from "@/components/project/PaymentPanel";
import ProjectAside, { type AsideDoc } from "@/components/project/ProjectAside";
import ProjectHero from "@/components/project/ProjectHero";
import QuoteLines from "@/components/project/QuoteLines";
import { CheckRow, Label, SectionCard } from "@/components/project/ui";
import { isFirebaseConfigured } from "@/lib/firebase/admin";
import { formatDate, invoiceNumber, quoteExpiresAt, totals, type Totals } from "@/lib/quote/leads";
import { formatRand } from "@/lib/quote/money";
import { firstName, waLink } from "@/lib/quote/phone";
import type { Settings } from "@/lib/quote/types";
import { getLeadByToken, getSettings, toPublicLead, type PublicLead } from "@/lib/server/public";
import { SUPPORT_WINDOW } from "@/lib/site";

type Props = {
  params: Promise<{ token: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  if (!isFirebaseConfigured()) return { title: { absolute: "Your project · ClearSite Studios" } };
  const [lead, settings] = await Promise.all([getLeadByToken(token), getSettings()]);
  return {
    title: { absolute: lead ? `Project #${lead.number} · ${settings.businessName}` : settings.businessName },
  };
}

/** Everything the status sections need. Only client-safe data (PublicLead) from here on. */
interface View {
  token: string;
  lead: PublicLead;
  settings: Settings;
  t: Totals;
  greetingName: string;
  contactFirst: string;
  whatsappHref: string;
  startedOn: string;
}

export default async function ProjectPage({ params, searchParams }: Props) {
  if (!isFirebaseConfigured()) notFound();
  const [{ token }, query] = await Promise.all([params, searchParams]);
  const [found, settings] = await Promise.all([getLeadByToken(token), getSettings()]);
  if (!found) notFound();

  // Private notes and the event history stop here.
  const lead = toPublicLead(found);
  const t = totals(lead);
  const contactFirst = firstName(settings.contactName) || settings.contactName;
  const view: View = {
    token,
    lead,
    settings,
    t,
    greetingName: firstName(lead.contact.name) || "there",
    contactFirst,
    whatsappHref: waLink(
      settings.phone,
      `Hi ${settings.contactName.split(" ")[0]}, it's ${lead.contact.name} about project #${lead.number}.`,
    ),
    startedOn: formatDate(lead.createdAt),
  };

  const available = availableDocs(lead);
  const docs: AsideDoc[] = [];
  if (available.quote) {
    docs.push({
      href: docHref(token, "quote"),
      label: docInfo(lead, "quote").linkLabel,
      detail: `${formatRand(t.total)}${lead.quote.sentAt ? ` · sent ${formatDate(lead.quote.sentAt)}` : ""}`,
    });
  }
  if (available.deposit) {
    docs.push({
      href: docHref(token, "deposit"),
      label: docInfo(lead, "deposit").linkLabel,
      detail: `${formatRand(t.deposit)} · ${t.paidDeposit >= t.deposit ? "paid" : "due"}`,
    });
  }
  if (available.balance) {
    docs.push({
      href: docHref(token, "balance"),
      label: docInfo(lead, "balance").linkLabel,
      detail: `${formatRand(Math.max(0, t.total - t.paidDeposit))} · ${t.outstanding === 0 ? "paid" : "due"}`,
    });
  }

  const showNewBanner = query.new === "1";

  return (
    <div className="min-h-screen bg-paper">
      <AutoRefresh />
      <ProjectHero
        status={lead.status}
        greetingName={view.greetingName}
        number={lead.number}
        business={lead.contact.business}
        startedOn={view.startedOn}
        whatsappHref={view.whatsappHref}
      />

      <main className="container-site py-8 sm:py-12">
        {showNewBanner && (
          <div className="mb-6">
            <NewRequestBanner />
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
          <div className="min-w-0 space-y-6">
            <StatusSections view={view} docs={available} />
          </div>
          <ProjectAside
            number={lead.number}
            status={lead.status}
            startedOn={view.startedOn}
            totals={t}
            showMoney={available.quote}
            docs={docs}
            contactFirst={contactFirst}
            email={settings.email}
            whatsappHref={view.whatsappHref}
          />
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="container-site flex flex-col gap-2 pb-28 pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:pb-10">
          <span>
            © {new Date().getFullYear()} {settings.businessName}
            {settings.website ? ` · ${settings.website}` : ""}
          </span>
          <span>This page is private to you — please don&apos;t share the link.</span>
        </div>
      </footer>
    </div>
  );
}

function StatusSections({ view, docs }: { view: View; docs: Record<DocKind, boolean> }) {
  switch (view.lead.status) {
    case "new":
      return <NewRequest view={view} />;
    case "quoted":
      return <Quoted view={view} />;
    case "accepted":
      return <Accepted view={view} />;
    case "building":
      return <Building view={view} />;
    case "launched":
      return <Launched view={view} />;
    case "complete":
      return <Complete view={view} docs={docs} />;
    case "closed":
      return <Closed view={view} />;
    default:
      return null;
  }
}

/* ─── new ─────────────────────────────────────────────────────────────── */

function NewRequest({ view }: { view: View }) {
  const { lead, settings } = view;
  return (
    <>
      <SectionCard
        icon={Clock}
        label="Quote in progress"
        title={
          <>
            I&apos;m putting your quote <span className="serif-accent">together.</span>
          </>
        }
      >
        <p className="prose-muted mt-3 max-w-xl text-[15px]">
          Thanks, {view.greetingName}. I&apos;m going through your brief and will send you a fixed quote — usually
          within 1 business day. It&apos;ll appear right here on this page, and I&apos;ll send you a WhatsApp when
          it&apos;s ready.
        </p>
        <ol className="mt-6 divide-y divide-line border-y border-line">
          <CheckRow state="done" title="Request received" detail={view.startedOn} />
          <CheckRow state="current" title="Your quote" detail="Itemised and fixed — everything included, no surprises later." />
          <CheckRow
            state="todo"
            title={`Accept and pay a ${settings.depositPercent}% deposit`}
            detail="Then you send me your content and I start building."
          />
          <CheckRow state="todo" title="Launch and handover" detail="The balance is due once it's live and in your name." />
        </ol>
      </SectionCard>

      <section className="card p-6 sm:p-8">
        <Label>Your brief</Label>
        <h2 className="mt-4 text-xl tracking-tight text-ink">What you asked for</h2>
        <div className="mt-5">
          <BriefList brief={lead.brief} />
        </div>
        <h3 className="mt-8 text-[15px] font-semibold tracking-tight text-ink">Your details</h3>
        <div className="mt-3">
          <ContactList contact={lead.contact} />
        </div>
        <p className="mt-5 text-sm text-muted">
          Something wrong or missing?{" "}
          <a
            href={view.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
          >
            Let me know on WhatsApp
          </a>
          .
        </p>
      </section>
    </>
  );
}

/* ─── quoted ──────────────────────────────────────────────────────────── */

function Quoted({ view }: { view: View }) {
  const { lead, settings, t, token } = view;
  const expires = quoteExpiresAt(lead.quote);
  const expired = expires !== null && expires < Date.now();

  return (
    <>
      <SectionCard
        icon={FileText}
        label={`Quote #${lead.number}`}
        aside={
          expires !== null && (
            <span className="chip">
              <Clock size={12} />
              {expired ? `Was valid until ${formatDate(expires)}` : `Valid until ${formatDate(expires)}`}
            </span>
          )
        }
        title={
          <>
            Here&apos;s what I&apos;ll <span className="serif-accent">build.</span>
          </>
        }
      >
        <p className="prose-muted mt-3 max-w-xl text-[15px]">
          A fixed price for everything below. Have a look — if it all makes sense, accept it to lock in your spot.
        </p>

        <div className="mt-8">
          <QuoteLines items={lead.quote.items} total={t.total} deposit={t.deposit} depositPercent={lead.quote.depositPercent} />
        </div>

        {lead.quote.notes.trim() && (
          <div className="mt-8">
            <Label>Notes</Label>
            <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-ink/85">{lead.quote.notes.trim()}</p>
          </div>
        )}
        {settings.quoteTerms.trim() && (
          <div className="mt-6">
            <Label>Terms</Label>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted">{settings.quoteTerms.trim()}</p>
          </div>
        )}

        {expired && expires !== null && (
          <p className="mt-6 rounded-2xl border border-line bg-paper px-4 py-3 text-sm leading-relaxed text-ink">
            This quote was valid until {formatDate(expires)}. You can still accept it — or message me first if anything
            has changed on your side.
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:flex-wrap sm:items-start">
          <AcceptQuote token={token} version={lead.quote.version} />
          <a href={docHref(token, "quote")} className="btn-ghost btn-lg">
            <FileText size={17} />
            View / save quote (PDF)
          </a>
        </div>
        <a
          href={view.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="link-arrow mt-5 text-ink hover:text-muted"
        >
          <WhatsApp size={15} className="text-[#25d366]" />
          Questions? WhatsApp me
          <ArrowUpRight size={15} />
        </a>
        <p className="mt-4 max-w-xl text-xs leading-relaxed text-muted">
          Accepting confirms the scope and terms above. Nothing is charged automatically — your deposit invoice and
          banking details appear on this page next.
        </p>
      </SectionCard>

      <details className="card group p-6 sm:p-8">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
          <span>
            <Label>Your brief</Label>
            <span className="mt-2 block text-lg font-medium tracking-tight text-ink">What you asked for</span>
          </span>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line bg-white text-ink transition-transform duration-300 group-open:rotate-45">
            <Plus size={15} strokeWidth={2} />
          </span>
        </summary>
        <div className="mt-6">
          <BriefList brief={lead.brief} />
        </div>
      </details>
    </>
  );
}

/* ─── accepted ────────────────────────────────────────────────────────── */

function Accepted({ view }: { view: View }) {
  const { lead, t, token } = view;
  const accepted = lead.quote.acceptedAt ? `You accepted the quote on ${formatDate(lead.quote.acceptedAt)}. ` : "";
  return (
    <>
      {t.dueNow > 0 ? (
        <Payment
          view={view}
          kind="deposit"
          title="Deposit due"
          intro={`${accepted}The ${lead.quote.depositPercent}% deposit on your ${formatRand(t.total)} project secures your spot — once it reflects, I'll start the build.`}
        />
      ) : (
        <SectionCard
          icon={Check}
          label="Deposit"
          title={
            <>
              Deposit <span className="serif-accent">received.</span>
            </>
          }
        >
          <p className="prose-muted mt-3 max-w-xl text-[15px]">
            Thank you! I&apos;ll confirm the start date with you on WhatsApp.
          </p>
        </SectionCard>
      )}
      <Onboarding token={token} items={onboardingViews(lead.onboarding)} whatsappHref={view.whatsappHref} />
    </>
  );
}

/* ─── building ────────────────────────────────────────────────────────── */

function Building({ view }: { view: View }) {
  const { lead, t, token } = view;
  const total = lead.onboarding.length;
  const ready = lead.onboarding.filter(isItemReady).length;
  const allReady = total > 0 && ready === total;

  return (
    <>
      <SectionCard
        icon={Code}
        label="In build"
        title={
          <>
            We&apos;re <span className="serif-accent">building.</span>
          </>
        }
      >
        <p className="prose-muted mt-3 max-w-xl text-[15px]">
          Your deposit is in and the build is under way. I&apos;ll send you a preview link on WhatsApp so you can give
          feedback before anything goes live.
        </p>
        <ol className="mt-6 divide-y divide-line border-y border-line">
          <CheckRow
            state="done"
            title="Quote accepted"
            detail={lead.quote.acceptedAt ? formatDate(lead.quote.acceptedAt) : undefined}
          />
          <CheckRow
            state="done"
            title="Deposit received"
            detail={t.paidDeposit > 0 ? `${formatRand(t.paidDeposit)} — thank you` : "Thank you"}
          />
          {total > 0 && (
            <CheckRow
              state={allReady ? "done" : "current"}
              title="Your content"
              detail={allReady ? `All ${total} items ready` : `${ready} of ${total} ready — keep adding below`}
            />
          )}
          <CheckRow state="current" title="Build and preview" detail="You'll get a preview link to check before launch." />
          <CheckRow
            state="todo"
            title="Launch and handover"
            detail={
              t.outstanding > 0 ? `The ${formatRand(t.outstanding)} balance is due once it's live.` : "Everything goes live in your name."
            }
          />
        </ol>
      </SectionCard>
      <Onboarding token={token} items={onboardingViews(lead.onboarding)} whatsappHref={view.whatsappHref} />
    </>
  );
}

/* ─── launched ────────────────────────────────────────────────────────── */

function Launched({ view }: { view: View }) {
  const { lead, t } = view;
  return (
    <>
      <section className="grain relative overflow-hidden rounded-3xl bg-ink p-6 text-white shadow-lift sm:p-8">
        <div aria-hidden="true" className="bg-grid-dark mask-radial pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(198,242,78,0.25), transparent)" }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-lime text-ink shadow-glow">
              <Zap size={19} />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
              {lead.launchedAt ? `Launched ${formatDate(lead.launchedAt)}` : "Launched"}
            </span>
          </div>
          <h2 className="mt-6 text-[30px] leading-[1.05] tracking-tight text-white sm:text-4xl">
            You&apos;re <span className="serif-accent text-lime">live.</span>
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/60">
            Thank you for trusting me with it, {view.greetingName}. Have a proper look around, share it with your
            customers — and send me anything you&apos;d like tweaked.
          </p>
        </div>
      </section>

      {t.dueNow > 0 ? (
        <Payment
          view={view}
          kind="balance"
          title="Balance due"
          intro={`The final amount on your ${formatRand(t.total)} project${t.paidDeposit > 0 ? `, after the ${formatRand(t.paidDeposit)} deposit` : ""}. Once it's settled, the handover is complete.`}
        />
      ) : (
        <SectionCard
          icon={Check}
          label="Balance"
          title={
            <>
              Balance <span className="serif-accent">received.</span>
            </>
          }
        >
          <p className="prose-muted mt-3 max-w-xl text-[15px]">Thank you — you&apos;re all paid up.</p>
        </SectionCard>
      )}

      <Handover />
    </>
  );
}

function Handover() {
  return (
    <SectionCard
      icon={Key}
      label="Handover"
      title={
        <>
          Yours, <span className="serif-accent">outright.</span>
        </>
      }
    >
      <p className="prose-muted mt-3 max-w-xl text-[15px]">
        Everything is in your name — hosting account, credentials and code. No licence, no monthly fee to me, and
        nothing left depending on me.
      </p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {["Hosting account in your name", "Logins handed over", "Code and content are yours"].map((p) => (
          <li key={p} className="chip">
            <Check size={12} strokeWidth={2.5} className="text-ink" />
            {p}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted">I&apos;m here for questions for {SUPPORT_WINDOW} after launch.</p>
    </SectionCard>
  );
}

/* ─── complete ────────────────────────────────────────────────────────── */

function Complete({ view, docs }: { view: View; docs: Record<DocKind, boolean> }) {
  const { lead, t, token } = view;
  const payments = [...lead.payments].sort((a, b) => a.at - b.at);
  const links: { kind: DocKind; label: string }[] = [
    { kind: "quote", label: "Quote" },
    { kind: "deposit", label: "Deposit invoice" },
    { kind: "balance", label: "Final invoice" },
  ];

  return (
    <SectionCard
      icon={Check}
      label="Complete"
      title={
        <>
          All done — <span className="serif-accent">it&apos;s yours.</span>
        </>
      }
    >
      <p className="prose-muted mt-3 max-w-xl text-[15px]">
        Paid in full and handed over. Thank you for working with me, {view.greetingName}. Everything is in your name —
        hosting account, credentials and code.
      </p>

      <dl className="mt-8 rounded-2xl border border-line bg-paper/70 p-5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Project total</dt>
          <dd className="font-medium tabular-nums text-ink">{formatRand(t.total)}</dd>
        </div>
        {payments.map((p) => (
          <div key={p.id} className="mt-1.5 flex justify-between gap-4">
            <dt className="text-muted">
              {p.kind === "deposit" ? "Deposit" : "Balance"} · {formatDate(p.at)}
            </dt>
            <dd className="tabular-nums text-ink">{formatRand(p.amount)}</dd>
          </div>
        ))}
        <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-4">
          <dt className="font-medium text-ink">Total paid</dt>
          <dd className="text-2xl font-semibold tracking-tight tabular-nums text-ink">{formatRand(t.paid)}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-2">
        {links
          .filter((l) => docs[l.kind])
          .map((l) => (
            <a key={l.kind} href={docHref(token, l.kind)} className="btn-ghost btn-sm">
              <FileText size={15} />
              {l.label}
            </a>
          ))}
      </div>

      <p className="mt-8 border-t border-line pt-6 text-sm text-muted">
        Need changes later, or ready for what&apos;s next?{" "}
        <a
          href={view.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
        >
          Message me
        </a>{" "}
        and I&apos;ll quote it.
      </p>
    </SectionCard>
  );
}

/* ─── closed ──────────────────────────────────────────────────────────── */

function Closed({ view }: { view: View }) {
  return (
    <SectionCard icon={MessageCircle} label="Closed" title="This project is closed">
      <p className="prose-muted mt-3 max-w-xl text-[15px]">
        This project didn&apos;t go ahead, or has been closed. If you think that&apos;s a mistake, or you&apos;d like to
        pick it up again, just send me a message — I&apos;m happy to help.
      </p>
      <a href={view.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-ink mt-6">
        <WhatsApp size={16} />
        Message {view.contactFirst}
      </a>
    </SectionCard>
  );
}

/* ─── payment ─────────────────────────────────────────────────────────── */

function Payment({
  view,
  kind,
  title,
  intro,
}: {
  view: View;
  kind: "deposit" | "balance";
  title: string;
  intro: string;
}) {
  const { lead, settings, t, token } = view;
  return (
    <PaymentPanel
      token={token}
      title={title}
      intro={intro}
      amountDue={formatRand(t.dueNow)}
      amountPlain={plainAmount(t.dueNow)}
      invoiceNumber={invoiceNumber(lead, kind)}
      invoiceHref={docHref(token, kind)}
      reference={`#${lead.number}`}
      bank={bankRows(settings)}
      proofs={proofViews(lead.proofOfPayment, kind)}
      whatsappHref={view.whatsappHref}
    />
  );
}
