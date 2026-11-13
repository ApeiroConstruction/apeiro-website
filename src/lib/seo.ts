import type { Metadata } from "next";
import { BUSINESS, MEDIA, SITE_URL } from "./site";

/**
 * Builds page metadata: title (from the prototype <title>), ~150-character description,
 * one canonical URL, and Open Graph / Twitter tags.
 */
export function pageMeta({ title, description, path, image }: { title: string; description: string; path: string; image?: string }): Metadata {
  const url = path === "/" ? SITE_URL + "/" : SITE_URL + path;
  const ogImage = image ?? MEDIA.heroPoster;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: BUSINESS.shortName,
      locale: "en_CA",
      images: [{ url: ogImage, width: 1600, height: 900 }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

/** Regions listed on the Service Areas page (used for JSON-LD areaServed). */
export const AREAS_SERVED = [
  "London & Surrounding Counties",
  "Waterloo Region & Guelph",
  "Windsor-Essex, Chatham & Sarnia",
  "Lake Huron & the Bruce Peninsula",
  "Georgian Bay & Simcoe County",
  "Niagara & Norfolk",
];

export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": SITE_URL + "/#business",
    name: BUSINESS.name,
    url: SITE_URL + "/",
    logo: SITE_URL + MEDIA.logo,
    image: SITE_URL + MEDIA.heroPoster,
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postal,
      addressCountry: BUSINESS.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    areaServed: AREAS_SERVED.map((name) => ({ "@type": "AdministrativeArea", name: `${name}, Ontario` })),
  };
}
