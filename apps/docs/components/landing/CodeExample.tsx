import { codeToHtml } from 'shiki';

const code = `import { Select } from './components/ui/select'

export default function Deploy() {
  return (
    <Select
      label="Where to deploy?"
      items={[
        { label: 'AWS',     value: 'aws'     },
        { label: 'Vercel',  value: 'vercel'  },
        { label: 'Railway', value: 'railway' },
      ]}
      onSelect={(item) => deploy(item.value)}
    />
  )
}`;

export default async function CodeExample() {
  const highlightedCode = await codeToHtml(code, {
    lang: 'tsx',
    theme: 'github-dark',
  });

  return (
    <section
      style={{
        padding: '80px 24px',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-alt)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: '1.8rem',
            fontWeight: 700,
            marginBottom: 12,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
          }}
        >
          Simple API. Real results.
        </h2>
        <p
          style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            marginBottom: 48,
            fontSize: '1rem',
          }}
        >
          Write React. Get a terminal UI. No configuration required.
        </p>

        <div className="code-split">
          {/* Code panel — always dark */}
          <div
            style={{
              background: '#18181B',
              border: '1px solid #27272A',
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '10px 16px',
                borderBottom: '1px solid #27272A',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ color: '#71717A', fontSize: '0.75rem', fontFamily: 'var(--font-geist-mono, monospace)' }}>
                deploy.tsx
              </span>
              <span
                style={{
                  background: 'rgba(6, 182, 212, 0.1)',
                  color: '#06B6D4',
                  fontSize: '0.7rem',
                  padding: '2px 8px',
                  borderRadius: 4,
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  fontFamily: 'var(--font-geist-mono, monospace)',
                }}
              >
                tsx
              </span>
            </div>
            <div
              style={{ fontFamily: 'var(--font-geist-mono, monospace)' }}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </div>

          {/* Arrow */}
          <div
            className="code-split-arrow"
            style={{ color: 'var(--text-faint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>

          {/* Terminal output — always dark */}
          <div className="terminal-window" style={{ padding: 20 }}>
            <div style={{ color: '#A1A1AA', marginBottom: 16, fontSize: '0.85rem' }}>
              ? Where to deploy?
            </div>
            <div style={{ marginBottom: 4 }}>
              <span style={{ color: '#06B6D4' }}>❯ </span>
              <span
                style={{
                  background: 'rgba(6, 182, 212, 0.15)',
                  color: '#06B6D4',
                  padding: '1px 8px',
                  borderRadius: 3,
                  fontSize: '0.85rem',
                }}
              >
                AWS
              </span>
            </div>
            <div style={{ color: '#52525B', marginBottom: 4, paddingLeft: 18, fontSize: '0.85rem' }}>Vercel</div>
            <div style={{ color: '#52525B', paddingLeft: 18, marginBottom: 24, fontSize: '0.85rem' }}>Railway</div>
            <div style={{ color: '#3F3F46', fontSize: '0.72rem' }}>
              Use ↑↓ to navigate, Enter to select
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
