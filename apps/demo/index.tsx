/**
 * InkUI — full component showcase demo
 * Runs for ~38s, then exits. Record with asciinema, convert with agg.
 */
import React, { useState, useEffect } from 'react';
import { render, Box, Text } from 'ink';

import { Spinner }     from '@inkui-cli/spinner';
import { Badge }       from '@inkui-cli/badge';
import { ProgressBar } from '@inkui-cli/progress-bar';
import { Table }       from '@inkui-cli/table';
import type { TableColumn } from '@inkui-cli/table';

import { darkTheme, borderStyles } from '@inkui-cli/core';
import type { InkUITheme, BorderStyle } from '@inkui-cli/core';

const T = darkTheme;

// ─── scene catalogue ──────────────────────────────────────────────────────────

const SCENES = [
  { id: 'intro',       label: 'Welcome',      duration: 3200 },
  { id: 'badge',       label: 'Badge',        duration: 3500 },
  { id: 'spinner',     label: 'Spinner',      duration: 3800 },
  { id: 'progress',    label: 'ProgressBar',  duration: 4200 },
  { id: 'textinput',   label: 'TextInput',    duration: 4000 },
  { id: 'select',      label: 'Select',       duration: 4200 },
  { id: 'multiselect', label: 'MultiSelect',  duration: 4500 },
  { id: 'table',       label: 'Table',        duration: 4000 },
  { id: 'dialog',      label: 'Dialog',       duration: 3800 },
  { id: 'outro',       label: 'Install',      duration: 3000 },
] as const;

type SceneId = (typeof SCENES)[number]['id'];

// ─── global header ─────────────────────────────────────────────────────────────

function Header({ sceneIdx }: { sceneIdx: number }) {
  const scene = SCENES[sceneIdx]!;
  const dots = SCENES.map((_, i) =>
    i < sceneIdx ? '●' : i === sceneIdx ? '◉' : '○',
  ).join('');

  return (
    <Box
      borderStyle="round"
      borderColor={T.colors.border}
      paddingX={1}
      marginBottom={1}
      justifyContent="space-between"
      width={88}
    >
      <Text color={T.colors.primary} bold>{'◆ InkUI'}</Text>
      <Text color={T.colors.muted}>{scene.label}</Text>
      <Text color={T.colors.muted}>{dots}</Text>
    </Box>
  );
}

// ─── divider ──────────────────────────────────────────────────────────────────

function Divider({ label }: { label: string }) {
  const line = '─'.repeat(3);
  return (
    <Box marginBottom={1}>
      <Text color={T.colors.border}>{line} </Text>
      <Text color={T.colors.muted} dimColor>{label}</Text>
      <Text color={T.colors.border}> {'─'.repeat(Math.max(0, 50 - label.length))}</Text>
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE 0 — INTRO
// ═══════════════════════════════════════════════════════════════════════════════

function Intro() {
  return (
    <Box flexDirection="column" alignItems="center" paddingTop={2} gap={1}>
      <Box flexDirection="column" alignItems="center">
        <Text color={T.colors.primary} bold>
          {' ██╗███╗   ██╗██╗  ██╗██╗   ██╗██╗ '}
        </Text>
        <Text color={T.colors.primary} bold>
          {' ██║████╗  ██║██║ ██╔╝██║   ██║██║ '}
        </Text>
        <Text color={T.colors.primary} bold>
          {' ██║██╔██╗ ██║█████╔╝ ██║   ██║██║ '}
        </Text>
        <Text color={T.colors.primary} bold>
          {' ██║██║╚██╗██║██╔═██╗ ██║   ██║██║ '}
        </Text>
        <Text color={T.colors.primary} bold>
          {' ██║██║ ╚████║██║  ██╗╚██████╔╝██║ '}
        </Text>
        <Text color={T.colors.primary} bold>
          {' ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚═╝'}
        </Text>
      </Box>

      <Box flexDirection="column" alignItems="center" marginTop={1} gap={1}>
        <Text color={T.colors.text} bold>shadcn/ui for the terminal</Text>
        <Text color={T.colors.muted}>8 composable components · dark + light themes · zero runtime deps</Text>
        <Box gap={2} marginTop={1}>
          <Badge variant="success">Spinner</Badge>
          <Badge variant="info">Badge</Badge>
          <Badge variant="warning">ProgressBar</Badge>
          <Badge variant="default">TextInput</Badge>
          <Badge variant="success">Select</Badge>
          <Badge variant="info">MultiSelect</Badge>
          <Badge variant="warning">Table</Badge>
          <Badge variant="error">Dialog</Badge>
        </Box>
      </Box>
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE 1 — BADGE
// ═══════════════════════════════════════════════════════════════════════════════

function BadgeScene() {
  return (
    <Box flexDirection="column" gap={1} paddingX={2}>
      <Divider label="all variants · dark theme" />
      <Box gap={2}>
        <Badge variant="default">default</Badge>
        <Badge variant="success">success</Badge>
        <Badge variant="warning">warning</Badge>
        <Badge variant="error">error</Badge>
        <Badge variant="info">info</Badge>
      </Box>

      <Box flexDirection="column" gap={1} marginTop={1}>
        <Divider label="real-world usage" />
        <Box gap={2}>
          <Badge variant="success">✓ passing</Badge>
          <Badge variant="error">✗ failing</Badge>
          <Badge variant="warning">⚠ deprecated</Badge>
          <Badge variant="info">ℹ  beta</Badge>
          <Badge variant="default">v0.1.0</Badge>
        </Box>
        <Box gap={2}>
          <Badge variant="success">deployed</Badge>
          <Badge variant="warning">pending review</Badge>
          <Badge variant="error">blocked</Badge>
          <Badge variant="info">in progress</Badge>
        </Box>
      </Box>

      <Box flexDirection="column" gap={1} marginTop={1}>
        <Divider label="npx inkui add badge" />
        <Box>
          <Text color={T.colors.muted}>{'import { Badge } from '}</Text>
          <Text color={T.colors.primary}>{'\'@inkui-cli/badge\''}</Text>
        </Box>
        <Box>
          <Text color={T.colors.muted}>{'<Badge variant="success">deployed</Badge>'}</Text>
        </Box>
      </Box>
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE 2 — SPINNER
// ═══════════════════════════════════════════════════════════════════════════════

function SpinnerScene() {
  return (
    <Box flexDirection="column" gap={1} paddingX={2}>
      <Divider label="4 animation styles · live" />
      <Spinner label="Compiling TypeScript...          dots"   type="dots"   theme={T} />
      <Spinner label="Fetching dependencies...         line"   type="line"   theme={T} />
      <Spinner label="Uploading build artifacts...     arc"    type="arc"    theme={T} />
      <Spinner label="Running test suite...            bounce" type="bounce" theme={T} />

      <Box flexDirection="column" gap={1} marginTop={1}>
        <Divider label="custom intervals" />
        <Spinner label="Slow pulse (200ms)"  type="dots"   interval={200} theme={T} />
        <Spinner label="Fast spin (40ms)"    type="arc"    interval={40}  theme={T} />
        <Spinner label="Energetic (30ms)"    type="bounce" interval={30}  theme={T} />
      </Box>

      <Box flexDirection="column" gap={1} marginTop={1}>
        <Divider label="npx inkui add spinner" />
        <Box>
          <Text color={T.colors.muted}>{'<Spinner type="arc" label="Loading" />'}</Text>
        </Box>
      </Box>
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE 3 — PROGRESSBAR
// ═══════════════════════════════════════════════════════════════════════════════

function ProgressScene({ tick }: { tick: number }) {
  // Main bar animates 0→100 over first 3500ms
  const animated = Math.min(100, Math.round((tick / 3500) * 100));
  // Staggered bars
  const bar1 = Math.min(100, Math.round(((tick - 0)    / 3200) * 100));
  const bar2 = Math.min(100, Math.round(((tick - 400)  / 3200) * 100));
  const bar3 = Math.min(100, Math.round(((tick - 800)  / 3200) * 100));

  return (
    <Box flexDirection="column" gap={1} paddingX={2}>
      <Divider label="animated · staggered" />
      <ProgressBar value={bar1} label="Downloading  " width={50} theme={T} />
      <ProgressBar value={bar2} label="Extracting   " width={50} theme={T} />
      <ProgressBar value={bar3} label="Installing   " width={50} theme={T} />

      <Box flexDirection="column" gap={1} marginTop={1}>
        <Divider label="fixed snapshots" />
        <ProgressBar value={0}   label="  0%" width={50} theme={T} />
        <ProgressBar value={33}  label=" 33%" width={50} theme={T} />
        <ProgressBar value={67}  label=" 67%" width={50} theme={T} />
        <ProgressBar value={100} label="100%" width={50} theme={T} />
      </Box>

      <Box flexDirection="column" gap={1} marginTop={1}>
        <Divider label="no percent label" />
        <ProgressBar value={animated} width={50} showPercent={false} theme={T} />
      </Box>
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE 4 — TEXTINPUT (simulated display — no useInput needed)
// ═══════════════════════════════════════════════════════════════════════════════

interface SimInputProps {
  label:       string;
  finalValue:  string;
  delay:       number;   // ms before typing starts
  tick:        number;
  charDelay?:  number;   // ms per character
  password?:   boolean;
  placeholder?: string;
  focused?:    boolean;
}

function SimInput({
  label, finalValue, delay, tick, charDelay = 80,
  password = false, placeholder = '', focused = true,
}: SimInputProps) {
  const elapsed    = Math.max(0, tick - delay);
  const charCount  = Math.min(finalValue.length, Math.floor(elapsed / charDelay));
  const rawDisplay = finalValue.slice(0, charCount);
  const display    = password ? '*'.repeat(rawDisplay.length) : rawDisplay;
  const showCursor = focused && tick % 700 < 400;

  return (
    <Box>
      <Text color={T.colors.muted}>{label.padEnd(10)}</Text>
      <Text color={T.colors.border}>{'❯ '}</Text>
      {display.length === 0 && !focused && (
        <Text color={T.colors.muted}>{placeholder}</Text>
      )}
      {display.length === 0 && focused && (
        <Box>
          {showCursor
            ? <Text color={T.colors.focus} inverse>{placeholder ? placeholder[0] : ' '}</Text>
            : <Text color={T.colors.muted}>{placeholder || ' '}</Text>
          }
          {placeholder.length > 1 && (
            <Text color={T.colors.muted}>{placeholder.slice(1)}</Text>
          )}
        </Box>
      )}
      {display.length > 0 && (
        <Box>
          <Text>{display}</Text>
          {showCursor && <Text color={T.colors.focus} inverse>{' '}</Text>}
        </Box>
      )}
    </Box>
  );
}

function TextInputScene({ tick }: { tick: number }) {
  return (
    <Box flexDirection="column" gap={1} paddingX={2}>
      <Divider label="focused · typing simulation" />

      <SimInput label="Name"     finalValue="Kamlesh Yadav"       delay={0}    tick={tick} />
      <SimInput label="Email"    finalValue="kamlesh@inkui.dev"   delay={600}  tick={tick} placeholder="you@example.com" />
      <SimInput label="Password" finalValue="s3cr3t_p@ssw0rd"     delay={1400} tick={tick} password />

      <Box flexDirection="column" gap={1} marginTop={1}>
        <Divider label="unfocused states" />
        <SimInput label="Username" finalValue="inkui_dev"         delay={0}    tick={999999} focused={false} />
        <SimInput label="Token"    finalValue=""                  delay={0}    tick={999999} focused={false} placeholder="paste token here…" />
      </Box>

      <Box flexDirection="column" gap={1} marginTop={1}>
        <Divider label="npx inkui add text-input" />
        <Box>
          <Text color={T.colors.muted}>
            {'<TextInput label="Email" value={val} onChange={setVal} onSubmit={submit} />'}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE 5 — SELECT (simulated display)
// ═══════════════════════════════════════════════════════════════════════════════

interface SimSelectItem {
  label:     string;
  value:     string;
  disabled?: boolean;
}

interface SimSelectProps {
  items:       SimSelectItem[];
  activeIndex: number;
  isFocused:   boolean;
}

function SimSelect({ items, activeIndex, isFocused }: SimSelectProps) {
  return (
    <Box flexDirection="column">
      {items.map((item, i) => {
        const isActive   = i === activeIndex && isFocused;
        const isDisabled = !!item.disabled;
        const indicator  = isActive ? '❯ ' : '  ';
        const labelColor = isDisabled
          ? T.colors.muted
          : isActive
          ? T.colors.focus
          : T.colors.text;

        return (
          <Box key={item.value}>
            <Text color={isActive ? T.colors.focus : T.colors.muted}>{indicator}</Text>
            <Text color={labelColor} dimColor={isDisabled}>{item.label}</Text>
            {isDisabled && <Text color={T.colors.muted}>{' (disabled)'}</Text>}
          </Box>
        );
      })}
    </Box>
  );
}

const frameworkItems: SimSelectItem[] = [
  { label: 'React',   value: 'react'   },
  { label: 'Vue',     value: 'vue'     },
  { label: 'Svelte',  value: 'svelte'  },
  { label: 'Angular', value: 'angular', disabled: true },
  { label: 'Solid',   value: 'solid'   },
];

const planItems: SimSelectItem[] = [
  { label: 'Hobby — free',      value: 'hobby'      },
  { label: 'Pro — $12/mo',      value: 'pro'        },
  { label: 'Team — $49/mo',     value: 'team'       },
  { label: 'Enterprise',        value: 'enterprise', disabled: true },
];

function SelectScene({ tick }: { tick: number }) {
  // Enabled indices: 0,1,2,4 (skip disabled 3)
  const enabledSeq = [0, 1, 2, 4];
  const step       = Math.floor(tick / 650) % enabledSeq.length;
  const activeIdx  = enabledSeq[step]!;

  // Second list: slower cycle
  const planEnabled = [0, 1, 2];
  const planStep    = Math.floor(tick / 900) % planEnabled.length;
  const planActive  = planEnabled[planStep]!;

  return (
    <Box flexDirection="column" gap={1} paddingX={2}>
      <Divider label="arrow-key navigation · skips disabled items" />
      <Box gap={6}>
        <Box flexDirection="column">
          <Text color={T.colors.muted} dimColor>Pick a framework</Text>
          <Box marginTop={1}>
            <SimSelect items={frameworkItems} activeIndex={activeIdx} isFocused />
          </Box>
        </Box>

        <Box flexDirection="column">
          <Text color={T.colors.muted} dimColor>Choose a plan</Text>
          <Box marginTop={1}>
            <SimSelect items={planItems} activeIndex={planActive} isFocused />
          </Box>
        </Box>
      </Box>

      <Box marginTop={1}>
        <Divider label="npx inkui add select" />
      </Box>
      <Box>
        <Text color={T.colors.muted}>
          {'<Select items={options} onSelect={(item) => console.log(item.value)} />'}
        </Text>
      </Box>
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE 6 — MULTISELECT (simulated display)
// ═══════════════════════════════════════════════════════════════════════════════

interface SimMultiSelectItem extends SimSelectItem {
  checked?: boolean;
}

interface SimMultiSelectProps {
  items:       SimMultiSelectItem[];
  activeIndex: number;
  isFocused:   boolean;
}

function SimMultiSelect({ items, activeIndex, isFocused }: SimMultiSelectProps) {
  return (
    <Box flexDirection="column">
      {items.map((item, i) => {
        const isActive   = i === activeIndex && isFocused;
        const isChecked  = !!item.checked;
        const isDisabled = !!item.disabled;

        const indicator  = isActive ? '❯ ' : '  ';
        const checkbox   = isChecked ? '◉' : '◯';
        const checkColor = isDisabled
          ? T.colors.muted
          : isChecked
          ? T.colors.success
          : T.colors.muted;
        const labelColor = isDisabled
          ? T.colors.muted
          : isActive
          ? T.colors.focus
          : T.colors.text;

        return (
          <Box key={item.value}>
            <Text color={isActive ? T.colors.focus : T.colors.muted}>{indicator}</Text>
            <Text color={checkColor}>{checkbox} </Text>
            <Text color={labelColor} dimColor={isDisabled}>{item.label}</Text>
            {isDisabled && <Text color={T.colors.muted}>{' (disabled)'}</Text>}
          </Box>
        );
      })}
      {isFocused && (
        <Box marginTop={1}>
          <Text color={T.colors.muted}>{'space: toggle  ·  enter: confirm'}</Text>
        </Box>
      )}
    </Box>
  );
}

const featureBase: SimMultiSelectItem[] = [
  { label: 'TypeScript',          value: 'ts'       },
  { label: 'ESLint',              value: 'eslint'   },
  { label: 'Prettier',            value: 'prettier' },
  { label: 'Vitest',              value: 'vitest'   },
  { label: 'Husky hooks',         value: 'husky',   disabled: true },
  { label: 'GitHub Actions CI',   value: 'ci'       },
];

const roleBase: SimMultiSelectItem[] = [
  { label: 'Read',    value: 'read'   },
  { label: 'Write',   value: 'write'  },
  { label: 'Delete',  value: 'delete', disabled: true },
  { label: 'Admin',   value: 'admin'  },
];

function MultiSelectScene({ tick }: { tick: number }) {
  // Animation frames: cursor moves 0→5, toggling items along the way
  // frames (each 650ms): move, move, toggle, move, move, toggle, loop
  type Frame = { cursor: number; checked: Set<string> };

  const frames: Frame[] = [
    { cursor: 0, checked: new Set()                              },
    { cursor: 0, checked: new Set(['ts'])                        },
    { cursor: 1, checked: new Set(['ts'])                        },
    { cursor: 1, checked: new Set(['ts','eslint'])               },
    { cursor: 2, checked: new Set(['ts','eslint'])               },
    { cursor: 2, checked: new Set(['ts','eslint','prettier'])    },
    { cursor: 3, checked: new Set(['ts','eslint','prettier'])    },
    { cursor: 3, checked: new Set(['ts','eslint','prettier','vitest']) },
    // skip 4 (disabled), jump to 5
    { cursor: 5, checked: new Set(['ts','eslint','prettier','vitest']) },
    { cursor: 5, checked: new Set(['ts','eslint','prettier','vitest','ci']) },
  ];

  const frameIdx = Math.floor(tick / 430) % frames.length;
  const frame    = frames[frameIdx]!;

  const featItems = featureBase.map((it) => ({
    ...it,
    checked: frame.checked.has(it.value),
  }));

  // Roles: pre-selected static
  const roleItems = roleBase.map((it) => ({
    ...it,
    checked: ['read','write'].includes(it.value),
  }));

  return (
    <Box flexDirection="column" gap={1} paddingX={2}>
      <Divider label="space to toggle · enter to confirm · skips disabled" />
      <Box gap={8}>
        <Box flexDirection="column">
          <Text color={T.colors.muted} dimColor>Project features</Text>
          <Box marginTop={1}>
            <SimMultiSelect items={featItems} activeIndex={frame.cursor} isFocused />
          </Box>
        </Box>

        <Box flexDirection="column">
          <Text color={T.colors.muted} dimColor>User permissions (pre-selected)</Text>
          <Box marginTop={1}>
            <SimMultiSelect items={roleItems} activeIndex={0} isFocused={false} />
          </Box>
        </Box>
      </Box>

      <Box marginTop={1}>
        <Divider label="npx inkui add multi-select" />
      </Box>
      <Box>
        <Text color={T.colors.muted}>
          {'<MultiSelect items={opts} defaultSelected={[\'ts\']} onSubmit={(sel) => ...} />'}
        </Text>
      </Box>
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE 7 — TABLE
// ═══════════════════════════════════════════════════════════════════════════════

type PkgRow = { pkg: string; version: string; size: string; status: string };

const pkgData: PkgRow[] = [
  { pkg: '@inkui-cli/core',         version: '0.1.0', size: '2.6 KB', status: 'stable' },
  { pkg: '@inkui-cli/spinner',      version: '0.1.0', size: '837 B',  status: 'stable' },
  { pkg: '@inkui-cli/badge',        version: '0.1.0', size: '743 B',  status: 'stable' },
  { pkg: '@inkui-cli/progress-bar', version: '0.1.0', size: '1.3 KB', status: 'stable' },
  { pkg: '@inkui-cli/text-input',   version: '0.1.0', size: '3.3 KB', status: 'stable' },
  { pkg: '@inkui-cli/select',       version: '0.1.0', size: '2.6 KB', status: 'stable' },
  { pkg: '@inkui-cli/multi-select', version: '0.1.0', size: '3.8 KB', status: 'stable' },
  { pkg: '@inkui-cli/table',        version: '0.1.0', size: '4.1 KB', status: 'stable' },
  { pkg: '@inkui-cli/dialog',       version: '0.1.0', size: '3.5 KB', status: 'stable' },
];

const pkgCols: TableColumn<PkgRow>[] = [
  { key: 'pkg',     header: 'Package',   align: 'left'   },
  { key: 'version', header: 'Version',   align: 'center' },
  { key: 'size',    header: 'ESM Size',  align: 'right'  },
  { key: 'status',  header: 'Status',    align: 'center' },
];

type ContribRow = { name: string; role: string; commits: number; status: string };

const contribData: ContribRow[] = [
  { name: 'Kamlesh',  role: 'Author',      commits: 142, status: '🟢 active'   },
  { name: 'Debeshi',  role: 'Maintainer',  commits:  88, status: '🟢 active'   },
  { name: 'Prabhat',  role: 'Contributor', commits:  34, status: '⚪ inactive'  },
  { name: 'Ananya',   role: 'Reviewer',    commits:  19, status: '🟢 active'   },
];

const contribCols: TableColumn<ContribRow>[] = [
  { key: 'name',    header: 'Contributor', align: 'left'  },
  { key: 'role',    header: 'Role',        align: 'left'  },
  { key: 'commits', header: 'Commits',     align: 'right' },
  { key: 'status',  header: 'Status',      align: 'left'  },
];

function TableScene() {
  return (
    <Box flexDirection="column" gap={1} paddingX={2}>
      <Divider label="rounded border · inkui packages" />
      <Table columns={pkgCols} data={pkgData} borderStyle="rounded" theme={T} />

      <Box marginTop={1}>
        <Divider label="single border · contributors" />
      </Box>
      <Table columns={contribCols} data={contribData} borderStyle="single" theme={T} />
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE 8 — DIALOG (simulated display)
// ═══════════════════════════════════════════════════════════════════════════════

interface SimDialogProps {
  title?:       string;
  message:      string;
  actions:      Array<{ label: string; value: string }>;
  activeIndex:  number;
  isFocused:    boolean;
  borderStyle:  BorderStyle;
}

function SimDialog({ title, message, actions, activeIndex, isFocused, borderStyle }: SimDialogProps) {
  const b  = borderStyles[borderStyle];
  const bc = T.colors.border;

  const lines      = message.split('\n');
  const titleLen   = title ? title.length : 0;
  const maxLine    = Math.max(titleLen, ...lines.map((l) => l.length));
  const actionRow  = actions.map((a) => `[ ${a.label} ]`).join('  ');
  const innerWidth = Math.max(maxLine, actionRow.length, 30);
  const hRule      = b.top.repeat(innerWidth + 2);

  return (
    <Box flexDirection="column">
      <Text color={bc}>{b.topLeft + hRule + b.topRight}</Text>
      {title ? (
        <>
          <Box>
            <Text color={bc}>{b.left} </Text>
            <Text color={T.colors.primary} bold>{title.padEnd(innerWidth)}</Text>
            <Text color={bc}>{' ' + b.right}</Text>
          </Box>
          <Text color={bc}>{b.leftT + hRule + b.rightT}</Text>
        </>
      ) : null}
      {/* empty padding */}
      <Box>
        <Text color={bc}>{b.left}</Text>
        <Text>{' '.repeat(innerWidth + 2)}</Text>
        <Text color={bc}>{b.right}</Text>
      </Box>
      {lines.map((line, idx) => (
        <Box key={idx}>
          <Text color={bc}>{b.left} </Text>
          <Text>{line.padEnd(innerWidth)}</Text>
          <Text color={bc}>{' ' + b.right}</Text>
        </Box>
      ))}
      <Box>
        <Text color={bc}>{b.left}</Text>
        <Text>{' '.repeat(innerWidth + 2)}</Text>
        <Text color={bc}>{b.right}</Text>
      </Box>
      <Text color={bc}>{b.leftT + hRule + b.rightT}</Text>
      <Box>
        <Text color={bc}>{b.left} </Text>
        <Box flexGrow={1} justifyContent="flex-end" gap={2}>
          {actions.map((action, i) => {
            const isActive = i === activeIndex && isFocused;
            return (
              <Text
                key={action.value}
                color={isActive ? T.colors.focus : T.colors.muted}
                bold={isActive}
                inverse={isActive}
              >
                {` ${action.label} `}
              </Text>
            );
          })}
        </Box>
        <Text color={bc}>{' ' + b.right}</Text>
      </Box>
      <Text color={bc}>{b.bottomLeft + hRule + b.bottomRight}</Text>
      {isFocused && (
        <Text color={T.colors.muted}>{'  ← → navigate  ·  enter: confirm  ·  esc: dismiss'}</Text>
      )}
    </Box>
  );
}

function DialogScene({ tick }: { tick: number }) {
  // Button focus alternates every 1200ms
  const btnIdx = Math.floor(tick / 1200) % 2;

  return (
    <Box flexDirection="column" gap={1} paddingX={2}>
      <Divider label="keyboard-driven · ← → navigate · enter confirm · esc dismiss" />

      <Box gap={4}>
        <Box flexDirection="column">
          <Text color={T.colors.muted} dimColor>rounded · focused</Text>
          <Box marginTop={1}>
            <SimDialog
              title="Deploy to production?"
              message={'This will push changes live.\nAll users will be affected.'}
              actions={[{ label: 'Cancel', value: 'cancel' }, { label: 'Deploy', value: 'deploy' }]}
              activeIndex={btnIdx}
              isFocused
              borderStyle="rounded"
            />
          </Box>
        </Box>

        <Box flexDirection="column">
          <Text color={T.colors.muted} dimColor>double · unfocused</Text>
          <Box marginTop={1}>
            <SimDialog
              title="Delete project?"
              message="This action cannot be undone."
              actions={[{ label: 'Keep', value: 'keep' }, { label: 'Delete', value: 'delete' }]}
              activeIndex={0}
              isFocused={false}
              borderStyle="double"
            />
          </Box>
        </Box>
      </Box>

      <Box marginTop={1}>
        <Divider label="npx inkui add dialog" />
      </Box>
      <Box>
        <Text color={T.colors.muted}>
          {'<Dialog isOpen title="Confirm?" message="…" actions={acts} onAction={handler} />'}
        </Text>
      </Box>
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE 9 — OUTRO
// ═══════════════════════════════════════════════════════════════════════════════

const ALL_COMPONENTS = [
  'spinner', 'badge', 'progress-bar', 'text-input',
  'select', 'multi-select', 'table', 'dialog',
];

function Outro({ tick }: { tick: number }) {
  // Reveal each component one at a time
  const revealed = Math.min(ALL_COMPONENTS.length, Math.floor(tick / 300) + 1);

  return (
    <Box flexDirection="column" paddingX={2} paddingTop={1} gap={1}>
      <Box flexDirection="column" alignItems="center" gap={1}>
        <Text color={T.colors.primary} bold>{'─'.repeat(48)}</Text>
        <Text bold>Get started in seconds</Text>
        <Text color={T.colors.primary} bold>{'─'.repeat(48)}</Text>
      </Box>

      <Box flexDirection="column" gap={1} marginTop={1}>
        {ALL_COMPONENTS.slice(0, revealed).map((c) => (
          <Box key={c} gap={2}>
            <Text color={T.colors.success}>{'❯'}</Text>
            <Text color={T.colors.muted}>npx inkui add </Text>
            <Text color={T.colors.primary} bold>{c}</Text>
          </Box>
        ))}
      </Box>

      <Box flexDirection="column" gap={1} marginTop={2} alignItems="center">
        <Text color={T.colors.muted}>{'─'.repeat(48)}</Text>
        <Box gap={3}>
          <Badge variant="info">github.com/kamlesh723/inkui</Badge>
          <Badge variant="success">MIT License</Badge>
          <Badge variant="default">v0.1.0</Badge>
        </Box>
        <Text color={T.colors.muted} dimColor>Own your components. Zero vendor lock-in.</Text>
      </Box>
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ORCHESTRATOR
// ═══════════════════════════════════════════════════════════════════════════════

const Demo: React.FC = () => {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [tick, setTick]         = useState(0);

  // Tick every 50ms for smooth animations
  useEffect(() => {
    const t = setInterval(() => setTick((p) => p + 50), 50);
    return () => clearInterval(t);
  }, [sceneIdx]);

  // Advance scene
  useEffect(() => {
    const scene = SCENES[sceneIdx];
    if (!scene) return;
    if (tick < scene.duration) return;

    if (sceneIdx === SCENES.length - 1) {
      setTimeout(() => process.exit(0), 800);
      return;
    }
    setSceneIdx((prev) => prev + 1);
    setTick(0);
  }, [tick, sceneIdx]);

  const scene = SCENES[sceneIdx]!;

  return (
    <Box flexDirection="column" width={88}>
      <Header sceneIdx={sceneIdx} />

      {scene.id === 'intro'       && <Intro />}
      {scene.id === 'badge'       && <BadgeScene />}
      {scene.id === 'spinner'     && <SpinnerScene />}
      {scene.id === 'progress'    && <ProgressScene tick={tick} />}
      {scene.id === 'textinput'   && <TextInputScene tick={tick} />}
      {scene.id === 'select'      && <SelectScene tick={tick} />}
      {scene.id === 'multiselect' && <MultiSelectScene tick={tick} />}
      {scene.id === 'table'       && <TableScene />}
      {scene.id === 'dialog'      && <DialogScene tick={tick} />}
      {scene.id === 'outro'       && <Outro tick={tick} />}
    </Box>
  );
};

render(<Demo />);
