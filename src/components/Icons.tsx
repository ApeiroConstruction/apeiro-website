// Decorative SVG icons. All are aria-hidden; give the surrounding control an accessible name.
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 24, ...rest }: P, strokeWidth = 2.2): SVGProps<SVGSVGElement> {
  return {
    "aria-hidden": true,
    focusable: false,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...rest,
  };
}

export const ChevronDown = (p: P) => (
  <svg {...base({ size: 16, ...p }, 2.6)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/** Chevron used on collapsible panels (rotates when open via .chev). */
export const PanelChevron = (p: P) => (
  <svg className="chev" {...base({ size: 26, ...p })}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ChevronLeft = (p: P) => (
  <svg {...base({ size: 22, ...p })}>
    <path d="M15 6 9 12l6 6" />
  </svg>
);

export const ChevronRight = (p: P) => (
  <svg {...base({ size: 22, ...p })}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const MenuIcon = (p: P) => (
  <svg {...base({ size: 24, ...p })}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg {...base({ size: 24, ...p })}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ArrowUp = (p: P) => (
  <svg {...base({ size: 22, ...p }, 2.4)}>
    <path d="M12 19V5" />
    <path d="m5 12 7-7 7 7" />
  </svg>
);

/** Red check mark used in benefit lists. */
export const Check = (p: P) => (
  <svg {...base({ size: 20, stroke: "#C20000", ...p }, 2.4)}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);

/** Hard-hat icon used on the "Photos Under Construction" panel. */
export const HardHat = (p: P) => (
  <svg {...base({ size: 34, stroke: "#F2B705", ...p }, 1.8)}>
    <path d="M2.5 17.5h19" />
    <path d="M4.5 17.5V15a7.5 7.5 0 0 1 15 0v2.5" />
    <path d="M10 7.8V12M14 7.8V12" />
  </svg>
);

/**
 * Generic wrapper for one-off prototype icons: pass the <path>/<rect>/<circle> children
 * copied from the prototype. Example:
 *   <Icon size={34} stroke="#FF6B6B" strokeWidth={1.8}><path d="..." /></Icon>
 */
export function Icon({ children, size = 34, strokeWidth = 1.8, stroke = "#FF6B6B", ...rest }: P & { strokeWidth?: number }) {
  return (
    <svg {...base({ size, stroke, ...rest }, strokeWidth)} strokeWidth={strokeWidth}>
      {children}
    </svg>
  );
}
