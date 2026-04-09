import React, { useState, useEffect, useCallback } from 'react';
import { Box, Text, useApp, useInput, useStdout } from 'ink';
import { execSync } from 'node:child_process';
import { KeyHint } from '@inkui-cli/key-hint';
import { Panel } from '@inkui-cli/panel';
import { darkTheme } from '@inkui-cli/core';
import { registry } from '../playground/registry.js';

// ── Types ─────────────────────────────────────────────────────
type Pane = 'list' | 'props';

// ── Clipboard helper ──────────────────────────────────────────
function copyToClipboard(text: string): boolean {
  try {
    const safe = text.replace(/'/g, "'\\''");
    if (process.platform === 'darwin') {
      execSync(`printf '%s' '${safe}' | pbcopy`);
    } else if (process.platform === 'win32') {
      execSync(`echo ${text} | clip`);
    } else {
      try {
        execSync(`printf '%s' '${safe}' | xclip -selection clipboard 2>/dev/null`);
      } catch {
        execSync(`printf '%s' '${safe}' | xsel --clipboard 2>/dev/null`);
      }
    }
    return true;
  } catch {
    return false;
  }
}

// ── Component list item ───────────────────────────────────────
function ListItem({ name, selected, active }: { name: string; selected: boolean; active: boolean }) {
  const prefix = selected ? '❯ ' : '  ';
  const color = selected ? (active ? 'cyan' : 'white') : 'gray';
  return (
    <Text color={color} bold={selected && active}>
      {prefix}{name}
    </Text>
  );
}

// ── Props row ─────────────────────────────────────────────────
function PropRow({
  def,
  value,
  selected,
  active,
}: {
  def: { name: string; type: string; options?: string[]; description: string };
  value: string | boolean;
  selected: boolean;
  active: boolean;
}) {
  const nameCol = def.name.padEnd(12);
  const accentColor = selected && active ? 'cyan' : selected ? 'white' : 'gray';

  if (def.type === 'boolean') {
    return (
      <Text color={accentColor}>
        {nameCol}  {value ? '[✓]' : '[ ]'} {def.description}
      </Text>
    );
  }

  // enum — show all options, highlight current
  const options = def.options ?? [];
  return (
    <Box flexDirection="row">
      <Text color={accentColor}>{nameCol}  </Text>
      {options.map((opt, i) => (
        <React.Fragment key={`${opt}-${i}`}>
          <Text color={String(value) === opt ? 'cyan' : 'gray'}>
            {String(value) === opt ? '●' : '○'} {opt}
          </Text>
          {i < options.length - 1 && <Text color="gray">  </Text>}
        </React.Fragment>
      ))}
    </Box>
  );
}

// ── Main Playground ───────────────────────────────────────────
export function PlaygroundCommand() {
  const { exit } = useApp();
  const { stdout } = useStdout();

  const [cols, setCols] = useState(stdout?.columns ?? 80);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activePane, setActivePane] = useState<Pane>('list');
  const [selectedProp, setSelectedProp] = useState(0);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  // Initialize prop values per component from registry defaults
  const [propValues, setPropValues] = useState<Record<string, Record<string, string | boolean>>>(() => {
    const init: Record<string, Record<string, string | boolean>> = {};
    for (const comp of registry) {
      init[comp.name] = {};
      for (const p of comp.props) {
        init[comp.name][p.name] = p.default;
      }
    }
    return init;
  });

  // Terminal resize
  useEffect(() => {
    if (!stdout) return;
    const handler = () => setCols(stdout.columns ?? 80);
    stdout.on('resize', handler);
    return () => { stdout.off('resize', handler); };
  }, [stdout]);

  const currentComp = registry[selectedIdx]!;
  const currentProps = propValues[currentComp.name] ?? {};
  const compProps = currentComp.props;

  // Cycle enum prop value
  const cycleProp = useCallback((dir: 1 | -1) => {
    const prop = compProps[selectedProp];
    if (!prop) return;
    const cur = currentProps[prop.name] ?? prop.default;
    if (prop.type === 'enum') {
      const opts = prop.options!;
      const idx = opts.indexOf(String(cur));
      const next = (idx + dir + opts.length) % opts.length;
      setPropValues((pv) => ({
        ...pv,
        [currentComp.name]: { ...pv[currentComp.name], [prop.name]: opts[next]! },
      }));
    } else if (prop.type === 'boolean') {
      setPropValues((pv) => ({
        ...pv,
        [currentComp.name]: { ...pv[currentComp.name], [prop.name]: !cur },
      }));
    }
  }, [compProps, selectedProp, currentProps, currentComp.name]);

  // Copy current code to clipboard
  const copyCode = useCallback(() => {
    const code = currentComp.code(currentProps);
    const ok = copyToClipboard(code);
    setCopyStatus(ok ? 'copied' : 'failed');
    setTimeout(() => setCopyStatus('idle'), 1800);
  }, [currentComp, currentProps]);

  useInput((input, key) => {
    // Global keys
    if (input === 'q') { exit(); return; }
    if (input === 'c') { copyCode(); return; }
    if (key.tab) {
      setActivePane((p) => {
        if (p === 'list') { setSelectedProp(0); return 'props'; }
        return 'list';
      });
      return;
    }

    if (activePane === 'list') {
      if (key.upArrow) {
        setSelectedIdx((i) => Math.max(0, i - 1));
        setSelectedProp(0);
      }
      if (key.downArrow) {
        setSelectedIdx((i) => Math.min(registry.length - 1, i + 1));
        setSelectedProp(0);
      }
    } else {
      // Props pane
      if (key.upArrow)   setSelectedProp((i) => Math.max(0, i - 1));
      if (key.downArrow) setSelectedProp((i) => Math.min(compProps.length - 1, i + 1));
      if (key.leftArrow)  cycleProp(-1);
      if (key.rightArrow) cycleProp(1);
      if (key.return || input === ' ') {
        const prop = compProps[selectedProp];
        if (prop?.type === 'boolean') cycleProp(1);
      }
    }
  });

  // ── Layout geometry ──────────────────────────────────────────
  const tooNarrow = cols < 80;
  if (tooNarrow) {
    return (
      <Text color="red">
        Please resize terminal to at least 80 columns (current: {cols}).
      </Text>
    );
  }

  const LEFT_W  = 22;
  const GAP     = 1;
  const RIGHT_W = cols - LEFT_W - GAP;

  // Windowed component list (so it doesn't overflow terminal)
  const visibleCount = Math.max(6, Math.min(16, registry.length));
  const halfWin = Math.floor(visibleCount / 2);
  const startIdx = Math.max(0, Math.min(selectedIdx - halfWin, registry.length - visibleCount));
  const endIdx = Math.min(registry.length, startIdx + visibleCount);
  const visibleItems = registry.slice(startIdx, endIdx);

  // Rendered preview — key forces remount on component change (cleans up Spinner intervals etc.)
  let previewNode: React.ReactNode;
  try {
    previewNode = (
      <Box key={`${currentComp.name}-${JSON.stringify(currentProps)}`}>
        {currentComp.render(currentProps)}
      </Box>
    );
  } catch (e) {
    previewNode = <Text color="red">Preview error: {String(e)}</Text>;
  }

  // Code string
  const codeStr = currentComp.code(currentProps);

  return (
    <Box flexDirection="column">
      {/* ── Header bar ── */}
      <Box paddingX={1} marginBottom={1}>
        <Text bold color="cyan">InkUI Playground</Text>
        <Text color="gray"> — </Text>
        <Text color="gray">{currentComp.name}</Text>
        <Text color="gray"> · </Text>
        <Text color="gray" dimColor>{currentComp.description}</Text>
      </Box>

      {/* ── Main split ── */}
      <Box flexDirection="row" gap={GAP} alignItems="flex-start">

        {/* ── Left: component list ── */}
        <Panel
          title="Components"
          width={LEFT_W}
          borderStyle="rounded"
          borderColor={activePane === 'list' ? 'cyan' : undefined}
          theme={darkTheme}
        >
          {startIdx > 0 && <Text color="gray" dimColor>  ↑ {startIdx} more</Text>}
          {visibleItems.map((comp, i) => {
            const realIdx = startIdx + i;
            return (
              <ListItem
                key={comp.name}
                name={comp.name}
                selected={realIdx === selectedIdx}
                active={activePane === 'list'}
              />
            );
          })}
          {endIdx < registry.length && (
            <Text color="gray" dimColor>  ↓ {registry.length - endIdx} more</Text>
          )}
        </Panel>

        {/* ── Right: preview + props + code ── */}
        <Box flexDirection="column" width={RIGHT_W} gap={1}>

          {/* Preview */}
          <Panel
            title={`Preview — ${currentComp.name}`}
            width={RIGHT_W}
            borderStyle="rounded"
            theme={darkTheme}
          >
            {previewNode}
          </Panel>

          {/* Props */}
          {compProps.length > 0 ? (
            <Panel
              title="Props"
              width={RIGHT_W}
              borderStyle="rounded"
              borderColor={activePane === 'props' ? 'cyan' : undefined}
              theme={darkTheme}
            >
              {compProps.map((prop, i) => (
                <PropRow
                  key={prop.name}
                  def={prop}
                  value={currentProps[prop.name] ?? prop.default}
                  selected={i === selectedProp}
                  active={activePane === 'props'}
                />
              ))}
            </Panel>
          ) : (
            <Panel title="Props" width={RIGHT_W} borderStyle="rounded" theme={darkTheme}>
              <Text color="gray" dimColor>No editable props — component shows live above</Text>
            </Panel>
          )}

          {/* Code */}
          <Panel
            title={copyStatus === 'copied' ? 'Code  ✓ Copied!' : copyStatus === 'failed' ? 'Code  ✗ Copy failed — select manually' : 'Code'}
            width={RIGHT_W}
            borderStyle="rounded"
            borderColor={copyStatus === 'copied' ? 'green' : copyStatus === 'failed' ? 'red' : undefined}
            theme={darkTheme}
          >
            {codeStr.split('\n').map((line, i) => (
              <Text key={i} color="cyan" dimColor={line.startsWith('import')}>{line}</Text>
            ))}
          </Panel>

        </Box>
      </Box>

      {/* ── Bottom key hints ── */}
      <Box marginTop={1} paddingX={1}>
        <KeyHint
          keys={[
            { key: '↑↓', label: activePane === 'list' ? 'Browse' : 'Prop' },
            { key: '←→', label: 'Cycle value' },
            { key: 'Tab', label: `→ ${activePane === 'list' ? 'Props' : 'List'}` },
            { key: 'c', label: 'Copy code' },
            { key: 'q', label: 'Quit' },
          ]}
          theme={darkTheme}
        />
      </Box>
    </Box>
  );
}
