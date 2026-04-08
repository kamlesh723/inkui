#!/usr/bin/env node
import React, { useState, useEffect } from 'react';
import { render, Box, Text, useApp } from 'ink';
import { execSync } from 'node:child_process';
import { Spinner } from '@inkui-cli/spinner';
import { Table } from '@inkui-cli/table';
import { MultiSelect } from '@inkui-cli/multi-select';
import { Confirm } from '@inkui-cli/confirm';
import { Toast, useToast, ToastStack } from '@inkui-cli/toast';
import { KeyHint } from '@inkui-cli/key-hint';
import { Badge } from '@inkui-cli/badge';

// ─── types ────────────────────────────────────────────────────────────────────

interface Branch {
  name: string;
  lastCommit: string;
  status: 'merged' | 'active' | 'unknown';
}

// ─── git helpers ──────────────────────────────────────────────────────────────

function isGitRepo(): boolean {
  try {
    execSync('git rev-parse --git-dir', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function getCurrentBranch(): string {
  try {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  } catch {
    return 'HEAD';
  }
}

function getMergedBranches(): Set<string> {
  try {
    const out = execSync('git branch --merged', { encoding: 'utf8' });
    return new Set(
      out.split('\n')
        .map(b => b.replace(/^\*?\s+/, '').trim())
        .filter(Boolean)
    );
  } catch {
    return new Set();
  }
}

function fetchBranches(): Branch[] {
  // git branch -v gives: "  name  <hash>  <message>" or "* name  <hash>  <message>"
  const raw = execSync(
    "git branch --sort=-committerdate --format='%(refname:short)|%(committerdate:relative)|%(upstream:track)'",
    { encoding: 'utf8' }
  );

  const currentBranch = getCurrentBranch();
  const mergedSet = getMergedBranches();

  return raw
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .filter(line => {
      const name = line.split('|')[0]?.trim() ?? '';
      return name !== currentBranch && name !== 'main' && name !== 'master';
    })
    .map(line => {
      const parts = line.split('|');
      const name = parts[0]?.trim() ?? '';
      const lastCommit = parts[1]?.trim() ?? 'unknown';
      const merged = mergedSet.has(name);
      return {
        name,
        lastCommit,
        status: (merged ? 'merged' : 'active') as Branch['status'],
      };
    });
}

function deleteBranch(name: string): { ok: boolean; error?: string } {
  try {
    execSync(`git branch -d "${name}"`, { encoding: 'utf8', stdio: 'pipe' });
    return { ok: true };
  } catch (e: unknown) {
    // If -d fails (unmerged), try to give a clear error
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes('not fully merged')) {
      return { ok: false, error: 'not fully merged — use -D to force' };
    }
    return { ok: false, error: msg.split('\n')[0] };
  }
}

// ─── app states ──────────────────────────────────────────────────────────────

type AppState =
  | { phase: 'loading' }
  | { phase: 'no-repo' }
  | { phase: 'no-branches' }
  | { phase: 'select'; branches: Branch[] }
  | { phase: 'confirm'; branches: Branch[]; selected: Branch[] }
  | { phase: 'deleting'; results: Array<{ branch: Branch; ok: boolean; error?: string }> }
  | { phase: 'done' };

// ─── main component ───────────────────────────────────────────────────────────

function GitTidy() {
  const { exit } = useApp();
  const [state, setState] = useState<AppState>({ phase: 'loading' });
  const { toasts, show: showToast, dismiss: dismissToast } = useToast();

  useEffect(() => {
    if (state.phase !== 'loading') return;
    const timer = setTimeout(() => {
      if (!isGitRepo()) {
        setState({ phase: 'no-repo' });
        return;
      }
      const branches = fetchBranches();
      if (branches.length === 0) {
        setState({ phase: 'no-branches' });
        return;
      }
      setState({ phase: 'select', branches });
    }, 600); // brief pause so spinner renders
    return () => clearTimeout(timer);
  }, [state.phase]);

  // auto-exit when done after toasts finish
  useEffect(() => {
    if (state.phase === 'done') {
      const t = setTimeout(() => exit(), 3500);
      return () => clearTimeout(t);
    }
  }, [state.phase, exit]);

  if (state.phase === 'loading') {
    return (
      <Box flexDirection="column" gap={1} padding={1}>
        <Text bold color="cyan">git-tidy</Text>
        <Spinner label="Fetching branches..." />
      </Box>
    );
  }

  if (state.phase === 'no-repo') {
    return (
      <Box flexDirection="column" gap={1} padding={1}>
        <Badge variant="error">Not a git repository</Badge>
        <Text color="gray">Run git-tidy inside a git repository.</Text>
      </Box>
    );
  }

  if (state.phase === 'no-branches') {
    return (
      <Box flexDirection="column" gap={1} padding={1}>
        <Badge variant="success">Already clean</Badge>
        <Text color="gray">No branches to clean up (excluding main/master and current branch).</Text>
      </Box>
    );
  }

  if (state.phase === 'select') {
    const { branches } = state;
    const mergedDefaults = branches
      .filter(b => b.status === 'merged')
      .map(b => b.name);

    const items = branches.map(b => ({
      label: b.name,
      value: b.name,
      // show status inline in label
    }));

    const tableData = branches.map(b => ({
      branch: b.name,
      last_commit: b.lastCommit,
      status: b.status,
    }));

    return (
      <Box flexDirection="column" gap={1} padding={1}>
        <Text bold color="cyan">git-tidy  </Text>
        <Text color="gray">Select branches to delete. Merged branches are pre-selected.</Text>

        <Table
          columns={[
            { key: 'branch', header: 'Branch', width: 30 },
            { key: 'last_commit', header: 'Last Commit', width: 16 },
            { key: 'status', header: 'Status', width: 10 },
          ]}
          data={tableData}
        />

        <Box marginTop={1}>
          <MultiSelect
            items={items}
            defaultSelected={branches.filter(b => b.status === 'merged').map(b => b.name)}
            onSubmit={(selected) => {
              if (selected.length === 0) {
                exit();
                return;
              }
              const selectedBranches = branches.filter(b =>
                selected.some(s => s.value === b.name)
              );
              setState({ phase: 'confirm', branches, selected: selectedBranches });
            }}
          />
        </Box>

        <KeyHint keys={[
          { key: '↑↓', label: 'Navigate' },
          { key: 'Space', label: 'Toggle' },
          { key: 'Enter', label: 'Confirm' },
          { key: 'Esc', label: 'Quit' },
        ]} />
      </Box>
    );
  }

  if (state.phase === 'confirm') {
    const { selected } = state;
    return (
      <Box flexDirection="column" gap={1} padding={1}>
        <Text color="yellow">⚠  You are about to delete {selected.length} branch{selected.length > 1 ? 'es' : ''}:</Text>
        {selected.map(b => (
          <Text key={b.name} color="gray">   • {b.name}</Text>
        ))}
        <Box marginTop={1}>
          <Confirm
            message={`Delete ${selected.length} branch${selected.length > 1 ? 'es' : ''}?`}
            defaultValue={false}
            onConfirm={() => {
              const results: Array<{ branch: Branch; ok: boolean; error?: string }> = [];
              for (const branch of selected) {
                const result = deleteBranch(branch.name);
                results.push({ branch, ...result });
                if (result.ok) {
                  showToast(`Deleted ${branch.name}`, 'success', 3000);
                } else {
                  showToast(`Failed: ${branch.name} — ${result.error}`, 'error', 4000);
                }
              }
              setState({ phase: 'deleting', results });
              setTimeout(() => setState({ phase: 'done' }), 500);
            }}
            onCancel={() => exit()}
          />
        </Box>
      </Box>
    );
  }

  if (state.phase === 'deleting' || state.phase === 'done') {
    return (
      <Box flexDirection="column" gap={1} padding={1}>
        <ToastStack toasts={toasts} onDismiss={dismissToast} />
        {state.phase === 'done' && toasts.length === 0 && (
          <Text color="gray">Done. Exiting...</Text>
        )}
      </Box>
    );
  }

  return null;
}

render(<GitTidy />);
