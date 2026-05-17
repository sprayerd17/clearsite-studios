'use client';

import { useState } from 'react';

const BUSINESS_TYPES = [
  'Restaurant / Café',
  'Hair Salon / Barbershop',
  'Beauty / Makeup Artist',
  'Cleaning Services',
  'Construction / Renovations',
  'Landscaping / Garden Services',
  'Mechanical / Auto Repair',
  'Health / Physiotherapy / Chiro',
  'Retail / Clothing',
  'Photography / Videography',
  'Accounting / Bookkeeping',
  'Legal / Attorney',
  'Education / Tutoring',
  'Fitness / Personal Training',
  'Real Estate',
  'Other',
];

const CHALLENGES = [
  'Not getting enough new customers',
  'Relying too much on word of mouth',
  'Competitors are getting more business than me',
  "Customers can't find me online",
  'I spend too much time on admin and enquiries',
  "I don't have time to market my business",
  'My business looks less professional than competitors',
  "I can't take orders or bookings after hours",
  'I have no way to showcase my work or products',
  "I'm not sure how to grow my business",
];

const FIND_OPTIONS = [
  'Word of mouth',
  'Social media',
  'Google search',
  'Walk-ins',
  'Flyers / print',
  'Referrals',
  "I'm not sure",
];

export default function ReportForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    businessType: '',
    yearsInBusiness: '',
    hasWebsite: '',
    howCustomersFind: [] as string[],
    challenges: [] as string[],
    biggestGoal: '',
    monthlyRevenue: '',
    extraInfo: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleMulti = (field: 'howCustomersFind' | 'challenges', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(v => v !== value)
        : [...(prev[field] as string[]), value],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to generate report');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-[#0d2b4e] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#7B5EA7] transition-colors text-sm';
  const labelClass = 'block text-white/70 text-sm font-medium mb-2';
  const selectClass =
    'w-full bg-[#0d2b4e] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7B5EA7] transition-colors text-sm cursor-pointer';

  if (submitted) {
    return (
      <div className="text-center py-16 px-4">
        <div className="w-20 h-20 bg-[#7B5EA7]/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-[#7B5EA7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">You&apos;re All Set!</h2>
        <p className="text-white/60 text-lg mb-2">
          Your personalised Business Analysis Report is being generated now.
        </p>
        <p className="text-white/40 text-sm mb-8">
          It will arrive at <span className="text-[#7B5EA7]">{formData.email}</span> within the next 2-3 minutes. Check your spam folder if you don&apos;t see it.
        </p>
        <div className="bg-[#7B5EA7]/10 border border-[#7B5EA7]/30 rounded-2xl p-6 mb-6 text-left">
          <p className="text-white font-semibold mb-2">While you wait — take the next step:</p>
          <p className="text-white/60 text-sm mb-4">
            At ClearSite Studios we offer a <strong className="text-white">free website mockup</strong> before you commit to anything. You tell us what you want, we build it, you see it first — no risk, no obligation.
          </p>
          <a
            href="/get-started"
            className="inline-block bg-[#7B5EA7] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#6a4f96] transition-colors"
          >
            Get Your Free Mockup →
          </a>
        </div>
        <p className="text-white/20 text-xs">
          Visit <a href="/" className="text-[#7B5EA7] hover:underline">clearsitestudios.co.za</a> to see what we build.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-10">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= s ? 'bg-[#7B5EA7] text-white' : 'bg-white/10 text-white/30'
              }`}
            >
              {step > s ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : s}
            </div>
            {s < 3 && (
              <div className={`flex-1 h-0.5 ${step > s ? 'bg-[#7B5EA7]' : 'bg-white/10'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">About Your Business</h2>
            <p className="text-white/40 text-sm">Tell us who you are so we can personalise your report.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Your Name</label>
              <input className={inputClass} placeholder="John Smith" value={formData.name} onChange={e => updateField('name', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Email Address</label>
              <input className={inputClass} type="email" placeholder="john@business.co.za" value={formData.email} onChange={e => updateField('email', e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Business Name</label>
            <input className={inputClass} placeholder="Your Business Name" value={formData.businessName} onChange={e => updateField('businessName', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Business Type</label>
              <select className={selectClass} value={formData.businessType} onChange={e => updateField('businessType', e.target.value)}>
                <option value="">Select your industry</option>
                {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Years in Business</label>
              <select className={selectClass} value={formData.yearsInBusiness} onChange={e => updateField('yearsInBusiness', e.target.value)}>
                <option value="">Select</option>
                <option>Less than 1 year</option>
                <option>1-2 years</option>
                <option>3-5 years</option>
                <option>5-10 years</option>
                <option>10+ years</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Do you currently have a website?</label>
            <div className="flex gap-3">
              {['Yes', 'No', 'I have a social media page only'].map(opt => (
                <button
                  key={opt}
                  onClick={() => updateField('hasWebsite', opt)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                    formData.hasWebsite === opt
                      ? 'bg-[#7B5EA7] border-[#7B5EA7] text-white'
                      : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={!formData.name || !formData.email || !formData.businessName || !formData.businessType || !formData.hasWebsite}
            className="w-full py-3.5 rounded-xl bg-[#7B5EA7] text-white font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#6a4f96] transition-all duration-200 hover:shadow-[0_0_24px_rgba(124,58,237,0.5)] hover:scale-[1.01]"
          >
            Continue →
          </button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Your Challenges</h2>
            <p className="text-white/40 text-sm">Select everything that applies to your business right now.</p>
          </div>

          <div>
            <label className={labelClass}>How do customers currently find you? (select all that apply)</label>
            <div className="flex flex-wrap gap-2">
              {FIND_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => toggleMulti('howCustomersFind', opt)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                    formData.howCustomersFind.includes(opt)
                      ? 'bg-[#7B5EA7] border-[#7B5EA7] text-white'
                      : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>What challenges are you facing? (select all that apply)</label>
            <div className="space-y-2">
              {CHALLENGES.map(challenge => (
                <button
                  key={challenge}
                  onClick={() => toggleMulti('challenges', challenge)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all border flex items-center gap-3 ${
                    formData.challenges.includes(challenge)
                      ? 'bg-[#7B5EA7]/20 border-[#7B5EA7] text-white'
                      : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                  }`}
                >
                  <div className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border transition-all ${
                    formData.challenges.includes(challenge) ? 'bg-[#7B5EA7] border-[#7B5EA7]' : 'border-white/20'
                  }`}>
                    {formData.challenges.includes(challenge) && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  {challenge}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-xl border border-white/10 text-white/60 text-sm font-medium hover:border-white/20 transition-colors">← Back</button>
            <button
              onClick={() => setStep(3)}
              disabled={formData.challenges.length === 0}
              className="flex-1 py-3.5 rounded-xl bg-[#7B5EA7] text-white font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#6a4f96] transition-all duration-200 hover:shadow-[0_0_24px_rgba(124,58,237,0.5)] hover:scale-[1.01]"
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Your Goals</h2>
            <p className="text-white/40 text-sm">Last step — help us understand where you want to go.</p>
          </div>
          <div>
            <label className={labelClass}>What is your biggest goal for your business right now?</label>
            <div className="grid grid-cols-2 gap-2">
              {['Get more customers', 'Look more professional', 'Increase revenue', 'Spend less time on admin', 'Grow my online presence', 'Beat my competitors'].map(goal => (
                <button
                  key={goal}
                  onClick={() => updateField('biggestGoal', goal)}
                  className={`py-3 px-4 rounded-xl text-sm transition-all border text-left ${
                    formData.biggestGoal === goal
                      ? 'bg-[#7B5EA7]/20 border-[#7B5EA7] text-white'
                      : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={labelClass}>Approximate monthly revenue</label>
            <select className={selectClass} value={formData.monthlyRevenue} onChange={e => updateField('monthlyRevenue', e.target.value)}>
              <option value="">Select range</option>
              <option>Less than R5,000</option>
              <option>R5,000 – R15,000</option>
              <option>R15,000 – R50,000</option>
              <option>R50,000 – R150,000</option>
              <option>R150,000+</option>
              <option>Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Anything else you would like us to know? (optional)</label>
            <textarea className={inputClass + ' resize-none h-24'} placeholder="Any extra context about your business or situation..." value={formData.extraInfo} onChange={e => updateField('extraInfo', e.target.value)} />
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-xl border border-white/10 text-white/60 text-sm font-medium hover:border-white/20 transition-colors">← Back</button>
            <button
              onClick={handleSubmit}
              disabled={loading || !formData.biggestGoal || !formData.monthlyRevenue}
              className="flex-1 py-3.5 rounded-xl bg-[#7B5EA7] text-white font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#6a4f96] transition-all duration-200 hover:shadow-[0_0_24px_rgba(124,58,237,0.5)] hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Generating Your Report...
                </>
              ) : 'Get My Free Report →'}
            </button>
          </div>
          <p className="text-center text-white/20 text-xs">
            Your report will be emailed to {formData.email} within 2 minutes. No spam, ever.
          </p>
        </div>
      )}
    </div>
  );
}
