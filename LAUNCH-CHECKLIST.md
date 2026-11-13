# Apeiro website: launch checklist

A step-by-step list for getting the new website online. Do the steps in order. Nothing here touches the live site until **Part 6**.

**Golden rules**
- Never change the domain's **MX records** (they run the company email).
- Never paste a secret key into the code, an email or a chat. Keys go only into the **Vercel → Environment Variables** screen.
- Confirm who owns the domain (it's currently with **OneLocal**) before any DNS change.

---

## Part 1: GitHub (stores the code) · free
1. Create an account at github.com using a company email address (ideally a shared one, for example web@ or info@, so access doesn't depend on one person).
2. Create a **private** repository named `apeiro-website`.
3. Send Claude the repository link. Claude uploads the code (it is already saved locally with Git).

## Part 2: Supabase (saves quote requests) · free plan
1. Create an account at supabase.com → **New project**.
   - Name: `apeiro-website`
   - Region: **Canada (Central)** if offered. The Privacy Policy will need to state this region.
   - Choose a strong database password and store it in the company password manager.
2. Open **SQL Editor → New query**, paste everything from `supabase/quote_requests.sql`, then click **Run**. This creates the `quote_requests` table and locks it so the public can't read it.
3. Open **Project Settings → API** and copy two values for Part 4:
   - **Project URL** → `SUPABASE_URL`
   - **service_role** key (secret) → `SUPABASE_SERVICE_ROLE_KEY`
4. New quote requests will appear under **Table Editor → quote_requests**.

## Part 3: Resend (emails each new quote request to info@) · free plan
1. Create an account at resend.com.
2. **Domains → Add domain** → `apeiroconstruction.com`. Resend lists a few DNS records to add: usually TXT records and one CNAME/MX on a **sub-domain** such as `send.apeiroconstruction.com`.
   - These are **added** alongside the existing records. Do **not** edit or delete the main domain's MX records.
   - Whoever manages the domain at OneLocal adds them. Wait for Resend to show "Verified".
3. **API Keys → Create** → copy it for Part 4 as `RESEND_API_KEY`.

## Part 4: Vercel (hosting) · Hobby is free, Pro is about US$20/month
> Vercel's free Hobby plan is for **non-commercial** use, so a company website should use **Pro**. Get approval for the cost before choosing it.
1. Sign up at vercel.com **with the GitHub account** from Part 1.
2. **Add New → Project** → import `apeiro-website`. Leave the build settings as they are.
3. Before deploying, open **Environment Variables** and add:

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.apeiroconstruction.com` |
| `SUPABASE_URL` | from Part 2 |
| `SUPABASE_SERVICE_ROLE_KEY` | from Part 2 (secret) |
| `RESEND_API_KEY` | from Part 3 (secret) |
| `QUOTE_NOTIFY_TO` | `info@apeiroconstruction.com` |
| `QUOTE_NOTIFY_FROM` | `Apeiro Website <website@apeiroconstruction.com>` |
| `NEXT_PUBLIC_GA_ID` | from Part 5 (can be added later) |

4. Click **Deploy**. Vercel gives a test address such as `apeiro-website.vercel.app`. That copy is **hidden from Google** automatically.

## Part 5: Google Analytics 4 · free
1. analytics.google.com → **Admin → Create property** → "Apeiro Construction", time zone Toronto, currency CAD.
2. Add a **Web** data stream for `https://www.apeiroconstruction.com`.
3. Copy the **Measurement ID** (`G-…`) → Vercel `NEXT_PUBLIC_GA_ID` → redeploy.

## Part 6: Test the preview, then go live
**On the Vercel test address:**
- [ ] Click through every page on a phone and a computer.
- [ ] Submit a test quote. Check it appears in Supabase and that the email arrives at info@.
- [ ] Try a few old links (e.g. `/barrie-ontario`). They should land on the right section.
- [ ] Open items resolved (see below).
- [ ] **Written approval** to launch.

**Connect the domain** (only after approval and confirming who owns the domain):
1. Vercel → Project → **Settings → Domains** → add `www.apeiroconstruction.com` and `apeiroconstruction.com` (set the bare one to redirect to www).
2. Vercel shows **one A record** and **one CNAME record**. Change only those at OneLocal. **Leave MX, and any TXT records used for email, untouched.**
3. Wait until Vercel shows both domains as "Valid", then open the site and send a test email to info@ to confirm email still works.

## Part 7: After launch
- [ ] Google Search Console: add the domain → **Sitemaps** → submit `https://www.apeiroconstruction.com/sitemap.xml`.
- [ ] Google Business Profile: set the website link to the new site.
- [ ] For 4–6 weeks, check Search Console → **Pages → Not found (404)** each week and send Claude any old addresses that need a redirect.

---

## Open items to resolve before launch
1. **Blog:** the list of old post URLs (keep 12, merge 6, redirect 4, retire 9). The footer's Blog link returns once `/blog` is built.
2. **Privacy Policy:** legal review of the 7 highlighted items (hosting region, retention periods, Privacy Commissioner phone, "Last updated" date, ads sentence). If Supabase is set up in Canada (Central), that answers the hosting region.
3. **Maps:** Service Areas currently shows placeholder text where a map should go. Contact uses an embedded Google Map (it may set Google cookies). Decide on both.
4. **Project media:** photos or video for Veteran's Drive, Stratford and for Site Works, 1015 Eagle Drive. Also the Terrace Lodge city, and the region and utility type for Hard Surface Restoration.
