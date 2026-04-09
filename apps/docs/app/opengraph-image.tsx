import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0B',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Cyan gradient line at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: 'linear-gradient(90deg, #06B6D4, #A855F7)',
          }}
        />

        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 300,
            background: 'radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            marginBottom: 24,
          }}
        >
          <span style={{ color: '#FAFAFA', fontSize: 28, fontWeight: 700 }}>Ink</span>
          <span style={{ color: '#06B6D4', fontSize: 28, fontWeight: 700 }}>UI</span>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            color: '#FAFAFA',
            letterSpacing: '-2px',
            marginBottom: 20,
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          Beautiful UI for the{' '}
          <span style={{ color: '#06B6D4' }}>terminal</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: '#A1A1AA',
            marginBottom: 48,
            textAlign: 'center',
          }}
        >
          shadcn/ui, but for CLIs. Copy-paste. TypeScript. Built on Ink.
        </div>

        {/* Terminal command */}
        <div
          style={{
            background: '#141417',
            border: '1px solid #27272A',
            borderRadius: 10,
            padding: '16px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ color: '#71717A', fontSize: 20 }}>$</span>
          <span style={{ color: '#06B6D4', fontSize: 20 }}>npx inkui add spinner table select</span>
        </div>

        {/* Badge row */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            gap: 16,
          }}
        >
          {['15+ Components', 'TypeScript', 'MIT License'].map((label) => (
            <div
              key={label}
              style={{
                background: 'rgba(6,182,212,0.08)',
                border: '1px solid rgba(6,182,212,0.2)',
                borderRadius: 20,
                padding: '4px 14px',
                color: '#06B6D4',
                fontSize: 14,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
