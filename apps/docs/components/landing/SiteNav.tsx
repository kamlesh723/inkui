'use client';

import Link from 'next/link';
import { Github, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { LogoFull } from '@/components/Logo';

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid var(--border)',
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 16px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          minWidth: 0,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Logo — never shrinks */}
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <LogoFull size={26} />
        </Link>

        {/* Desktop nav links — display controlled by .desktop-nav CSS class, not inline style */}
        <nav
          className="desktop-nav"
          style={{ gap: 24, flex: 1, alignItems: 'center' }}
        >
          <Link href="/docs/getting-started/introduction" className="nav-link" style={{ lineHeight: 1 }}>Docs</Link>
          <Link href="/docs/components/spinner" className="nav-link" style={{ lineHeight: 1 }}>Components</Link>
          <Link href="/changelog" className="nav-link" style={{ lineHeight: 1 }}>Changelog</Link>
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto', flexShrink: 0 }}>

          {/* Version badge — desktop only */}
          <span className="desktop-nav version-badge">
            v0.3.0
          </span>

          {/* GitHub — icon always visible, text desktop-only */}
          <a
            href="https://github.com/kamlesh723/inkui"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}
            aria-label="GitHub"
          >
            <Github size={16} />
            <span className="desktop-nav" style={{ display: 'none' }}>GitHub</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '5px',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            borderTop: '1px solid var(--border)',
            background: 'var(--bg)',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <Link
            href="/docs/getting-started/introduction"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
            style={{ fontSize: '0.9rem' }}
          >
            Docs
          </Link>
          <Link
            href="/docs/components/spinner"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
            style={{ fontSize: '0.9rem' }}
          >
            Components
          </Link>
          <Link
            href="/changelog"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
            style={{ fontSize: '0.9rem' }}
          >
            Changelog
          </Link>
          <a
            href="https://github.com/kamlesh723/inkui"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem' }}
          >
            <Github size={14} /> GitHub
          </a>
          <div style={{ paddingTop: 4 }}>
            <span className="version-badge">v0.3.0</span>
          </div>
        </div>
      )}
    </header>
  );
}
