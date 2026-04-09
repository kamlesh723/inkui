import React, { useState, useCallback } from 'react';
import { Box, Text, useApp, useInput } from 'ink';
import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { Spinner } from '@inkui-cli/spinner';
import { Badge } from '@inkui-cli/badge';
import { ProgressBar } from '@inkui-cli/progress-bar';
import { Select } from '@inkui-cli/select';
import { Panel } from '@inkui-cli/panel';
import { darkTheme, lightTheme, type InkUITheme } from '@inkui-cli/core';

// ── Constants ─────────────────────────────────────────────────
const COLOR_CHOICES = [
  'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray',
  'redBright', 'greenBright', 'yellowBright', 'blueBright',
  'magentaBright', 'cyanBright', 'whiteBright',
];

const BORDER_CHOICES: InkUITheme['border'][] = [
  'single', 'double', 'rounded', 'bold', 'ascii',
];

type ColorKey = keyof InkUITheme['colors'];

const COLOR_FIELDS: ColorKey[] = [
  'primary', 'secondary', 'success', 'warning', 'error',
  'info', 'muted', 'text', 'textInverse', 'border', 'focus', 'selection',
];

// Total rows = COLOR_FIELDS.length + 1 (border row)
const TOTAL_ROWS = COLOR_FIELDS.length + 1;
const BORDER_ROW = COLOR_FIELDS.length; // index of the border row

// ── Helpers ───────────────────────────────────────────────────
function cycleIndex(arr: unknown[], cur: number, dir: 1 | -1): number {
  return (cur + dir + arr.length) % arr.length;
}

function buildThemeFile(theme: InkUITheme): string {
  const colors = theme.colors;
  return `import type { InkUITheme } from '@inkui-cli/core';

export const customTheme: InkUITheme = {
  colors: {
    primary: '${colors.primary}',
    secondary: '${colors.secondary}',
    success: '${colors.success}',
    warning: '${colors.warning}',
    error: '${colors.error}',
    info: '${colors.info}',
    muted: '${colors.muted}',
    text: '${colors.text}',
    textInverse: '${colors.textInverse}',
    border: '${colors.border}',
    focus: '${colors.focus}',
    selection: '${colors.selection}',
  },
  border: '${theme.border}',
};
`;
}

// ── Sub-components ────────────────────────────────────────────
function ColorRow({
  label,
  color,
  selected,
}: {
  label: string;
  color: string;
  selected: boolean;
}) {
  const prefix = selected ? '❯ ' : '  ';
  const labelPad = label.padEnd(12);
  return (
    <Box>
      <Text color={selected ? 'cyan' : 'gray'}>{prefix}</Text>
      <Text color={selected ? 'white' : 'gray'}>{labelPad}</Text>
      <Text color={color as string} bold={selected}>{color}</Text>
    </Box>
  );
}

function BorderRow({
  border,
  selected,
}: {
  border: InkUITheme['border'];
  selected: boolean;
}) {
  const prefix = selected ? '❯ ' : '  ';
  return (
    <Box>
      <Text color={selected ? 'cyan' : 'gray'}>{prefix}</Text>
      <Text color={selected ? 'white' : 'gray'}>{'border'.padEnd(12)}</Text>
      <Text color={selected ? 'cyan' : 'gray'} bold={selected}>{border}</Text>
    </Box>
  );
}

// ── Status overlay ────────────────────────────────────────────
type Status = 'idle' | 'confirm-overwrite' | 'saved' | 'error';

// ── Main Component ────────────────────────────────────────────
export function ThemeCommand() {
  const { exit } = useApp();

  const [colors, setColors] = useState<InkUITheme['colors']>({ ...darkTheme.colors });
  const [border, setBorder] = useState<InkUITheme['border']>(darkTheme.border);
  const [selectedRow, setSelectedRow] = useState(0);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const currentTheme: InkUITheme = { colors, border };

  // ── Save logic ──────────────────────────────────────────────
  const doSave = useCallback(() => {
    const dest = join(process.cwd(), 'inkui.theme.ts');
    try {
      writeFileSync(dest, buildThemeFile(currentTheme), 'utf8');
      setStatus('saved');
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setErrorMsg(msg);
      setStatus('error');
    }
  }, [currentTheme]);

  // ── Keyboard ────────────────────────────────────────────────
  useInput((input, key) => {
    if (status === 'confirm-overwrite') {
      if (input === 'y' || input === 'Y') { doSave(); return; }
      setStatus('idle');
      return;
    }

    if (status === 'saved' || status === 'error') {
      exit();
      return;
    }

    if (input === 'q') { exit(); return; }

    if (input === 'r') {
      setColors({ ...darkTheme.colors });
      setBorder(darkTheme.border);
      return;
    }

    if (input === 'l') {
      setColors({ ...lightTheme.colors });
      setBorder(lightTheme.border);
      return;
    }

    if (key.upArrow) {
      setSelectedRow((r) => Math.max(0, r - 1));
      return;
    }
    if (key.downArrow) {
      setSelectedRow((r) => Math.min(TOTAL_ROWS - 1, r + 1));
      return;
    }

    // ← → cycle value
    const dir = key.leftArrow ? -1 : key.rightArrow ? 1 : null;
    if (dir !== null) {
      if (selectedRow === BORDER_ROW) {
        const idx = BORDER_CHOICES.indexOf(border);
        setBorder(BORDER_CHOICES[cycleIndex(BORDER_CHOICES, idx, dir)]!);
      } else {
        const field = COLOR_FIELDS[selectedRow]!;
        const cur = colors[field];
        const idx = COLOR_CHOICES.indexOf(cur);
        const next = COLOR_CHOICES[cycleIndex(COLOR_CHOICES, idx, dir)]!;
        setColors((c) => ({ ...c, [field]: next }));
      }
      return;
    }

    if (key.return) {
      const dest = join(process.cwd(), 'inkui.theme.ts');
      if (existsSync(dest)) {
        setStatus('confirm-overwrite');
      } else {
        doSave();
      }
    }
  });

  // ── Saved / Error screens ───────────────────────────────────
  if (status === 'saved') {
    return (
      <Box flexDirection="column" gap={1}>
        <Text color="green" bold>Theme saved to inkui.theme.ts</Text>
        <Text color="gray">Import it in your app:</Text>
        <Text color="cyan">  import {'{ customTheme }'} from './inkui.theme.js';</Text>
        <Text color="gray">Press any key to exit...</Text>
      </Box>
    );
  }

  if (status === 'error') {
    return (
      <Box flexDirection="column" gap={1}>
        <Text color="red" bold>Failed to save theme</Text>
        <Text color="gray">{errorMsg}</Text>
        <Text color="gray">Press any key to exit...</Text>
      </Box>
    );
  }

  // ── Main layout ─────────────────────────────────────────────
  return (
    <Box flexDirection="column">
      {/* Header */}
      <Box paddingX={1} marginBottom={1}>
        <Text bold color="cyan">InkUI Theme Builder</Text>
        <Text color="gray">  ↑↓ select  ←→ cycle  Enter save  r reset  l light  q quit</Text>
      </Box>

      <Box flexDirection="row" gap={1} alignItems="flex-start">

        {/* Left: color editor */}
        <Panel title="Colors" width={32} borderStyle="rounded" borderColor={colors.border} theme={currentTheme}>
          {COLOR_FIELDS.map((field, i) => (
            <ColorRow
              key={field}
              label={field}
              color={colors[field]}
              selected={selectedRow === i}
            />
          ))}
          <Text> </Text>
          <BorderRow border={border} selected={selectedRow === BORDER_ROW} />
        </Panel>

        {/* Right: live preview */}
        <Panel title="Preview" width={36} borderStyle="rounded" borderColor={colors.primary} theme={currentTheme}>
          <Box flexDirection="column" gap={1}>
            {/* Spinner */}
            <Spinner type="dots" label="Loading data..." theme={currentTheme} />

            {/* Badges */}
            <Box gap={1}>
              <Badge variant="success" theme={currentTheme}>SUCCESS</Badge>
              <Badge variant="error" theme={currentTheme}>ERROR</Badge>
              <Badge variant="warning" theme={currentTheme}>WARN</Badge>
            </Box>

            {/* Progress */}
            <ProgressBar value={67} width={28} theme={currentTheme} />

            {/* Select (focus=false so it doesn't intercept keys) */}
            <Select
              items={[
                { label: 'React', value: 'react' },
                { label: 'Vue', value: 'vue' },
                { label: 'Svelte', value: 'svelte' },
              ]}
              onSelect={() => {}}
              focus={false}
              theme={currentTheme}
            />
          </Box>
        </Panel>

      </Box>

      {/* Overwrite prompt */}
      {status === 'confirm-overwrite' && (
        <Box marginTop={1} paddingX={1}>
          <Text color="yellow">inkui.theme.ts already exists. Overwrite? </Text>
          <Text color="cyan">(y/N)</Text>
        </Box>
      )}
    </Box>
  );
}
