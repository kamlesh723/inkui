import Link from 'next/link';
import { Github } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: '1px solid #27272A',
        padding: '48px 24px 32px',
        background: '#0A0A0B',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 40,
          marginBottom: 40,
        }}
      >
        {/* Left — brand */}
        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: '1.05rem',
              fontFamily: 'var(--font-geist-mono, monospace)',
              marginBottom: 10,
              color: '#FAFAFA',
              letterSpacing: '-0.02em',
            }}
          >
            Ink<span style={{ color: '#06B6D4' }}>UI</span>
          </div>
          <p style={{ color: '#71717A', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: 6 }}>
            Beautiful UI components for the terminal.
          </p>
          <p style={{ color: '#71717A', fontSize: '0.85rem' }}>Built by Kamlesh Yadav</p>
        </div>

        {/* Middle — site links */}
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.78rem', color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
            Links
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/docs/getting-started/introduction" className="footer-link">Docs</Link>
            <Link href="/docs/components/spinner" className="footer-link">Components</Link>
            <a
              href="https://github.com/kamlesh723/inkui/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Changelog
            </a>
            <a
              href="https://www.npmjs.com/org/inkui-cli"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              npm
            </a>
          </nav>
        </div>

        {/* Right — external */}
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.78rem', color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
            External
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a
              href="https://github.com/kamlesh723/inkui"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Github size={14} /> GitHub
            </a>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid #1C1C21',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <span style={{ color: '#3F3F46', fontSize: '0.8rem' }}>
          Built with Ink, React, and TypeScript
        </span>
        <span style={{ color: '#3F3F46', fontSize: '0.8rem' }}>
          © 2025 InkUI · MIT License
        </span>
      </div>
    </footer>
  );
}
