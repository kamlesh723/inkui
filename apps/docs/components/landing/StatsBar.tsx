export default function StatsBar() {
  const stats = [
    '15+ Components',
    '16 npm packages',
    'TypeScript',
    'MIT License',
  ];

  return (
    <div
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg)',
        padding: '28px 24px',
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
          gap: 0,
        }}
      >
        {stats.map((stat, i) => (
          <div key={stat} style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                fontWeight: 500,
                padding: '0 32px',
              }}
            >
              {stat}
            </span>
            {i < stats.length - 1 && (
              <div style={{ width: 1, height: 16, background: 'var(--border)' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
