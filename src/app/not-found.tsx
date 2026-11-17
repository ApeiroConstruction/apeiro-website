import Link from "next/link";
import { PageHero } from "@/components/Blocks";
import { BUSINESS, ROUTES } from "@/lib/site";

export const metadata = {
  title: { absolute: "Page Not Found | Apeiro Construction" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageHero pad="compact" title="Page Not Found" intro="The page you’re looking for may have moved. Try one of these instead:">
      <div className="btn-row" style={{ paddingTop: 8 }}>
        <Link href={ROUTES.home} className="btn btn-red">
          Home
        </Link>
        <Link href={ROUTES.services} className="btn btn-outline-light">
          Services
        </Link>
        <Link href={ROUTES.projects} className="btn btn-outline-light">
          Projects
        </Link>
        <a href={BUSINESS.phoneHref} className="btn btn-outline-light">
          Call {BUSINESS.phoneDisplay}
        </a>
      </div>
    </PageHero>
  );
}
