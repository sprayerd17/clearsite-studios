import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import nodemailer from 'nodemailer';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface FormData {
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  yearsInBusiness: string;
  hasWebsite: string;
  howCustomersFind: string;
  challenges: string[];
  biggestGoal: string;
  monthlyRevenue: string;
  extraInfo: string;
}

async function generateReport(data: FormData): Promise<string> {
  const prompt = `You are a senior business growth consultant writing a personalised Business Analysis Report for a South African small business owner. Your tone is professional, warm, direct and authoritative — like McKinsey meets a trusted local advisor.

BUSINESS DETAILS:
- Owner: ${data.name}
- Business: ${data.businessName}
- Industry: ${data.businessType}
- Years operating: ${data.yearsInBusiness}
- Has website: ${data.hasWebsite}
- How customers find them: ${data.howCustomersFind}
- Monthly revenue range: ${data.monthlyRevenue}
- Biggest goal: ${data.biggestGoal}
- Current challenges: ${data.challenges.join(', ')}
- Additional context: ${data.extraInfo || 'None provided'}

Write a comprehensive Business Analysis Report in HTML format. The report must:

1. Feel completely personalised — use their name, business name and industry throughout
2. Diagnose each challenge they selected with real insight — explain WHY it's happening, not just that it exists
3. For each challenge, provide a specific, actionable recommendation. Every recommendation should naturally lead toward having a strong online presence and professional website — but do NOT be obvious or salesy about this. Frame it as expert advice, not a pitch.
4. Include real South African statistics and context where relevant (e.g. "75% of South African consumers research businesses online before making contact")
5. Include a "Business Health Score" out of 100 based on their answers — calculated from: years in business, revenue range, whether they have a website, how customers find them, and number of challenges selected. Be realistic but encouraging.
6. End with an "Action Plan" section that prioritises their top 3 recommended actions. The #1 action should always be establishing or improving their online presence, framed as the highest-leverage move for their specific situation.
7. The very last section should be a soft, professional close from ClearSite Studios — positioned as the logical next step, mentioning the free website mockup offer. Keep this section brief and NOT salesy. One short paragraph maximum.

FORMAT THE HTML as follows — clean, professional, email-safe HTML using inline styles only (no external CSS, no Tailwind classes):
- Use a max-width of 680px centered
- Background: #ffffff
- Font: Arial, sans-serif
- Navy headings: #0d2b4e  
- Purple accents: #7B5EA7
- Body text: #333333
- Light grey sections: #f8f8f8
- Include a professional header with "ClearSite Studios" and "Business Analysis Report" and the date
- Include a cover section with their name and business name personalised
- Use clear section dividers
- Make the Business Health Score visually prominent — display it as a large number with a colour-coded label (0-49: red "Needs Attention", 50-74: orange "Growing", 75-89: green "Strong", 90-100: purple "Excellent")
- Keep the report thorough but scannable — use short paragraphs, bullet points where appropriate
- Professional footer with ClearSite Studios contact details: clearsitestudios.co.za | clearsitestudios@outlook.com

Return ONLY the complete HTML document. No markdown, no explanation, no code fences.`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  return (response.content[0] as { type: string; text: string }).text;
}

async function sendEmail(to: string, name: string, businessName: string, htmlReport: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"ClearSite Studios" <${process.env.SMTP_USER}>`,
    to,
    subject: `${businessName} — Your Free Business Analysis Report`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; color: #333;">
        <div style="background: #0d2b4e; padding: 24px 32px; border-radius: 8px 8px 0 0;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px;">ClearSite Studios</h2>
          <p style="color: rgba(255,255,255,0.5); margin: 4px 0 0; font-size: 13px;">Your Business Analysis Report is ready</p>
        </div>
        <div style="background: #f8f8f8; padding: 24px 32px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">
          <p style="margin: 0 0 16px;">Hi ${name},</p>
          <p style="margin: 0 0 16px; line-height: 1.6;">
            Thank you for completing the ClearSite Studios Business Analysis. Your personalised report is attached below — it covers your current business challenges, a tailored action plan, and your Business Health Score.
          </p>
          <p style="margin: 0 0 24px; line-height: 1.6; color: #666;">
            Read through it at your own pace. If anything resonates and you'd like to chat about how a professional website could help, we offer a <strong>free mockup</strong> before you commit to anything.
          </p>
          <a href="https://clearsitestudios.co.za" style="display: inline-block; background: #7B5EA7; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">Visit ClearSite Studios →</a>
          <p style="margin: 24px 0 0; color: #999; font-size: 12px;">
            Divan Bosman · ClearSite Studios · clearsitestudios.co.za · Clear by design.
          </p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: `${businessName.replace(/[^a-z0-9]/gi, '_')}_Business_Report.html`,
        content: htmlReport,
        contentType: 'text/html',
      },
    ],
  });
}

export async function POST(req: NextRequest) {
  try {
    const data: FormData = await req.json();

    // Basic validation
    if (!data.email || !data.name || !data.businessName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate the report
    const htmlReport = await generateReport(data);

    // Send the email
    await sendEmail(data.email, data.name, data.businessName, htmlReport);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Report generation error:', err);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
