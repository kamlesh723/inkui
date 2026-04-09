'use client';

import { useEffect, useRef } from 'react';

export function AnimatedHeroBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;

    const isDark = () =>
      document.documentElement.classList.contains('dark');

    // Resize canvas to match element size
    const ro = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    });
    ro.observe(canvas);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let t = 0;

    // Two wave sources that orbit slowly around the canvas center
    function getWaveSources(w: number, h: number) {
      return [
        {
          x: w / 2 + Math.cos(t * 0.22) * w * 0.28,
          y: h / 2 + Math.sin(t * 0.18) * h * 0.22,
        },
        {
          x: w / 2 + Math.cos(t * 0.15 + 2.1) * w * 0.22,
          y: h / 2 + Math.sin(t * 0.20 + 1.0) * h * 0.18,
        },
      ];
    }

    function draw() {
      const dark = isDark();
      const w = canvas!.width;
      const h = canvas!.height;
      if (!w || !h) { raf = requestAnimationFrame(draw); return; }

      ctx!.clearRect(0, 0, w, h);

      // ── Base fill ──────────────────────────────────────────
      ctx!.fillStyle = dark ? '#060E1B' : '#F8FBFF';
      ctx!.fillRect(0, 0, w, h);

      // ── Animated orbs ──────────────────────────────────────
      const orbs = dark
        ? [
            { x: w * 0.25 + Math.sin(t * 0.25) * 80, y: h * 0.35 + Math.cos(t * 0.18) * 60, r: 380, color: 'rgba(6,182,212,0.13)' },
            { x: w * 0.72 + Math.cos(t * 0.20) * 70, y: h * 0.55 + Math.sin(t * 0.15) * 50, r: 320, color: 'rgba(168,85,247,0.08)' },
            { x: w * 0.5  + Math.sin(t * 0.12) * 50, y: h * 0.2  + Math.cos(t * 0.22) * 40, r: 280, color: 'rgba(6,182,212,0.06)' },
          ]
        : [
            { x: w * 0.22 + Math.sin(t * 0.25) * 80, y: h * 0.30 + Math.cos(t * 0.18) * 60, r: 420, color: 'rgba(6,182,212,0.09)' },
            { x: w * 0.75 + Math.cos(t * 0.20) * 70, y: h * 0.60 + Math.sin(t * 0.15) * 50, r: 360, color: 'rgba(99,102,241,0.07)' },
            { x: w * 0.5  + Math.sin(t * 0.12) * 50, y: h * 0.15 + Math.cos(t * 0.22) * 40, r: 300, color: 'rgba(6,182,212,0.05)' },
          ];

      for (const orb of orbs) {
        const g = ctx!.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        g.addColorStop(0, orb.color);
        g.addColorStop(1, 'transparent');
        ctx!.fillStyle = g;
        ctx!.fillRect(0, 0, w, h);
      }

      // ── Animated dot grid ──────────────────────────────────
      const spacing = 36;
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;
      const sources = getWaveSources(w, h);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing;
          const y = r * spacing;

          // Combine wave from both moving sources
          let wave = 0;
          for (const src of sources) {
            const dist = Math.sqrt((x - src.x) ** 2 + (y - src.y) ** 2);
            wave += Math.sin(dist * 0.022 - t * 1.8) * 0.5 + 0.5;
          }
          wave = wave / sources.length;

          const baseAlpha = dark ? 0.12 : 0.08;
          const alpha = baseAlpha + wave * (dark ? 0.32 : 0.18);
          const dotR = 1 + wave * 0.9;

          ctx!.beginPath();
          ctx!.arc(x, y, dotR, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(6,182,212,${alpha.toFixed(3)})`;
          ctx!.fill();
        }
      }

      // ── Subtle vignette ────────────────────────────────────
      const vig = ctx!.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h);
      vig.addColorStop(0, 'transparent');
      vig.addColorStop(1, dark ? 'rgba(6,14,27,0.55)' : 'rgba(248,251,255,0.5)');
      ctx!.fillStyle = vig;
      ctx!.fillRect(0, 0, w, h);

      t += 0.016;
      raf = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
