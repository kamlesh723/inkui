import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from 'ink-testing-library';
import { Table } from './Table.js';

const COLUMNS = [
  { key: 'name' as const,   header: 'Name' },
  { key: 'status' as const, header: 'Status' },
  { key: 'port' as const,   header: 'Port' },
];

const DATA = [
  { name: 'api',      status: 'running', port: '3000' },
  { name: 'worker',   status: 'idle',    port: '3001' },
  { name: 'database', status: 'running', port: '5432' },
];

describe('Table', () => {
  it('renders without crashing', () => {
    const { lastFrame } = render(<Table columns={COLUMNS} data={DATA} />);
    expect(lastFrame()).toBeTruthy();
    expect(lastFrame()!.length).toBeGreaterThan(0);
  });

  it('renders column headers', () => {
    const { lastFrame } = render(<Table columns={COLUMNS} data={DATA} />);
    expect(lastFrame()).toContain('Name');
    expect(lastFrame()).toContain('Status');
    expect(lastFrame()).toContain('Port');
  });

  it('renders row data', () => {
    const { lastFrame } = render(<Table columns={COLUMNS} data={DATA} />);
    expect(lastFrame()).toContain('api');
    expect(lastFrame()).toContain('running');
    expect(lastFrame()).toContain('3000');
  });

  it('renders with double border style', () => {
    const { lastFrame } = render(
      <Table columns={COLUMNS} data={DATA} borderStyle="double" />
    );
    expect(lastFrame()).toContain('═');
  });
});
