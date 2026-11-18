import type { Metadata } from "next";
import { PageHero } from "@/components/Blocks";
import SignatureMaker from "@/components/SignatureMaker";

// Internal tool for office staff: not in the menu, sitemap or search results.
export const metadata: Metadata = {
  title: { absolute: "Email Signature | Apeiro Construction" },
  robots: { index: false, follow: false },
};

export default function EmailSignaturePage() {
  return (
    <>
      <PageHero pad="compact" title="Email Signature" intro="Fill in your details, copy your signature and paste it into Outlook.">
        {null}
      </PageHero>
      <section className="bg-light">
        <div className="container section">
          <SignatureMaker />
        </div>
      </section>
    </>
  );
}
