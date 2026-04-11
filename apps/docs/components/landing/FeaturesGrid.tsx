'use client';

import { Copy, Code, Palette, Layers, Terminal, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';

const features: {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  iconRgb: string;
  title: string;
  body: string;
}[] = [
  {
    icon: Copy,
    iconBg: 'rgba(6,182,212,0.1)',
    iconColor: '#06B6D4',
    iconRgb: '6,182,212',
    title: 'Copy & Paste',
    body: 'Own the code. Every component is copied into your project — no black-box dependency. Modify anything.',
  },
  {
    icon: Code,
    iconBg: 'rgba(168,85,247,0.1)',
    iconColor: '#A855F7',
    iconRgb: '168,85,247',
    title: 'TypeScript First',
    body: 'Full type safety. Generics for Table<T> and Select<T>. IntelliSense that actually works in terminal apps.',
  },
  {
    icon: Palette,
    iconBg: 'rgba(234,179,8,0.1)',
    iconColor: '#EAB308',
    iconRgb: '234,179,8',
    title: 'Theme Everything',
    body: 'Dark and light themes built in. Customize every color, border style, and spacing token.',
  },
  {
    icon: Layers,
    iconBg: 'rgba(6,182,212,0.1)',
    iconColor: '#06B6D4',
    iconRgb: '6,182,212',
    title: '15+ Components',
    body: 'Spinner, Badge, ProgressBar, TextInput, Select, Table, Toast, Dialog, and more — growing fast.',
  },
  {
    icon: Terminal,
    iconBg: 'rgba(34,197,94,0.1)',
    iconColor: '#22C55E',
    iconRgb: '34,197,94',
    title: 'Battle-tested Renderer',
    body: 'Built on Ink, the React renderer used by Vercel, Prisma, and Gatsby CLIs in production.',
  },
  {
    icon: Zap,
    iconBg: 'rgba(239,68,68,0.1)',
    iconColor: '#EF4444',
    iconRgb: '239,68,68',
    title: 'One Command Install',
    body: "npx inkui add table — copies the component into your project. You own it from day one.",
  },
];

function FeatureCard({
  icon: Icon, iconBg, iconColor, iconRgb, title, body,
}: typeof features[0]) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="feature-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? `linear-gradient(135deg, rgba(${iconRgb},0.06) 0%, var(--surface) 60%)`
          : 'var(--surface)',
        border: `1px solid ${hovered ? `rgba(${iconRgb},0.35)` : 'var(--border)'}`,
        borderRadius: 12,
        padding: '24px 24px 26px',
        transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s, transform 0.2s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 8px 32px rgba(${iconRgb},0.12), 0 2px 8px rgba(0,0,0,0.3)`
          : '0 1px 4px rgba(0,0,0,0.2)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle corner glow on hover */}
      {hovered && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 120,
            height: 120,
            background: `radial-gradient(circle at top right, rgba(${iconRgb},0.12) 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Icon box */}
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 10,
          background: hovered ? `rgba(${iconRgb},0.18)` : iconBg,
          border: `1px solid ${iconColor}${hovered ? '55' : '30'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
          transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
          boxShadow: hovered ? `0 0 16px rgba(${iconRgb},0.25)` : 'none',
        }}
      >
        <Icon size={18} color={iconColor} />
      </div>

      <div
        style={{
          color: hovered ? '#FAFAFA' : 'var(--text)',
          fontWeight: 700,
          fontSize: '0.9rem',
          marginBottom: 8,
          letterSpacing: '-0.01em',
          transition: 'color 0.2s',
        }}
      >
        {title}
      </div>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.75, position: 'relative', zIndex: 1 }}>
        {body}
      </div>
    </div>
  );
}

export default function FeaturesGrid() {
  return (
    <section
      style={{
        padding: '72px 24px',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg)',
      }}
    >
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
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
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
