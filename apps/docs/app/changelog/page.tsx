import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog · InkUI',
  description: 'Release history for InkUI — the terminal component library for Ink.',
};

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = 'Added' | 'Fixed' | 'Changed';

interface Entry {
  category: Category;
  text: string;
  highlight?: string;
}

interface Release {
  version: string;
  date: string;
  entries: Entry[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const releases: Release[] = [
  {
    version: 'v0.4.0',
    date: 'April 12, 2026',
    entries: [
      { category: 'Added', highlight: 'ScrollArea, Tabs, Accordion, Panel/SplitPane', text: '— Phase 3A layout & navigation components' },
      { category: 'Added', highlight: 'StreamingText, TokenCounter, CodeBlock, DiffView, Typewriter', text: '— Phase 3B AI-era components for LLM-powered CLIs' },
      { category: 'Added', highlight: 'TreeView, Autocomplete, Stepper, DataTable, Gauge, Sparkline, Markdown, JSONViewer', text: '— Phase 3C data & power components' },
      { category: 'Added', highlight: 'useFocusManager, useKeyBindings, useTerminalSize, useAsync', text: '— Phase 3D hooks package for common CLI patterns' },
      { category: 'Added', text: 'Live animated previews for all 17 new components in the docs' },
      { category: 'Added', text: 'SplitPane added to the Panel package — flex-ratio based split layout' },
      { category: 'Changed', text: 'Component count updated to 32 across docs landing page, stats bar, and component grid' },
      { category: 'Changed', text: 'README updated to list all 32 components with install commands' },
      { category: 'Changed', text: 'Changelog and docs now reflect Phase 3 additions' },
    ],
  },
  {
    version: 'v0.3.0',
    date: 'April 9, 2026',
    entries: [
      { category: 'Added', highlight: 'npx inkui theme', text: '— interactive visual theme builder: preview and generate custom themes directly in the terminal' },
      { category: 'Added', highlight: 'Docs search', text: '— full-text search across all documentation pages' },
      { category: 'Added', highlight: 'Live component previews', text: '— interactive demos embedded directly in component docs pages' },
      { category: 'Added', highlight: 'WebGL hero background', text: '— Hyperspeed-style animated canvas on the landing page' },
      { category: 'Added', highlight: '"Built with InkUI" showcase', text: '— community projects section on the landing page' },
      { category: 'Fixed', text: 'Mobile layout overflow and nav icon alignment' },
      { category: 'Fixed', text: 'Sidebar sticky scroll behaviour' },
      { category: 'Fixed', text: 'Cursor glow intensity on landing page' },
      { category: 'Fixed', text: 'Dark theme CSS variables forced at :root — fixes invisible text on mobile' },
      { category: 'Fixed', text: 'Docs table-of-contents dead space removed' },
      { category: 'Changed', text: 'Landing page hero redesigned with terminal background and hover animations' },
      { category: 'Changed', text: 'Footer and landing page nav links synced and updated' },
    ],
  },
  {
    version: 'v0.2.0',
    date: 'April 9, 2026',
    entries: [
      { category: 'Added', highlight: 'Toast, StatusIndicator, LoadingBar, Confirm, KeyHint, Divider, Header', text: '— 7 new components' },
      { category: 'Added', highlight: 'Panel', text: '— bordered box with an optional title embedded in the top border' },
      { category: 'Added', highlight: 'npx inkui playground', text: '— interactive component browser in the terminal' },
      { category: 'Added', highlight: 'git-tidy showcase', text: '— interactive git branch cleanup CLI built with InkUI' },
      { category: 'Added', highlight: 'inkui-sysmon showcase', text: '— terminal system monitor built with InkUI' },
      { category: 'Added', text: 'Full light/dark theme support with CSS variables throughout the docs site' },
      { category: 'Added', text: 'Mobile navigation menu' },
      { category: 'Added', text: 'CONTRIBUTING.md, GitHub issue templates, and PR template' },
      { category: 'Fixed', text: 'Critical registry gaps and stale content in component docs' },
      { category: 'Fixed', text: 'Mobile responsiveness and version badge visibility on landing page' },
      { category: 'Fixed', text: 'npm auth token wiring for CI publish workflow' },
      { category: 'Fixed', text: 'Changeset publish workflow reliability' },
      { category: 'Changed', text: 'Landing page logo, favicon, and full visual overhaul' },
      { category: 'Changed', text: 'README updated to reflect all 15 components' },
      { category: 'Changed', highlight: '@inkui → @inkui-cli', text: '— npm scope rename' },
    ],
  },
  {
    version: 'v0.1.0',
    date: 'April 7, 2026',
    entries: [
      { category: 'Added', highlight: '@inkui-cli/core', text: '— design tokens (border styles, spinner frames, spacing) and built-in darkTheme / lightTheme' },
      { category: 'Added', highlight: 'Spinner, Badge, ProgressBar, TextInput, Select, MultiSelect, Table, Dialog', text: '— 8 launch components' },
      { category: 'Added', highlight: 'npx inkui add <component>', text: '— copy-paste installation model, same pattern as shadcn/ui' },
      { category: 'Added', text: 'TypeScript-first with full type exports' },
      { category: 'Added', text: 'ESM + CJS dual builds via tsup, compatible with Ink 6 / Node 20+' },
      { category: 'Added', text: 'Turborepo monorepo with per-package build and test pipelines' },
      { category: 'Added', text: 'InkUI docs website — component reference pages and getting started guide' },
      { category: 'Added', text: 'Demo GIF and launch-ready README' },
    ],
  },
];

// ─── Category config ──────────────────────────────────────────────────────────

const CAT: Record<Category, { color: string; bg: string; border: string }> = {
  Added:   { color: '#22C55E', bg: 'rgba(34,197,94,0.08)',  border: 'rgba(34,197,94,0.22)'  },
  Fixed:   { color: '#06B6D4', bg: 'rgba(6,182,212,0.08)',  border: 'rgba(6,182,212,0.22)'  },
  Changed: { color: '#A855F7', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.22)' },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Badge({ category }: { category: Category }) {
  const c = CAT[category];
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      fontSize: '0.6rem',
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
      color: c.color,
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: 4,
      padding: '1px 7px',
      fontFamily: 'var(--font-geist-mono, monospace)',
      flexShrink: 0,
      whiteSpace: 'nowrap' as const,
    }}>
      {category}
    </span>
  );
}

function EntryRow({ entry }: { entry: Entry }) {
  const c = CAT[entry.category];
  return (
    <li style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
      padding: '11px 0',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      {/* Glowing dot */}
      <span style={{
        width: 6, height: 6,
        borderRadius: '50%',
        background: c.color,
        boxShadow: `0 0 6px ${c.color}`,
        flexShrink: 0,
        marginTop: 9,
      }} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ marginBottom: 4 }}>
          <Badge category={entry.category} />
        </div>
        <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
          {entry.highlight && (
            <code style={{
              fontFamily: 'var(--font-geist-mono, monospace)',
              fontSize: '0.78rem',
              color: 'var(--text)',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border)',
              borderRadius: 4,
              padding: '1px 6px',
              marginRight: 5,
              wordBreak: 'break-word' as const,
            }}>
              {entry.highlight}
            </code>
          )}
          {entry.text}
        </p>
      </div>
    </li>
  );
}

function ReleaseCard({ release, isLatest }: { release: Release; isLatest: boolean }) {
  const added   = release.entries.filter(e => e.category === 'Added');
  const fixed   = release.entries.filter(e => e.category === 'Fixed');
  const changed = release.entries.filter(e => e.category === 'Changed');
  const stats   = ([['Added', added], ['Fixed', fixed], ['Changed', changed]] as [Category, Entry[]][])
    .filter(([, items]) => items.length > 0);

  return (
    <div className="cl-row">
      {/* Timeline spine */}
      <div className="cl-spine">
        <div style={{
          width: 34, height: 34,
          borderRadius: '50%',
          background: isLatest ? 'linear-gradient(135deg, #06B6D4, #A855F7)' : 'var(--surface)',
          border: isLatest ? 'none' : '2px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.65rem', fontWeight: 800,
          color: isLatest ? '#fff' : 'var(--text-muted)',
          fontFamily: 'var(--font-geist-mono, monospace)',
          flexShrink: 0,
          boxShadow: isLatest ? '0 0 18px rgba(6,182,212,0.45)' : 'none',
        }}>
          {isLatest ? '★' : '○'}
        </div>
        <div style={{
          width: 1, flex: 1,
          background: 'linear-gradient(to bottom, var(--border), transparent)',
          marginTop: 6, minHeight: 32,
        }} />
      </div>

      {/* Card */}
      <div style={{
        flex: 1, minWidth: 0,
        background: 'var(--surface)',
        border: `1px solid ${isLatest ? 'rgba(6,182,212,0.28)' : 'var(--border)'}`,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 8,
        boxShadow: isLatest ? '0 0 48px rgba(6,182,212,0.07), 0 2px 24px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.2)',
      }}>

        {/* Header */}
        <div
          className="cl-card-header"
          style={{
            borderBottom: '1px solid var(--border)',
            background: isLatest ? 'rgba(6,182,212,0.04)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap' as const,
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h2 style={{
              margin: 0,
              fontSize: '1.4rem',
              fontWeight: 800,
              fontFamily: 'var(--font-geist-mono, monospace)',
              letterSpacing: '-0.02em',
              ...(isLatest ? {
                background: 'linear-gradient(135deg, #06B6D4, #A855F7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              } : { color: 'var(--text)' }),
            }}>
              {release.version}
            </h2>
            {isLatest && <span className="version-badge">latest</span>}
          </div>
          <span style={{
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-geist-mono, monospace)',
            flexShrink: 0,
          }}>
            {release.date}
          </span>
        </div>

        {/* Stats bar */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
          {stats.map(([cat, items]) => {
            const c = CAT[cat];
            return (
              <div key={cat} className="cl-stats-cell">
                <div style={{
                  fontSize: '1.2rem', fontWeight: 700,
                  color: c.color,
                  fontFamily: 'var(--font-geist-mono, monospace)',
                  lineHeight: 1,
                }}>
                  {items.length}
                </div>
                <div style={{
                  fontSize: '0.62rem', color: 'var(--text-muted)',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.06em', fontWeight: 600,
                  marginTop: 3,
                }}>
                  {cat}
                </div>
              </div>
            );
          })}
        </div>

        {/* Entries */}
        <ul className="cl-entry-list">
          {release.entries.map((entry, i) => (
            <EntryRow key={i} entry={entry} />
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ChangelogPage() {
  return (
    <>
      {/* Page header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          fontSize: '0.68rem', fontWeight: 700,
          color: '#06B6D4', textTransform: 'uppercase' as const,
          letterSpacing: '0.1em',
          fontFamily: 'var(--font-geist-mono, monospace)',
          marginBottom: 14,
          background: 'rgba(6,182,212,0.08)',
          border: '1px solid rgba(6,182,212,0.22)',
          borderRadius: 20, padding: '4px 14px',
        }}>
          <span style={{ fontSize: '0.5rem' }}>●</span> Release History
        </div>

        <h1 style={{
          fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
          fontWeight: 800, letterSpacing: '-0.03em',
          margin: '0 0 10px',
          background: 'linear-gradient(135deg, #FAFAFA 40%, #5E7A96)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.15,
        }}>
          Changelog
        </h1>

        <p style={{
          fontSize: '0.95rem', color: 'var(--text-muted)',
          margin: '0 0 20px', lineHeight: 1.7, maxWidth: 480,
        }}>
          Every release of InkUI — what was added, fixed, and changed.
        </p>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' as const }}>
          {(['Added', 'Fixed', 'Changed'] as Category[]).map(cat => (
            <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: CAT[cat].color,
                boxShadow: `0 0 5px ${CAT[cat].color}`,
              }} />
              <span style={{
                fontSize: '0.75rem', color: 'var(--text-muted)',
                fontFamily: 'var(--font-geist-mono, monospace)',
              }}>
                {cat}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        {releases.map((release, i) => (
          <ReleaseCard key={release.version} release={release} isLatest={i === 0} />
        ))}
      </div>
    </>
  );
}
