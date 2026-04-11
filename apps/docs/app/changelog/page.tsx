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
  highlight?: string; // bold component/feature name at start
}

interface Release {
  version: string;
  date: string;
  entries: Entry[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const releases: Release[] = [
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
      { category: 'Added', highlight: 'Panel', text: '— bordered box component with an optional title embedded in the top border' },
      { category: 'Added', highlight: 'npx inkui playground', text: '— interactive component browser directly in the terminal' },
      { category: 'Added', highlight: 'git-tidy showcase', text: '— interactive git branch cleanup CLI built entirely with InkUI components' },
      { category: 'Added', highlight: 'inkui-sysmon showcase', text: '— terminal system monitor built with InkUI components' },
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
      { category: 'Added', text: 'InkUI docs website — Phase 1 (component reference pages, getting started guide)' },
      { category: 'Added', text: 'Demo GIF and launch-ready README' },
    ],
  },
];

// ─── Category config ──────────────────────────────────────────────────────────

const categoryConfig: Record<Category, { color: string; bg: string; border: string; dot: string }> = {
  Added:   { color: '#22C55E', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.2)',   dot: '#22C55E' },
  Fixed:   { color: '#06B6D4', bg: 'rgba(6,182,212,0.08)',   border: 'rgba(6,182,212,0.2)',   dot: '#06B6D4' },
  Changed: { color: '#A855F7', bg: 'rgba(168,85,247,0.08)',  border: 'rgba(168,85,247,0.2)',  dot: '#A855F7' },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: Category }) {
  const cfg = categoryConfig[category];
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontSize: '0.65rem',
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: cfg.color,
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      borderRadius: 4,
      padding: '2px 8px',
      fontFamily: 'var(--font-geist-mono, monospace)',
      flexShrink: 0,
    }}>
      {category}
    </span>
  );
}

function EntryItem({ entry }: { entry: Entry }) {
  const cfg = categoryConfig[entry.category];
  return (
    <li style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      padding: '10px 0',
      borderBottom: '1px solid var(--border-subtle)',
      listStyle: 'none',
    }}>
      {/* Colored dot */}
      <span style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: cfg.dot,
        flexShrink: 0,
        marginTop: 8,
        boxShadow: `0 0 6px ${cfg.dot}`,
      }} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <CategoryBadge category={entry.category} />
        <p style={{
          margin: '6px 0 0',
          fontSize: '0.92rem',
          lineHeight: 1.65,
          color: 'var(--text-secondary)',
        }}>
          {entry.highlight && (
            <code style={{
              fontFamily: 'var(--font-geist-mono, monospace)',
              fontSize: '0.82rem',
              color: 'var(--text)',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border)',
              borderRadius: 4,
              padding: '1px 6px',
              marginRight: 4,
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

  return (
    <div style={{ display: 'flex', gap: 24, marginBottom: 64 }}>
      {/* Timeline spine */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: isLatest
            ? 'linear-gradient(135deg, #06B6D4, #A855F7)'
            : 'var(--surface)',
          border: isLatest ? 'none' : '2px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.6rem',
          fontWeight: 800,
          color: isLatest ? '#fff' : 'var(--text-muted)',
          fontFamily: 'var(--font-geist-mono, monospace)',
          flexShrink: 0,
          boxShadow: isLatest ? '0 0 20px rgba(6,182,212,0.4)' : 'none',
        }}>
          {isLatest ? '★' : '○'}
        </div>
        <div style={{
          width: 1,
          flex: 1,
          background: 'linear-gradient(to bottom, var(--border), transparent)',
          marginTop: 8,
          minHeight: 40,
        }} />
      </div>

      {/* Card */}
      <div style={{
        flex: 1,
        minWidth: 0,
        background: 'var(--surface)',
        border: `1px solid ${isLatest ? 'rgba(6,182,212,0.25)' : 'var(--border)'}`,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 8,
        boxShadow: isLatest ? '0 0 40px rgba(6,182,212,0.06)' : 'none',
      }}>
        {/* Card header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border)',
          background: isLatest ? 'rgba(6,182,212,0.04)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h2 style={{
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: 800,
              fontFamily: 'var(--font-geist-mono, monospace)',
              background: isLatest ? 'linear-gradient(135deg, #06B6D4, #A855F7)' : 'none',
              WebkitBackgroundClip: isLatest ? 'text' : 'unset',
              WebkitTextFillColor: isLatest ? 'transparent' : 'var(--text)',
              backgroundClip: isLatest ? 'text' : 'unset',
              letterSpacing: '-0.02em',
            }}>
              {release.version}
            </h2>
            {isLatest && (
              <span className="version-badge">latest</span>
            )}
          </div>
          <span style={{
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-geist-mono, monospace)',
          }}>
            {release.date}
          </span>
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'flex',
          gap: 0,
          borderBottom: '1px solid var(--border)',
        }}>
          {([['Added', added], ['Fixed', fixed], ['Changed', changed]] as [Category, Entry[]][])
            .filter(([, items]) => items.length > 0)
            .map(([cat, items]) => {
              const cfg = categoryConfig[cat];
              return (
                <div key={cat} style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRight: '1px solid var(--border)',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: cfg.color,
                    fontFamily: 'var(--font-geist-mono, monospace)',
                  }}>
                    {items.length}
                  </div>
                  <div style={{
                    fontSize: '0.68rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    fontWeight: 600,
                  }}>
                    {cat}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Entries */}
        <ul style={{ margin: 0, padding: '4px 24px 8px', listStyle: 'none' }}>
          {release.entries.map((entry, i) => (
            <EntryItem key={i} entry={entry} />
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ChangelogPage() {
  return (
    <>
      {/* Page header */}
      <div style={{ marginBottom: 56 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontSize: '0.72rem',
          fontWeight: 600,
          color: '#06B6D4',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontFamily: 'var(--font-geist-mono, monospace)',
          marginBottom: 16,
          background: 'rgba(6,182,212,0.08)',
          border: '1px solid rgba(6,182,212,0.2)',
          borderRadius: 20,
          padding: '4px 14px',
        }}>
          <span style={{ fontSize: '0.65rem' }}>●</span> Release History
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 2.75rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          margin: '0 0 12px',
          background: 'linear-gradient(135deg, #FAFAFA 40%, #5E7A96)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.15,
        }}>
          Changelog
        </h1>

        <p style={{
          fontSize: '1rem',
          color: 'var(--text-muted)',
          margin: '0 0 24px',
          lineHeight: 1.7,
          maxWidth: 520,
        }}>
          Every release of InkUI, with what was added, fixed, and changed.
        </p>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {(['Added', 'Fixed', 'Changed'] as Category[]).map(cat => {
            const cfg = categoryConfig[cat];
            return (
              <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: cfg.dot,
                  boxShadow: `0 0 6px ${cfg.dot}`,
                }} />
                <span style={{
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-geist-mono, monospace)',
                }}>
                  {cat}
                </span>
              </div>
            );
          })}
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
