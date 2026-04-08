export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="InkUI logo"
    >
      {/* Background */}
      <rect width="32" height="32" rx="7" fill="#0D0D10" />
      {/* Cyan border */}
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="6.5"
        stroke="#06B6D4"
        strokeOpacity="0.55"
      />
      {/* > chevron (terminal prompt) */}
      <path
        d="M7.5 11.5L14 16L7.5 20.5"
        stroke="#06B6D4"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* _ cursor block */}
      <rect x="16.5" y="19.5" width="8" height="2.2" rx="1" fill="#06B6D4" />
    </svg>
  );
}

export function LogoFull({ size = 28 }: { size?: number }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 9,
        textDecoration: 'none',
      }}
    >
      <LogoMark size={size} />
      <span
        style={{
          fontWeight: 700,
          fontSize: '1.05rem',
          letterSpacing: '-0.02em',
          color: 'var(--text)',
          fontFamily: 'var(--font-geist-mono, monospace)',
        }}
      >
        Ink<span style={{ color: '#06B6D4' }}>UI</span>
      </span>
    </span>
  );
}
