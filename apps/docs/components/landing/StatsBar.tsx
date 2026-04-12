'use client';

export default function StatsBar() {
  const stats = [
    '32+ Components',
    '33 npm packages',
    'TypeScript',
    'MIT License',
  ];

  return (
    <div
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg)',
        padding: '24px 16px',
        overflowX: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          rowGap: 16,
          columnGap: 0,
        }}
      >
        {stats.map((stat, i) => (
          <div key={stat} style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: 500,
                padding: '0 20px',
                whiteSpace: 'nowrap',
              }}
            >
              {stat}
            </span>
            {i < stats.length - 1 && (
              <div style={{ width: 1, height: 16, background: 'var(--border)', flexShrink: 0 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
