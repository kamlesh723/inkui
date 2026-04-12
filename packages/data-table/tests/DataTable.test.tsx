import React from 'react';
import { render } from 'ink-testing-library';
import { describe, test, expect } from 'vitest';
import { DataTable } from '../src/DataTable.js';

const columns = [
  { key: 'name' as const, header: 'Name', sortable: true },
  { key: 'status' as const, header: 'Status' },
  { key: 'region' as const, header: 'Region' },
];

const data = [
  { name: 'api-prod', status: 'online', region: 'us-east' },
  { name: 'worker-1', status: 'error', region: 'eu-west' },
  { name: 'deploy-v2', status: 'deploy', region: 'us-west' },
];

describe('DataTable', () => {
  test('renders column headers', () => {
    const { lastFrame } = render(<DataTable columns={columns} data={data} focus={false} />);
    expect(lastFrame()).toContain('Name');
    expect(lastFrame()).toContain('Status');
    expect(lastFrame()).toContain('Region');
  });

  test('renders data rows', () => {
    const { lastFrame } = render(<DataTable columns={columns} data={data} focus={false} />);
    expect(lastFrame()).toContain('api-prod');
    expect(lastFrame()).toContain('worker-1');
  });

  test('shows empty message when data is empty', () => {
    const { lastFrame } = render(
      <DataTable columns={columns} data={[]} focus={false} emptyMessage="No records" />
    );
    expect(lastFrame()).toContain('No records');
  });

  test('shows footer with pagination info', () => {
    const { lastFrame } = render(<DataTable columns={columns} data={data} focus={false} showFooter />);
    expect(lastFrame()).toContain('Page 1');
  });

  test('hides footer when showFooter=false', () => {
    const { lastFrame } = render(
      <DataTable columns={columns} data={data} focus={false} showFooter={false} />
    );
    expect(lastFrame()).not.toContain('Page 1');
  });
});
