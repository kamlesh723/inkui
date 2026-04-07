'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TerminalPreviewProps {
  /** Component slug used as the ?component= query param for the PTY server */
  component: string;
  /** Static preview shown before/instead of the live terminal */
  staticPreview: string;
}

/**
 * Live terminal preview via xterm.js ↔ WebSocket ↔ node-pty.
 *
 * Falls back to a static ASCII preview if:
 *   • The PTY WebSocket server isn't running (localhost:3001)
 *   • The browser doesn't support WebSocket
 *   • xterm.js fails to load
 *
 * To start the PTY server: pnpm dev:pty  (runs server/pty-server.ts)
 */
export const TerminalPreview: React.FC<TerminalPreviewProps> = ({
  component,
  staticPreview,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'connecting' | 'live' | 'static'>('connecting');

  useEffect(() => {
    let terminal: import('@xterm/xterm').Terminal | null = null;
    let ws: WebSocket | null = null;
    let cancelled = false;

    (async () => {
      try {
        const { Terminal }    = await import('@xterm/xterm');
        const { FitAddon }    = await import('@xterm/addon-fit');
        const { WebLinksAddon } = await import('@xterm/addon-web-links');

        if (cancelled || !containerRef.current) return;

        terminal = new Terminal({
          theme: {
            background: '#0d1117',
            foreground: '#c9d1d9',
            cursor:     '#58a6ff',
            black:      '#0d1117',
            brightBlack:'#6e7681',
            red:        '#f85149',
            green:      '#56d364',
            yellow:     '#e3b341',
            blue:       '#58a6ff',
            magenta:    '#d2a8ff',
            cyan:       '#39c5cf',
            white:      '#b1bac4',
          },
          fontFamily: "'Cascadia Code', 'JetBrains Mono', 'Fira Code', monospace",
          fontSize: 13,
          lineHeight: 1.5,
          cursorBlink: true,
          scrollback: 500,
          allowTransparency: true,
        });

        const fitAddon    = new FitAddon();
        const linksAddon  = new WebLinksAddon();
        terminal.loadAddon(fitAddon);
        terminal.loadAddon(linksAddon);
        terminal.open(containerRef.current);
        fitAddon.fit();

        // Connect to PTY server
        ws = new WebSocket(`ws://localhost:3001?component=${component}`);

        ws.onopen = () => {
          if (!cancelled) setStatus('live');
        };

        ws.onerror = () => {
          if (!cancelled) {
            setStatus('static');
            terminal?.dispose();
          }
        };

        ws.onmessage = (e) => {
          if (!cancelled) terminal?.write(
            e.data instanceof Blob
              ? e.data.arrayBuffer().then((buf) => new Uint8Array(buf))
              : e.data,
          );
        };

        terminal.onData((data) => ws?.readyState === WebSocket.OPEN && ws.send(data));

        // Resize sync
        const observer = new ResizeObserver(() => fitAddon.fit());
        observer.observe(containerRef.current);

        return () => observer.disconnect();
      } catch {
        if (!cancelled) setStatus('static');
      }
    })();

    return () => {
      cancelled = true;
      ws?.close();
      terminal?.dispose();
    };
  }, [component]);

  return (
    <div className="terminal-wrap">
      {/* Title bar */}
      <div className="terminal-bar">
        <div className="terminal-dot" style={{ background: '#f85149' }} />
        <div className="terminal-dot" style={{ background: '#e3b341' }} />
        <div className="terminal-dot" style={{ background: '#56d364' }} />
        <span className="terminal-label">
          {status === 'live'
            ? `● live · pnpm -F @inkui/${component} demo`
            : status === 'connecting'
            ? '○ connecting to pty-server…'
            : '○ static preview  ·  run pnpm dev:pty for live'}
        </span>
      </div>

      {/* Live xterm container — shown once connected */}
      <div
        ref={containerRef}
        style={{
          display: status === 'live' ? 'block' : 'none',
          padding: '8px',
          minHeight: '220px',
        }}
      />

      {/* Static fallback */}
      {status !== 'live' ? (
        <div className="terminal-body">
          <div className="terminal-static">{staticPreview}</div>
        </div>
      ) : null}
    </div>
  );
};
