import type { Metadata } from 'next';
import Link from 'next/link';
import { COMPONENTS } from '@/lib/components-data';

export const metadata: Metadata = {
  title: 'InkUI — Terminal component library for Ink',
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <h1 className="hero-title">
          Ink<span>UI</span>
        </h1>
        <p className="hero-sub">
          Copy-paste terminal UI components for{' '}
          <a href="https://github.com/vadimdemedes/ink" target="_blank" rel="noopener">
            Ink
          </a>{' '}
          — the same shadcn/ui model, but for CLI apps built on React.
        </p>

        <div className="install-box">
          <span>$</span> npx inkui add spinner
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <h2 className="section-title">How it works</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Pick a component, run <code style={{ color: 'var(--accent)' }}>npx inkui add {'<component>'}</code>,
          and the source lands in <code style={{ color: 'var(--accent)' }}>./components/ui/</code>.
          You own the code — customise colours, layout, and behaviour freely.
          Every component accepts a <code style={{ color: 'var(--accent)' }}>theme</code> prop
          backed by <code style={{ color: 'var(--accent)' }}>@inkui/core</code> design tokens,
          so your CLI app is visually consistent out of the box.
        </p>
      </section>

      {/* Component grid */}
      <section className="section">
        <h2 className="section-title">Components</h2>
        <div className="component-grid">
          {COMPONENTS.map((c) => (
            <Link
              key={c.slug}
              href={`/components/${c.slug}`}
              className="component-card"
            >
              <div className="component-card-name">{c.name}</div>
              <div className="component-card-desc">{c.description}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick start */}
      <section className="section">
        <h2 className="section-title">Quick start</h2>
        <div className="code-block">
          <pre>{`# 1. Add a component to your project
npx inkui add spinner

# 2. Import it
import { Spinner } from './components/ui/spinner';

# 3. Use it
<Spinner label="Deploying..." type="dots" />`}
          </pre>
        </div>
      </section>
    </>
  );
}
