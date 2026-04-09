'use client';

import { useEffect, useState } from 'react';

type Line =
  | { type: 'cmd'; text: string }
  | { type: 'success'; text: string }
  | { type: 'table' }
  | { type: 'blank' };

const CMD = 'npx inkui add table';

const SEQUENCE: Line[] = [
  { type: 'cmd', text: CMD },
  { type: 'success', text: '✔ Added table' },
  { type: 'blank' },
  { type: 'table' },
];

const CHAR_DELAY = 55;
const LINE_DELAY = 380;
const LOOP_PAUSE = 3200;

// Table border strings — exact character widths: col1=14, col2=5, col3=10
const T_TOP = '┌──────────────┬─────┬──────────┐';
const T_MID = '├──────────────┼─────┼──────────┤';
const T_BOT = '└──────────────┴─────┴──────────┘';

export default function TerminalHero() {
  const [visibleLines, setVisibleLines] = useState<Line[]>([]);
  const [cmdText, setCmdText] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Use a local flag per effect invocation — prevents StrictMode double-run
    let active = true;

    async function runSequence() {
      while (active) {
        setVisibleLines([]);
        setCmdText('');
        setDone(false);

        for (let i = 0; i <= CMD.length; i++) {
          if (!active) return;
          setCmdText(CMD.slice(0, i));
          await sleep(CHAR_DELAY);
        }
        if (!active) return;
        setDone(true);

        for (let i = 1; i < SEQUENCE.length; i++) {
          if (!active) return;
          await sleep(LINE_DELAY);
          setVisibleLines((prev) => [...prev, SEQUENCE[i]!]);
        }

        await sleep(LOOP_PAUSE);
      }
    }

    runSequence();
    return () => { active = false; };
  }, []);

  return (
    <div className="terminal-window">
      {/* Title bar */}
      <div className="terminal-titlebar">
        <div className="terminal-dot terminal-dot-red" />
        <div className="terminal-dot terminal-dot-yellow" />
        <div className="terminal-dot terminal-dot-green" />
        <span className="terminal-path" style={{ marginLeft: 8 }}>~/my-cli</span>
      </div>

      {/* Body — left-aligned so table chars line up */}
      <div style={{ padding: '18px 22px', minHeight: 210, textAlign: 'left' }}>
        {/* Prompt + typed command */}
        <div style={{ marginBottom: 4 }}>
          <span style={{ color: '#5E7A96', marginRight: 6 }}>$</span>
          <span style={{ color: '#06B6D4' }}>{cmdText}</span>
          {!done && (
            <span className="cursor-blink" style={{ color: '#06B6D4', marginLeft: 1 }}>▋</span>
          )}
        </div>

        {visibleLines.map((line, i) => {
          if (line.type === 'blank') return <div key={i} style={{ height: 6 }} />;

          if (line.type === 'success') {
            return (
              <div key={i} style={{ color: '#22C55E', fontSize: '0.8rem', marginBottom: 2 }}>
                {line.text}
              </div>
            );
          }

          if (line.type === 'table') {
            return (
              <div
                key={i}
                style={{
                  fontFamily: 'var(--font-geist-mono, monospace)',
                  fontSize: '0.8rem',
                  lineHeight: 1.55,
                  whiteSpace: 'pre',
                }}
              >
                <div style={{ color: '#06B6D4' }}>{T_TOP}</div>
                <div>
                  <span style={{ color: '#06B6D4' }}>│</span>
                  <span style={{ color: '#FAFAFA', fontWeight: 600 }}>{' Name         '}</span>
                  <span style={{ color: '#06B6D4' }}>│</span>
                  <span style={{ color: '#FAFAFA', fontWeight: 600 }}>{' ID  '}</span>
                  <span style={{ color: '#06B6D4' }}>│</span>
                  <span style={{ color: '#FAFAFA', fontWeight: 600 }}>{' Status   '}</span>
                  <span style={{ color: '#06B6D4' }}>│</span>
                </div>
                <div style={{ color: '#06B6D4' }}>{T_MID}</div>
                {[
                  { name: 'Ink          ', id: '1   ', status: 'Active   ' },
                  { name: 'Node.js      ', id: '2   ', status: 'Active   ' },
                  { name: 'React        ', id: '3   ', status: 'Active   ' },
                ].map((row, ri) => (
                  <div key={ri}>
                    <span style={{ color: '#06B6D4' }}>│</span>
                    <span style={{ color: '#E2E8F0' }}>{' ' + row.name}</span>
                    <span style={{ color: '#06B6D4' }}>│</span>
                    <span style={{ color: '#E2E8F0' }}>{' ' + row.id}</span>
                    <span style={{ color: '#06B6D4' }}>│</span>
                    <span style={{ color: '#22C55E' }}>{' ' + row.status}</span>
                    <span style={{ color: '#06B6D4' }}>│</span>
                  </div>
                ))}
                <div style={{ color: '#06B6D4' }}>{T_BOT}</div>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
