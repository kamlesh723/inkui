import React from 'react';
import { render } from 'ink';
import { DataTable } from '../src/DataTable.js';

const columns = [
  { key: 'name' as const, header: 'Name', sortable: true },
  { key: 'status' as const, header: 'Status' },
  { key: 'region' as const, header: 'Region' },
  { key: 'updated' as const, header: 'Updated' },
];

const data = [
  { name: 'api-prod', status: '✓ online', region: 'us-east', updated: '2 min ago' },
  { name: 'deploy-v2', status: '● deploy', region: 'eu-west', updated: 'just now' },
  { name: 'worker-3', status: '✕ error', region: 'us-west', updated: '5 min ago' },
  { name: 'cache-1', status: '✓ online', region: 'ap-east', updated: '10 min ago' },
];

render(<DataTable columns={columns} data={data} focus={false} />);
setTimeout(() => process.exit(0), 3000);
