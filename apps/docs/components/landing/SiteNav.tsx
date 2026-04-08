'use client';

import Link from 'next/link';
import { Github, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { LogoFull } from '@/components/Logo';

export default function SiteNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Avoid hydration mismatch — only render theme icon after mount
  useEffect(() => setMounted(true), []);

  const isDark = theme === 'dark';

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
        transition: 'background 0.2s ease, border-color 0.2s ease',
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
          <LogoFull size={26} />
        </Link>

        {/* Desktop nav links */}
        <nav
          className="desktop-nav"
          style={{ display: 'flex', gap: 24, flex: 1 }}
        >
          <Link href="/docs/getting-started/introduction" className="nav-link">Docs</Link>
          <Link href="/docs/components/spinner" className="nav-link">Components</Link>
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
          {/* Version badge */}
          <span
            className="desktop-nav"
            style={{
              fontSize: '0.7rem',
              background: 'rgba(6, 182, 212, 0.08)',
              color: '#06B6D4',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              padding: '2px 10px',
              borderRadius: 20,
              fontWeight: 600,
              fontFamily: 'var(--font-geist-mono, monospace)',
              display: 'flex',
            }}
          >
            v0.1.1
          </span>

          {/* GitHub */}
          <a
            href="https://github.com/kamlesh723/inkui"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link desktop-nav"
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <Github size={15} />
            <span>GitHub</span>
          </a>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              aria-label="Toggle theme"
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: 6,
                padding: '5px',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'border-color 0.15s, color 0.15s',
              }}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          )}

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

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          style={{
            borderTop: '1px solid var(--border)',
            background: 'var(--bg)',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <Link
            href="/docs/getting-started/introduction"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Docs
          </Link>
          <Link
            href="/docs/components/spinner"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Components
          </Link>
          <a
            href="https://github.com/kamlesh723/inkui"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <Github size={14} /> GitHub
          </a>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
            <span
              style={{
                fontSize: '0.7rem',
                background: 'rgba(6, 182, 212, 0.08)',
                color: '#06B6D4',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                padding: '3px 10px',
                borderRadius: 20,
                fontWeight: 600,
                fontFamily: 'var(--font-geist-mono, monospace)',
              }}
            >
              v0.1.1
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
