'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const CMD = 'npx inkui add spinner table select';

export default function InstallBanner() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section
      style={{
        padding: '80px 24px',
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <h2
          style={{
            fontSize: '1.8rem',
            fontWeight: 700,
            marginBottom: 32,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
          }}
        >
          Start in seconds.
        </h2>

        {/* Command box — always dark */}
        <div
          style={{
            background: '#18181B',
            border: '1px solid #27272A',
            borderRadius: 8,
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-geist-mono, monospace)',
            fontSize: '0.9rem',
            marginBottom: 16,
          }}
        >
          <span>
            <span style={{ color: '#71717A' }}>$ </span>
            <span style={{ color: '#06B6D4' }}>{CMD}</span>
            <span className="cursor-blink" style={{ color: '#06B6D4', marginLeft: 2 }}>█</span>
          </span>
          <button
            onClick={handleCopy}
            style={{
              background: 'none',
              border: '1px solid #3F3F46',
              borderRadius: 6,
              padding: '4px 10px',
              color: copied ? '#22C55E' : '#A1A1AA',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.78rem',
              transition: 'color 0.2s',
            }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Or install directly:{' '}
          <code
            style={{
              color: 'var(--text-secondary)',
              background: 'var(--code-bg)',
              padding: '2px 6px',
              borderRadius: 4,
              fontFamily: 'var(--font-geist-mono, monospace)',
            }}
          >
            npm install @inkui-cli/spinner
          </code>
        </p>
      </div>
    </section>
  );
}
