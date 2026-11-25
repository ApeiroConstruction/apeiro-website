import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactClickTracking from "@/components/ContactClickTracking";
import GaLoader from "@/components/GaLoader";
import { businessJsonLd } from "@/lib/seo";
import { IS_PRODUCTION } from "@/lib/env";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Self-hosted fonts (files in src/fonts, SIL Open Font License). Kept in the project so
// builds never depend on Google Fonts being reachable.
const barlow = localFont({
  src: [
    { path: "../fonts/barlow-condensed-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/barlow-condensed-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/barlow-condensed-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-barlow",
  display: "swap",
  fallback: ["Arial Narrow", "sans-serif"],
});
const plex = localFont({
  src: [
    { path: "../fonts/ibm-plex-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ibm-plex-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/ibm-plex-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-plex",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

const isProduction = IS_PRODUCTION;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Apeiro Construction",
  // Only production is indexable; previews and local builds are noindex.
  robots: isProduction ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1C1E22",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${barlow.variable} ${plex.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd()) }} />
        {GA_ID && (
          <>
            {/* The tiny setup below runs right away and queues events; the large Google library
                loads on the visitor's first interaction or after 4 s (see GaLoader). */}
            <GaLoader id={GA_ID} />
            <ContactClickTracking />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{allow_google_signals:false,allow_ad_personalization_signals:false});`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
