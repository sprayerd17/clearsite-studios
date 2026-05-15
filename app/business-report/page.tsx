import ReportForm from '@/components/ReportForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Business Analysis Report | ClearSite Studios',
  description:
    'Get a personalised business analysis report showing exactly how to solve your biggest business challenges. Free, instant, and tailored to your industry.',
};

export default function BusinessReportPage() {
  return (
    <main className="min-h-screen bg-[#0d2b4e] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7B5EA7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#7B5EA7]/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <a href="/" className="inline-flex items-center gap-2 mb-8 opacity-60 hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-white text-sm">Back to ClearSite Studios</span>
          </a>

          <div className="inline-flex items-center gap-2 bg-[#7B5EA7]/20 border border-[#7B5EA7]/30 rounded-full px-4 py-1.5 mb-6">
            <div className="w-1.5 h-1.5 bg-[#7B5EA7] rounded-full animate-pulse" />
            <span className="text-[#7B5EA7] text-xs font-medium tracking-wide uppercase">Free · Personalised · Instant</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Get Your Free<br />
            <span className="text-[#7B5EA7]">Business Analysis Report</span>
          </h1>

          <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            Answer 10 quick questions and receive a personalised report showing exactly
            what's holding your business back — and how to fix it.
          </p>

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-8 mt-8">
            {[
              { icon: '📊', label: 'Personalised to your business' },
              { icon: '⚡', label: 'Delivered in under 2 minutes' },
              { icon: '🔒', label: 'No spam, ever' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="text-base">{item.icon}</span>
                <span className="text-white/30 text-xs">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <ReportForm />
        </div>

        {/* Footer note */}
        <p className="text-center text-white/20 text-xs mt-8">
          Powered by ClearSite Studios · clearsitestudios.co.za · Clear by design.
        </p>
      </div>
    </main>
  );
}
