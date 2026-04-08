'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';
import TerminalHero from '@/components/TerminalHero';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
});

export default function Hero() {
  return (
    <section
      className="dot-grid"
      style={{
        minHeight: 'calc(100vh - 56px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        textAlign: 'center',
      }}
    >
      {/* Badge */}
      <motion.div {...fadeUp(0.2)}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '4px 14px',
            borderRadius: 20,
            border: '1px solid rgba(6, 182, 212, 0.3)',
            background: 'rgba(6, 182, 212, 0.05)',
            color: '#06B6D4',
            fontSize: '0.8rem',
            fontWeight: 500,
            marginBottom: 28,
          }}
        >
          8+ Components · TypeScript · Open Source
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        {...fadeUp(0.3)}
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: 20,
          maxWidth: 700,
        }}
      >
        Beautiful UI components for the{' '}
        <span className="gradient-text">terminal</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        {...fadeUp(0.4)}
        style={{
          fontSize: '1.15rem',
          color: '#A1A1AA',
          maxWidth: 480,
          lineHeight: 1.7,
          marginBottom: 36,
        }}
      >
        shadcn/ui, but for CLIs. Copy-paste components. TypeScript. Built on Ink.
      </motion.p>

      {/* Buttons */}
      <motion.div
        {...fadeUp(0.5)}
        style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 64 }}
      >
        <Link
          href="/docs/getting-started/introduction"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '10px 22px',
            background: '#06B6D4',
            color: '#000',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: '0.9rem',
            textDecoration: 'none',
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
            gap: 6,
            padding: '10px 22px',
            background: 'transparent',
            color: '#FAFAFA',
            border: '1px solid #27272A',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: '0.9rem',
            textDecoration: 'none',
          }}
        >
          <Github size={15} /> GitHub
        </a>
      </motion.div>

      {/* Terminal window */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: 640 }}
      >
        <TerminalHero />
      </motion.div>
    </section>
  );
}
