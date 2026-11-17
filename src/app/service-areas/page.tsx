import { CtaBand, PageHero } from "@/components/Blocks";
import { pageMeta } from "@/lib/seo";
import { BUSINESS, ROUTES } from "@/lib/site";

export const metadata = pageMeta({
  title: "Service Areas | Construction Across Southwestern Ontario | Apeiro",
  description:
    "From our base in London, Apeiro delivers commercial, institutional and civil projects across Southwestern Ontario, from Windsor and Waterloo to Niagara and Barrie.",
  path: ROUTES.serviceAreas,
});

const REGIONS = [
  {
    id: "london",
    title: "London & Surrounding Counties",
    text: "Our home base. London, Middlesex County, St. Marys, Stratford, Oxford County and Elgin County, including our Veteran’s Drive bandshell project in Stratford.",
    communities: ["London", "Middlesex County", "St. Marys", "Stratford", "Oxford County", "Elgin County"],
  },
  {
    id: "waterloo",
    title: "Waterloo Region & Guelph",
    text: "Commercial, institutional and civil projects across Kitchener-Waterloo, Cambridge and Guelph.",
    communities: ["Kitchener-Waterloo", "Cambridge", "Guelph"],
  },
  {
    id: "windsor",
    title: "Windsor-Essex, Chatham & Sarnia",
    text: "Serving Windsor, Leamington, Kingsville, Chatham-Kent and Sarnia-Lambton.",
    communities: ["Windsor", "Leamington", "Kingsville", "Chatham-Kent", "Sarnia-Lambton"],
  },
  {
    id: "lake-huron",
    title: "Lake Huron & the Bruce Peninsula",
    text: "Serving Goderich, Grand Bend, Sauble Beach, and Owen Sound to Tobermory.",
    communities: ["Goderich", "Grand Bend", "Sauble Beach", "Owen Sound–Tobermory"],
  },
  {
    id: "georgian-bay",
    title: "Georgian Bay & Simcoe County",
    text: "Serving Barrie, Collingwood, The Blue Mountains, Wasaga Beach, and Midland and Penetanguishene.",
    communities: ["Barrie", "Collingwood", "The Blue Mountains", "Wasaga Beach", "Midland & Penetanguishene"],
  },
  {
    id: "niagara",
    title: "Niagara & Norfolk",
    text: "Serving Niagara-on-the-Lake, St. Catharines and Norfolk County.",
    communities: ["Niagara-on-the-Lake", "St. Catharines", "Norfolk County"],
  },
];

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero wide
        crumbs={[{ label: "Home", href: ROUTES.home }, { label: "Service Areas" }]}
        title="Service Areas"
        intro="From our base in London, we deliver commercial, institutional and civil projects across Southwestern Ontario and beyond."
      />

      <section id="map" className="bg-white">
        <div className="container" style={{ paddingTop: 72 }}>
          {/* Google Map centred on the London office, zoomed out to show Southwestern Ontario. No API key needed. */}
          <div
            style={{
              width: "100%",
              aspectRatio: "21 / 8",
              minHeight: 420,
              borderRadius: 8,
              overflow: "hidden",
              background: "repeating-linear-gradient(135deg, #E9E7E1 0px, #E9E7E1 8px, #F2F0EB 8px, #F2F0EB 16px)",
              display: "flex",
            }}
          >
            <iframe
              title="Map: Apeiro Construction service area across Southwestern Ontario, centred on our London office"
              src={`https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.mapsQuery)}&z=7&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, width: "100%", minHeight: 420, flex: "1 1 auto", display: "block" }}
            />
          </div>
        </div>
      </section>

      <section id="regions" className="bg-white">
        <div
          className="container"
          style={{
            paddingTop: 48,
            paddingBottom: 88,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: 24,
          }}
        >
          {REGIONS.map((r) => (
            <div
              key={r.id}
              id={r.id}
              className="stack"
              style={{
                background: "#fff",
                border: "1px solid var(--border)",
                borderTop: "4px solid var(--red)",
                borderRadius: 8,
                padding: 28,
                gap: 12,
                scrollMarginTop: 24,
              }}
            >
              <h2 className="h3" style={{ fontSize: 30 }}>
                {r.title}
              </h2>
              <p style={{ margin: 0, color: "var(--body)" }}>{r.text}</p>
              <ul aria-label="Communities" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: 8 }}>
                {r.communities.map((c) => (
                  <li key={c} style={{ background: "var(--light)", borderRadius: 4, padding: "6px 12px", fontSize: 14, fontWeight: 500 }}>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Don’t See Your Community?"
        text="We also serve surrounding areas across Ontario. Tell us where you’re building."
      />
    </>
  );
}
