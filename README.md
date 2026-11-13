# Apeiro Construction website

Next.js (App Router, TypeScript) rebuild of www.apeiroconstruction.com from the approved prototype.

## Run it on this computer
Node.js is installed at `%LOCALAPPDATA%\Programs\nodejs` (portable, no admin). In PowerShell:

```
$env:Path = "$env:LOCALAPPDATA\Programs\nodejs;" + $env:Path
npm install
npm run build
npm start        # then open http://localhost:3000
```

## Where things are
- Pages: `src/app/**/page.tsx` (one folder per URL)
- Header, footer, back-to-top: `src/components/`; shared sections: `src/components/Blocks.tsx`
- Business details, menu, project lists: `src/lib/site.ts`
- Quote form: `src/components/QuoteForm.tsx`; server route: `src/app/api/quote/route.ts`
- Database table setup: `supabase/quote_requests.sql`
- Old-URL redirects: `redirects.csv` (loaded automatically by `next.config.ts`)
- Settings/keys: copy `.env.example` → `.env.local` (never commit real keys)

## Before launch (needs accounts / decisions)
1. GitHub repo + Vercel project (connect repo; add the env vars from `.env.example`).
2. Supabase project → run `supabase/quote_requests.sql` → add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
3. Resend account → verify the sending domain → add `RESEND_API_KEY`. (Adds DNS records — do NOT touch MX records.)
4. GA4 property → `NEXT_PUBLIC_GA_ID`.
5. Open items from the brief: blog, Privacy Policy legal review (highlighted items), missing project photos, map embeds on Contact / Service Areas.
6. Test on a Vercel preview (automatically `noindex`), get approval, then connect the domain.
