import type { SVGProps } from "react";

// A few extra icons for the project page that components/icons.tsx doesn't have.
// Same grid and stroke as the site set, so they sit next to each other cleanly.

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 20, strokeWidth = 1.75, children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Copy = (p: IconProps) => (
  <Icon {...p}>
    <rect x="8.5" y="8.5" width="12" height="12" rx="2.5" />
    <path d="M15.5 8.5V6a2.5 2.5 0 0 0-2.5-2.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5" />
  </Icon>
);

export const Upload = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 15V4" />
    <path d="m7 9 5-5 5 5" />
    <path d="M4 15v3a2.5 2.5 0 0 0 2.5 2.5h11A2.5 2.5 0 0 0 20 18v-3" />
  </Icon>
);

export const Trash = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 7h16" />
    <path d="M9.5 7V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v2" />
    <path d="m6 7 1 12a2 2 0 0 0 2 1.8h6a2 2 0 0 0 2-1.8L18 7" />
  </Icon>
);

export const Printer = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 9V3.5h10V9" />
    <rect x="3" y="9" width="18" height="8" rx="2" />
    <path d="M7 14h10v6.5H7z" />
  </Icon>
);

export const ChevronDown = (p: IconProps) => (
  <Icon {...p}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const Bank = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 9.5 12 4l9 5.5" />
    <path d="M5 10v7" />
    <path d="M9.5 10v7" />
    <path d="M14.5 10v7" />
    <path d="M19 10v7" />
    <path d="M3 20h18" />
  </Icon>
);

export function Spinner({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`animate-spin ${className}`}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2.5" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
