# How pages are built (for whoever converts a prototype page)

Source of truth: `../handoff/apeiro-website-handoff/prototype/<File>.dc.html` and the brief `../handoff/apeiro-website-handoff/CLAUDE.md` (read it first, especially Design, Content, Accessibility and SEO).

Reference implementation: `src/app/page.tsx` (home). Copy its patterns.

## What is already done — do NOT rebuild
- Header, mobile menu, Services dropdown, footer, back-to-top, skip link, `<main id="main">`: all in `src/app/layout.tsx`. A page file renders only what sits **inside `<main>`** in the prototype.
- Global CSS classes in `src/app/globals.css` (read it). Key ones: `container`, `section` (88px padding), `section-lg` (96px), `stack`, `bg-white`, `bg-light`, `bg-dark dark`, `bg-red on-red`, `grid-bg dark` (dark grid hero), `border-top`, `h1`, `h2`, `h3`, `h3-sm`, `lead`, `p`, `sub`, `tag`, `btn btn-red|btn-white|btn-outline-light|btn-outline-white|btn-outline-dark`, `btn-sm`, `btn-row`, `text-link`, `split / split-text / split-media`, `panels`, `card`, `card-grid`, `card-grid-340`, `dark-card`, `steps`.
  Add the class `dark` to any dark (#1C1E22 / #15171A / #26292E) section and `on-red` to red sections so focus rings show in white.
- Components in `src/components/Blocks.tsx`: `PageHero` (dark grid hero with breadcrumb, h1, intro, default Request a Quote button; pass `children` for other buttons or `null` for none), `Breadcrumb`, `CtaBand` (red closing band; default buttons are Request a Quote + Call), `QuoteButton`, `CallButton`, `ServicePanel` (collapsible `<details>` with h3 title, text, check list; keep the prototype `id` and `open` on the first one when the prototype has `open`), `CheckList`, `ProcessSteps`, `MediaImage` (next/image in a rounded aspect box), `PhotosUnderConstruction`, `ProjectCard`, `SectionHead`.
- Icons in `src/components/Icons.tsx`: `Check`, `PanelChevron`, `HardHat`, and `Icon` (wrap any one-off prototype SVG paths: `<Icon size={34} stroke="#FF6B6B" strokeWidth={1.8}><path d="..."/></Icon>`).
- Data and routes in `src/lib/site.ts`: `ROUTES`, `BUSINESS` (phone, email, address, hours), `MEDIA`, `SERVICE_CARDS`, `FEATURED_PROJECTS`, `BADGES`.
- SEO helper `pageMeta()` in `src/lib/seo.ts`.

## Rules for each page
1. File location = the URL in the brief's "Pages and URLs" table, e.g. `/services/civil-infrastructure/asphalt-paving` → `src/app/services/civil-infrastructure/asphalt-paving/page.tsx`. Server components (no "use client") unless interactivity is unavoidable; if needed, put the interactive bit in its own small client component in `src/components/`.
2. Export metadata:
   ```ts
   export const metadata = pageMeta({ title: "<exact prototype <title>, decode &amp; to &>", description: "<~140–160 chars written from the page's intro text, no new claims>", path: ROUTES.x });
   ```
3. Text: copy prototype text **exactly** (it is approved). Keep typographic apostrophes/quotes (’ “ ”) and en dashes. In JSX escape `&` as `&amp;` or use `{"..."}` strings. Do not add copy.
4. Keep **every section/panel `id`** from the prototype (redirects target them, e.g. `#office-retail`, `#georgian-bay`).
5. Links: map prototype `X.dc.html` to `ROUTES` (Main→home, Commercial→commercial, Institutional→institutional, Civil→civil, Concrete→concrete, Asphalt→asphalt, WaterSewer→waterSewer, ConstructionManagement→constructionManagement, PreConstruction→preConstruction, Services→services, Projects→projects, About→about, ServiceAreas→serviceAreas, FAQs→faqs, Quote→quote, Contact→contact, Privacy→privacy). Use `next/link` for internal links, plain `<a>` for `tel:`/`mailto:`.
6. Images: map `/_blob/<id>` via `../handoff/apeiro-website-handoff/assets/blob-map.csv`; files are served from `/images/...`, `/logos/...`, `/video/...` (same file names). Use `MediaImage` or `next/image` with `fill` + `sizes`, or explicit width/height. Use the prototype's alt text exactly. Video: `<video src poster muted loop playsInline controls preload="none">` inside a `.media` box (see brief "Project videos").
7. Headings: exactly one `h1` (the hero), no skipped levels (h1 → h2 → h3). If the prototype uses a non-heading for something styled like a heading, keep it non-heading.
8. Inline styles are fine for one-off layout values from the prototype (gap, maxWidth, grid columns). Prefer classes for repeated things. Grids must not overflow at 390px: write `minmax(min(100%, 240px), 1fr)` instead of `minmax(240px, 1fr)`, and flex children with large `flex-basis` need `min-width: 0`.
9. Colours: red text on light backgrounds is `#C20000` (`var(--red-text)`), never `#E00000`. On dark backgrounds light-red text is `#FF6B6B`/`#FF8F8F` as in the prototype. Muted text on white/light is `#54585C`; on dark `#C9CCD1`. Don't introduce colours that fail WCAG AA contrast.
10. Tap targets ≥ 44px for standalone links/buttons.
11. No form anywhere except the Request a Quote page.
12. Don't touch shared files (layout, globals.css, Blocks.tsx, Icons.tsx, site.ts, seo.ts). If you think a shared change is needed, say so in your final report instead; you may add page-specific CSS via a `<style>` only if truly unavoidable (prefer inline styles).
