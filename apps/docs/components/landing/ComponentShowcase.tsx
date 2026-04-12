'use client';

import { useState, useEffect, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';

// ── Animated preview data ──────────────────────────────────────────────────

const DOTS = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const SELECT_OPTS = ['development', 'staging', 'production'];

// ── Component showcase items ───────────────────────────────────────────────

const ITEMS = [
  {
    id: 'spinner',
    label: 'Spinner',
    accent: '#06B6D4',
    desc: 'Loading states with 4 animation styles',
    code: `import { Spinner } from './components/spinner';
import { darkTheme } from './components/core';

export default function App() {
  return (
    <Spinner
      type="dots"
      label="Deploying to production..."
      theme={darkTheme}
    />
  );
}`,
  },
  {
    id: 'table',
    label: 'Table',
    accent: '#22C55E',
    desc: 'Generic typed data grids with auto column sizing',
    code: `import { Table } from './components/table';

const processes = [
  { name: 'nginx', pid: 1234, status: 'running' },
  { name: 'node',  pid: 5678, status: 'running' },
  { name: 'redis', pid: 9012, status: 'stopped' },
];

export default function App() {
  return <Table data={processes} />;
}`,
  },
  {
    id: 'select',
    label: 'Select',
    accent: '#A855F7',
    desc: 'Keyboard-navigable single-select menu',
    code: `import { Select } from './components/select';

export default function App() {
  return (
    <Select
      label="Deploy target"
      options={[
        'development',
        'staging',
        'production',
      ]}
      onSelect={(env) => deploy(env)}
    />
  );
}`,
  },
  {
    id: 'progress',
    label: 'Progress',
    accent: '#06B6D4',
    desc: 'Determinate and indeterminate progress bars',
    code: `import { useState, useEffect } from 'react';
import { ProgressBar } from './components/progress-bar';

export default function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setProgress((p) => Math.min(p + 2, 100)),
      80,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <ProgressBar
      value={progress}
      total={100}
      label="Bundling assets"
      showPercent
    />
  );
}`,
  },
  {
    id: 'toast',
    label: 'Toast',
    accent: '#22C55E',
    desc: 'Success, warning and error notifications',
    code: `import { Toast } from './components/toast';

export default function App() {
  return (
    <>
      <Toast
        type="success"
        message="Deployed to production!"
      />
      <Toast
        type="warning"
        message="3 deprecated packages"
      />
      <Toast
        type="error"
        message="TypeScript error in auth.ts"
      />
    </>
  );
}`,
  },
  {
    id: 'badge',
    label: 'Badge',
    accent: '#EAB308',
    desc: 'Color-coded status labels',
    code: `import { Badge } from './components/badge';

export default function App() {
  return (
    <>
      <Badge label="v2.1.0"   variant="success" />
      <Badge label="beta"     variant="warning" />
      <Badge label="archived" variant="error"   />
      <Badge label="new"      variant="info"    />
    </>
  );
}`,
  },
];

// ── Animated preview components ────────────────────────────────────────────

function SpinnerPreview() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setFrame((f) => (f + 1) % DOTS.length), 100);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ padding: '28px 24px', fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.88rem' }}>
      <span style={{ color: '#06B6D4' }}>{DOTS[frame]}</span>
      <span style={{ color: '#94A3B8' }}> Deploying to production...</span>
    </div>
  );
}

function TablePreview() {
  return (
    <div style={{ padding: '18px 20px', fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.76rem', lineHeight: 1.75, overflowX: 'auto' }}>
      <div style={{ color: '#2D4460' }}>{'┌─────────────┬──────┬──────────┐'}</div>
      <div>
        <span style={{ color: '#2D4460' }}>{'│ '}</span>
        <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{'Name        '}</span>
        <span style={{ color: '#2D4460' }}>{'│ '}</span>
        <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{' PID'}</span>
        <span style={{ color: '#2D4460' }}>{'  │ '}</span>
        <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{'Status  '}</span>
        <span style={{ color: '#2D4460' }}>{'│'}</span>
      </div>
      <div style={{ color: '#2D4460' }}>{'├─────────────┼──────┼──────────┤'}</div>
      {[
        { name: 'nginx', pid: '1234', status: 'running', sc: '#22C55E' },
        { name: 'node',  pid: '5678', status: 'running', sc: '#22C55E' },
        { name: 'redis', pid: '9012', status: 'stopped', sc: '#EF4444' },
      ].map((row) => (
        <div key={row.name}>
          <span style={{ color: '#2D4460' }}>{'│ '}</span>
          <span style={{ color: '#94A3B8' }}>{row.name.padEnd(12)}</span>
          <span style={{ color: '#2D4460' }}>{'│ '}</span>
          <span style={{ color: '#94A3B8' }}>{row.pid.padStart(4)+'  '}</span>
          <span style={{ color: '#2D4460' }}>{'│ '}</span>
          <span style={{ color: row.sc }}>{row.status.padEnd(8)}</span>
          <span style={{ color: '#2D4460' }}>{'│'}</span>
        </div>
      ))}
      <div style={{ color: '#2D4460' }}>{'└─────────────┴──────┴──────────┘'}</div>
    </div>
  );
}

function SelectPreview() {
  const [cursor, setCursor] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCursor((c) => (c + 1) % SELECT_OPTS.length), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ padding: '22px 24px', fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.88rem', lineHeight: 2.0 }}>
      <div style={{ marginBottom: 4 }}>
        <span style={{ color: '#A855F7' }}>?</span>
        <span style={{ color: '#E2E8F0' }}> Deploy target</span>
      </div>
      {SELECT_OPTS.map((opt, i) => (
        <div key={opt} style={{ color: i === cursor ? '#E2E8F0' : '#3D5068' }}>
          <span style={{ color: i === cursor ? '#A855F7' : 'transparent' }}>❯</span>
          {' '}{opt}
        </div>
      ))}
    </div>
  );
}

function ProgressPreview() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setValue((v) => v >= 100 ? 0 : v + 1.8), 60);
    return () => clearInterval(t);
  }, []);
  const filled = Math.round((value / 100) * 22);
  const empty  = 22 - filled;
  return (
    <div style={{ padding: '24px', fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.88rem' }}>
      <div style={{ color: '#94A3B8', marginBottom: 10 }}>Bundling assets</div>
      <div>
        <span style={{ color: '#06B6D4' }}>{'█'.repeat(filled)}</span>
        <span style={{ color: '#0F2535' }}>{'░'.repeat(empty)}</span>
        <span style={{ color: '#E2E8F0' }}> {Math.round(value)}%</span>
      </div>
    </div>
  );
}

function ToastPreview() {
  return (
    <div style={{ padding: '22px 24px', fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.85rem', lineHeight: 2.2 }}>
      <div><span style={{ color: '#22C55E' }}>✓</span><span style={{ color: '#94A3B8' }}> Deployed to production!</span></div>
      <div><span style={{ color: '#EAB308' }}>⚠</span><span style={{ color: '#94A3B8' }}> 3 deprecated packages</span></div>
      <div><span style={{ color: '#EF4444' }}>✕</span><span style={{ color: '#94A3B8' }}> TypeScript error in auth.ts</span></div>
    </div>
  );
}

function BadgePreview() {
  const badges = [
    { label: 'v2.1.0',   r: 34,  g: 197, b: 94,  c: '#22C55E' },
    { label: 'beta',     r: 234, g: 179, b: 8,   c: '#EAB308' },
    { label: 'archived', r: 239, g: 68,  b: 68,  c: '#EF4444' },
    { label: 'new',      r: 6,   g: 182, b: 212, c: '#06B6D4' },
  ];
  return (
    <div style={{ padding: '24px', fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.82rem', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
      {badges.map(({ label, r, g, b, c }) => (
        <span
          key={label}
          style={{
            background: `rgba(${r},${g},${b},0.12)`,
            color: c,
            border: `1px solid rgba(${r},${g},${b},0.28)`,
            padding: '3px 12px',
            borderRadius: 4,
          }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

const PREVIEWS: Record<string, () => React.ReactElement> = {
  spinner: SpinnerPreview,
  table:   TablePreview,
  select:  SelectPreview,
  progress: ProgressPreview,
  toast:   ToastPreview,
  badge:   BadgePreview,
};

// ── Copy button ─────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  }, [text]);

  return (
    <button
      onClick={copy}
      aria-label="Copy code"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        padding: '5px 12px',
        background: copied ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 6,
        color: copied ? '#22C55E' : '#5E7A96',
        fontSize: '0.75rem',
        cursor: 'pointer',
        transition: 'all 0.15s',
        fontFamily: 'var(--font-geist-mono, monospace)',
        whiteSpace: 'nowrap',
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

// ── Main export ─────────────────────────────────────────────────────────────

export default function ComponentShowcase() {
  const [activeId, setActiveId] = useState('spinner');
  const active     = ITEMS.find((it) => it.id === activeId)!;
  const PreviewComp = PREVIEWS[activeId];

  return (
    <section
      id="components"
      className="landing-section"
      style={{
        padding: '96px 24px',
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>

        {/* ── Header ─── */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              background: 'rgba(6,182,212,0.08)',
              border: '1px solid rgba(6,182,212,0.2)',
              borderRadius: 20,
              padding: '4px 14px',
              marginBottom: 18,
              fontSize: '0.76rem',
              color: '#06B6D4',
              fontFamily: 'var(--font-geist-mono, monospace)',
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}
          >
            $ npx inkui add &lt;component&gt;
          </div>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: 'var(--text)',
              marginBottom: 14,
            }}
          >
            Pick a component. Copy. Ship.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 460, margin: '0 auto', lineHeight: 1.7 }}>
            Every component is copied into your project — no black-box dependency. You own and modify the source.
          </p>
        </div>

        {/* ── Tabs ─── */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            marginBottom: 16,
            overflowX: 'auto',
            paddingBottom: 4,
            scrollbarWidth: 'none',
          }}
        >
          {ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                style={{
                  padding: '6px 18px',
                  borderRadius: 8,
                  border: `1px solid ${isActive ? item.accent + '44' : 'var(--border)'}`,
                  background: isActive ? item.accent + '12' : 'transparent',
                  color: isActive ? item.accent : 'var(--text-secondary)',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s',
                  fontFamily: 'inherit',
                  flexShrink: 0,
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* ── Panel ─── */}
        <div
          className="showcase-panel"
          style={{
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 12,
            overflow: 'hidden',
            background: '#060F1C',
          }}
        >
          {/* Preview column */}
          <div
            className="showcase-preview"
            style={{
              borderRight: '1px solid rgba(255,255,255,0.07)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 280,
            }}
          >
            {/* Titlebar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '10px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(0,0,0,0.25)',
            }}>
              {['#EF4444', '#EAB308', '#22C55E'].map((c) => (
                <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, display: 'inline-block' }} />
              ))}
              <span style={{ marginLeft: 8, color: '#2D4460', fontSize: '0.72rem', fontFamily: 'var(--font-geist-mono, monospace)' }}>
                ~/my-cli
              </span>
            </div>
            {/* Animated content */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <PreviewComp key={activeId} />
            </div>
            {/* Footer label */}
            <div style={{
              padding: '9px 16px',
              borderTop: '1px solid rgba(255,255,255,0.04)',
              color: '#2D4460',
              fontSize: '0.68rem',
              fontFamily: 'var(--font-geist-mono, monospace)',
            }}>
              {active.desc}
            </div>
          </div>

          {/* Code column */}
          <div className="showcase-code" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Code titlebar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 14px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(0,0,0,0.25)',
            }}>
              <span style={{ color: '#2D4460', fontSize: '0.72rem', fontFamily: 'var(--font-geist-mono, monospace)' }}>
                app.tsx
              </span>
              <CopyButton text={active.code} />
            </div>
            {/* Code */}
            <pre
              style={{
                margin: 0,
                padding: '20px',
                fontFamily: 'var(--font-geist-mono, monospace)',
                fontSize: '0.78rem',
                lineHeight: 1.8,
                color: '#94A3B8',
                overflow: 'auto',
                flex: 1,
                whiteSpace: 'pre',
                background: 'transparent',
              }}
            >
              <code>{active.code}</code>
            </pre>
          </div>
        </div>

        {/* ── Browse all link ─── */}
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <a
            href="/docs/components/spinner"
            style={{
              color: '#06B6D4',
              fontSize: '0.875rem',
              textDecoration: 'none',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              opacity: 0.85,
              transition: 'opacity 0.15s',
            }}
          >
            Browse all 32 components →
          </a>
        </div>
      </div>
    </section>
  );
}
