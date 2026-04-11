'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef   = useRef<HTMLDivElement>(null);
  const posRef   = useRef({ x: -600, y: -600 });
  const targetRef = useRef({ x: -600, y: -600 });

  useEffect(() => {
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    const tick = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.10;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.10;

      if (outerRef.current) {
        outerRef.current.style.transform =
          `translate(${posRef.current.x - 280}px, ${posRef.current.y - 280}px)`;
      }
      // dot follows cursor exactly (no lag)
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${targetRef.current.x - 3}px, ${targetRef.current.y - 3}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Outer glow — lagged, larger */}
      <div
        ref={outerRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 560,
          height: 560,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(6,182,212,0.13) 0%, rgba(124,58,237,0.07) 38%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 9997,
          willChange: 'transform',
        }}
      />
      {/* Sharp center dot — exact cursor position */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'rgba(6,182,212,0.85)',
          boxShadow: '0 0 8px rgba(6,182,212,0.9), 0 0 20px rgba(6,182,212,0.4)',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
        }}
      />
    </>
  );
}
