'use client';

import Link from 'next/link';
import { useState } from 'react';

const components = [
  // Phase 1 & 2
  { slug: 'spinner',          name: 'Spinner',         desc: 'Loading states',          preview: '⠹ Loading data...',                                              previewColor: '#06B6D4', pkg: 'spinner'          },
  { slug: 'badge',            name: 'Badge',            desc: 'Status labels',           preview: ' success   warning   error ',                                    previewColor: '#22C55E', pkg: 'badge'            },
  { slug: 'progress-bar',     name: 'ProgressBar',      desc: 'Progress tracking',       preview: '████████████░░░░ 67%',                                           previewColor: '#06B6D4', pkg: 'progress-bar'     },
  { slug: 'text-input',       name: 'TextInput',        desc: 'Interactive input',       preview: '❯ Enter name: Kamlesh_',                                         previewColor: '#A1A1AA', pkg: 'text-input'       },
  { slug: 'select',           name: 'Select',           desc: 'Single selection',        preview: '❯ Option 1\n  Option 2\n  Option 3',                             previewColor: '#A1A1AA', pkg: 'select'           },
  { slug: 'multi-select',     name: 'MultiSelect',      desc: 'Multiple selection',      preview: '◉ Item 1\n◯ Item 2\n◉ Item 3',                                   previewColor: '#A1A1AA', pkg: 'multi-select'     },
  { slug: 'table',            name: 'Table',            desc: 'Data display',            preview: '╭──────────╮\n│ Name  ID │\n│ Ink   1  │\n╰──────────╯',          previewColor: '#A1A1AA', pkg: 'table'            },
  { slug: 'dialog',           name: 'Dialog',           desc: 'Confirmations',           preview: '╭─ Confirm ─╮\n│ Delete?   │\n╰──── OK ───╯',                   previewColor: '#A1A1AA', pkg: 'dialog'           },
  { slug: 'toast',            name: 'Toast',            desc: 'Notifications',           preview: '✓ Deployed!\n⚠ Deprecated pkgs\n✕ Error',                       previewColor: '#22C55E', pkg: 'toast'            },
  { slug: 'status-indicator', name: 'StatusIndicator',  desc: 'Service health',          preview: '● API       online\n◌ DB        syncing\n○ CDN       offline',   previewColor: '#22C55E', pkg: 'status-indicator' },
  { slug: 'loading-bar',      name: 'LoadingBar',       desc: 'Indeterminate bar',       preview: '▓▓▓▓▓▓░░░░░░ 52%',                                              previewColor: '#06B6D4', pkg: 'loading-bar'      },
  { slug: 'confirm',          name: 'Confirm',          desc: 'Yes/no prompts',          preview: '? Deploy to prod? (y/N)',                                        previewColor: '#A1A1AA', pkg: 'confirm'          },
  { slug: 'key-hint',         name: 'KeyHint',          desc: 'Keyboard hints',          preview: '[↑↓] Navigate\n[Enter] Select\n[Esc] Cancel',                   previewColor: '#71717A', pkg: 'key-hint'         },
  { slug: 'divider',          name: 'Divider',          desc: 'Section separator',       preview: '── Config ──────────\n════════════════════',                    previewColor: '#71717A', pkg: 'divider'          },
  { slug: 'header',           name: 'Header',           desc: 'App header bar',          preview: '┌─── MyApp v1.0 ───┐\n│                  │\n└──────────────────┘', previewColor: '#A1A1AA', pkg: 'header'         },
  { slug: 'panel',            name: 'Panel',            desc: 'Bordered layout',         preview: '╭─ Panel ──╮\n│ content  │\n╰──────────╯',                      previewColor: '#A1A1AA', pkg: 'panel'            },
  // Phase 3A — Layout & Navigation
  { slug: 'scroll-area',      name: 'ScrollArea',       desc: 'Scrollable region',       preview: 'Line 1\nLine 2\n▌Line 3\nLine 4\nLine 5  █',                    previewColor: '#06B6D4', pkg: 'scroll-area'      },
  { slug: 'tabs',             name: 'Tabs',             desc: 'Tab panels',              preview: 'Files  Logs  Config\n──────\ncontent here',                      previewColor: '#A855F7', pkg: 'tabs'             },
  { slug: 'accordion',        name: 'Accordion',        desc: 'Expand/collapse',         preview: '▾ API Settings\n│ base: localhost\n▸ Deployment',                previewColor: '#A855F7', pkg: 'accordion'        },
  // Phase 3B — AI-Era
  { slug: 'streaming-text',   name: 'StreamingText',    desc: 'LLM token streaming',     preview: '◆ Analyzing your code..._',                                      previewColor: '#06B6D4', pkg: 'streaming-text'   },
  { slug: 'token-counter',    name: 'TokenCounter',     desc: 'Token budget display',    preview: '████████░░░░ 2048/4096\n50% used',                               previewColor: '#22C55E', pkg: 'token-counter'    },
  { slug: 'code-block',       name: 'CodeBlock',        desc: 'Syntax highlighting',     preview: '1 │ import express\n2 │ const app = express()\n3 │ app.listen(3000)', previewColor: '#EAB308', pkg: 'code-block'  },
  { slug: 'diff-view',        name: 'DiffView',         desc: 'Unified diffs',           preview: '+ const PORT = process.env.PORT\n- const PORT = 3000',           previewColor: '#22C55E', pkg: 'diff-view'        },
  { slug: 'typewriter',       name: 'Typewriter',       desc: 'Typing animation',        preview: 'Welcome to InkUI._',                                             previewColor: '#E2E8F0', pkg: 'typewriter'       },
  // Phase 3C — Data & Power
  { slug: 'tree-view',        name: 'TreeView',         desc: 'Hierarchical data',       preview: '▾ src/\n  ▾ components/\n    Button.tsx\n  index.ts',             previewColor: '#06B6D4', pkg: 'tree-view'        },
  { slug: 'autocomplete',     name: 'Autocomplete',     desc: 'Filtered suggestions',    preview: '? Package: rea█\n❯ react\n  react-dom\n  react-query',            previewColor: '#A855F7', pkg: 'autocomplete'     },
  { slug: 'stepper',          name: 'Stepper',          desc: 'Multi-step wizard',       preview: '① ── ② ── ③ ── ④\nInstall  Config  Deploy',                     previewColor: '#22C55E', pkg: 'stepper'          },
  { slug: 'data-table',       name: 'DataTable',        desc: 'Sort, filter, paginate',  preview: '┌────────┬──────┐\n│ nginx  │ run  │\n│ node   │ run  │\n└────────┴──────┘', previewColor: '#06B6D4', pkg: 'data-table' },
  { slug: 'gauge',            name: 'Gauge',            desc: 'Metric with thresholds',  preview: 'CPU ████████░░░░ 72%\n⚡ Warning',                               previewColor: '#EAB308', pkg: 'gauge'            },
  { slug: 'sparkline',        name: 'Sparkline',        desc: 'Inline mini chart',       preview: '▁▃▅▇█▆▄▂▃▅▇█▆▃▁',                                              previewColor: '#22C55E', pkg: 'sparkline'        },
  { slug: 'markdown',         name: 'Markdown',         desc: 'Terminal Markdown',       preview: '# Heading\n> blockquote\n- **bold** and `code`',                  previewColor: '#E2E8F0', pkg: 'markdown'         },
  { slug: 'json-viewer',      name: 'JSONViewer',       desc: 'JSON explorer',           preview: '▾ root\n  "name": "InkUI"\n  ▸ "config": {...}',                  previewColor: '#A855F7', pkg: 'json-viewer'      },
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
    <section id="components" style={{ padding: '96px 24px', background: 'var(--bg-alt)' }}>
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
            All 32 components
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
