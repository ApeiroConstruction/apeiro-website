"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { BUSINESS, MEDIA, NAV_BY_SECTOR, NAV_MAIN, NAV_SUPPORT, ROUTES } from "@/lib/site";
import { ChevronDown, CloseIcon, MenuIcon } from "./Icons";

export default function Header() {
  const pathname = usePathname();
  const [svcOpen, setSvcOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSvcOpen, setMobileSvcOpen] = useState(false);
  const svcWrap = useRef<HTMLDivElement>(null);
  const svcBtn = useRef<HTMLButtonElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Close everything when the route changes.
  useEffect(() => {
    setSvcOpen(false);
    setMenuOpen(false);
    setMobileSvcOpen(false);
  }, [pathname]);

  // Desktop dropdown: close on outside click / tap.
  useEffect(() => {
    if (!svcOpen) return;
    const onDown = (e: PointerEvent) => {
      if (svcWrap.current && !svcWrap.current.contains(e.target as Node)) setSvcOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [svcOpen]);

  // Escape closes the dropdown or the mobile menu and returns focus to its button.
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (svcOpen) {
        setSvcOpen(false);
        svcBtn.current?.focus();
      } else if (menuOpen) {
        setMenuOpen(false);
        menuBtn.current?.focus();
      }
    },
    [svcOpen, menuOpen],
  );

  // Close the desktop dropdown when keyboard focus leaves it.
  const onSvcBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (svcWrap.current && !svcWrap.current.contains(e.relatedTarget as Node | null)) setSvcOpen(false);
  };

  const current = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <header className="site-header" ref={headerRef} onKeyDown={onKeyDown}>
      <div className="container hdr-row">
        <Link href={ROUTES.home} className="hdr-logo" aria-label="Apeiro Construction home">
          <Image src={MEDIA.logo} alt="" width={448} height={161} priority sizes="123px" />
        </Link>

        <nav className="nav-desk" aria-label="Main">
          <div style={{ position: "relative" }} ref={svcWrap} onBlur={onSvcBlur}>
            <button
              ref={svcBtn}
              type="button"
              className="nav-btn"
              aria-expanded={svcOpen}
              aria-controls="svc-menu"
              onClick={() => setSvcOpen((v) => !v)}
            >
              Services <ChevronDown />
            </button>
            <div id="svc-menu" className="svc-pop" hidden={!svcOpen}>
              <div className="svc-cols">
                <div className="svc-col">
                  <span className="svc-col-head" id="svc-sector">By Sector</span>
                  <ul aria-labelledby="svc-sector" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {NAV_BY_SECTOR.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className={`svc-link${l.sub ? " sub-item" : ""}`} aria-current={current(l.href)}>
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="svc-col">
                  <span className="svc-col-head" id="svc-support">Project Support</span>
                  <ul aria-labelledby="svc-support" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {NAV_SUPPORT.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="svc-link" aria-current={current(l.href)}>
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Link href={ROUTES.services} className="svc-all" aria-current={current(ROUTES.services)}>
                View all services
              </Link>
            </div>
          </div>
          {NAV_MAIN.map((l) => (
            <Link key={l.href} href={l.href} aria-current={current(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hdr-actions">
          <a className="hdr-phone" href={BUSINESS.phoneHref}>
            {BUSINESS.phoneDisplay}
          </a>
          <Link href={ROUTES.quote} className="btn btn-red hdr-quote">
            Request a Quote
          </Link>
          <button
            ref={menuBtn}
            type="button"
            className="menu-btn"
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <nav id="mobile-nav" className="container nav-mobile" aria-label="Mobile" hidden={!menuOpen}>
        <button
          type="button"
          className="nav-btn"
          aria-expanded={mobileSvcOpen}
          aria-controls="mobile-svc"
          onClick={() => setMobileSvcOpen((v) => !v)}
        >
          Services <ChevronDown />
        </button>
        <div id="mobile-svc" className="nav-mobile-sub" hidden={!mobileSvcOpen}>
          {[...NAV_BY_SECTOR, ...NAV_SUPPORT].map((l) => (
            <Link key={l.href} href={l.href} className={l.sub ? "sub-item" : undefined} aria-current={current(l.href)}>
              {l.label}
            </Link>
          ))}
          <Link href={ROUTES.services} className="all" aria-current={current(ROUTES.services)}>
            View all services
          </Link>
        </div>
        {NAV_MAIN.map((l) => (
          <Link key={l.href} href={l.href} aria-current={current(l.href)}>
            {l.label}
          </Link>
        ))}
        <a href={BUSINESS.phoneHref}>Call {BUSINESS.phoneDisplay}</a>
      </nav>
    </header>
  );
}
