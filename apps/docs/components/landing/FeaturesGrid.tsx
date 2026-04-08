import { Copy, Code, Palette, Layers, Terminal, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const features: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Copy,
    title: 'Copy & Paste',
    body: 'Own the code. Every component is copied into your project. No black-box dependency. Modify anything.',
  },
  {
    icon: Code,
    title: 'TypeScript First',
    body: 'Full type safety. Generics for Table<T> and Select<T>. IntelliSense that actually works in terminal apps.',
  },
  {
    icon: Palette,
    title: 'Theme Everything',
    body: 'Dark and light themes built in. Customize every color, border style, and spacing token.',
  },
  {
    icon: Layers,
    title: '15+ Components',
    body: 'Spinner, Badge, ProgressBar, TextInput, Select, Table, Toast, Dialog, and more — growing fast.',
  },
  {
    icon: Terminal,
    title: 'Battle-tested Renderer',
    body: 'Built on Ink, the React renderer used by Vercel, Prisma, and Gatsby CLIs.',
  },
  {
    icon: Zap,
    title: 'One Command Install',
    body: 'npx inkui add table. Copies the component into your project. That\'s it.',
  },
];

export default function FeaturesGrid() {
  return (
    <section
      style={{
        padding: '80px 24px',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: '1.8rem',
            fontWeight: 700,
            marginBottom: 12,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
          }}
        >
          Everything you need to build beautiful CLIs
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 48, fontSize: '1rem' }}>
          Designed for the developer experience you expect from a modern component library.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: 24,
                transition: 'border-color 0.15s',
              }}
            >
              <Icon size={20} color="#06B6D4" style={{ marginBottom: 12 }} />
              <div
                style={{
                  color: 'var(--text)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  marginBottom: 8,
                }}
              >
                {title}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                {body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
