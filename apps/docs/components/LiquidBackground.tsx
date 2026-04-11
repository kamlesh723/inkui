'use client';

import { useEffect, useRef } from 'react';

// Actual characters from InkUI components — spinner braille, box-drawing, progress fill,
// status symbols, select arrow, etc. The background IS the product.
const CHARS = [
  '⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏',  // Spinner frames
  '┌','┐','└','┘','├','┤','┬','┴','┼','─','│',  // Table / Dialog borders
  '█','░','▓','▒',                                // ProgressBar fill
  '●','◎','○',                                    // StatusIndicator
  '✓','✕','⚠',                                   // Toast icons
  '❯','▶',                                        // Select cursor
  '#','$','_','>',                                 // Shell feel
];

const PALETTE: [number,number,number][] = [
  [6,  182,212],   // cyan      — primary accent
  [124, 58,237],   // violet
  [34, 197, 94],   // green
  [167,139,250],   // lavender
  [6,  182,212],   // cyan again (double weight)
  [124, 58,237],   // violet again
];

interface Particle {
  x:number; y:number;
  char:string;
  r:number; g:number; b:number;
  opacity:number; targetOpacity:number;
  size:number;
  vy:number; vx:number;
  phase:number;
}

function spawn(W:number, H:number, bottom=false): Particle {
  const [r,g,b] = PALETTE[Math.floor(Math.random()*PALETTE.length)];
  return {
    x: Math.random()*W,
    y: bottom ? H + 20 + Math.random()*120 : Math.random()*H,
    char: CHARS[Math.floor(Math.random()*CHARS.length)],
    r,g,b,
    opacity: 0,
    targetOpacity: 0.07 + Math.random()*0.16,
    size: 11 + Math.random()*9,
    vy: -(0.14 + Math.random()*0.30),
    vx: (Math.random()-0.5)*0.10,
    phase: Math.random()*Math.PI*2,
  };
}

function drawAuroraBlob(
  ctx:CanvasRenderingContext2D,
  cx:number,cy:number,
  rad:number,
  r:number,g:number,b:number,
  alpha:number,
) {
  const grad = ctx.createRadialGradient(cx,cy,0,cx,cy,rad);
  grad.addColorStop(0,   `rgba(${r},${g},${b},${alpha})`);
  grad.addColorStop(0.45,`rgba(${r},${g},${b},${alpha*0.28})`);
  grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
}

export default function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({x:-2000,y:-2000});

  useEffect(()=>{
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;

    const resize = ()=>{
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e:MouseEvent)=>{
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {x:e.clientX-rect.left, y:e.clientY-rect.top};
    };
    window.addEventListener('mousemove',onMove);

    const COUNT = 58;
    const particles:Particle[] = Array.from({length:COUNT},()=> spawn(canvas.width,canvas.height,false));
    // scatter initial opacities
    particles.forEach(p=>{ p.opacity = p.targetOpacity*Math.random(); });

    let rafId:number;
    const t0 = performance.now();

    const draw = ()=>{
      const W = canvas.width, H = canvas.height;
      if(!W||!H){ rafId=requestAnimationFrame(draw); return; }
      const t  = (performance.now()-t0)*0.001;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Background
      ctx.fillStyle='#020C18';
      ctx.fillRect(0,0,W,H);

      // Slow aurora ambient blobs — tied to product palette
      drawAuroraBlob(ctx, W*(0.18+Math.sin(t*0.07)*0.10), H*(0.28+Math.cos(t*0.055)*0.10), W*0.52, 6,182,212, 0.20);
      drawAuroraBlob(ctx, W*(0.78+Math.cos(t*0.06)*0.09), H*(0.22+Math.sin(t*0.08)*0.09),  W*0.45, 124,58,237,0.16);
      drawAuroraBlob(ctx, W*(0.50+Math.sin(t*0.05)*0.07), H*(0.72+Math.cos(t*0.06)*0.07),  W*0.40, 34,197,94, 0.11);

      // ── Terminal character particles ──────────────────────────────────
      for(const p of particles){
        p.y  += p.vy;
        p.x  += p.vx + Math.sin(t*0.38+p.phase)*0.07;
        p.opacity += (p.targetOpacity - p.opacity)*0.018;

        // respawn off top
        if(p.y < -30){ Object.assign(p, spawn(W,H,true)); }

        const dx = mx-p.x, dy = my-p.y;
        const dist = Math.hypot(dx,dy)||1;
        const influence = Math.max(0, 1-dist/200);

        ctx.save();
        ctx.font = `${p.size}px 'Geist Mono','Cascadia Code',monospace`;
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${Math.min(1, p.opacity + influence*0.45)})`;
        if(influence>0.04){
          ctx.shadowColor = `rgba(${p.r},${p.g},${p.b},${influence*0.9})`;
          ctx.shadowBlur  = 14*influence;
        }
        ctx.fillText(p.char,p.x,p.y);
        ctx.restore();
      }

      // Dot grid
      ctx.fillStyle='rgba(6,182,212,0.052)';
      const gs=28;
      for(let gx=0;gx<W;gx+=gs) for(let gy=0;gy<H;gy+=gs){
        ctx.beginPath(); ctx.arc(gx,gy,0.85,0,Math.PI*2); ctx.fill();
      }

      // Vignette
      const vig = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.max(W,H)*0.76);
      vig.addColorStop(0,   'rgba(0,0,0,0)');
      vig.addColorStop(0.50,'rgba(2,12,24,0.25)');
      vig.addColorStop(1,   'rgba(2,12,24,0.90)');
      ctx.fillStyle=vig;
      ctx.fillRect(0,0,W,H);

      rafId=requestAnimationFrame(draw);
    };

    rafId=requestAnimationFrame(draw);
    return ()=>{
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('mousemove',onMove);
    };
  },[]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:'absolute', inset:0,
        width:'100%', height:'100%',
        zIndex:0, display:'block',
        pointerEvents:'none',
      }}
    />
  );
}
