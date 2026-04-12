'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import TerminalHero from '@/components/TerminalHero';

const LiquidBackground = dynamic(
  () => import('@/components/LiquidBackground'),
  { ssr: false },
);

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Hero() {
  const [primaryHovered, setPrimaryHovered] = useState(false);
  const [secondaryHovered, setSecondaryHovered] = useState(false);

  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 56px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 20px 60px',
        textAlign: 'center',
        overflowX: 'hidden',
        overflow: 'hidden',
      }}
    >
      {/* Liquid aurora background */}
      <LiquidBackground />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Badge */}
        <motion.div
          {...fadeUp(0.08)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            background: 'rgba(6,182,212,0.08)',
            border: '1px solid rgba(6,182,212,0.22)',
            borderRadius: 20,
            padding: '4px 14px',
            marginBottom: 28,
            fontSize: '0.73rem',
            color: '#06B6D4',
            fontFamily: 'var(--font-geist-mono, monospace)',
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'inline-block', boxShadow: '0 0 6px #22C55E' }} />
          v0.4.0 · shadcn/ui for terminal UIs
        </motion.div>

        {/* Line 1 */}
        <motion.h1
          {...fadeUp(0.15)}
          style={{
            fontSize: 'clamp(2.6rem, 6.5vw, 4.4rem)',
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: '-0.04em',
            marginBottom: 8,
            maxWidth: 760,
            color: '#FAFAFA',
            textShadow: '0 2px 20px rgba(0,0,0,0.4)',
          }}
        >
          Terminal UI components.
        </motion.h1>

        {/* Line 2 */}
        <motion.h1
          {...fadeUp(0.22)}
          style={{
            fontSize: 'clamp(2.6rem, 6.5vw, 4.4rem)',
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: '-0.04em',
            marginBottom: 28,
            maxWidth: 760,
            color: '#FAFAFA',
            textShadow: '0 2px 20px rgba(0,0,0,0.4)',
          }}
        >
          Copy. Paste.{' '}
          <span
            style={{
              color: '#06B6D4',
              textShadow: '0 0 40px rgba(6,182,212,0.5), 0 2px 20px rgba(0,0,0,0.4)',
            }}
          >
            Own it.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          {...fadeUp(0.3)}
          style={{
            fontSize: '1.05rem',
            color: 'rgba(255,255,255,0.72)',
            maxWidth: 500,
            lineHeight: 1.75,
            marginBottom: 40,
          }}
        >
          shadcn/ui inspired library for building beautiful, interactive Node.js CLIs
          with React and TypeScript.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.38)}
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: 44,
          }}
        >
          <Link
            href="/docs/getting-started/introduction"
            onMouseEnter={() => setPrimaryHovered(true)}
            onMouseLeave={() => setPrimaryHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '11px 28px',
              background: primaryHovered ? '#22D3EE' : '#06B6D4',
              color: '#000',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: '0.875rem',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              boxShadow: primaryHovered
                ? '0 0 0 1px rgba(6,182,212,0.6), 0 4px 32px rgba(6,182,212,0.5), 0 0 60px rgba(6,182,212,0.2)'
                : '0 0 0 1px rgba(6,182,212,0.4), 0 4px 24px rgba(6,182,212,0.3)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: primaryHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
            }}
          >
            Get Started →
          </Link>
          <Link
            href="/#components"
            onMouseEnter={() => setSecondaryHovered(true)}
            onMouseLeave={() => setSecondaryHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '11px 28px',
              background: secondaryHovered ? 'rgba(255,255,255,0.07)' : 'transparent',
              color: secondaryHovered ? '#FAFAFA' : 'rgba(255,255,255,0.85)',
              border: `1px solid ${secondaryHovered ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)'}`,
              borderRadius: 8,
              fontWeight: 600,
              fontSize: '0.875rem',
              textDecoration: 'none',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: secondaryHovered ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: secondaryHovered ? '0 4px 20px rgba(0,0,0,0.3)' : 'none',
            }}
          >
            Browse Components
          </Link>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', maxWidth: 680 }}
        >
          <TerminalHero />
        </motion.div>
      </div>
    </section>
  );
}
