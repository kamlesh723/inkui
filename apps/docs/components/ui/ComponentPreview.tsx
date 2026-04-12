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
  type ProcStatus = 'running' | 'stopped' | 'starting';
  const [redisStatus, setRedisStatus] = useState<ProcStatus>('stopped');
  useEffect(() => {
    const cycle = () => {
      setRedisStatus('starting');
      const t1 = setTimeout(() => setRedisStatus('running'), 1100);
      const t2 = setTimeout(() => setRedisStatus('stopped'), 3800);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    };
    cycle();
    const t = setInterval(cycle, 5200);
    return () => clearInterval(t);
  }, []);
  const sc: Record<ProcStatus, string> = { running: '#22C55E', stopped: '#EF4444', starting: '#EAB308' };
  const rows = [
    { name: 'nginx', pid: '1234', status: 'running' as ProcStatus },
    { name: 'node',  pid: '5678', status: 'running' as ProcStatus },
    { name: 'redis', pid: '9012', status: redisStatus },
  ];
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.78rem', lineHeight: 1.8 }}>
      <div style={{ marginBottom: 8, color: '#5E7A96', fontSize: '0.72rem' }}>Table · auto-column sizing</div>
      <div style={{ color: '#2D4460' }}>{'┌─────────────┬──────┬──────────┐'}</div>
      <div>
        <span style={{ color: '#2D4460' }}>{'│ '}</span><span style={{ color: '#E2E8F0', fontWeight: 600 }}>{'Name        '}</span>
        <span style={{ color: '#2D4460' }}>{'│ '}</span><span style={{ color: '#E2E8F0', fontWeight: 600 }}>{' PID'}</span>
        <span style={{ color: '#2D4460' }}>{'  │ '}</span><span style={{ color: '#E2E8F0', fontWeight: 600 }}>{'Status  '}</span>
        <span style={{ color: '#2D4460' }}>{'│'}</span>
      </div>
      <div style={{ color: '#2D4460' }}>{'├─────────────┼──────┼──────────┤'}</div>
      {rows.map((row) => (
        <div key={row.name}>
          <span style={{ color: '#2D4460' }}>{'│ '}</span>
          <span style={{ color: '#94A3B8' }}>{row.name.padEnd(12)}</span>
          <span style={{ color: '#2D4460' }}>{'│ '}</span>
          <span style={{ color: '#94A3B8' }}>{row.pid.padStart(4) + '  '}</span>
          <span style={{ color: '#2D4460' }}>{'│ '}</span>
          <span style={{ color: sc[row.status] }}>{row.status.padEnd(8)}</span>
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
  const PULSE = ['●', '◉', '◎', '○', '◎', '◉'];
  const [frame, setFrame] = useState(0);
  type S = 'online' | 'starting' | 'degraded' | 'offline';
  const [workerStatus, setWorkerStatus] = useState<S>('offline');
  useEffect(() => {
    const tp = setInterval(() => setFrame((f) => (f + 1) % PULSE.length), 280);
    const cycle = () => {
      setWorkerStatus('starting');
      const t1 = setTimeout(() => setWorkerStatus('online'), 1400);
      const t2 = setTimeout(() => setWorkerStatus('degraded'), 4000);
      const t3 = setTimeout(() => setWorkerStatus('offline'), 6200);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    };
    cycle();
    const tc = setInterval(cycle, 7500);
    return () => { clearInterval(tp); clearInterval(tc); };
  }, []);
  const workerColor: Record<S, string> = { online: '#22C55E', starting: '#EAB308', degraded: '#EF4444', offline: '#3D5068' };
  const workerDot: Record<S, string> = { online: '●', starting: PULSE[frame], degraded: '◈', offline: '○' };
  const statuses = [
    { label: 'API Server',  color: '#22C55E', dot: '●' },
    { label: 'Database',    color: '#22C55E', dot: '●' },
    { label: 'Build Queue', color: '#06B6D4', dot: PULSE[frame] },
    { label: 'Cache',       color: '#EAB308', dot: '◈' },
    { label: 'Worker',      color: workerColor[workerStatus], dot: workerDot[workerStatus] },
  ];
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.86rem' }}>
      <div style={{ marginBottom: 12, color: '#5E7A96', fontSize: '0.72rem' }}>StatusIndicator · service health</div>
      {statuses.map(({ label, color, dot }) => (
        <div key={label} style={{ lineHeight: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color }}>{dot}</span>
          <span style={{ color: '#94A3B8' }}>{label}</span>
          {label === 'Worker' && workerStatus !== 'online' && (
            <span style={{ color, fontSize: '0.65rem' }}>({workerStatus})</span>
          )}
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

function ScrollAreaPreview() {
  const [offset, setOffset] = useState(0);
  const lines = ['src/', '  index.ts', '  utils.ts', '  config.ts', '  types.ts', '  helpers.ts', '  api.ts', '  hooks.ts', '  styles.ts', '  tests/', '    setup.ts'];
  const visible = 5;
  useEffect(() => {
    const t = setInterval(() => setOffset((o) => (o + 1 >= lines.length - visible ? 0 : o + 1)), 700);
    return () => clearInterval(t);
  }, []);
  const thumb = Math.round((offset / (lines.length - visible)) * (visible - 1));
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.85rem' }}>
      <div style={{ marginBottom: 8, color: '#5E7A96', fontSize: '0.72rem' }}>ScrollArea · keyboard scroll</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <div>
          {lines.slice(offset, offset + visible).map((l, i) => (
            <div key={i} style={{ color: '#94A3B8', lineHeight: 1.8 }}>{l}</div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {Array.from({ length: visible }, (_, i) => (
            <span key={i} style={{ color: i === thumb ? '#06B6D4' : '#1E3A4A', lineHeight: 1.8 }}>█</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabsPreview() {
  const [active, setActive] = useState(0);
  const tabs = ['Files', 'Logs', 'Metrics', 'Config'];
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % tabs.length), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.85rem' }}>
      <div style={{ marginBottom: 10, color: '#5E7A96', fontSize: '0.72rem' }}>Tabs · underline variant</div>
      <div style={{ display: 'flex', gap: 18, marginBottom: 10, borderBottom: '1px solid #1E3A4A', paddingBottom: 6 }}>
        {tabs.map((tab, i) => (
          <span key={tab} style={{
            color: i === active ? '#06B6D4' : '#3D5068',
            fontWeight: i === active ? 700 : 400,
            borderBottom: i === active ? '2px solid #06B6D4' : '2px solid transparent',
            paddingBottom: 4,
            transition: 'all 0.2s',
          }}>{tab}</span>
        ))}
      </div>
      <div style={{ color: '#94A3B8', fontSize: '0.78rem' }}>
        {active === 0 && <span>src/<br/>  index.ts<br/>  utils.ts</span>}
        {active === 1 && <span><span style={{ color: '#22C55E' }}>✓</span> Build succeeded<br/><span style={{ color: '#EAB308' }}>⚠</span> 2 warnings</span>}
        {active === 2 && <span>CPU: 12%  Mem: 234MB<br/>Uptime: 3d 14h</span>}
        {active === 3 && <span>port: 3000<br/>debug: false</span>}
      </div>
    </div>
  );
}

function AccordionPreview() {
  const [open, setOpen] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setOpen((o) => (o + 1) % 3), 1800);
    return () => clearInterval(t);
  }, []);
  const sections = [
    { title: 'Database Config', content: 'host: localhost\nport: 5432\ndb: myapp' },
    { title: 'API Settings', content: 'base: https://api.example.com\ntimeout: 30s' },
    { title: 'Deployment', content: 'region: us-east-1\nreplicas: 3' },
  ];
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.85rem' }}>
      <div style={{ marginBottom: 10, color: '#5E7A96', fontSize: '0.72rem' }}>Accordion · single mode</div>
      {sections.map((s, i) => (
        <div key={s.title} style={{ marginBottom: 4 }}>
          <div style={{ color: i === open ? '#E2E8F0' : '#94A3B8', fontWeight: i === open ? 600 : 400 }}>
            <span style={{ color: i === open ? '#A855F7' : '#3D5068' }}>{i === open ? '▾' : '▸'}</span> {s.title}
          </div>
          {i === open && (
            <div style={{ color: '#5E7A96', paddingLeft: 14, marginTop: 2, fontSize: '0.78rem', borderLeft: '1px solid #1E3A4A' }}>
              {s.content.split('\n').map((line, j) => <div key={j}>{line}</div>)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function StreamingTextPreview() {
  const MESSAGES = [
    { role: 'user', text: 'Refactor this function to be async' },
    { role: 'ai',   text: "I'll convert this to async/await and handle errors gracefully..." },
    { role: 'user', text: 'Add TypeScript types' },
    { role: 'ai',   text: 'Adding strict types with proper generics and return annotations...' },
  ];
  const [msgIdx, setMsgIdx] = useState(0);
  const [chars, setChars] = useState(0);
  const [blink, setBlink] = useState(true);
  const msg = MESSAGES[msgIdx];
  useEffect(() => {
    const tb = setInterval(() => setBlink((b) => !b), 480);
    return () => clearInterval(tb);
  }, []);
  useEffect(() => {
    if (chars < msg.text.length) {
      const speed = msg.role === 'ai' ? 40 : 60;
      const t = setTimeout(() => setChars((c) => c + 1), speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setMsgIdx((m) => (m + 1) % MESSAGES.length); setChars(0); }, 1200);
      return () => clearTimeout(t);
    }
  }, [chars, msgIdx]);
  const done = chars >= msg.text.length;
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.82rem' }}>
      <div style={{ marginBottom: 10, color: '#5E7A96', fontSize: '0.72rem' }}>StreamingText · token-by-token output</div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.7 }}>
        <span style={{ color: msg.role === 'ai' ? '#A855F7' : '#06B6D4', flexShrink: 0 }}>
          {msg.role === 'ai' ? '◆' : '›'}
        </span>
        <span style={{ color: msg.role === 'ai' ? '#94A3B8' : '#E2E8F0' }}>
          {msg.text.slice(0, chars)}
          {!done && <span style={{ color: '#06B6D4', opacity: blink ? 1 : 0 }}>█</span>}
          {done && msg.role === 'ai' && <span style={{ color: '#22C55E' }}> ✓</span>}
        </span>
      </div>
    </div>
  );
}

function TokenCounterPreview() {
  const MAX = 4096;
  const [used, setUsed] = useState(640);
  useEffect(() => {
    // Simulate message bursts: +50–200 tokens per burst, reset near max
    const t = setInterval(() => setUsed((u) => {
      if (u >= 3700) return 320;
      return u + Math.floor(Math.random() * 150) + 50;
    }), 280);
    return () => clearInterval(t);
  }, []);
  // FIXED: clamp pct and filled so repeat() never gets a negative count
  const pct    = Math.min(1, used / MAX);
  const filled = Math.min(28, Math.max(0, Math.round(pct * 28)));
  const color  = pct > 0.85 ? '#EF4444' : pct > 0.65 ? '#EAB308' : '#22C55E';
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.85rem' }}>
      <div style={{ marginBottom: 10, color: '#5E7A96', fontSize: '0.72rem' }}>TokenCounter · context budget</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ color: '#5E7A96', fontSize: '0.72rem' }}>claude-3-5-sonnet</span>
        <span style={{ color, fontWeight: 700, fontSize: '0.78rem' }}>
          {used.toLocaleString()} / {MAX.toLocaleString()}
        </span>
      </div>
      <div style={{ marginBottom: 6 }}>
        <span style={{ color }}>{'█'.repeat(filled)}</span>
        <span style={{ color: '#0F2535' }}>{'░'.repeat(28 - filled)}</span>
      </div>
      <div style={{ fontSize: '0.68rem', color: pct > 0.85 ? '#EF4444' : pct > 0.65 ? '#EAB308' : '#3D5068' }}>
        {pct > 0.85 ? '⚠ Context nearly full — consider compressing'
          : pct > 0.65 ? `⚡ ${Math.max(0, MAX - used).toLocaleString()} tokens remaining`
          : `● ${Math.round(pct * 100)}% used · ${Math.max(0, MAX - used).toLocaleString()} remaining`}
      </div>
    </div>
  );
}

function CodeBlockPreview() {
  const [activeLine, setActiveLine] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveLine((l) => (l + 1) % 5), 900);
    return () => clearInterval(t);
  }, []);
  const hl = (i: number) => ({ background: activeLine === i ? 'rgba(6,182,212,0.1)' : 'transparent', display: 'block' });
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.78rem', lineHeight: 1.9 }}>
      <div style={{ marginBottom: 8, color: '#5E7A96', fontSize: '0.72rem' }}>CodeBlock · syntax highlight + line nav</div>
      <div style={{ color: '#2D4460' }}>╭─ server.ts ──────────────────────╮</div>
      <div style={hl(0)}><span style={{ color: '#2D4460' }}>│ </span><span style={{ color: '#3D5068' }}>1</span><span style={{ color: '#2D4460' }}> │ </span><span style={{ color: '#A855F7' }}>import</span><span style={{ color: '#94A3B8' }}> express </span><span style={{ color: '#A855F7' }}>from</span><span style={{ color: '#22C55E' }}> 'express'</span><span style={{ color: '#2D4460' }}> │</span></div>
      <div style={hl(1)}><span style={{ color: '#2D4460' }}>│ </span><span style={{ color: '#3D5068' }}>2</span><span style={{ color: '#2D4460' }}> │ </span><span style={{ color: '#A855F7' }}>import</span><span style={{ color: '#94A3B8' }}> path </span><span style={{ color: '#A855F7' }}>from</span><span style={{ color: '#22C55E' }}> 'path'</span><span style={{ color: '#2D4460' }}>   │</span></div>
      <div style={hl(2)}><span style={{ color: '#2D4460' }}>│ </span><span style={{ color: '#3D5068' }}>3</span><span style={{ color: '#2D4460' }}> │ </span><span style={{ color: '#A855F7' }}>const</span><span style={{ color: '#94A3B8' }}> app </span><span style={{ color: '#06B6D4' }}>=</span><span style={{ color: '#EAB308' }}> express</span><span style={{ color: '#94A3B8' }}>()</span><span style={{ color: '#2D4460' }}>   │</span></div>
      <div style={hl(3)}><span style={{ color: '#2D4460' }}>│ </span><span style={{ color: '#3D5068' }}>4</span><span style={{ color: '#2D4460' }}> │ </span><span style={{ color: '#A855F7' }}>const</span><span style={{ color: '#94A3B8' }}> PORT </span><span style={{ color: '#06B6D4' }}>=</span><span style={{ color: '#06B6D4' }}> 3000</span><span style={{ color: '#2D4460' }}>        │</span></div>
      <div style={hl(4)}><span style={{ color: '#2D4460' }}>│ </span><span style={{ color: '#3D5068' }}>5</span><span style={{ color: '#2D4460' }}> │ </span><span style={{ color: '#EAB308' }}>app</span><span style={{ color: '#94A3B8' }}>.</span><span style={{ color: '#EAB308' }}>listen</span><span style={{ color: '#94A3B8' }}>(PORT)</span><span style={{ color: '#2D4460' }}>     │</span></div>
      <div style={{ color: '#2D4460' }}>╰──────────────────────────────────╯</div>
    </div>
  );
}

function DiffViewPreview() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 2), 3000);
    return () => clearInterval(t);
  }, []);
  const diffs = [
    {
      hunk: '@@ -2,4 +2,5 @@',
      lines: [
        { type: ' ', text: "import express from 'express'" },
        { type: '-', text: 'const PORT = 3000' },
        { type: '+', text: 'const PORT = process.env.PORT ?? 3000' },
        { type: '+', text: "const HOST = '0.0.0.0'" },
        { type: ' ', text: 'app.listen(PORT)' },
      ],
    },
    {
      hunk: '@@ -8,3 +8,4 @@',
      lines: [
        { type: ' ', text: 'app.use(express.json())' },
        { type: '-', text: 'app.use(logger())' },
        { type: '+', text: 'app.use(morgan("combined"))' },
        { type: '+', text: 'app.use(cors({ origin: "*" }))' },
        { type: ' ', text: 'app.listen(PORT)' },
      ],
    },
  ];
  const diff = diffs[phase];
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.78rem', lineHeight: 1.85 }}>
      <div style={{ marginBottom: 8, color: '#5E7A96', fontSize: '0.72rem' }}>DiffView · unified diff viewer</div>
      <div style={{ color: '#3D5068' }}>{diff.hunk}</div>
      {diff.lines.map((l, i) => (
        <div key={i} style={{ background: l.type === '+' ? 'rgba(34,197,94,0.07)' : l.type === '-' ? 'rgba(239,68,68,0.07)' : 'transparent' }}>
          <span style={{ color: l.type === '+' ? '#22C55E' : l.type === '-' ? '#EF4444' : '#3D5068' }}>
            {l.type === ' ' ? ' ' : l.type}
          </span>
          <span style={{ color: l.type === '+' ? '#86EFAC' : l.type === '-' ? '#FCA5A5' : '#94A3B8' }}> {l.text}</span>
        </div>
      ))}
    </div>
  );
}

function TypewriterPreview() {
  const MESSAGES = ['Welcome to InkUI.', 'Build CLI apps fast.', 'Copy-paste components.'];
  const [msgIdx, setMsgIdx] = useState(0);
  const [chars, setChars] = useState(0);
  useEffect(() => {
    const msg = MESSAGES[msgIdx];
    if (chars < msg.length) {
      const t = setTimeout(() => setChars((c) => c + 1), 60);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setMsgIdx((m) => (m + 1) % MESSAGES.length); setChars(0); }, 1500);
      return () => clearTimeout(t);
    }
  }, [chars, msgIdx]);
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.88rem' }}>
      <div style={{ marginBottom: 10, color: '#5E7A96', fontSize: '0.72rem' }}>Typewriter · character animation</div>
      <span style={{ color: '#E2E8F0' }}>{MESSAGES[msgIdx].slice(0, chars)}</span>
      <span style={{ color: '#06B6D4' }}>_</span>
    </div>
  );
}

function TreeViewPreview() {
  const [expanded, setExpanded] = useState(new Set(['src', 'components']));
  useEffect(() => {
    const t = setInterval(() => {
      setExpanded((prev) => {
        const s = new Set(prev);
        if (s.has('components')) s.delete('components'); else s.add('components');
        return s;
      });
    }, 1400);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.82rem', lineHeight: 1.75 }}>
      <div style={{ marginBottom: 8, color: '#5E7A96', fontSize: '0.72rem' }}>TreeView · file explorer</div>
      <div><span style={{ color: expanded.has('src') ? '#A855F7' : '#3D5068' }}>{expanded.has('src') ? '▾' : '▸'}</span><span style={{ color: '#06B6D4' }}> src/</span></div>
      {expanded.has('src') && <>
        <div style={{ paddingLeft: 16 }}><span style={{ color: expanded.has('components') ? '#A855F7' : '#3D5068' }}>{expanded.has('components') ? '▾' : '▸'}</span><span style={{ color: '#94A3B8' }}> components/</span></div>
        {expanded.has('components') && <>
          <div style={{ paddingLeft: 32, color: '#5E7A96' }}>├ Button.tsx</div>
          <div style={{ paddingLeft: 32, color: '#5E7A96' }}>└ Input.tsx</div>
        </>}
        <div style={{ paddingLeft: 16, color: '#5E7A96' }}>├ index.ts</div>
        <div style={{ paddingLeft: 16, color: '#5E7A96' }}>└ utils.ts</div>
      </>}
    </div>
  );
}

function AutocompletePreview() {
  const OPTS = ['react', 'react-dom', 'react-query', 'react-router'];
  const [query, setQuery] = useState('');
  const [phase, setPhase] = useState(0); // 0=typing, 1=pause, 2=clearing
  useEffect(() => {
    const TYPE = 'reac';
    if (phase === 0) {
      if (query.length < TYPE.length) {
        const t = setTimeout(() => setQuery(TYPE.slice(0, query.length + 1)), 180);
        return () => clearTimeout(t);
      } else { const t = setTimeout(() => setPhase(1), 1200); return () => clearTimeout(t); }
    } else if (phase === 1) {
      const t = setTimeout(() => setPhase(2), 900);
      return () => clearTimeout(t);
    } else {
      if (query.length > 0) { const t = setTimeout(() => setQuery(query.slice(0, -1)), 80); return () => clearTimeout(t); }
      else { const t = setTimeout(() => setPhase(0), 400); return () => clearTimeout(t); }
    }
  }, [query, phase]);
  const filtered = query ? OPTS.filter((o) => o.startsWith(query)) : [];
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.85rem' }}>
      <div style={{ marginBottom: 8, color: '#5E7A96', fontSize: '0.72rem' }}>Autocomplete · live filter</div>
      <div style={{ marginBottom: 2 }}>
        <span style={{ color: '#A855F7' }}>?</span><span style={{ color: '#E2E8F0' }}> Package name: </span>
        <span style={{ color: '#06B6D4' }}>{query}</span>
        <span style={{ color: '#06B6D4' }}>█</span>
      </div>
      {filtered.map((opt, i) => (
        <div key={opt} style={{ color: i === 0 ? '#E2E8F0' : '#3D5068', paddingLeft: 2, lineHeight: 1.7 }}>
          <span style={{ color: i === 0 ? '#A855F7' : 'transparent' }}>❯</span> {opt}
        </div>
      ))}
    </div>
  );
}

function StepperPreview() {
  const [step, setStep] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % 4), 1000);
    return () => clearInterval(t);
  }, []);
  const steps = ['Install', 'Configure', 'Deploy', 'Done'];
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.82rem' }}>
      <div style={{ marginBottom: 12, color: '#5E7A96', fontSize: '0.72rem' }}>Stepper · multi-step wizard</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span style={{
                width: 22, height: 22, borderRadius: '50%', display: 'inline-flex',
                alignItems: 'center', justifyContent: 'center', fontSize: '0.68rem', fontWeight: 700,
                background: i < step ? 'rgba(34,197,94,0.15)' : i === step ? 'rgba(6,182,212,0.15)' : 'rgba(30,58,74,0.5)',
                border: `1px solid ${i < step ? '#22C55E' : i === step ? '#06B6D4' : '#1E3A4A'}`,
                color: i < step ? '#22C55E' : i === step ? '#06B6D4' : '#3D5068',
              }}>
                {i < step ? '✓' : i + 1}
              </span>
              <span style={{ color: i === step ? '#E2E8F0' : '#3D5068', fontSize: '0.65rem', whiteSpace: 'nowrap' }}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: 24, height: 1, background: i < step ? '#22C55E' : '#1E3A4A', marginBottom: 16 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DataTablePreview() {
  const [tick, setTick] = useState(0);
  const [activeRow, setActiveRow] = useState(0);
  useEffect(() => {
    const tv = setInterval(() => setTick((t) => t + 1), 500);
    const tr = setInterval(() => setActiveRow((r) => (r + 1) % 3), 1100);
    return () => { clearInterval(tv); clearInterval(tr); };
  }, []);

  const rows = [
    {
      name: 'nginx',
      cpu: (1.8 + Math.sin(tick * 0.4) * 1.2).toFixed(1) + '%',
      mem: Math.round(126 + Math.sin(tick * 0.25) * 8) + ' MB',
      status: 'running',
    },
    {
      name: 'node',
      cpu: (7.2 + Math.sin(tick * 0.6 + 1) * 3.5).toFixed(1) + '%',
      mem: Math.round(248 + Math.sin(tick * 0.18) * 22) + ' MB',
      status: 'running',
    },
    {
      name: 'redis',
      cpu: (0.2 + Math.abs(Math.sin(tick * 0.3 + 2)) * 0.4).toFixed(1) + '%',
      mem: Math.round(62 + Math.sin(tick * 0.1) * 4) + ' MB',
      status: 'idle',
    },
  ];

  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.78rem', lineHeight: 1.8 }}>
      <div style={{ marginBottom: 6, color: '#5E7A96', fontSize: '0.72rem' }}>DataTable · live values · sort / filter</div>
      <div style={{ color: '#2D4460' }}>{'┌──────────┬───────┬──────────┬─────────┐'}</div>
      <div>
        <span style={{ color: '#2D4460' }}>│ </span><span style={{ color: '#E2E8F0', fontWeight: 600 }}>Process  </span>
        <span style={{ color: '#2D4460' }}>│ </span><span style={{ color: '#E2E8F0', fontWeight: 600 }}>CPU   </span>
        <span style={{ color: '#2D4460' }}>│ </span><span style={{ color: '#E2E8F0', fontWeight: 600 }}>Memory  </span>
        <span style={{ color: '#2D4460' }}>│ </span><span style={{ color: '#06B6D4', fontWeight: 600 }}>State   </span>
        <span style={{ color: '#2D4460' }}>│</span>
      </div>
      <div style={{ color: '#2D4460' }}>{'├──────────┼───────┼──────────┼─────────┤'}</div>
      {rows.map((r, i) => {
        const sel = i === activeRow;
        const sc = r.status === 'running' ? '#22C55E' : r.status === 'idle' ? '#06B6D4' : '#EF4444';
        return (
          <div key={r.name} style={{ background: sel ? 'rgba(6,182,212,0.07)' : 'transparent' }}>
            <span style={{ color: sel ? '#06B6D4' : '#2D4460' }}>│ </span>
            <span style={{ color: sel ? '#E2E8F0' : '#94A3B8' }}>{r.name.padEnd(8)}</span>
            <span style={{ color: sel ? '#06B6D4' : '#2D4460' }}>│ </span>
            <span style={{ color: sel ? '#E2E8F0' : '#94A3B8' }}>{r.cpu.padEnd(5)}</span>
            <span style={{ color: sel ? '#06B6D4' : '#2D4460' }}>│ </span>
            <span style={{ color: sel ? '#E2E8F0' : '#94A3B8' }}>{r.mem.padEnd(8)}</span>
            <span style={{ color: sel ? '#06B6D4' : '#2D4460' }}>│ </span>
            <span style={{ color: sc }}>{r.status.padEnd(7)}</span>
            <span style={{ color: sel ? '#06B6D4' : '#2D4460' }}>│</span>
          </div>
        );
      })}
      <div style={{ color: '#2D4460' }}>{'└──────────┴───────┴──────────┴─────────┘'}</div>
    </div>
  );
}

function GaugePreview() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 110);
    return () => clearInterval(t);
  }, []);

  // Realistic oscillating metrics — sine waves at different frequencies
  const cpu = Math.max(2, Math.min(99,
    42 + Math.sin(tick * 0.09) * 28 + Math.sin(tick * 0.31) * 12 + Math.cos(tick * 0.17) * 10));
  const mem = Math.max(30, Math.min(95,
    62 + Math.sin(tick * 0.035 + 1.2) * 18 + Math.sin(tick * 0.11) * 6));
  const net = Math.max(1, Math.min(99,
    15 + Math.abs(Math.sin(tick * 0.22 + 0.5)) * 55 + Math.sin(tick * 0.55) * 8));

  const gauge = (val: number, w = 22) => {
    const f = Math.min(w, Math.max(0, Math.round((val / 100) * w)));
    const c = val > 80 ? '#EF4444' : val > 60 ? '#EAB308' : '#22C55E';
    return { f, c, e: w - f };
  };
  const g = { cpu: gauge(cpu), mem: gauge(mem), net: gauge(net) };

  const metrics = [
    { key: 'cpu', label: 'CPU', val: cpu, g: g.cpu },
    { key: 'mem', label: 'MEM', val: mem, g: g.mem },
    { key: 'net', label: 'NET', val: net, g: g.net },
  ] as const;

  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.82rem' }}>
      <div style={{ marginBottom: 10, color: '#5E7A96', fontSize: '0.72rem' }}>Gauge · live system metrics</div>
      {metrics.map(({ key, label, val, g: gb }) => (
        <div key={key} style={{ marginBottom: 7 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <span style={{ color: '#5E7A96', fontSize: '0.7rem', minWidth: 28 }}>{label}</span>
            <span style={{ color: gb.c, fontWeight: 700, fontSize: '0.75rem', minWidth: 36, textAlign: 'right' }}>
              {Math.round(val)}%
            </span>
          </div>
          <div style={{ lineHeight: 1 }}>
            <span style={{ color: gb.c }}>{'█'.repeat(gb.f)}</span>
            <span style={{ color: '#0F2535' }}>{'░'.repeat(gb.e)}</span>
          </div>
        </div>
      ))}
      <div style={{ marginTop: 4, fontSize: '0.65rem', color: cpu > 80 ? '#EF4444' : cpu > 60 ? '#EAB308' : '#3D5068' }}>
        {cpu > 80 ? '⚠ CPU critical — throttling active'
          : cpu > 60 ? '⚡ CPU elevated'
          : '● All systems nominal'}
      </div>
    </div>
  );
}

function SparklinePreview() {
  const BLOCKS = [' ', '▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  const seed = () => Math.floor(Math.random() * 9) + 1;
  const [reqs, setReqs] = useState(() => Array.from({ length: 16 }, seed));
  const [cpu,  setCpu]  = useState(() => Array.from({ length: 16 }, () => Math.floor(Math.random() * 7) + 2));
  useEffect(() => {
    const tr = setInterval(() => setReqs((d) => [...d.slice(1), seed()]), 320);
    const tc = setInterval(() => setCpu((d) => [...d.slice(1), Math.max(1, Math.min(9, d[d.length - 1] + Math.floor(Math.random() * 3) - 1))]), 450);
    return () => { clearInterval(tr); clearInterval(tc); };
  }, []);
  const bar = (data: number[]) => {
    const max = Math.max(...data, 1);
    return data.map((v, i) => {
      const level = Math.min(8, Math.max(0, Math.round((v / max) * 8)));
      const color = level > 6 ? '#EF4444' : level > 4 ? '#EAB308' : '#22C55E';
      return <span key={i} style={{ color }}>{BLOCKS[level]}</span>;
    });
  };
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.82rem' }}>
      <div style={{ marginBottom: 8, color: '#5E7A96', fontSize: '0.72rem' }}>Sparkline · live time-series</div>
      <div style={{ marginBottom: 2, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: '#5E7A96', fontSize: '0.7rem' }}>req/s</span>
        <span style={{ color: '#06B6D4', fontSize: '0.78rem', fontWeight: 700 }}>{reqs[reqs.length - 1] * 14}</span>
      </div>
      <div style={{ lineHeight: 1, marginBottom: 6 }}>{bar(reqs)}</div>
      <div style={{ marginBottom: 2, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: '#5E7A96', fontSize: '0.7rem' }}>cpu%</span>
        <span style={{ color: '#A855F7', fontSize: '0.78rem', fontWeight: 700 }}>{cpu[cpu.length - 1] * 10}%</span>
      </div>
      <div style={{ lineHeight: 1 }}>{bar(cpu).map((el, i) =>
        <span key={i} style={{ color: cpu[i] > 6 ? '#EF4444' : cpu[i] > 4 ? '#EAB308' : '#A855F7' }}>{BLOCKS[Math.min(8, Math.max(0, Math.round((cpu[i] / Math.max(...cpu, 1)) * 8)))]}</span>
      )}</div>
      <div style={{ marginTop: 5, fontSize: '0.65rem', color: '#3D5068' }}>
        last 16s  ·  peak {Math.max(...reqs) * 14} req/s
      </div>
    </div>
  );
}

function MarkdownPreview() {
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.82rem', lineHeight: 1.8 }}>
      <div style={{ marginBottom: 8, color: '#5E7A96', fontSize: '0.72rem' }}>Markdown · terminal renderer</div>
      <div style={{ color: '#E2E8F0', fontWeight: 700, marginBottom: 4 }}># Getting Started</div>
      <div style={{ color: '#94A3B8' }}>Install the <span style={{ color: '#06B6D4' }}>`inkui`</span> CLI and add your first component.</div>
      <div style={{ margin: '8px 0', color: '#3D5068', borderLeft: '3px solid #1E3A4A', paddingLeft: 8 }}>
        <span style={{ color: '#5E7A96', fontStyle: 'italic' }}>Copy once, own forever.</span>
      </div>
      <div style={{ color: '#A855F7', marginBottom: 2 }}>## Install</div>
      <div style={{ color: '#5E7A96', marginBottom: 2 }}>- Run <span style={{ color: '#22C55E' }}>`npx inkui add spinner`</span></div>
      <div style={{ color: '#5E7A96' }}>- Import from <span style={{ color: '#22C55E' }}>`./components/ui/spinner`</span></div>
    </div>
  );
}

function JSONViewerPreview() {
  const [expanded, setExpanded] = useState(new Set(['root', 'config']));
  useEffect(() => {
    const t = setInterval(() => {
      setExpanded((prev) => {
        const s = new Set(prev);
        if (s.has('config')) s.delete('config'); else s.add('config');
        return s;
      });
    }, 1500);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.82rem', lineHeight: 1.75 }}>
      <div style={{ marginBottom: 8, color: '#5E7A96', fontSize: '0.72rem' }}>JSONViewer · expand/collapse</div>
      <div>
        <span style={{ color: '#A855F7' }}>{expanded.has('root') ? '▾' : '▸'}</span>
        <span style={{ color: '#94A3B8' }}> root </span>
        <span style={{ color: '#3D5068' }}>{'{'}</span>
      </div>
      {expanded.has('root') && <>
        <div style={{ paddingLeft: 16 }}>
          <span style={{ color: '#06B6D4' }}>"name"</span>
          <span style={{ color: '#94A3B8' }}>: </span>
          <span style={{ color: '#22C55E' }}>"InkUI"</span>
        </div>
        <div style={{ paddingLeft: 16 }}>
          <span style={{ color: '#A855F7' }}>{expanded.has('config') ? '▾' : '▸'}</span>
          <span style={{ color: '#06B6D4' }}> "config"</span>
          <span style={{ color: '#94A3B8' }}>: </span>
          <span style={{ color: '#3D5068' }}>{'{...}'}</span>
        </div>
        {expanded.has('config') && <>
          <div style={{ paddingLeft: 32 }}>
            <span style={{ color: '#06B6D4' }}>"debug"</span>
            <span style={{ color: '#94A3B8' }}>: </span>
            <span style={{ color: '#EAB308' }}>false</span>
          </div>
          <div style={{ paddingLeft: 32 }}>
            <span style={{ color: '#06B6D4' }}>"port"</span>
            <span style={{ color: '#94A3B8' }}>: </span>
            <span style={{ color: '#EAB308' }}>3000</span>
          </div>
        </>}
        <div style={{ paddingLeft: 16 }}>
          <span style={{ color: '#06B6D4' }}>"version"</span>
          <span style={{ color: '#94A3B8' }}>: </span>
          <span style={{ color: '#22C55E' }}>"0.4.0"</span>
        </div>
      </>}
      <span style={{ color: '#3D5068' }}>{'}'}</span>
    </div>
  );
}

function PanelPreview() {
  const [activeFile, setActiveFile] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setActiveFile((f) => (f + 1) % 3), 1200);
    return () => clearInterval(t);
  }, []);
  const files = ['index.ts', 'utils.ts', 'types.ts'];
  const previews = [
    [<><span style={{ color: '#A855F7' }}>export</span><span style={{ color: '#94A3B8' }}> default </span><span style={{ color: '#EAB308' }}>App</span></>, <><span style={{ color: '#A855F7' }}>function</span><span style={{ color: '#EAB308' }}> App</span><span style={{ color: '#94A3B8' }}>()</span></>, <><span style={{ color: '#94A3B8' }}>  {'{ return <'}</span><span style={{ color: '#06B6D4' }}>UI</span><span style={{ color: '#94A3B8' }}>{' />'}</span></>],
    [<><span style={{ color: '#A855F7' }}>export</span><span style={{ color: '#A855F7' }}> function</span></>, <><span style={{ color: '#EAB308' }}> utils</span><span style={{ color: '#94A3B8' }}>() {'{'}</span></>, <><span style={{ color: '#94A3B8' }}>  return </span><span style={{ color: '#22C55E' }}>true</span></>],
    [<><span style={{ color: '#A855F7' }}>export</span><span style={{ color: '#A855F7' }}> type</span></>, <><span style={{ color: '#06B6D4' }}> Config</span><span style={{ color: '#94A3B8' }}> = {'{'}</span></>, <><span style={{ color: '#94A3B8' }}>  id: </span><span style={{ color: '#06B6D4' }}>string</span></>],
  ];
  return (
    <div style={{ fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.78rem', lineHeight: 1.8 }}>
      <div style={{ marginBottom: 8, color: '#5E7A96', fontSize: '0.72rem' }}>Panel · SplitPane layout</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <div>
          <div style={{ color: '#2D4460' }}>╭─ Files ─────╮</div>
          {files.map((f, i) => (
            <div key={f}>
              <span style={{ color: '#2D4460' }}>│ </span>
              <span style={{ color: i === activeFile ? '#06B6D4' : '#3D5068' }}>
                {i === activeFile ? '❯ ' : '  '}{f.padEnd(9)}
              </span>
              <span style={{ color: '#2D4460' }}>│</span>
            </div>
          ))}
          <div style={{ color: '#2D4460' }}>╰─────────────╯</div>
        </div>
        <div>
          <div style={{ color: '#2D4460' }}>╭─ {files[activeFile].padEnd(12)}──╮</div>
          {previews[activeFile].map((line, i) => (
            <div key={i}><span style={{ color: '#2D4460' }}>│ </span>{line}<span style={{ color: '#2D4460' }}> │</span></div>
          ))}
          <div style={{ color: '#2D4460' }}>╰────────────────╯</div>
        </div>
      </div>
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
  // Phase 1 & 2
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
  panel:              PanelPreview,
  // Phase 3A — Layout & Navigation
  'scroll-area':      ScrollAreaPreview,
  tabs:               TabsPreview,
  accordion:          AccordionPreview,
  // Phase 3B — AI-Era
  'streaming-text':   StreamingTextPreview,
  'token-counter':    TokenCounterPreview,
  'code-block':       CodeBlockPreview,
  'diff-view':        DiffViewPreview,
  typewriter:         TypewriterPreview,
  // Phase 3C — Data & Power
  'tree-view':        TreeViewPreview,
  autocomplete:       AutocompletePreview,
  stepper:            StepperPreview,
  'data-table':       DataTablePreview,
  gauge:              GaugePreview,
  sparkline:          SparklinePreview,
  markdown:           MarkdownPreview,
  'json-viewer':      JSONViewerPreview,
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
        margin: '20px 0 16px',
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
