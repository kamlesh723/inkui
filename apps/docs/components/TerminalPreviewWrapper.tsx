'use client';

import type React from 'react';
import dynamic from 'next/dynamic';

// next/dynamic with ssr:false must live in a Client Component (Next.js 15)
const TerminalPreview: React.ComponentType<{ component: string; staticPreview: string }> = dynamic(
  () => import('./TerminalPreview').then((m) => m.TerminalPreview),
  {
    ssr: false,
    loading: () => (
      <div className="terminal-wrap">
        <div className="terminal-bar">
          <div className="terminal-dot" style={{ background: '#f85149' }} />
          <div className="terminal-dot" style={{ background: '#e3b341' }} />
          <div className="terminal-dot" style={{ background: '#56d364' }} />
          <span className="terminal-label">○ loading preview…</span>
        </div>
        <div className="terminal-body">
          <div className="terminal-static" style={{ color: 'var(--text-muted)' }}>
            loading…
          </div>
        </div>
      </div>
    ),
  },
);

export { TerminalPreview };
