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
  howCustomersFind: string[];
  challenges: string[];
  biggestGoal: string;
  monthlyRevenue: string;
  extraInfo: string;
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

async function generateReport(data: FormData): Promise<string> {
  const prompt = `You are a senior business growth consultant writing a personalised Business Analysis Report for a South African small business owner. Your tone is professional, warm, direct and authoritative — like McKinsey meets a trusted local advisor.

BUSINESS DETAILS:
- Owner: ${data.name}
- Business: ${data.businessName}
- Industry: ${data.businessType}
- Years operating: ${data.yearsInBusiness}
- Has website: ${data.hasWebsite}
- How customers find them: ${data.howCustomersFind.join(', ')}
- Monthly revenue range: ${data.monthlyRevenue}
- Biggest goal: ${data.biggestGoal}
- Current challenges: ${data.challenges.join(', ')}
- Additional context: ${data.extraInfo || 'None provided'}

Write a comprehensive Business Analysis Report in HTML format. The report must:

1. Feel completely personalised — use their name, business name and industry throughout
2. Diagnose EVERY challenge they selected with real insight — explain WHY it is happening, not just that it exists. Number each challenge clearly as "Challenge 1:", "Challenge 2:", etc. and address ALL of them — do not stop after the first one.
3. For each challenge, provide a specific, actionable recommendation. Every recommendation should naturally lead toward having a strong online presence and professional website — but do NOT be obvious or salesy about this. Frame it as expert advice, not a pitch.
4. Include real South African statistics and context where relevant (e.g. "75% of South African consumers research businesses online before making contact")
5. Include a "Business Health Score" out of 100 based on their answers — calculated from: years in business, revenue range, whether they have a website, how customers find them, and number of challenges selected. Be realistic but encouraging.
6. End with an "Action Plan" section that prioritises their top 3 recommended actions. The number 1 action should always be establishing or improving their online presence, framed as the highest-leverage move for their specific situation.
7. The very last section must be a clear, specific, compelling call to action from ClearSite Studios. It must:
   - Tell them exactly what to do next: visit clearsitestudios.co.za or WhatsApp +27 60 397 9279
   - Mention the FREE website mockup offer — no commitment, no risk, they see it before they pay anything
   - Be warm and professional, not salesy
   - Include a visually prominent button styled in purple (#7B5EA7) that says "Claim Your Free Mockup" linking to https://clearsitestudios.co.za/get-started

DO NOT include any date anywhere in the report.

FORMAT THE HTML as follows — clean, professional, email-safe HTML using inline styles only (no external CSS, no Tailwind classes):
- Use a max-width of 680px centered
- Background: #ffffff
- Font: Arial, sans-serif
- Navy headings: #0d2b4e
- Purple accents: #7B5EA7
- Body text: #333333
- Light grey sections: #f8f8f8
- Include a professional header with "ClearSite Studios" and "Business Analysis Report" — NO DATE
- Include a cover section with their name and business name personalised
- Use clear section dividers
- Make the Business Health Score visually prominent — display it as a large number with a colour-coded label (0-49: red "Needs Attention", 50-74: orange "Growing", 75-89: green "Strong", 90-100: purple "Excellent")
- Keep the report thorough but scannable — use short paragraphs, bullet points where appropriate
- Professional footer with ClearSite Studios contact details: clearsitestudios.co.za | clearsitestudios@outlook.com | +27 60 397 9279

Return ONLY the complete HTML document. No markdown, no explanation, no code fences.`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  return (response.content[0] as { type: string; text: string }).text;
}

async function sendReportToClient(data: FormData, htmlReport: string) {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"ClearSite Studios" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: `${data.businessName} — Your Free Business Analysis Report`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; color: #333;">
        <div style="background: #0d2b4e; padding: 24px 32px; border-radius: 8px 8px 0 0;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px;">ClearSite Studios</h2>
          <p style="color: rgba(255,255,255,0.5); margin: 4px 0 0; font-size: 13px;">Your Business Analysis Report is ready</p>
        </div>
        <div style="background: #f8f8f8; padding: 24px 32px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">
          <p style="margin: 0 0 16px;">Hi ${data.name},</p>
          <p style="margin: 0 0 16px; line-height: 1.6;">
            Thank you for completing the ClearSite Studios Business Analysis. Your personalised report is attached — it covers your current business challenges, a tailored action plan, and your Business Health Score.
          </p>
          <p style="margin: 0 0 24px; line-height: 1.6; color: #666;">
            Read through it at your own pace. If anything resonates and you would like to chat about how a professional website could help, we offer a <strong>free mockup</strong> before you commit to anything.
          </p>
          <a href="https://clearsitestudios.co.za/get-started" style="display: inline-block; background: #7B5EA7; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">Claim Your Free Mockup →</a>
          <p style="margin: 24px 0 0; color: #999; font-size: 12px;">
            Divan Bosman · ClearSite Studios · clearsitestudios.co.za · Clear by design.
          </p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: `${data.businessName.replace(/[^a-z0-9]/gi, '_')}_Business_Report.html`,
        content: htmlReport,
        contentType: 'text/html',
      },
    ],
  });
}

async function sendLeadNotification(data: FormData) {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"ClearSite Report Bot" <${process.env.SMTP_USER}>`,
    to: 'clearsitestudios@outlook.com',
    subject: `🔥 New Lead: ${data.businessName} — ${data.businessType}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; color: #333;">
        <div style="background: #0d2b4e; padding: 24px 32px; border-radius: 8px 8px 0 0;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px;">🔥 New Business Report Lead</h2>
          <p style="color: rgba(255,255,255,0.5); margin: 4px 0 0; font-size: 13px;">Someone just completed the business report form on clearsitestudios.co.za</p>
        </div>
        <div style="padding: 24px 32px; border: 1px solid #eee; border-top: none; border-radius: 0 0 8px 8px;">

          <h3 style="color: #0d2b4e; margin: 0 0 16px;">Contact Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #666; width: 40%;">Name</td>
              <td style="padding: 10px 0; font-weight: bold;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #666;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${data.email}" style="color: #7B5EA7; font-weight: bold;">${data.email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #666;">Business Name</td>
              <td style="padding: 10px 0; font-weight: bold;">${data.businessName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #666;">Industry</td>
              <td style="padding: 10px 0;">${data.businessType}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #666;">Years in Business</td>
              <td style="padding: 10px 0;">${data.yearsInBusiness}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #666;">Has Website</td>
              <td style="padding: 10px 0;">${data.hasWebsite}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #666;">Monthly Revenue</td>
              <td style="padding: 10px 0;">${data.monthlyRevenue}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #666;">Biggest Goal</td>
              <td style="padding: 10px 0;">${data.biggestGoal}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #666; vertical-align: top;">How They Find Customers</td>
              <td style="padding: 10px 0;">${data.howCustomersFind.join(', ')}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; color: #666; vertical-align: top;">Challenges</td>
              <td style="padding: 10px 0;">${data.challenges.map((c, i) => `${i + 1}. ${c}`).join('<br/>')}</td>
            </tr>
            ${data.extraInfo ? `
            <tr>
              <td style="padding: 10px 0; color: #666; vertical-align: top;">Extra Info</td>
              <td style="padding: 10px 0;">${data.extraInfo}</td>
            </tr>` : ''}
          </table>

          <div style="background: #f8f4ff; border: 1px solid #7B5EA7; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="margin: 0; font-size: 13px; color: #333;">
              <strong style="color: #7B5EA7;">💡 Follow-up tip:</strong> This lead has already received their personalised report. 
              The best time to reach out is within 24 hours while the report is fresh. 
              ${data.hasWebsite === 'No' || data.hasWebsite === 'I have a social media page only' 
                ? '<strong>They have no website</strong> — ideal candidate for your free mockup offer.' 
                : 'They have a website but may need an upgrade.'}
            </p>
          </div>

          <a href="mailto:${data.email}" style="display: inline-block; background: #0d2b4e; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">Reply to ${data.name} →</a>

          <p style="margin: 20px 0 0; color: #bbb; font-size: 11px;">
            ClearSite Studios Business Report Bot · clearsitestudios.co.za
          </p>
        </div>
      </div>
    `,
  });
}

export async function POST(req: NextRequest) {
  try {
    const data: FormData = await req.json();

    if (!data.email || !data.name || !data.businessName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Return success immediately so the user sees the success screen right away
    // Then process the report in the background
    const response = NextResponse.json({ success: true });

    // Run report generation and emails after response is sent
    // Using waitUntil pattern — fire and forget
    const process = async () => {
      try {
        const htmlReport = await generateReport(data);
        await Promise.all([
          sendReportToClient(data, htmlReport),
          sendLeadNotification(data),
        ]);
      } catch (err) {
        console.error('Background report error:', err);
      }
    };

    // Start background processing without awaiting
    process();

    return response;
  } catch (err) {
    console.error('Report generation error:', err);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
