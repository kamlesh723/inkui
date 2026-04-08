import { Copy, Code, Palette, Layers, Terminal, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const features: {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  body: string;
}[] = [
  {
    icon: Copy,
    iconBg: 'rgba(6,182,212,0.1)',
    iconColor: '#06B6D4',
    title: 'Copy & Paste',
    body: 'Own the code. Every component is copied into your project — no black-box dependency. Modify anything.',
  },
  {
    icon: Code,
    iconBg: 'rgba(168,85,247,0.1)',
    iconColor: '#A855F7',
    title: 'TypeScript First',
    body: 'Full type safety. Generics for Table<T> and Select<T>. IntelliSense that actually works in terminal apps.',
  },
  {
    icon: Palette,
    iconBg: 'rgba(234,179,8,0.1)',
    iconColor: '#EAB308',
    title: 'Theme Everything',
    body: 'Dark and light themes built in. Customize every color, border style, and spacing token.',
  },
  {
    icon: Layers,
    iconBg: 'rgba(6,182,212,0.1)',
    iconColor: '#06B6D4',
    title: '15+ Components',
    body: 'Spinner, Badge, ProgressBar, TextInput, Select, Table, Toast, Dialog, and more — growing fast.',
  },
  {
    icon: Terminal,
    iconBg: 'rgba(34,197,94,0.1)',
    iconColor: '#22C55E',
    title: 'Battle-tested Renderer',
    body: 'Built on Ink, the React renderer used by Vercel, Prisma, and Gatsby CLIs in production.',
  },
  {
    icon: Zap,
    iconBg: 'rgba(239,68,68,0.1)',
    iconColor: '#EF4444',
    title: 'One Command Install',
    body: "npx inkui add table — copies the component into your project. You own it from day one.",
  },
];

export default function FeaturesGrid() {
  return (
    <section
      style={{
        padding: '96px 24px',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2rem)',
              fontWeight: 800,
              marginBottom: 12,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
            }}
          >
            Everything you need to build beautiful CLIs
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 480, margin: '0 auto' }}>
            Designed for the developer experience you expect from a modern component library.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 16,
          }}
        >
          {features.map(({ icon: Icon, iconBg, iconColor, title, body }) => (
            <div
              key={title}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '24px 24px 26px',
                transition: 'border-color 0.15s, box-shadow 0.15s',
              }}
            >
              {/* Icon box */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 9,
                  background: iconBg,
                  border: `1px solid ${iconColor}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <Icon size={18} color={iconColor} />
              </div>
              <div
                style={{
                  color: 'var(--text)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  marginBottom: 8,
                  letterSpacing: '-0.01em',
                }}
              >
                {title}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.75 }}>
                {body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
