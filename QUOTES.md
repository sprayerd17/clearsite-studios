# Quotes & onboarding

How the quote system on clearsitestudios.co.za works, and how to run it.

- **`/quote`** — the public "Get a quote" builder. Visitors pick what they need and answer a few tap-to-select questions. Submitting creates a **lead** with a private project link and emails you.
- **`/q/<private-link>`** — the client's project page. No account needed. It shows their brief. Once you send the quote, they can accept it in one tap. After that they see the deposit invoice and bank details, upload proof of payment, and upload their content (logo, photos, text) for onboarding.
- **`/admin`** — your side, made for your phone. Every new lead arrives with a **draft quote** already built from your private price list. You review it, edit the lines and prices, then send it. The client gets the link on WhatsApp with the message already typed. From there you run the project: deposit received → building → live → paid.

No AI and no paid APIs. Draft quotes come from simple rules on the price list: each module has "auto-add when…" answers, for example *Pages → 2–5 pages* adds *Additional page ×4*. Edit these in **Admin → Prices**.

## The price list sheet

Your prices live in **`pricing/ClearSite-Price-List.xlsx`**: 59 modules in 7 categories, from "One-page website" through "Quote generation" to "PayFast payments". Each quote is built from these modules, so clients see what each part costs, and you can show them what to remove if they want it cheaper.

1. Fill in **Your price** (the yellow column). Leave it blank to use the suggested price (hours guide × your hourly rate).
2. Check the **Example quotes** tab. It totals typical projects (basic site, 5-page site, store, a RAD-style system) and shows how much of each is optional.
3. Import it:
   ```bash
   npm run prices:import -- --dry-run     # preview, writes nothing
   npm run prices:import                  # local emulator
   npm run prices:import:prod             # live site
   ```
   Each row becomes `prices/<ID>`, so re-importing updates prices in place. Items no longer in the sheet are hidden (add `--prune` to delete them). Small tweaks can also be made directly in Admin → Prices.

The sheet is git-ignored so your prices stay private. Remove the `/pricing/*.xlsx` line from `.gitignore` if your repo is private and you want it versioned.

## How it fits together

| Piece | What it does |
| --- | --- |
| Next.js server actions | The quote form (`app/quote/actions.ts`) and the client page actions (`app/q/[token]/actions.ts`). They run on the server with the Firebase Admin SDK, and validate every input. |
| Firebase Auth | Admin sign-in (email + password). Only users listed in the `admins` collection get in. |
| Firestore | `leads`, `prices` (your private price list), `settings/business`, `counters/leads` (numbers start at 1001). |
| Firebase Storage | Proof of payment and content uploads. Clients upload through the server; browsers can't write to Storage directly. |
| Email (SMTP) | You get an email for every new request, an accepted quote, proof of payment, and "content ready". It uses the same `SMTP_*` variables as the old lead emails. |
| WhatsApp | `wa.me` links with the message already typed. Nothing is sent automatically. |

**Firebase is required.** If it isn't configured, the quote form shows an error asking the visitor to WhatsApp you instead.

Money is stored in cents. Message wording, bank details, deposit % and quote terms are all editable in **Admin → Settings**.

## Run it locally (no Firebase account needed)

You need Java 21+ installed for the Firebase emulators. It's already on this machine.

```bash
npm install
npm run dev:local        # starts the emulators and the Next.js dev server together
npm run seed             # first time only: a test admin login (+ a starter price list)
npm run prices:import    # load your modular price list from the sheet
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin. Sign in with `DEV_ADMIN_EMAIL` / `DEV_ADMIN_PASSWORD` from `.env.development.local`.
- Emulator dashboard: http://localhost:4005, to look at the data.

Test data is kept in `.emulator-data/` between runs.

## Going live

1. **Firebase project.** Create one at https://console.firebase.google.com.
   - Upgrade it to **Blaze** (pay-as-you-go). Storage requires this, but at this volume you'll stay inside the free allowance. Set a budget alert, for example R50.
   - **Firestore Database** → create it in `africa-south1`.
   - **Storage** → get started, in the same location.
   - **Authentication** → enable **Email/Password**, then add yourself as a user.
   - **Project settings → General** → add a Web app and copy its config.
   - **Project settings → Service accounts** → generate a private key. Keep that file private.
2. **Env vars.** Put both pieces into the `firebase-setup/` folder (git-ignored): paste the web app's `firebaseConfig` block into `paste-firebase-config-here.txt`, and move the downloaded key `.json` into the folder. Then run `npm run env:prod`. It writes `.env.production.local` and `firebase-setup/vercel-env.txt`. Paste the whole of `vercel-env.txt` into Vercel → Settings → Environment Variables (Production). Skip any variable Vercel says already exists, e.g. the `SMTP_*` ones.
3. **Rules, admin and price list.** These use the service account key, so no `firebase login` is needed:
   ```bash
   npm run deploy:rules
   npm run make-admin -- you@example.com
   npm run prices:import:prod
   ```
4. **Deploy the site.** In Firebase → Authentication → Settings → **Authorized domains**, add `www.clearsitestudios.co.za`.
5. **Fill in Admin → Settings**, especially your **bank details**. Clients only see banking details once you've entered them; until then their page says you'll send them on WhatsApp.

## Where things live

| What | Where |
| --- | --- |
| Quote questions and options | `lib/quote/brief.ts` |
| Data model | `lib/quote/types.ts` |
| Totals, statuses, draft-quote rules | `lib/quote/leads.ts` |
| Default settings, message templates, onboarding checklist | `lib/quote/defaults.ts` |
| Price list | `pricing/ClearSite-Price-List.xlsx` → `npm run prices:import` (or edit in Admin → Prices) |
| Security rules | `firestore.rules`, `storage.rules` |
