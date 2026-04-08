#!/usr/bin/env node
import React, { useState, useEffect } from 'react';
import { render, Box, Text, useApp, useInput, useStdin } from 'ink';
import si from 'systeminformation';
import { Header } from '@inkui-cli/header';
import { ProgressBar } from '@inkui-cli/progress-bar';
import { Badge } from '@inkui-cli/badge';
import { StatusIndicator } from '@inkui-cli/status-indicator';
import { Table } from '@inkui-cli/table';
import { Divider } from '@inkui-cli/divider';
import { KeyHint } from '@inkui-cli/key-hint';

// ─── types ────────────────────────────────────────────────────────────────────

interface SystemData {
  cpu: number;
  mem: { used: number; total: number; percent: number };
  disks: Array<{ fs: string; use: number; size: number; used: number }>;
  processes: Array<{
    name: string;
    pid: number;
    cpu: number;
    mem: number;
    state: string;
  }>;
}

type SortKey = 'cpu' | 'mem';

// ─── helpers ──────────────────────────────────────────────────────────────────

function usageVariant(pct: number): 'success' | 'warning' | 'error' {
  if (pct > 90) return 'error';
  if (pct > 70) return 'warning';
  return 'success';
}

function usageStatus(pct: number): 'online' | 'warning' | 'error' {
  if (pct > 90) return 'error';
  if (pct > 70) return 'warning';
  return 'online';
}

function formatBytes(bytes: number): string {
  if (bytes >= 1e9) return (bytes / 1e9).toFixed(1) + ' GB';
  if (bytes >= 1e6) return (bytes / 1e6).toFixed(0) + ' MB';
  return (bytes / 1e3).toFixed(0) + ' KB';
}

async function fetchData(): Promise<SystemData> {
  const [load, mem, fsSizes, procs] = await Promise.all([
    si.currentLoad(),
    si.mem(),
    si.fsSize(),
    si.processes(),
  ]);

  const memPercent = Math.round((mem.used / mem.total) * 100);

  const disks = fsSizes
    .filter(d => d.size > 0 && d.use != null)
    .slice(0, 4)
    .map(d => ({
      fs: d.fs.length > 18 ? '…' + d.fs.slice(-17) : d.fs,
      use: Math.round(d.use ?? 0),
      size: d.size,
      used: d.used,
    }));

  const processes = (procs.list ?? [])
    .filter(p => p.cpu != null && p.mem != null)
    .sort((a, b) => (b.cpu ?? 0) - (a.cpu ?? 0))
    .slice(0, 10)
    .map(p => ({
      name: (p.name ?? '').slice(0, 20),
      pid: p.pid ?? 0,
      cpu: Math.round((p.cpu ?? 0) * 10) / 10,
      mem: Math.round((p.mem ?? 0) * 10) / 10,
      state: p.state ?? 'unknown',
    }));

  return {
    cpu: Math.round(load.currentLoad ?? 0),
    mem: { used: mem.used, total: mem.total, percent: memPercent },
    disks,
    processes,
  };
}

// ─── main component ───────────────────────────────────────────────────────────

function SysMon() {
  const { exit } = useApp();
  const [data, setData] = useState<SystemData | null>(null);
  const [sort, setSort] = useState<SortKey>('cpu');
  const [tick, setTick] = useState(0);

  // fetch on mount + every 2s
  useEffect(() => {
    fetchData().then(setData).catch(() => null);
    const interval = setInterval(() => {
      fetchData().then(d => {
        setData(d);
        setTick(t => t + 1);
      }).catch(() => null);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const { isRawModeSupported } = useStdin();
  useInput((input, key) => {
    const ch = input.toLowerCase();
    if (ch === 'q' || key.escape) exit();
    if (ch === 'c') setSort('cpu');
    if (ch === 'm') setSort('mem');
  }, { isActive: isRawModeSupported });

  if (!data) {
    return (
      <Box padding={1}>
        <Text color="cyan">Loading system data...</Text>
      </Box>
    );
  }

  const sortedProcesses = [...data.processes].sort((a, b) =>
    sort === 'cpu' ? b.cpu - a.cpu : b.mem - a.mem
  );

  const procTableData = sortedProcesses.map(p => ({
    process: p.name,
    pid: String(p.pid),
    'cpu%': p.cpu.toFixed(1),
    'mem%': p.mem.toFixed(1),
    status: p.state,
  }));

  return (
    <Box flexDirection="column" gap={1} padding={1}>
      {/* Header */}
      <Header title="inkui-sysmon" version="1.0.0" style="box" />

      {/* CPU */}
      <Box gap={2} alignItems="center">
        <Box width={10}><Text color="gray">CPU</Text></Box>
        <Box flexGrow={1}>
          <ProgressBar value={data.cpu} showPercent width={40} />
        </Box>
        <StatusIndicator
          status={usageStatus(data.cpu)}
          label={data.cpu > 90 ? 'Critical' : data.cpu > 70 ? 'High' : 'Normal'}
        />
      </Box>

      {/* Memory */}
      <Box gap={2} alignItems="center">
        <Box width={10}><Text color="gray">Memory</Text></Box>
        <Box flexGrow={1}>
          <ProgressBar value={data.mem.percent} showPercent width={40} />
        </Box>
        <StatusIndicator
          status={usageStatus(data.mem.percent)}
          label={`${formatBytes(data.mem.used)} / ${formatBytes(data.mem.total)}`}
        />
      </Box>

      {/* Disks */}
      {data.disks.map(disk => (
        <Box key={disk.fs} gap={2} alignItems="center">
          <Box width={10}><Text color="gray">{disk.fs.split('/').pop() || disk.fs}</Text></Box>
          <Box flexGrow={1}>
            <ProgressBar value={disk.use} showPercent width={40} />
          </Box>
          <StatusIndicator
            status={usageStatus(disk.use)}
            label={`${formatBytes(disk.used)} / ${formatBytes(disk.size)}`}
          />
        </Box>
      ))}

      <Divider />

      {/* Process table */}
      <Box>
        <Text color="gray">
          Top Processes  <Text color="cyan">(sorted by {sort === 'cpu' ? 'CPU' : 'Memory'})</Text>
        </Text>
      </Box>

      <Table
        columns={[
          { key: 'process', header: 'Process', width: 22 },
          { key: 'pid',     header: 'PID',     width: 7,  align: 'right' },
          { key: 'cpu%',    header: 'CPU%',    width: 7,  align: 'right' },
          { key: 'mem%',    header: 'MEM%',    width: 7,  align: 'right' },
          { key: 'status',  header: 'Status',  width: 10 },
        ]}
        data={procTableData}
      />

      <Divider style="dashed" />

      {/* Footer hints */}
      <Box justifyContent="space-between">
        <Text color="gray" dimColor>Refreshes every 2s</Text>
        <KeyHint keys={[
          { key: 'C', label: 'Sort CPU' },
          { key: 'M', label: 'Sort Mem' },
          { key: 'Q', label: 'Quit' },
        ]} />
      </Box>
    </Box>
  );
}

render(<SysMon />);
