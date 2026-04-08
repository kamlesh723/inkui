'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';
import TerminalHero from '@/components/TerminalHero';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Hero() {
  return (
    <section
      className="dot-grid hero-section"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 56px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        textAlign: 'center',
        overflowX: 'hidden',
      }}
    >
      {/* Radial glow — always dark, positioned behind heading */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 400,
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(6,182,212,0.13) 0%, rgba(168,85,247,0.06) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Badge */}
        <motion.div {...fadeUp(0.15)}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '5px 16px',
              borderRadius: 20,
              border: '1px solid rgba(6, 182, 212, 0.3)',
              background: 'rgba(6, 182, 212, 0.07)',
              color: '#06B6D4',
              fontSize: '0.78rem',
              fontWeight: 600,
              marginBottom: 28,
              letterSpacing: '0.01em',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06B6D4', display: 'inline-block' }} />
            15+ Components · TypeScript · Open Source
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.25)}
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.04em',
            marginBottom: 22,
            maxWidth: 680,
            color: 'var(--text)',
          }}
        >
          Beautiful UI components{' '}
          <br className="hero-br" />
          for the{' '}
          <span className="gradient-text">terminal</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          {...fadeUp(0.35)}
          style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            maxWidth: 460,
            lineHeight: 1.75,
            marginBottom: 40,
          }}
        >
          shadcn/ui for CLIs. Copy-paste components into your project,
          own the code, and ship beautiful terminal UIs with React and TypeScript.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.45)}
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: 72,
          }}
        >
          <Link
            href="/docs/getting-started/introduction"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '11px 24px',
              background: '#06B6D4',
              color: '#000',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: '0.875rem',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              boxShadow: '0 0 0 1px rgba(6,182,212,0.3), 0 4px 20px rgba(6,182,212,0.25)',
              transition: 'opacity 0.15s, box-shadow 0.15s',
            }}
          >
            Get Started <ArrowRight size={15} />
          </Link>
          <a
            href="https://github.com/kamlesh723/inkui"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '11px 24px',
              background: 'transparent',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: '0.875rem',
              textDecoration: 'none',
              transition: 'border-color 0.15s',
            }}
          >
            <Github size={15} /> GitHub
          </a>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', maxWidth: 600 }}
        >
          <TerminalHero />
        </motion.div>
      </div>
    </section>
  );
}
