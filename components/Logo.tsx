interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 36"
      width="180"
      height="36"
      aria-label="Clearsite Studios"
      className={className}
    >
      {/* Icon: two overlapping rectangles suggesting a layered window/browser */}
      <rect x="2" y="6" width="20" height="15" rx="2" fill="#7c3aed" opacity="0.35" />
      <rect x="8" y="12" width="20" height="15" rx="2" fill="#7c3aed" />

      {/* Wordmark */}
      <text
        x="36"
        y="25"
        fontFamily="Inter, sans-serif"
        fontSize="15"
        fontWeight="700"
        fill="#1a1a1a"
        letterSpacing="-0.3"
      >
        Clearsite
        <tspan fill="#7c3aed"> Studios</tspan>
      </text>
    </svg>
  );
}
