import React from 'react';
import { render, Box, Text } from 'ink';
import { Table } from '../src/index.js';
import type { TableColumn } from '../src/index.js';
import { darkTheme, lightTheme } from '@inkui/core';

// ── dataset 1: contributors ───────────────────────────────────────────────────

type Contributor = {
  name: string;
  role: string;
  commits: number;
  status: string;
};

const contributors: Contributor[] = [
  { name: 'Kamlesh',  role: 'Author',      commits: 142, status: 'active' },
  { name: 'Debeshi',  role: 'Maintainer',  commits:  88, status: 'active' },
  { name: 'Prabhat',  role: 'Contributor', commits:  34, status: 'inactive' },
  { name: 'Ananya',   role: 'Reviewer',    commits:  19, status: 'active' },
  { name: 'Somebody With A Very Long Name', role: 'Intern', commits: 3, status: 'active' },
];

const contributorCols: TableColumn<Contributor>[] = [
  { key: 'name',    header: 'Name',    align: 'left'  },
  { key: 'role',    header: 'Role',    align: 'left'  },
  { key: 'commits', header: 'Commits', align: 'right' },
  { key: 'status',  header: 'Status',  align: 'left'  },
];

// ── dataset 2: packages ───────────────────────────────────────────────────────

type Package = {
  pkg: string;
  version: string;
  size: string;
};

const packages: Package[] = [
  { pkg: '@inkui/core',         version: '0.1.0', size: '2.6 KB' },
  { pkg: '@inkui/spinner',      version: '0.1.0', size: '837 B'  },
  { pkg: '@inkui/badge',        version: '0.1.0', size: '743 B'  },
  { pkg: '@inkui/progress-bar', version: '0.1.0', size: '1.3 KB' },
  { pkg: '@inkui/text-input',   version: '0.1.0', size: '3.3 KB' },
  { pkg: '@inkui/select',       version: '0.1.0', size: '2.6 KB' },
  { pkg: '@inkui/multi-select', version: '0.1.0', size: '3.8 KB' },
  { pkg: '@inkui/table',        version: '0.1.0', size: 'TBD'    },
];

const pkgCols: TableColumn<Package>[] = [
  { key: 'pkg',     header: 'Package',  align: 'left'  },
  { key: 'version', header: 'Version',  align: 'center' },
  { key: 'size',    header: 'ESM Size', align: 'right' },
];

// ─────────────────────────────────────────────────────────────────────────────

const Demo = () => (
  <Box flexDirection="column" gap={1}>
    <Text bold>@inkui/table — live demo</Text>

    <Box flexDirection="column">
      <Text dimColor>── single border · dark theme · overflow truncation ─</Text>
      <Box marginTop={1}>
        <Table
          columns={contributorCols}
          data={contributors}
          borderStyle="single"
          theme={darkTheme}
        />
      </Box>
    </Box>

    <Box flexDirection="column">
      <Text dimColor>── rounded border · dark theme · inkui packages ─────</Text>
      <Box marginTop={1}>
        <Table
          columns={pkgCols}
          data={packages}
          borderStyle="rounded"
          theme={darkTheme}
        />
      </Box>
    </Box>

    <Box flexDirection="column">
      <Text dimColor>── bold border · light theme ─────────────────────────</Text>
      <Box marginTop={1}>
        <Table
          columns={contributorCols}
          data={contributors.slice(0, 3)}
          borderStyle="bold"
          theme={lightTheme}
        />
      </Box>
    </Box>
  </Box>
);

render(<Demo />);

setTimeout(() => process.exit(0), 3000);
