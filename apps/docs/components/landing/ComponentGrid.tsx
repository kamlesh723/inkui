'use client';

import Link from 'next/link';
import { useState } from 'react';

const components = [
  {
    slug: 'spinner',
    name: 'Spinner',
    desc: 'Loading states',
    preview: '⠹ Loading data...',
    previewColor: '#06B6D4',
  },
  {
    slug: 'badge',
    name: 'Badge',
    desc: 'Status labels',
    preview: ' success   warning   error ',
    previewLines: [
      { text: ' success ', color: '#22C55E' },
      { text: ' warning ', color: '#EAB308' },
      { text: ' error ', color: '#EF4444' },
    ],
  },
  {
    slug: 'progress-bar',
    name: 'ProgressBar',
    desc: 'Progress tracking',
    preview: '████████████░░░░ 67%',
    previewColor: '#06B6D4',
  },
  {
    slug: 'text-input',
    name: 'TextInput',
    desc: 'Interactive input',
    preview: '❯ Enter name: Kamlesh_',
    previewColor: '#A1A1AA',
  },
  {
    slug: 'select',
    name: 'Select',
    desc: 'Single selection',
    preview: '❯ Option 1\n  Option 2\n  Option 3',
    previewColor: '#A1A1AA',
  },
  {
    slug: 'multi-select',
    name: 'MultiSelect',
    desc: 'Multiple selection',
    preview: '◉ Item 1\n◯ Item 2\n◉ Item 3',
    previewColor: '#A1A1AA',
  },
  {
    slug: 'table',
    name: 'Table',
    desc: 'Data display',
    preview: '╭──────────╮\n│ Name  ID │\n│ Ink   1  │\n╰──────────╯',
    previewColor: '#A1A1AA',
  },
  {
    slug: 'dialog',
    name: 'Dialog',
    desc: 'Confirmations',
    preview: '╭─ Confirm ─╮\n│ Delete?   │\n╰──── OK ───╯',
    previewColor: '#A1A1AA',
  },
];

function ComponentCard({ slug, name, desc, preview, previewColor }: (typeof components)[0]) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/docs/components/${slug}`}
      style={{ textDecoration: 'none' }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#141417',
          border: `1px solid ${hovered ? 'rgba(6, 182, 212, 0.5)' : '#27272A'}`,
          borderRadius: 10,
          padding: '16px',
          cursor: 'pointer',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: hovered
            ? '0 8px 30px rgba(6, 182, 212, 0.1)'
            : '0 0 0 transparent',
          transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 5, marginBottom: 14 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EAB308' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }} />
        </div>

        {/* Preview */}
        <div
          style={{
            fontFamily: 'var(--font-geist-mono, monospace)',
            fontSize: '0.72rem',
            color: previewColor ?? '#A1A1AA',
            minHeight: 56,
            whiteSpace: 'pre',
            lineHeight: 1.5,
            marginBottom: 14,
          }}
        >
          {preview}
        </div>

        {/* Name + desc */}
        <div style={{ color: '#FAFAFA', fontWeight: 600, fontSize: '0.875rem', marginBottom: 2 }}>
          {name}
        </div>
        <div style={{ color: '#71717A', fontSize: '0.78rem' }}>{desc}</div>
      </div>
    </Link>
  );
}

export default function ComponentGrid() {
  return (
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: '1.8rem',
            fontWeight: 700,
            marginBottom: 12,
            letterSpacing: '-0.02em',
          }}
        >
          All components
        </h2>
        <p style={{ textAlign: 'center', color: '#A1A1AA', marginBottom: 48, fontSize: '1rem' }}>
          Copy-paste any component into your project. You own the code.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 16,
          }}
        >
          {components.map((c) => (
            <ComponentCard key={c.slug} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
