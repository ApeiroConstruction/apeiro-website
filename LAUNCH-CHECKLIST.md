# Apeiro website: launch checklist

A step-by-step list for getting the new website online. Do the steps in order. Nothing here touches the live site until **Part 6**.

**Golden rules**
- Never change the domain's **MX records** (they run the company email).
- Never paste a secret key into the code, an email or a chat. Keys go only into the **Netlify → Environment variables** screen.
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

## Part 4: Netlify (hosting) · Free plan
> Netlify's Free plan allows commercial sites. It has a **hard limit of 300 credits a month**: each site publish uses about 15 and each GB of visitor traffic about 20. If the limit is reached, **the site pauses until the next month**. That's plenty for normal B2B traffic, but check usage monthly (Netlify → **Billing / Usage**). If it gets close, upgrade to **Personal (about US$9/month)**. Confirm the current terms on netlify.com/pricing when signing up.
1. Sign up at netlify.com **with the GitHub account** from Part 1 ("Sign up with GitHub").
2. **Add new project → Import an existing project → GitHub** → choose `apeiro-website`. Netlify reads the settings from `netlify.toml` in the code, so leave the build settings as they are.
3. Before the first deploy, open **Site configuration → Environment variables** and add:

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.apeiroconstruction.com` |
| `SUPABASE_URL` | from Part 2 |
| `SUPABASE_SERVICE_ROLE_KEY` | from Part 2 (secret) |
| `RESEND_API_KEY` | from Part 3 (secret) |
| `QUOTE_NOTIFY_TO` | `info@apeiroconstruction.com` |
| `QUOTE_NOTIFY_FROM` | `Apeiro Website <website@apeiroconstruction.com>` |
| `NEXT_PUBLIC_GA_ID` | from Part 5 (can be added later) |

4. Click **Deploy**. Netlify gives an address such as `apeiro-website.netlify.app`.
   - Until launch, this address is **hidden from Google** automatically. The code ships in "prelaunch" mode (set in `netlify.toml`).
   - Test copies of other branches and pull requests (**deploy previews**) are always hidden from Google too.

## Part 5: Google Analytics 4 · free
1. analytics.google.com → **Admin → Create property** → "Apeiro Construction", time zone Toronto, currency CAD.
2. Add a **Web** data stream for `https://www.apeiroconstruction.com`.
3. Copy the **Measurement ID** (`G-…`) → Netlify `NEXT_PUBLIC_GA_ID` → **Deploys → Trigger deploy**.

## Part 6: Test the preview, then go live
**On the Netlify test address:**
- [ ] Click through every page on a phone and a computer.
- [ ] Submit a test quote. Check it appears in Supabase and that the email arrives at info@.
- [ ] Try a few old links (e.g. `/barrie-ontario`). They should land on the right section.
- [ ] Open items resolved (see below).
- [ ] **Written approval** to launch.

**Launch day (Wed Dec 2): DNS is now at Cloudflare (moved Nov 24), so we change it ourselves**
1. **Claude:** flip `NEXT_PUBLIC_SITE_ENV` from `"prelaunch"` to `"production"` in `netlify.toml` and set the Privacy Policy "Last updated" date, then publish. This turns off the password and lets Google in.
2. **Netlify:** **Domain management → Add a domain** → `www.apeiroconstruction.com` (set as **primary**), then add `apeiroconstruction.com` too. Choose **external DNS**. Don't buy a domain or upgrade.
3. **Cloudflare → DNS → Records** (all must stay **grey cloud / DNS only**):
   - Edit **CNAME `www`**: change `s.multiscreensite.com` → `apeiro-website.netlify.app`.
   - **Delete the 2 A records** for `apeiroconstruction.com` (`35.172.94.1`, `100.24.208.97`, the old site), then **add CNAME `@`** → `apeiro-website.netlify.app` (Cloudflare "flattens" it automatically).
   - ⚠️ Don't touch anything else (MX, TXT, SRV, autodiscover, lyncdiscover, msoid, sip, send, resend._domainkey, _dmarc).
4. **Netlify:** wait for both domains to show verified and **HTTPS certificate provisioned** (usually minutes with Cloudflare).
5. **Claude:** check every page on the real domain, the 88 redirects, robots.txt (`Allow: /`), the sitemap, and a test quote with an email alert to Andres.
6. **You:** test email to and from info@. Optionally delete the `PREVIEW_PASSWORD` variable in Netlify.
7. **Rollback if needed:** put CNAME `www` back to `s.multiscreensite.com` and restore the 2 A records (OneLocal's site runs until Dec 22).

## Part 7: After launch
- [ ] Google Search Console: add the domain → **Sitemaps** → submit `https://www.apeiroconstruction.com/sitemap.xml`.
- [ ] Google Business Profile: set the website link to the new site.
- [ ] For 4–6 weeks, check Search Console → **Pages → Not found (404)** each week and send Claude any old addresses that need a redirect.

---

## Open items to resolve before launch
1. ~~**Blog:**~~ Done: 12 posts moved to /blog, 7 merged, 4 redirected to Commercial, 9 homeowner posts retired to /blog (all 32 old addresses redirect).
2. ~~**Privacy Policy:**~~ Done: standard wording; only the "Last updated" date is set on launch day.
3. ~~**Maps:**~~ Done: Google Maps on Service Areas and Contact, pinned to the Google Business listing.
4. **Project media:** ~~Veteran's Drive photo~~ (added Nov 20); still needed: photos or video for Structural Site Works. Also the Terrace Lodge city, and the region and utility type for Hard Surface Restoration.
