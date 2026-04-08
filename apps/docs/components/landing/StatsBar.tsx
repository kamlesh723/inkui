export default function StatsBar() {
  const stats = [
    '8+ Components',
    '10 npm packages',
    'TypeScript',
    'Open Source',
  ];

  return (
    <div
      style={{
        borderTop: '1px solid #27272A',
        borderBottom: '1px solid #27272A',
        background: '#0A0A0B',
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
                color: '#A1A1AA',
                fontSize: '0.9rem',
                fontWeight: 500,
                padding: '0 32px',
              }}
            >
              {stat}
            </span>
            {i < stats.length - 1 && (
              <div style={{ width: 1, height: 16, background: '#27272A' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
