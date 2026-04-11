'use client';

import { useState, useEffect, useRef } from 'react';

/* ── Shared helpers ───────────────────────────────────────────────── */
const DOTS = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏'];
const mono = { fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.82rem' };

/* ── 1. DeployKit ─────────────────────────────────────────────────── */
function DeployKitPreview() {
  const [phase, setPhase]  = useState(0);
  const [dot,   setDot]    = useState(0);
  const [prog,  setProg]   = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setDot(d => (d + 1) % DOTS.length), 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const seq = [
      () => { setPhase(0); setProg(0); },
      () => setPhase(1),
      () => {
        let p = 0;
        const t = setInterval(() => {
          p += 2.2;
          setProg(Math.min(100, p));
          if (p >= 100) { clearInterval(t); setTimeout(() => setPhase(2), 600); }
        }, 60);
      },
    ];
    let i = 0;
    seq[0]();
    const advance = setInterval(() => {
      i = (i + 1) % seq.length;
      if (i === 2) { setPhase(1); }
      seq[i]?.();
      if (i === 0) clearInterval(advance);
    }, 3200);
    // loop
    const loop = setInterval(() => {
      setPhase(0); setProg(0);
      setTimeout(() => setPhase(1), 3200);
      setTimeout(() => {
        let p = 0;
        const t = setInterval(() => {
          p += 2.2;
          setProg(Math.min(100, p));
          if (p >= 100) { clearInterval(t); setTimeout(() => setPhase(2), 600); }
        }, 60);
      }, 6400);
    }, 12000);
    return () => { clearInterval(advance); clearInterval(loop); };
  }, []);

  const filled = Math.round((prog / 100) * 22);
  const services = [
    { name: 'API Gateway', ok: phase >= 1, loading: phase === 0 },
    { name: 'Database',    ok: phase >= 2, loading: phase === 1 },
    { name: 'CDN Edge',    ok: phase >= 2, loading: phase === 1 },
  ];

  return (
    <div style={{ ...mono, lineHeight: 1.9 }}>
      {/* Header */}
      <div style={{ marginBottom: 10, color: '#06B6D4', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.02em' }}>
        ◆ DeployKit <span style={{ color: '#3D5068', fontWeight: 400 }}>v2.1.0 · production</span>
      </div>
      <div style={{ color: '#2D4460', marginBottom: 12 }}>{'─'.repeat(36)}</div>

      {/* Spinner or done */}
      {phase < 2 ? (
        <div style={{ marginBottom: 10 }}>
          <span style={{ color: '#06B6D4' }}>{DOTS[dot]}</span>
          <span style={{ color: '#94A3B8' }}> {phase === 0 ? 'Connecting to cloud...' : 'Uploading artifacts...'}</span>
        </div>
      ) : (
        <div style={{ marginBottom: 10 }}>
          <span style={{ color: '#22C55E' }}>✓</span>
          <span style={{ color: '#94A3B8' }}> Deployed in 4.2s</span>
        </div>
      )}

      {/* Services */}
      {services.map(({ name, ok, loading }) => (
        <div key={name} style={{ marginBottom: 2 }}>
          <span style={{ color: ok ? '#22C55E' : loading ? '#06B6D4' : '#3D5068' }}>
            {ok ? '●' : loading ? DOTS[dot] : '○'}
          </span>
          <span style={{ color: ok ? '#94A3B8' : '#3D5068' }}> {name}</span>
        </div>
      ))}

      {/* Progress */}
      {phase === 1 && (
        <div style={{ marginTop: 12 }}>
          <span style={{ color: '#5E7A96' }}>artifacts  </span>
          <span style={{ color: '#06B6D4' }}>{'█'.repeat(filled)}</span>
          <span style={{ color: '#0F2535' }}>{'░'.repeat(22 - filled)}</span>
          <span style={{ color: '#E2E8F0' }}> {Math.round(prog)}%</span>
        </div>
      )}

      {/* Toast */}
      {phase === 2 && (
        <div style={{ marginTop: 12, padding: '6px 10px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 4 }}>
          <span style={{ color: '#22C55E' }}>✓ deployed</span>
          <span style={{ color: '#94A3B8' }}> → </span>
          <span style={{ color: '#06B6D4' }}>https://my-app.vercel.app</span>
        </div>
      )}
    </div>
  );
}

/* ── 2. AuditShield ───────────────────────────────────────────────── */
function AuditShieldPreview() {
  const [phase, setPhase] = useState(0);
  const [dot,   setDot]   = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setDot(d => (d + 1) % DOTS.length), 100);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const run = () => {
      setPhase(0); setCount(0);
      const c = setInterval(() => setCount(n => { if (n >= 847) { clearInterval(c); return 847; } return n + 23; }), 30);
      setTimeout(() => setPhase(1), 3000);
      setTimeout(() => setPhase(2), 6500);
      setTimeout(() => setPhase(0), 11000);
    };
    run();
    const loop = setInterval(run, 11000);
    return () => clearInterval(loop);
  }, []);

  const vulns = [
    { pkg: 'lodash@4.17.15',  sev: 'critical', color: '#EF4444', badge: 'CRIT' },
    { pkg: 'axios@0.21.1',    sev: 'high',     color: '#EAB308', badge: 'HIGH' },
    { pkg: 'express@4.17.1',  sev: 'high',     color: '#EAB308', badge: 'HIGH' },
    { pkg: 'chalk@2.4.2',     sev: 'medium',   color: '#06B6D4', badge: 'MED'  },
  ];

  return (
    <div style={{ ...mono, lineHeight: 1.9 }}>
      <div style={{ marginBottom: 10, color: '#A855F7', fontWeight: 700, fontSize: '0.78rem' }}>
        ◆ AuditShield <span style={{ color: '#3D5068', fontWeight: 400 }}>v1.3.0</span>
      </div>
      <div style={{ color: '#2D4460', marginBottom: 12 }}>{'─'.repeat(36)}</div>

      {phase === 0 && (
        <div>
          <div style={{ marginBottom: 6 }}>
            <span style={{ color: '#A855F7' }}>{DOTS[dot]}</span>
            <span style={{ color: '#94A3B8' }}> Scanning {count.toLocaleString()} packages...</span>
          </div>
          <div style={{ color: '#3D5068', fontSize: '0.72rem' }}>
            node_modules/.audit-cache → {Math.round((count / 847) * 100)}%
          </div>
        </div>
      )}

      {phase >= 1 && (
        <div>
          <div style={{ marginBottom: 8 }}>
            <span style={{ color: '#EF4444' }}>⚠</span>
            <span style={{ color: '#94A3B8' }}> Found </span>
            <span style={{ color: '#EF4444', fontWeight: 700 }}>2 critical</span>
            <span style={{ color: '#94A3B8' }}>, </span>
            <span style={{ color: '#EAB308' }}>2 high</span>
            <span style={{ color: '#94A3B8' }}>, 8 medium</span>
          </div>
          {/* Table header */}
          <div style={{ color: '#2D4460', marginBottom: 2 }}>{'┌' + '─'.repeat(22) + '┬' + '──────┐'}</div>
          <div>
            <span style={{ color: '#2D4460' }}>│ </span>
            <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{'Package             '}</span>
            <span style={{ color: '#2D4460' }}>│ </span>
            <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{'Sev '}</span>
            <span style={{ color: '#2D4460' }}>│</span>
          </div>
          <div style={{ color: '#2D4460', marginBottom: 2 }}>{'├' + '─'.repeat(22) + '┼' + '──────┤'}</div>
          {vulns.map(({ pkg, color, badge }) => (
            <div key={pkg}>
              <span style={{ color: '#2D4460' }}>│ </span>
              <span style={{ color: '#5E7A96' }}>{pkg.padEnd(20).slice(0, 20)}</span>
              <span style={{ color: '#2D4460' }}>│ </span>
              <span style={{ color, background: `rgba(${color === '#EF4444' ? '239,68,68' : color === '#EAB308' ? '234,179,8' : '6,182,212'},0.12)`, padding: '0 4px', borderRadius: 2 }}>{badge}</span>
              {'  '}
              <span style={{ color: '#2D4460' }}>│</span>
            </div>
          ))}
          <div style={{ color: '#2D4460' }}>{'└' + '─'.repeat(22) + '┴' + '──────┘'}</div>
        </div>
      )}

      {phase >= 2 && (
        <div style={{ marginTop: 10, border: '1px solid rgba(239,68,68,0.3)', borderRadius: 4, padding: '8px 10px', background: 'rgba(239,68,68,0.04)' }}>
          <div style={{ color: '#E2E8F0', marginBottom: 6, fontWeight: 600 }}>Fix 2 critical vulnerabilities?</div>
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ color: '#22C55E' }}>[Fix all]</span>
            <span style={{ color: '#5E7A96' }}>[Skip]</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── 3. DevDash ───────────────────────────────────────────────────── */
function DevDashPreview() {
  const [dot,  setDot]  = useState(0);
  const [cpu,  setCpu]  = useState(34);
  const [mem,  setMem]  = useState(62);
  const [reqs, setReqs] = useState(142);

  useEffect(() => {
    const d = setInterval(() => setDot(f => (f + 1) % DOTS.length), 100);
    const c = setInterval(() => {
      setCpu(v => Math.max(10, Math.min(92, v + (Math.random() - 0.48) * 8)));
      setMem(v => Math.max(40, Math.min(88, v + (Math.random() - 0.48) * 4)));
      setReqs(v => v + Math.floor(Math.random() * 6));
    }, 800);
    return () => { clearInterval(d); clearInterval(c); };
  }, []);

  const cpuFill = Math.round((cpu / 100) * 20);
  const memFill = Math.round((mem / 100) * 20);

  const services = [
    { name: 'API :3000',   color: '#22C55E', live: false },
    { name: 'DB  :5432',   color: '#22C55E', live: false },
    { name: 'Redis:6379',  color: '#22C55E', live: false },
    { name: 'Queue',       color: '#06B6D4', live: true  },
  ];

  return (
    <div style={{ ...mono, lineHeight: 1.85 }}>
      {/* Header */}
      <div style={{ marginBottom: 2, background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.18)', borderRadius: 4, padding: '4px 10px' }}>
        <span style={{ color: '#22C55E', fontWeight: 700 }}>◆ DevDash</span>
        <span style={{ color: '#3D5068' }}> · local environment · </span>
        <span style={{ color: '#EAB308' }}>{reqs.toLocaleString()}</span>
        <span style={{ color: '#3D5068' }}> req/session</span>
      </div>
      <div style={{ color: '#2D4460', marginBottom: 8 }}>{'─'.repeat(36)}</div>

      {/* Services */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px', marginBottom: 10 }}>
        {services.map(({ name, color, live }) => (
          <div key={name}>
            <span style={{ color: live ? '#06B6D4' : color }}>{live ? DOTS[dot] : '●'}</span>
            <span style={{ color: '#5E7A96' }}> {name}</span>
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div style={{ marginBottom: 4 }}>
        <span style={{ color: '#5E7A96', display: 'inline-block', width: 40 }}>cpu  </span>
        <span style={{ color: cpu > 75 ? '#EF4444' : cpu > 50 ? '#EAB308' : '#22C55E' }}>{'█'.repeat(cpuFill)}</span>
        <span style={{ color: '#0F2535' }}>{'░'.repeat(20 - cpuFill)}</span>
        <span style={{ color: '#E2E8F0' }}> {Math.round(cpu)}%</span>
      </div>
      <div style={{ marginBottom: 10 }}>
        <span style={{ color: '#5E7A96', display: 'inline-block', width: 40 }}>mem  </span>
        <span style={{ color: mem > 80 ? '#EF4444' : '#A855F7' }}>{'█'.repeat(memFill)}</span>
        <span style={{ color: '#0F2535' }}>{'░'.repeat(20 - memFill)}</span>
        <span style={{ color: '#E2E8F0' }}> {Math.round(mem)}%</span>
      </div>

      {/* KeyHint */}
      <div style={{ color: '#2D4460', marginBottom: 4 }}>{'─'.repeat(36)}</div>
      <div style={{ display: 'flex', gap: 16 }}>
        {[['r', 'refresh'], ['l', 'logs'], ['d', 'details'], ['q', 'quit']].map(([k, l]) => (
          <span key={k}>
            <span style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 3, padding: '0 5px', color: '#94A3B8' }}>{k}</span>
            <span style={{ color: '#3D5068', marginLeft: 4 }}>{l}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Showcase items ───────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 'deploykit',
    name: 'DeployKit',
    tagline: 'Zero-config deployment CLI',
    desc: 'A production deploy tool with environment selection, service health checks, artifact progress, and success notifications.',
    components: ['Header', 'Spinner', 'StatusIndicator', 'ProgressBar', 'Toast'],
    accent: '#06B6D4',
    accentRgb: '6,182,212',
    install: 'npx inkui add spinner status-indicator progress-bar toast header',
    Preview: DeployKitPreview,
  },
  {
    id: 'auditshield',
    name: 'AuditShield',
    tagline: 'Dependency security scanner',
    desc: 'Scans node_modules for CVEs, displays a severity-coded vulnerability table, and prompts for automated fixes.',
    components: ['Spinner', 'Table', 'Badge', 'Confirm', 'KeyHint'],
    accent: '#A855F7',
    accentRgb: '168,85,247',
    install: 'npx inkui add spinner table badge confirm key-hint',
    Preview: AuditShieldPreview,
  },
  {
    id: 'devdash',
    name: 'DevDash',
    tagline: 'Live local dev dashboard',
    desc: 'Real-time dashboard for local development — monitors services, tracks CPU/memory, and shows request counts with live updates.',
    components: ['Header', 'StatusIndicator', 'LoadingBar', 'Table', 'KeyHint'],
    accent: '#22C55E',
    accentRgb: '34,197,94',
    install: 'npx inkui add header status-indicator loading-bar table key-hint',
    Preview: DevDashPreview,
  },
];

/* ── Copy button ──────────────────────────────────────────────────── */
function CopyBtn({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); } catch {}
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '5px 12px',
        background: copied ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: 6, color: copied ? '#22C55E' : '#5E7A96',
        fontSize: '0.72rem', cursor: 'pointer',
        fontFamily: 'var(--font-geist-mono, monospace)',
        transition: 'all 0.15s', whiteSpace: 'nowrap',
      }}
    >
      {copied ? '✓ Copied!' : `⎘ ${label}`}
    </button>
  );
}

/* ── Main component ───────────────────────────────────────────────── */
export default function BuiltWithInkUI() {
  const [active, setActive] = useState(0);
  const project = PROJECTS[active];
  const { Preview } = project;

  return (
    <section
      style={{
        padding: '96px 24px',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-alt)',
      }}
    >
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)',
            borderRadius: 20, padding: '4px 14px', marginBottom: 18,
            fontSize: '0.73rem', color: '#22C55E',
            fontFamily: 'var(--font-geist-mono, monospace)', fontWeight: 600,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'inline-block', boxShadow: '0 0 6px #22C55E' }} />
            real-world examples
          </div>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.1rem)', fontWeight: 800,
            letterSpacing: '-0.04em', color: 'var(--text)', marginBottom: 14,
          }}>
            What you can build with InkUI
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Real CLI tools assembled from InkUI components. Copy the install command, paste the components, ship your CLI.
          </p>
        </div>

        {/* Project tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
          {PROJECTS.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                style={{
                  padding: '7px 20px', borderRadius: 8, cursor: 'pointer', flexShrink: 0,
                  border: `1px solid ${isActive ? `rgba(${p.accentRgb},0.4)` : 'var(--border)'}`,
                  background: isActive ? `rgba(${p.accentRgb},0.1)` : 'transparent',
                  color: isActive ? p.accent : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 400, fontSize: '0.83rem',
                  transition: 'all 0.15s', fontFamily: 'inherit',
                }}
              >
                {p.name}
              </button>
            );
          })}
        </div>

        {/* Main panel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 0,
          border: `1px solid rgba(${project.accentRgb},0.2)`,
          borderRadius: 14,
          overflow: 'hidden',
          background: '#060F1C',
          boxShadow: `0 0 0 1px rgba(${project.accentRgb},0.06), 0 16px 48px rgba(0,0,0,0.5)`,
        }} className="built-panel">

          {/* Left: terminal preview */}
          <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column' }}>
            {/* Titlebar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(0,0,0,0.3)',
            }}>
              {['#EF4444','#EAB308','#22C55E'].map(c => (
                <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.85 }} />
              ))}
              <span style={{ marginLeft: 8, color: '#2D4460', fontSize: '0.7rem', fontFamily: 'var(--font-geist-mono, monospace)' }}>
                ~/projects/my-cli — {project.name.toLowerCase()}
              </span>
            </div>
            {/* Animated preview */}
            <div style={{ flex: 1, padding: '22px 20px', minHeight: 260 }}>
              <Preview key={project.id} />
            </div>
          </div>

          {/* Right: project info */}
          <div style={{ display: 'flex', flexDirection: 'column', padding: '24px 24px' }}>
            {/* Title */}
            <div style={{ marginBottom: 6 }}>
              <span style={{
                fontSize: '0.7rem', color: project.accent,
                fontFamily: 'var(--font-geist-mono, monospace)',
                fontWeight: 600, letterSpacing: '0.04em',
                background: `rgba(${project.accentRgb},0.1)`,
                border: `1px solid rgba(${project.accentRgb},0.2)`,
                padding: '1px 8px', borderRadius: 4,
              }}>
                {project.tagline}
              </span>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FAFAFA', marginBottom: 10, letterSpacing: '-0.02em' }}>
              {project.name}
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: 20, flex: 1 }}>
              {project.desc}
            </p>

            {/* Components used */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: '#5E7A96', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: 8, textTransform: 'uppercase' }}>
                Components used
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {project.components.map(c => (
                  <span
                    key={c}
                    style={{
                      background: `rgba(${project.accentRgb},0.08)`,
                      color: project.accent,
                      border: `1px solid rgba(${project.accentRgb},0.2)`,
                      borderRadius: 4, padding: '2px 9px',
                      fontSize: '0.72rem', fontFamily: 'var(--font-geist-mono, monospace)',
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Install command */}
            <div style={{
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 8, padding: '10px 14px', marginBottom: 16,
            }}>
              <div style={{ color: '#3D5068', fontSize: '0.68rem', fontFamily: 'var(--font-geist-mono, monospace)', marginBottom: 5 }}>
                install all components
              </div>
              <div style={{
                fontFamily: 'var(--font-geist-mono, monospace)', fontSize: '0.72rem',
                color: '#94A3B8', wordBreak: 'break-all', lineHeight: 1.6,
              }}>
                <span style={{ color: '#3D5068' }}>$ </span>
                <span style={{ color: project.accent }}>{project.install}</span>
              </div>
            </div>

            <CopyBtn text={project.install} label="Copy install command" />
          </div>
        </div>

        {/* Social proof strip */}
        <div style={{
          marginTop: 48, textAlign: 'center',
          padding: '28px 24px',
          background: 'rgba(6,182,212,0.04)',
          border: '1px solid rgba(6,182,212,0.12)',
          borderRadius: 10,
        }}>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: 600, margin: '0 auto', fontStyle: 'italic' }}>
            "InkUI eliminated all our custom terminal boilerplate. We rebuilt our deploy CLI in half a day — spinner, progress bars, tables, all of it."
          </p>
          <div style={{ marginTop: 12, color: '#5E7A96', fontSize: '0.78rem' }}>
            — built with{' '}
            <code style={{ color: '#06B6D4', fontFamily: 'var(--font-geist-mono, monospace)', background: 'rgba(6,182,212,0.08)', padding: '1px 6px', borderRadius: 3 }}>
              npx inkui add
            </code>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .built-panel { grid-template-columns: 1fr !important; }
          .built-panel > div:first-child { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06); }
        }
      `}</style>
    </section>
  );
}
