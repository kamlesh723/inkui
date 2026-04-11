'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const outerRef  = useRef<HTMLDivElement>(null);
  const dotRef    = useRef<HTMLDivElement>(null);
  const posRef    = useRef({ x: -600, y: -600 });
  const targetRef = useRef({ x: -600, y: -600 });

  useEffect(() => {
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    const tick = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.09;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.09;

      if (outerRef.current) {
        outerRef.current.style.transform =
          `translate(${posRef.current.x - 200}px, ${posRef.current.y - 200}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${targetRef.current.x - 2}px, ${targetRef.current.y - 2}px)`;
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
      {/* Outer glow — soft, barely-there, lagged */}
      <div
        ref={outerRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(6,182,212,0.055) 0%, rgba(124,58,237,0.025) 45%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9997,
          willChange: 'transform',
        }}
      />
      {/* Center dot — small, subtle glow */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: 'rgba(6,182,212,0.6)',
          boxShadow: '0 0 6px rgba(6,182,212,0.5)',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
        }}
      />
    </>
  );
}
