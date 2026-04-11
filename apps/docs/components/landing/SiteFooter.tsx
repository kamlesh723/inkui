import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { LogoFull } from '@/components/Logo';

export default function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '56px 24px 36px',
        background: 'var(--bg-alt)',
      }}
    >
      <div
        style={{
          maxWidth: 1040,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 40,
          marginBottom: 48,
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ marginBottom: 12 }}>
            <LogoFull size={24} />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: 6 }}>
            Beautiful UI components for the terminal.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            Built by{' '}
            <a
              href="https://github.com/kamlesh723"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Kamlesh Yadav
            </a>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <a
                href="https://x.com/kamlesh_builds"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                aria-label="X (Twitter)"
              >
                <Twitter size={13} />
              </a>
              <a
                href="https://linkedin.com/in/kamleshYadav91"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                aria-label="LinkedIn"
              >
                <Linkedin size={13} />
              </a>
            </span>
          </p>
        </div>

        {/* Links */}
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
            Links
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/docs/getting-started/introduction" className="footer-link">Docs</Link>
            <Link href="/docs/components/spinner" className="footer-link">Components</Link>
            <Link href="/changelog" className="footer-link">
              Changelog
            </Link>
            <a href="https://www.npmjs.com/org/inkui-cli" target="_blank" rel="noopener noreferrer" className="footer-link">
              npm
            </a>
          </nav>
        </div>

        {/* External */}
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
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
            <a
              href="https://github.com/kamlesh723/inkui/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Contributing
            </a>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <span style={{ color: 'var(--text-faint)', fontSize: '0.8rem' }}>
          Built with Ink, React, and TypeScript
        </span>
        <span style={{ color: 'var(--text-faint)', fontSize: '0.8rem' }}>
          © 2025 InkUI · MIT License
        </span>
      </div>
    </footer>
  );
}
