'use client';

import Link from 'next/link';
import { useState } from 'react';

const components = [
  { slug: 'spinner',          name: 'Spinner',         desc: 'Loading states',     preview: '⠹ Loading data...',                                              previewColor: '#06B6D4', pkg: 'spinner'          },
  { slug: 'badge',            name: 'Badge',            desc: 'Status labels',      preview: ' success   warning   error ',                                    previewColor: '#22C55E', pkg: 'badge'            },
  { slug: 'progress-bar',     name: 'ProgressBar',      desc: 'Progress tracking',  preview: '████████████░░░░ 67%',                                           previewColor: '#06B6D4', pkg: 'progress-bar'     },
  { slug: 'text-input',       name: 'TextInput',        desc: 'Interactive input',  preview: '❯ Enter name: Kamlesh_',                                         previewColor: '#A1A1AA', pkg: 'text-input'       },
  { slug: 'select',           name: 'Select',           desc: 'Single selection',   preview: '❯ Option 1\n  Option 2\n  Option 3',                             previewColor: '#A1A1AA', pkg: 'select'           },
  { slug: 'multi-select',     name: 'MultiSelect',      desc: 'Multiple selection', preview: '◉ Item 1\n◯ Item 2\n◉ Item 3',                                   previewColor: '#A1A1AA', pkg: 'multi-select'     },
  { slug: 'table',            name: 'Table',            desc: 'Data display',       preview: '╭──────────╮\n│ Name  ID │\n│ Ink   1  │\n╰──────────╯',          previewColor: '#A1A1AA', pkg: 'table'            },
  { slug: 'dialog',           name: 'Dialog',           desc: 'Confirmations',      preview: '╭─ Confirm ─╮\n│ Delete?   │\n╰──── OK ───╯',                   previewColor: '#A1A1AA', pkg: 'dialog'           },
  { slug: 'toast',            name: 'Toast',            desc: 'Notifications',      preview: '✓ Deployed!\n⚠ Deprecated pkgs\n✕ Error',                       previewColor: '#22C55E', pkg: 'toast'            },
  { slug: 'status-indicator', name: 'StatusIndicator',  desc: 'Service health',     preview: '● API       online\n◌ DB        syncing\n○ CDN       offline',   previewColor: '#22C55E', pkg: 'status-indicator' },
  { slug: 'loading-bar',      name: 'LoadingBar',       desc: 'Indeterminate bar',  preview: '▓▓▓▓▓▓░░░░░░ 52%',                                              previewColor: '#06B6D4', pkg: 'loading-bar'      },
  { slug: 'confirm',          name: 'Confirm',          desc: 'Yes/no prompts',     preview: '? Deploy to prod? (y/N)',                                        previewColor: '#A1A1AA', pkg: 'confirm'          },
  { slug: 'key-hint',         name: 'KeyHint',          desc: 'Keyboard hints',     preview: '[↑↓] Navigate\n[Enter] Select\n[Esc] Cancel',                   previewColor: '#71717A', pkg: 'key-hint'         },
  { slug: 'divider',          name: 'Divider',          desc: 'Section separator',  preview: '── Config ──────────\n════════════════════',                    previewColor: '#71717A', pkg: 'divider'          },
  { slug: 'header',           name: 'Header',           desc: 'App header bar',     preview: '┌─── MyApp v1.0 ───┐\n│                  │\n└──────────────────┘', previewColor: '#A1A1AA', pkg: 'header'         },
];

// Map color to a subtle glow rgba
function toGlow(hex: string, alpha = 0.18) {
  const map: Record<string, string> = {
    '#06B6D4': `rgba(6,182,212,${alpha})`,
    '#22C55E': `rgba(34,197,94,${alpha})`,
    '#A1A1AA': `rgba(161,161,170,${alpha * 0.5})`,
    '#71717A': `rgba(113,113,122,${alpha * 0.5})`,
  };
  return map[hex] ?? `rgba(6,182,212,${alpha})`;
}

function ComponentCard({ slug, name, desc, preview, previewColor, pkg }: (typeof components)[0]) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/docs/components/${slug}`} style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'var(--surface)',
          border: `1px solid ${hovered ? previewColor + '55' : 'var(--border)'}`,
          borderRadius: 10,
          padding: '14px 14px 16px',
          cursor: 'pointer',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          boxShadow: hovered
            ? `0 8px 32px ${toGlow(previewColor)}, 0 2px 8px rgba(0,0,0,0.2)`
            : '0 1px 3px rgba(0,0,0,0.08)',
          transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.25s ease',
        }}
      >
        {/* Dark terminal preview area — always dark regardless of theme */}
        <div
          style={{
            background: '#0D0D10',
            border: '1px solid #27272A',
            borderRadius: 6,
            padding: '12px 14px',
            marginBottom: 14,
            minHeight: 76,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Subtle color glow in top-right corner of preview */}
          {hovered && (
            <div
              style={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 80,
                height: 80,
                background: `radial-gradient(circle, ${toGlow(previewColor, 0.35)} 0%, transparent 70%)`,
                pointerEvents: 'none',
              }}
            />
          )}
          <div
            style={{
              fontFamily: 'var(--font-geist-mono, monospace)',
              fontSize: '0.72rem',
              color: previewColor,
              whiteSpace: 'pre',
              lineHeight: 1.6,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {preview}
          </div>
        </div>

        {/* Footer row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
          <div>
            <div style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.875rem', marginBottom: 2 }}>
              {name}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{desc}</div>
          </div>
          <span
            style={{
              fontSize: '0.65rem',
              color: '#71717A',
              background: '#18181B',
              border: '1px solid #27272A',
              borderRadius: 4,
              padding: '2px 7px',
              fontFamily: 'var(--font-geist-mono, monospace)',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            {pkg}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ComponentGrid() {
  return (
    <section style={{ padding: '96px 24px', background: 'var(--bg-alt)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2rem)',
              fontWeight: 800,
              marginBottom: 12,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
            }}
          >
            All 15 components
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 480, margin: '0 auto' }}>
            Copy any component into your project. You own the code — no black-box dependencies.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
            gap: 14,
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
