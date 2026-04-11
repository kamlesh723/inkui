'use client';

import { useState, useEffect, useCallback } from 'react';
import { Copy, Check, Eye } from 'lucide-react';

/* ── Animated preview atoms ──────────────────────────────────────── */
const DOTS = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const SELECT_OPTS = ['development', 'staging', 'production'];

function SpinnerPreview() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setFrame((f) => (f + 1) % DOTS.length), 100);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.88rem', padding: '0 4px' }}>
      <div style={{ marginBottom: 8, color: '#5E7A96', fontSize: '0.72rem' }}>Spinner · dots</div>
      <div>
        <span style={{ color: '#06B6D4' }}>{DOTS[frame]}</span>
        <span style={{ color: '#94A3B8' }}> Deploying to production...</span>
      </div>
      <div style={{ marginTop: 18 }}>
        <span style={{ color: '#A855F7' }}>{DOTS[(frame + 3) % DOTS.length]}</span>
        <span style={{ color: '#94A3B8' }}> Installing dependencies...</span>
      </div>
      <div style={{ marginTop: 18 }}>
        <span style={{ color: '#22C55E' }}>{DOTS[(frame + 6) % DOTS.length]}</span>
        <span style={{ color: '#94A3B8' }}> Running build...</span>
      </div>
    </div>
  );
}

function BadgePreview() {
  const badges = [
    { label: 'v2.1.0',   r: 34,  g: 197, b: 94,  c: '#22C55E' },
    { label: 'beta',     r: 234, g: 179, b: 8,   c: '#EAB308' },
    { label: 'archived', r: 239, g: 68,  b: 68,  c: '#EF4444' },
    { label: 'new',      r: 6,   g: 182, b: 212, c: '#06B6D4' },
    { label: 'stable',   r: 124, g: 58,  b: 237, c: '#7C3AED' },
  ];
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.82rem' }}>
      <div style={{ marginBottom: 12, color: '#5E7A96', fontSize: '0.72rem' }}>Badge · variants</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {badges.map(({ label, r, g, b, c }) => (
          <span
            key={label}
            style={{
              background: `rgba(${r},${g},${b},0.12)`,
              color: c,
              border: `1px solid rgba(${r},${g},${b},0.3)`,
              padding: '3px 12px',
              borderRadius: 4,
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProgressPreview() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 1.5)), 60);
    return () => clearInterval(t);
  }, []);
  const filled = Math.round((value / 100) * 28);
  const empty  = 28 - filled;
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.88rem' }}>
      <div style={{ marginBottom: 12, color: '#5E7A96', fontSize: '0.72rem' }}>ProgressBar · determinate</div>
      <div style={{ marginBottom: 10, color: '#94A3B8' }}>Bundling assets</div>
      <div style={{ marginBottom: 6 }}>
        <span style={{ color: '#06B6D4' }}>{'█'.repeat(filled)}</span>
        <span style={{ color: '#0F2535' }}>{'░'.repeat(empty)}</span>
        <span style={{ color: '#E2E8F0' }}> {Math.round(value)}%</span>
      </div>
      <div style={{ marginBottom: 10, color: '#94A3B8' }}>Installing deps</div>
      <div>
        <span style={{ color: '#A855F7' }}>{'█'.repeat(Math.round(((value + 30) % 100) / 100 * 28))}</span>
        <span style={{ color: '#0F2535' }}>{'░'.repeat(28 - Math.round(((value + 30) % 100) / 100 * 28))}</span>
        <span style={{ color: '#E2E8F0' }}> {Math.round((value + 30) % 100)}%</span>
      </div>
    </div>
  );
}

function SelectPreview() {
  const [cursor, setCursor] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCursor((c) => (c + 1) % SELECT_OPTS.length), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.88rem' }}>
      <div style={{ marginBottom: 12, color: '#5E7A96', fontSize: '0.72rem' }}>Select · keyboard nav</div>
      <div style={{ marginBottom: 6 }}>
        <span style={{ color: '#A855F7' }}>?</span>
        <span style={{ color: '#E2E8F0' }}> Deploy target</span>
      </div>
      {SELECT_OPTS.map((opt, i) => (
        <div key={opt} style={{ color: i === cursor ? '#E2E8F0' : '#3D5068', lineHeight: 2 }}>
          <span style={{ color: i === cursor ? '#A855F7' : 'transparent' }}>❯</span>
          {' '}{opt}
        </div>
      ))}
    </div>
  );
}

function TablePreview() {
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.78rem', lineHeight: 1.8 }}>
      <div style={{ marginBottom: 8, color: '#5E7A96', fontSize: '0.72rem' }}>Table · auto-column sizing</div>
      <div style={{ color: '#2D4460' }}>{'┌─────────────┬──────┬──────────┐'}</div>
      <div>
        <span style={{ color: '#2D4460' }}>{'│ '}</span>
        <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{'Name        '}</span>
        <span style={{ color: '#2D4460' }}>{'│ '}</span>
        <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{' PID'}</span>
        <span style={{ color: '#2D4460' }}>{'  │ '}</span>
        <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{'Status  '}</span>
        <span style={{ color: '#2D4460' }}>{'│'}</span>
      </div>
      <div style={{ color: '#2D4460' }}>{'├─────────────┼──────┼──────────┤'}</div>
      {[
        { name: 'nginx', pid: '1234', status: 'running', sc: '#22C55E' },
        { name: 'node',  pid: '5678', status: 'running', sc: '#22C55E' },
        { name: 'redis', pid: '9012', status: 'stopped', sc: '#EF4444' },
      ].map((row) => (
        <div key={row.name}>
          <span style={{ color: '#2D4460' }}>{'│ '}</span>
          <span style={{ color: '#94A3B8' }}>{row.name.padEnd(12)}</span>
          <span style={{ color: '#2D4460' }}>{'│ '}</span>
          <span style={{ color: '#94A3B8' }}>{row.pid.padStart(4) + '  '}</span>
          <span style={{ color: '#2D4460' }}>{'│ '}</span>
          <span style={{ color: row.sc }}>{row.status.padEnd(8)}</span>
          <span style={{ color: '#2D4460' }}>{'│'}</span>
        </div>
      ))}
      <div style={{ color: '#2D4460' }}>{'└─────────────┴──────┴──────────┘'}</div>
    </div>
  );
}

function ToastPreview() {
  const [visible, setVisible] = useState([true, true, true]);
  useEffect(() => {
    const t = setInterval(() => {
      setVisible([true, true, true]);
      setTimeout(() => setVisible([true, true, false]), 2000);
      setTimeout(() => setVisible([true, false, false]), 3500);
      setTimeout(() => setVisible([false, false, false]), 5000);
    }, 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.85rem' }}>
      <div style={{ marginBottom: 12, color: '#5E7A96', fontSize: '0.72rem' }}>Toast · notifications</div>
      {visible[0] && <div style={{ marginBottom: 8, transition: 'opacity 0.3s' }}><span style={{ color: '#22C55E' }}>✓</span><span style={{ color: '#94A3B8' }}> Deployed to production!</span></div>}
      {visible[1] && <div style={{ marginBottom: 8, transition: 'opacity 0.3s' }}><span style={{ color: '#EAB308' }}>⚠</span><span style={{ color: '#94A3B8' }}> 3 deprecated packages</span></div>}
      {visible[2] && <div style={{ transition: 'opacity 0.3s' }}><span style={{ color: '#EF4444' }}>✕</span><span style={{ color: '#94A3B8' }}> TypeScript error in auth.ts</span></div>}
    </div>
  );
}

function DialogPreview() {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setOpen((v) => !v), 2500);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.85rem' }}>
      <div style={{ marginBottom: 12, color: '#5E7A96', fontSize: '0.72rem' }}>Dialog · confirmation</div>
      <div style={{ color: '#94A3B8', marginBottom: 12 }}>Press <span style={{ color: '#06B6D4' }}>d</span> to open dialog</div>
      {open && (
        <div style={{
          border: '1px solid rgba(6,182,212,0.3)',
          borderRadius: 6,
          padding: '12px 16px',
          background: 'rgba(6,182,212,0.04)',
        }}>
          <div style={{ color: '#E2E8F0', marginBottom: 8, fontWeight: 600 }}>Confirm delete</div>
          <div style={{ color: '#5E7A96', marginBottom: 12, fontSize: '0.78rem' }}>This action cannot be undone.</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{ color: '#EF4444', cursor: 'pointer' }}>[Delete]</span>
            <span style={{ color: '#5E7A96', cursor: 'pointer' }}>[Cancel]</span>
          </div>
        </div>
      )}
    </div>
  );
}

function TextInputPreview() {
  const [text, setText] = useState('');
  const [blink, setBlink] = useState(true);
  const DEMO = 'my-cli-app';
  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i <= DEMO.length) { setText(DEMO.slice(0, i)); i++; }
      else { setTimeout(() => { i = 0; setText(''); }, 900); }
    }, 140);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.88rem' }}>
      <div style={{ marginBottom: 12, color: '#5E7A96', fontSize: '0.72rem' }}>TextInput · controlled</div>
      <div style={{ marginBottom: 8 }}>
        <span style={{ color: '#A855F7' }}>?</span>
        <span style={{ color: '#E2E8F0' }}> Project name</span>
      </div>
      <div>
        <span style={{ color: '#06B6D4' }}>❯ </span>
        <span style={{ color: '#E2E8F0' }}>{text}</span>
        <span style={{ color: '#06B6D4', opacity: blink ? 1 : 0 }}>█</span>
      </div>
    </div>
  );
}

function MultiSelectPreview() {
  const opts = ['TypeScript', 'ESLint', 'Prettier', 'Vitest'];
  const [cursor, setCursor] = useState(0);
  const [checked, setChecked] = useState(new Set([0, 2]));
  useEffect(() => {
    const t = setInterval(() => {
      setCursor((c) => {
        const next = (c + 1) % opts.length;
        setChecked((prev) => {
          const s = new Set(prev);
          if (s.has(next)) s.delete(next); else s.add(next);
          return s;
        });
        return next;
      });
    }, 800);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.88rem' }}>
      <div style={{ marginBottom: 12, color: '#5E7A96', fontSize: '0.72rem' }}>MultiSelect · space to toggle</div>
      <div style={{ marginBottom: 8 }}>
        <span style={{ color: '#A855F7' }}>?</span>
        <span style={{ color: '#E2E8F0' }}> Select features</span>
      </div>
      {opts.map((opt, i) => (
        <div key={opt} style={{ lineHeight: 2, color: i === cursor ? '#E2E8F0' : '#3D5068' }}>
          <span style={{ color: i === cursor ? '#A855F7' : 'transparent' }}>❯</span>
          {' '}
          <span style={{ color: checked.has(i) ? '#06B6D4' : '#3D5068' }}>
            {checked.has(i) ? '◉' : '○'}
          </span>
          {' '}{opt}
        </div>
      ))}
    </div>
  );
}

function StatusIndicatorPreview() {
  const [frame, setFrame] = useState(0);
  const PULSE = ['●', '◉', '◎', '○', '◎', '◉'];
  useEffect(() => {
    const t = setInterval(() => setFrame((f) => (f + 1) % PULSE.length), 300);
    return () => clearInterval(t);
  }, []);
  const statuses = [
    { label: 'API Server',   color: '#22C55E', dot: '●', static: true },
    { label: 'Database',     color: '#22C55E', dot: '●', static: true },
    { label: 'Build Queue',  color: '#06B6D4', dot: PULSE[frame], static: false },
    { label: 'Cache',        color: '#EAB308', dot: '●', static: true },
    { label: 'Worker',       color: '#EF4444', dot: '●', static: true },
  ];
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.86rem' }}>
      <div style={{ marginBottom: 12, color: '#5E7A96', fontSize: '0.72rem' }}>StatusIndicator · service health</div>
      {statuses.map(({ label, color, dot }) => (
        <div key={label} style={{ lineHeight: 2 }}>
          <span style={{ color }}>{dot}</span>
          <span style={{ color: '#94A3B8' }}> {label}</span>
        </div>
      ))}
    </div>
  );
}

function LoadingBarPreview() {
  const [pos, setPos] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPos((p) => (p + 1.2) % 36), 40);
    return () => clearInterval(t);
  }, []);
  const BAR = 32;
  const sweep = 8;
  const bar = Array.from({ length: BAR }, (_, i) => {
    const d = ((i - pos + BAR) % BAR);
    const inSweep = d < sweep || d > BAR - sweep;
    return inSweep ? '█' : '░';
  }).join('');
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.88rem' }}>
      <div style={{ marginBottom: 12, color: '#5E7A96', fontSize: '0.72rem' }}>LoadingBar · indeterminate</div>
      <div style={{ color: '#94A3B8', marginBottom: 8 }}>Waiting for server...</div>
      <div>
        <span style={{ color: '#06B6D4' }}>{bar.slice(0, sweep)}</span>
        <span style={{ color: '#0F2535' }}>{bar.slice(sweep, BAR - sweep)}</span>
        <span style={{ color: '#06B6D4' }}>{bar.slice(BAR - sweep)}</span>
      </div>
    </div>
  );
}

function ConfirmPreview() {
  const [blink, setBlink] = useState(true);
  const [answered, setAnswered] = useState<null | boolean>(null);
  useEffect(() => {
    const tb = setInterval(() => setBlink((b) => !b), 530);
    const ta = setTimeout(() => {
      setAnswered(true);
      setTimeout(() => setAnswered(null), 2000);
    }, 2500);
    return () => { clearInterval(tb); clearTimeout(ta); };
  }, []);
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.88rem' }}>
      <div style={{ marginBottom: 12, color: '#5E7A96', fontSize: '0.72rem' }}>Confirm · y/N prompt</div>
      {answered === null ? (
        <div>
          <span style={{ color: '#EAB308' }}>?</span>
          <span style={{ color: '#E2E8F0' }}> Delete 3 files? </span>
          <span style={{ color: '#5E7A96' }}>(y/N) </span>
          <span style={{ color: '#06B6D4', opacity: blink ? 1 : 0 }}>█</span>
        </div>
      ) : (
        <>
          <div>
            <span style={{ color: '#EAB308' }}>?</span>
            <span style={{ color: '#E2E8F0' }}> Delete 3 files? </span>
            <span style={{ color: '#22C55E' }}>y</span>
          </div>
          <div style={{ marginTop: 8 }}>
            <span style={{ color: '#22C55E' }}>✓</span>
            <span style={{ color: '#94A3B8' }}> Deleted.</span>
          </div>
        </>
      )}
    </div>
  );
}

function KeyHintPreview() {
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.82rem' }}>
      <div style={{ marginBottom: 12, color: '#5E7A96', fontSize: '0.72rem' }}>KeyHint · shortcut row</div>
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
        {[
          { key: '↑↓', label: 'navigate' },
          { key: 'space', label: 'toggle' },
          { key: 'enter', label: 'confirm' },
          { key: 'esc', label: 'cancel' },
          { key: 'ctrl+c', label: 'quit' },
        ].map(({ key, label }) => (
          <span key={key}>
            <span style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 4,
              padding: '1px 7px',
              color: '#E2E8F0',
              fontSize: '0.78rem',
            }}>{key}</span>
            <span style={{ color: '#5E7A96', marginLeft: 5 }}>{label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function DividerPreview() {
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.82rem', width: '100%', overflow: 'hidden' }}>
      <div style={{ marginBottom: 12, color: '#5E7A96', fontSize: '0.72rem' }}>Divider · separator styles</div>
      {[
        { chars: '─', label: 'default',  color: '#2D4460' },
        { chars: '═', label: 'double',   color: '#3D5068' },
        { chars: '━', label: 'bold',     color: '#06B6D4' },
        { chars: '┄', label: 'dashed',   color: '#2D4460' },
      ].map(({ chars, label, color }) => (
        <div key={label} style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
          <span style={{ color: '#5E7A96', fontSize: '0.7rem', flexShrink: 0, minWidth: 48 }}>{label}</span>
          <span style={{ color, overflow: 'hidden', textOverflow: 'clip', whiteSpace: 'nowrap', flex: 1 }}>{chars.repeat(30)}</span>
        </div>
      ))}
    </div>
  );
}

function HeaderPreview() {
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.82rem', width: '100%' }}>
      <div style={{ marginBottom: 12, color: '#5E7A96', fontSize: '0.72rem' }}>Header · bar styles</div>
      <div style={{ marginBottom: 10, background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', padding: '5px 12px', borderRadius: 4, color: '#06B6D4' }}>
        ◆ MyApp <span style={{ color: '#3D5068' }}>v2.1.0</span>
      </div>
      <div style={{ color: '#2D4460', marginBottom: 10, overflow: 'hidden', whiteSpace: 'nowrap' }}>
        {'═'.repeat(28)}
      </div>
      <div style={{ color: '#5E7A96', marginBottom: 2, overflow: 'hidden', whiteSpace: 'nowrap' }}>{'┌' + '─'.repeat(26) + '┐'}</div>
      <div style={{ color: '#5E7A96', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        {'│'}<span style={{ color: '#E2E8F0' }}> Deploy Dashboard          </span>{'│'}
      </div>
      <div style={{ color: '#5E7A96', overflow: 'hidden', whiteSpace: 'nowrap' }}>{'└' + '─'.repeat(26) + '┘'}</div>
    </div>
  );
}

function GenericPreview({ id }: { id: string }) {
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.85rem', color: '#5E7A96' }}>
      <div style={{ marginBottom: 8, fontSize: '0.72rem' }}>{id} · preview</div>
      <div style={{ color: '#94A3B8' }}>Component running in terminal...</div>
      <div style={{ marginTop: 8 }}>
        <span style={{ color: '#22C55E' }}>✓</span>
        <span style={{ color: '#5E7A96' }}> Ready</span>
      </div>
    </div>
  );
}

const PREVIEWS: Record<string, () => React.ReactElement> = {
  spinner:            SpinnerPreview,
  badge:              BadgePreview,
  'progress-bar':     ProgressPreview,
  select:             SelectPreview,
  'multi-select':     MultiSelectPreview,
  table:              TablePreview,
  toast:              ToastPreview,
  dialog:             DialogPreview,
  'text-input':       TextInputPreview,
  'status-indicator': StatusIndicatorPreview,
  'loading-bar':      LoadingBarPreview,
  confirm:            ConfirmPreview,
  'key-hint':         KeyHintPreview,
  divider:            DividerPreview,
  header:             HeaderPreview,
};

/* ── Copy button ─────────────────────────────────────────────────── */
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  }, [text]);
  return (
    <button
      onClick={copy}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '4px 10px',
        background: copied ? 'rgba(34,197,94,0.10)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${copied ? 'rgba(34,197,94,0.28)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 5,
        color: copied ? '#22C55E' : '#5E7A96',
        fontSize: '0.72rem',
        cursor: 'pointer',
        fontFamily: 'var(--font-geist-mono, monospace)',
        transition: 'all 0.15s',
      }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

/* ── Main export ─────────────────────────────────────────────────── */
export default function ComponentPreview({ id }: { id: string }) {
  const PreviewComp = PREVIEWS[id] ?? (() => <GenericPreview id={id} />);
  const installCmd  = `npx inkui add ${id}`;

  return (
    <div
      style={{
        margin: '24px 0 32px',
        border: '1px solid rgba(6,182,212,0.18)',
        borderRadius: 12,
        overflow: 'hidden',
        background: '#060F1C',
        boxShadow: '0 0 0 1px rgba(6,182,212,0.06), 0 8px 32px rgba(0,0,0,0.4)',
        maxWidth: '100%',
        boxSizing: 'border-box' as const,
      }}
    >
      {/* Titlebar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '9px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Window dots */}
          <div style={{ display: 'flex', gap: 5 }}>
            {['#EF4444', '#EAB308', '#22C55E'].map((c) => (
              <span
                key={c}
                style={{ width: 9, height: 9, borderRadius: '50%', background: c, display: 'inline-block', opacity: 0.8 }}
              />
            ))}
          </div>
          {/* Label */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              fontSize: '0.7rem',
              color: '#06B6D4',
              fontFamily: 'var(--font-geist-mono, monospace)',
              background: 'rgba(6,182,212,0.08)',
              border: '1px solid rgba(6,182,212,0.18)',
              borderRadius: 4,
              padding: '1px 8px',
            }}
          >
            <Eye size={10} />
            Live Preview
          </span>
        </div>
        <CopyBtn text={installCmd} />
      </div>

      {/* Preview area */}
      <div
        style={{
          padding: '24px 20px',
          minHeight: 120,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      >
        <PreviewComp key={id} />
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '8px 14px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          color: '#2D4460',
          fontSize: '0.68rem',
          fontFamily: 'var(--font-geist-mono, monospace)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>~/my-cli — node v22</span>
        <span style={{ color: 'rgba(34,197,94,0.5)' }}>● running</span>
      </div>
    </div>
  );
}
