'use client';

import { useEffect, useRef, useState } from 'react';

type Line =
  | { type: 'cmd'; text: string }
  | { type: 'success'; text: string }
  | { type: 'spinner' }
  | { type: 'table' }
  | { type: 'blank' };

const SEQUENCE: Line[] = [
  { type: 'cmd', text: 'npx inkui add spinner table select' },
  { type: 'success', text: '✔ Added spinner' },
  { type: 'success', text: '✔ Added table' },
  { type: 'success', text: '✔ Added select' },
  { type: 'blank' },
  { type: 'spinner' },
  { type: 'blank' },
  { type: 'table' },
];

const CHAR_DELAY = 50;
const LINE_DELAY = 350;
const LOOP_PAUSE = 3000;

export default function TerminalHero() {
  const [visibleLines, setVisibleLines] = useState<Line[]>([]);
  const [cmdText, setCmdText] = useState('');
  const [spinnerFrame, setSpinnerFrame] = useState(0);
  const mountedRef = useRef(true);

  const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

  useEffect(() => {
    let spinnerInterval: ReturnType<typeof setInterval> | null = null;

    spinnerInterval = setInterval(() => {
      setSpinnerFrame((f) => (f + 1) % spinnerFrames.length);
    }, 100);

    return () => {
      if (spinnerInterval) clearInterval(spinnerInterval);
    };
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    async function runSequence() {
      while (mountedRef.current) {
        setVisibleLines([]);
        setCmdText('');

        // Type out command
        const cmdLine = SEQUENCE[0] as { type: 'cmd'; text: string };
        for (let i = 0; i <= cmdLine.text.length; i++) {
          if (!mountedRef.current) return;
          setCmdText(cmdLine.text.slice(0, i));
          await sleep(CHAR_DELAY);
        }

        // Show rest of lines
        for (let i = 1; i < SEQUENCE.length; i++) {
          if (!mountedRef.current) return;
          await sleep(LINE_DELAY);
          setVisibleLines((prev) => [...prev, SEQUENCE[i]]);
        }

        await sleep(LOOP_PAUSE);
      }
    }

    runSequence();
    return () => {
      mountedRef.current = false;
    };
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

      {/* Terminal body */}
      <div style={{ padding: '16px 20px', minHeight: 240 }}>
        {/* Command line */}
        <div style={{ marginBottom: 4 }}>
          <span style={{ color: '#71717A' }}>$ </span>
          <span style={{ color: '#06B6D4' }}>{cmdText}</span>
          {cmdText.length < 'npx inkui add spinner table select'.length && (
            <span className="cursor-blink" style={{ color: '#06B6D4' }}>█</span>
          )}
        </div>

        {/* Animated lines */}
        {visibleLines.map((line, i) => {
          if (line.type === 'blank') {
            return <div key={i} style={{ height: 8 }} />;
          }

          if (line.type === 'success') {
            return (
              <div key={i} style={{ color: '#22C55E', marginBottom: 2 }}>
                {line.text}
              </div>
            );
          }

          if (line.type === 'spinner') {
            return (
              <div key={i} style={{ color: '#06B6D4', marginBottom: 2 }}>
                {spinnerFrames[spinnerFrame]} Loading data...
              </div>
            );
          }

          if (line.type === 'table') {
            return (
              <div
                key={i}
                style={{
                  color: '#A1A1AA',
                  fontFamily: 'var(--font-geist-mono, monospace)',
                  fontSize: '0.78rem',
                  lineHeight: 1.5,
                }}
              >
                <div>┌──────────────┬─────────┬─────────┐</div>
                <div>│ <span style={{ color: '#FAFAFA' }}>Name        </span> │ <span style={{ color: '#FAFAFA' }}>Status  </span> │ <span style={{ color: '#FAFAFA' }}>Score   </span> │</div>
                <div>├──────────────┼─────────┼─────────┤</div>
                <div>│ Kamlesh      │ <span style={{ color: '#22C55E' }}>Active  </span> │ 98/100  │</div>
                <div>│ Priya        │ <span style={{ color: '#22C55E' }}>Active  </span> │ 87/100  │</div>
                <div>└──────────────┴─────────┴─────────┘</div>
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
