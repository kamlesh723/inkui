'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import TerminalHero from '@/components/TerminalHero';
import { hyperspeedPresets } from '@/components/HyperspeedPresets';

const Hyperspeed = dynamic(
  () => import('@/components/Hyperspeed').then((m) => ({ default: m.Hyperspeed })),
  { ssr: false },
);

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Hero() {
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
        padding: '60px 20px 80px',
        textAlign: 'center',
        overflowX: 'hidden',
        overflow: 'hidden',
      }}
    >
      {/* Hyperspeed WebGL background */}
      <Hyperspeed effectOptions={hyperspeedPresets.one} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

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
          <span style={{ color: '#06B6D4' }}>Own it.</span>
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
            marginBottom: 64,
          }}
        >
          <Link
            href="/docs/getting-started/introduction"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '11px 26px',
              background: '#06B6D4',
              color: '#000',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: '0.875rem',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              boxShadow: '0 0 0 1px rgba(6,182,212,0.4), 0 4px 24px rgba(6,182,212,0.3)',
              transition: 'opacity 0.15s, box-shadow 0.15s',
            }}
          >
            Get Started
          </Link>
          <Link
            href="/#components"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '11px 26px',
              background: 'transparent',
              color: '#FAFAFA',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: '0.875rem',
              textDecoration: 'none',
              transition: 'border-color 0.15s',
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
