import { ImageResponse } from 'next/og';
import { source } from '@/lib/source';
import { notFound } from 'next/navigation';

// Node.js runtime — fumadocs-mdx uses fs, which isn't available in Edge
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export default async function OGImage({ params }: Props) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const isComponent = slug?.[0] === 'components';
  const section = isComponent ? 'Components' : 'Getting Started';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0B',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px 80px',
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
            bottom: 0,
            right: 0,
            width: 500,
            height: 400,
            background: 'radial-gradient(ellipse at bottom right, rgba(6,182,212,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Top row: logo + section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'auto',
          }}
        >
          <div style={{ display: 'flex', gap: 4 }}>
            <span style={{ color: '#FAFAFA', fontSize: 22, fontWeight: 700 }}>Ink</span>
            <span style={{ color: '#06B6D4', fontSize: 22, fontWeight: 700 }}>UI</span>
          </div>
          <span
            style={{
              color: '#71717A',
              fontSize: 18,
              background: '#141417',
              border: '1px solid #27272A',
              borderRadius: 6,
              padding: '4px 14px',
            }}
          >
            {section}
          </span>
        </div>

        {/* Page title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#FAFAFA',
            letterSpacing: '-2px',
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          {page.data.title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 26,
            color: '#A1A1AA',
            lineHeight: 1.5,
            marginBottom: 48,
            maxWidth: 800,
          }}
        >
          {page.data.description}
        </div>

        {/* Terminal snippet */}
        {isComponent && (
          <div
            style={{
              background: '#141417',
              border: '1px solid #27272A',
              borderRadius: 10,
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              alignSelf: 'flex-start',
            }}
          >
            <span style={{ color: '#71717A', fontSize: 18 }}>$</span>
            <span style={{ color: '#06B6D4', fontSize: 18 }}>
              npx inkui add {slug?.[1] ?? 'component'}
            </span>
          </div>
        )}
      </div>
    ),
    { ...size },
  );
}
