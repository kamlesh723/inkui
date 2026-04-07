import type { PropDef } from '@/lib/components-data';

export const PropsTable: React.FC<{ props: PropDef[] }> = ({ props }) => (
  <div className="code-block" style={{ borderRadius: 6, overflow: 'hidden' }}>
    <table className="props-table">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {props.map((p) => (
          <tr key={p.name}>
            <td>
              <span className={`prop-name${p.required ? ' prop-required' : ''}`}>
                {p.name}
              </span>
            </td>
            <td><span className="prop-type">{p.type}</span></td>
            <td>
              {p.default ? (
                <span className="prop-default">{p.default}</span>
              ) : (
                <span style={{ color: 'var(--text-muted)' }}>—</span>
              )}
            </td>
            <td style={{ color: 'var(--text-muted)', fontSize: '0.825rem' }}>
              {p.description}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
