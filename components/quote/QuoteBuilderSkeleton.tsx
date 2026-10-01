/** Placeholder shown while the quote builder loads (it reads the URL on the client). */
export default function QuoteBuilderSkeleton() {
  return (
    <div className="card overflow-hidden" aria-busy="true" aria-label="Loading the quote form">
      <div className="bg-ink px-5 py-5 sm:px-8 sm:py-6">
        <div className="h-3 w-24 rounded bg-white/10" />
        <div className="mt-3 h-1.5 rounded-full bg-white/10" />
        <div className="mt-4 hidden h-6 w-2/3 rounded bg-white/[0.06] sm:block" />
      </div>
      <div className="animate-pulse px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
        <div className="h-8 w-56 rounded-lg bg-paper-dim" />
        <div className="mt-3 h-4 w-72 max-w-full rounded bg-paper" />
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-[104px] rounded-2xl border border-line bg-paper/60" />
          ))}
          <div className="h-[84px] rounded-2xl border border-dashed border-line bg-paper/40 sm:col-span-2" />
        </div>
      </div>
      <div className="flex justify-end border-t border-line bg-paper/60 px-5 py-4 sm:px-8 sm:py-5 lg:px-10">
        <div className="h-14 w-full rounded-full bg-paper-dim sm:w-[180px]" />
      </div>
    </div>
  );
}
