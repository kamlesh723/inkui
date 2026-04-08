'use client';

import Link from 'next/link';
import { Github } from 'lucide-react';

export default function SiteNav() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid #27272A',
        background: 'rgba(10, 10, 11, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          gap: 32,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <span
            style={{
              fontWeight: 700,
              fontSize: '1.05rem',
              letterSpacing: '-0.02em',
              color: '#FAFAFA',
              fontFamily: 'var(--font-geist-mono, monospace)',
            }}
          >
            Ink<span style={{ color: '#06B6D4' }}>UI</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav style={{ display: 'flex', gap: 24, flex: 1 }}>
          <Link href="/docs/getting-started/introduction" className="nav-link">
            Docs
          </Link>
          <Link href="/docs/components/spinner" className="nav-link">
            Components
          </Link>
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span
            style={{
              fontSize: '0.7rem',
              background: 'rgba(6, 182, 212, 0.08)',
              color: '#06B6D4',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              padding: '2px 10px',
              borderRadius: 20,
              fontWeight: 600,
              fontFamily: 'var(--font-geist-mono, monospace)',
            }}
          >
            v0.1.0
          </span>
          <a
            href="https://github.com/kamlesh723/inkui"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <Github size={15} />
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
