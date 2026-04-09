import React from 'react';
import { Box, Text } from 'ink';
import { Spinner } from '@inkui-cli/spinner';
import { Badge } from '@inkui-cli/badge';
import { ProgressBar } from '@inkui-cli/progress-bar';
import { TextInput } from '@inkui-cli/text-input';
import { Select } from '@inkui-cli/select';
import { MultiSelect } from '@inkui-cli/multi-select';
import { Table } from '@inkui-cli/table';
import { Dialog } from '@inkui-cli/dialog';
import { Toast } from '@inkui-cli/toast';
import { StatusIndicator } from '@inkui-cli/status-indicator';
import { LoadingBar } from '@inkui-cli/loading-bar';
import { Confirm } from '@inkui-cli/confirm';
import { KeyHint } from '@inkui-cli/key-hint';
import { Divider } from '@inkui-cli/divider';
import { Header } from '@inkui-cli/header';
import { Panel } from '@inkui-cli/panel';
import { darkTheme } from '@inkui-cli/core';

export interface PropDef {
  name: string;
  type: 'enum' | 'boolean';
  default: string | boolean;
  options?: string[];
  description: string;
}

export interface ComponentDef {
  name: string;
  pkg: string;
  description: string;
  props: PropDef[];
  render: (props: Record<string, string | boolean>) => React.ReactNode;
  code: (props: Record<string, string | boolean>) => string;
}

// ── Helper: format prop for JSX code string ──────────────────
function fmtProp(name: string, val: string | boolean): string {
  if (typeof val === 'boolean') return val ? `  ${name}` : `  ${name}={false}`;
  return `  ${name}="${val}"`;
}

// ── Registry ─────────────────────────────────────────────────
export const registry: ComponentDef[] = [
  // ── Spinner ────────────────────────────────────────────────
  {
    name: 'Spinner',
    pkg: 'spinner',
    description: 'Animated loading indicator',
    props: [
      {
        name: 'label',
        type: 'enum',
        default: 'Loading data...',
        options: ['Loading data...', 'Installing packages...', 'Building project...', 'Deploying...'],
        description: 'Text next to spinner',
      },
      {
        name: 'type',
        type: 'enum',
        default: 'dots',
        options: ['dots', 'line', 'arc', 'bounce'],
        description: 'Animation style',
      },
    ],
    render: (p) => (
      <Spinner label={String(p.label)} type={p.type as any} theme={darkTheme} />
    ),
    code: (p) =>
      `import { Spinner } from './components/ui/spinner';\n\n` +
      `<Spinner\n${fmtProp('label', p.label)}\n${fmtProp('type', p.type)}\n/>`,
  },

  // ── Badge ──────────────────────────────────────────────────
  {
    name: 'Badge',
    pkg: 'badge',
    description: 'Status label with semantic variants',
    props: [
      {
        name: 'variant',
        type: 'enum',
        default: 'success',
        options: ['default', 'success', 'warning', 'error', 'info'],
        description: 'Color variant',
      },
      {
        name: 'children',
        type: 'enum',
        default: 'deployed',
        options: ['deployed', 'failed', 'pending', 'degraded', 'unknown'],
        description: 'Label text',
      },
    ],
    render: (p) => (
      <Box flexDirection="column" gap={1}>
        <Badge variant={p.variant as any} theme={darkTheme}>{String(p.children)}</Badge>
        <Box gap={1}>
          {(['default', 'success', 'warning', 'error', 'info'] as const).map((v) => (
            <Badge key={v} variant={v} theme={darkTheme}>{v}</Badge>
          ))}
        </Box>
      </Box>
    ),
    code: (p) =>
      `import { Badge } from './components/ui/badge';\n\n` +
      `<Badge variant="${p.variant}">${p.children}</Badge>`,
  },

  // ── ProgressBar ────────────────────────────────────────────
  {
    name: 'ProgressBar',
    pkg: 'progress-bar',
    description: 'Fill bar with optional percent',
    props: [
      {
        name: 'value',
        type: 'enum',
        default: '67',
        options: ['0', '25', '50', '67', '100'],
        description: 'Progress 0–100',
      },
      {
        name: 'showPercent',
        type: 'boolean',
        default: true,
        description: 'Show % on the right',
      },
      {
        name: 'label',
        type: 'enum',
        default: 'Downloading',
        options: ['Downloading', 'Installing', 'Building', 'Uploading'],
        description: 'Left-side label',
      },
    ],
    render: (p) => (
      <ProgressBar
        value={Number(p.value)}
        label={String(p.label)}
        showPercent={Boolean(p.showPercent)}
        width={36}
        theme={darkTheme}
      />
    ),
    code: (p) =>
      `import { ProgressBar } from './components/ui/progress-bar';\n\n` +
      `<ProgressBar\n  value={${p.value}}\n${fmtProp('label', p.label)}\n  showPercent={${p.showPercent}}\n/>`,
  },

  // ── TextInput ──────────────────────────────────────────────
  {
    name: 'TextInput',
    pkg: 'text-input',
    description: 'Controlled text input with cursor',
    props: [
      {
        name: 'label',
        type: 'enum',
        default: 'Name',
        options: ['Name', 'Email', 'Username', 'Token'],
        description: 'Left-side label',
      },
      {
        name: 'password',
        type: 'boolean',
        default: false,
        description: 'Mask input as *',
      },
    ],
    render: (p) => (
      <TextInput
        label={String(p.label)}
        value="Kamlesh"
        onChange={() => {}}
        password={Boolean(p.password)}
        focus={false}
        theme={darkTheme}
      />
    ),
    code: (p) =>
      `import { TextInput } from './components/ui/text-input';\n\n` +
      `const [val, setVal] = useState('');\n\n` +
      `<TextInput\n${fmtProp('label', p.label)}\n  value={val}\n  onChange={setVal}\n${fmtProp('password', p.password as boolean)}\n/>`,
  },

  // ── Select ─────────────────────────────────────────────────
  {
    name: 'Select',
    pkg: 'select',
    description: 'Arrow-key single-select menu',
    props: [],
    render: () => (
      <Select
        items={[
          { label: 'React', value: 'react' },
          { label: 'Vue', value: 'vue' },
          { label: 'Svelte', value: 'svelte' },
          { label: 'Angular (disabled)', value: 'angular', disabled: true },
        ]}
        onSelect={() => {}}
        focus={false}
        theme={darkTheme}
      />
    ),
    code: () =>
      `import { Select } from './components/ui/select';\n\n` +
      `<Select\n  items={[\n    { label: 'React', value: 'react' },\n    { label: 'Vue', value: 'vue' },\n    { label: 'Svelte', value: 'svelte' },\n  ]}\n  onSelect={(item) => console.log(item.value)}\n/>`,
  },

  // ── MultiSelect ────────────────────────────────────────────
  {
    name: 'MultiSelect',
    pkg: 'multi-select',
    description: 'Space-toggle checkboxes',
    props: [],
    render: () => (
      <MultiSelect
        items={[
          { label: 'TypeScript', value: 'ts' },
          { label: 'ESLint', value: 'eslint' },
          { label: 'Prettier', value: 'prettier' },
          { label: 'Husky', value: 'husky' },
        ]}
        defaultSelected={['ts']}
        onSubmit={() => {}}
        focus={false}
        theme={darkTheme}
      />
    ),
    code: () =>
      `import { MultiSelect } from './components/ui/multi-select';\n\n` +
      `<MultiSelect\n  items={[\n    { label: 'TypeScript', value: 'ts' },\n    { label: 'ESLint', value: 'eslint' },\n  ]}\n  defaultSelected={['ts']}\n  onSubmit={(selected) => console.log(selected)}\n/>`,
  },

  // ── Table ──────────────────────────────────────────────────
  {
    name: 'Table',
    pkg: 'table',
    description: 'Data table with auto column widths',
    props: [
      {
        name: 'borderStyle',
        type: 'enum',
        default: 'rounded',
        options: ['single', 'double', 'rounded', 'bold', 'ascii'],
        description: 'Border style',
      },
    ],
    render: (p) => (
      <Table
        columns={[
          { key: 'name', header: 'Package', align: 'left' },
          { key: 'version', header: 'Ver', align: 'center' },
          { key: 'size', header: 'Size', align: 'right' },
        ]}
        data={[
          { name: '@inkui/spinner', version: '0.1.0', size: '837B' },
          { name: '@inkui/table', version: '0.1.0', size: '3.9KB' },
          { name: '@inkui/badge', version: '0.1.0', size: '1.2KB' },
        ]}
        borderStyle={p.borderStyle as any}
        theme={darkTheme}
      />
    ),
    code: (p) =>
      `import { Table } from './components/ui/table';\n\n` +
      `<Table\n  columns={columns}\n  data={data}\n${fmtProp('borderStyle', p.borderStyle)}\n/>`,
  },

  // ── Dialog ─────────────────────────────────────────────────
  {
    name: 'Dialog',
    pkg: 'dialog',
    description: 'Modal with keyboard-navigable actions',
    props: [
      {
        name: 'title',
        type: 'enum',
        default: 'Deploy to production?',
        options: ['Deploy to production?', 'Delete file?', 'Confirm action', 'Are you sure?'],
        description: 'Dialog title',
      },
      {
        name: 'borderStyle',
        type: 'enum',
        default: 'rounded',
        options: ['rounded', 'single', 'double', 'bold'],
        description: 'Border style',
      },
    ],
    render: (p) => (
      <Dialog
        isOpen
        title={String(p.title)}
        message="This will affect all users.\nThis action cannot be undone."
        actions={[{ label: 'Cancel', value: 'cancel' }, { label: 'Confirm', value: 'confirm' }]}
        onAction={() => {}}
        borderStyle={p.borderStyle as any}
        focus={false}
        theme={darkTheme}
      />
    ),
    code: (p) =>
      `import { Dialog } from './components/ui/dialog';\n\n` +
      `<Dialog\n  isOpen={open}\n${fmtProp('title', p.title)}\n  message="This will affect all users."\n  actions={[{ label: 'Cancel', value: 'cancel' }, { label: 'Confirm', value: 'confirm' }]}\n  onAction={(a) => handleAction(a.value)}\n  onDismiss={() => setOpen(false)}\n/>`,
  },

  // ── Toast ──────────────────────────────────────────────────
  {
    name: 'Toast',
    pkg: 'toast',
    description: 'Auto-dismissing notification',
    props: [
      {
        name: 'variant',
        type: 'enum',
        default: 'success',
        options: ['success', 'warning', 'error', 'info'],
        description: 'Color and icon',
      },
      {
        name: 'message',
        type: 'enum',
        default: 'Deployed successfully!',
        options: ['Deployed successfully!', 'Connection lost', 'Build complete', 'Warning: deprecated API'],
        description: 'Notification text',
      },
    ],
    render: (p) => (
      <Toast
        message={String(p.message)}
        variant={p.variant as any}
        duration={0}
        theme={darkTheme}
      />
    ),
    code: (p) =>
      `import { useToast, ToastStack } from './components/ui/toast';\n\n` +
      `const { toasts, show, dismiss } = useToast();\nshow('${p.message}', '${p.variant}');\n\n<ToastStack toasts={toasts} onDismiss={dismiss} />`,
  },

  // ── StatusIndicator ────────────────────────────────────────
  {
    name: 'StatusIndicator',
    pkg: 'status-indicator',
    description: 'Animated dot for service health',
    props: [
      {
        name: 'status',
        type: 'enum',
        default: 'online',
        options: ['online', 'loading', 'offline', 'warning', 'error', 'idle'],
        description: 'Current status',
      },
    ],
    render: (p) => (
      <Box flexDirection="column" gap={1}>
        <StatusIndicator status={p.status as any} label="API Gateway" theme={darkTheme} />
        <StatusIndicator status="loading" label="Database syncing" theme={darkTheme} />
        <StatusIndicator status="offline" label="CDN node 3" theme={darkTheme} />
      </Box>
    ),
    code: (p) =>
      `import { StatusIndicator } from './components/ui/status-indicator';\n\n` +
      `<StatusIndicator\n${fmtProp('status', p.status)}\n  label="API Gateway"\n/>`,
  },

  // ── LoadingBar ─────────────────────────────────────────────
  {
    name: 'LoadingBar',
    pkg: 'loading-bar',
    description: 'Slim bar — indeterminate or determinate',
    props: [
      {
        name: 'mode',
        type: 'enum',
        default: 'indeterminate',
        options: ['indeterminate', '25', '50', '75', '100'],
        description: 'indeterminate or value 0-100',
      },
    ],
    render: (p) => {
      const val = p.mode === 'indeterminate' ? undefined : Number(p.mode);
      return <LoadingBar value={val} width={36} theme={darkTheme} />;
    },
    code: (p) =>
      p.mode === 'indeterminate'
        ? `import { LoadingBar } from './components/ui/loading-bar';\n\n<LoadingBar />`
        : `import { LoadingBar } from './components/ui/loading-bar';\n\n<LoadingBar value={${p.mode}} />`,
  },

  // ── Confirm ────────────────────────────────────────────────
  {
    name: 'Confirm',
    pkg: 'confirm',
    description: 'y/N confirmation prompt',
    props: [
      {
        name: 'message',
        type: 'enum',
        default: 'Deploy to production?',
        options: ['Deploy to production?', 'Delete this file?', 'Reset all settings?', 'Continue?'],
        description: 'Question text',
      },
      {
        name: 'defaultValue',
        type: 'boolean',
        default: false,
        description: 'Default Y or N',
      },
    ],
    render: (p) => (
      <Confirm
        message={String(p.message)}
        defaultValue={Boolean(p.defaultValue)}
        onConfirm={() => {}}
        onCancel={() => {}}
        focus={false}
        theme={darkTheme}
      />
    ),
    code: (p) =>
      `import { Confirm } from './components/ui/confirm';\n\n` +
      `<Confirm\n${fmtProp('message', p.message)}\n  defaultValue={${p.defaultValue}}\n  onConfirm={handleConfirm}\n  onCancel={handleCancel}\n/>`,
  },

  // ── KeyHint ────────────────────────────────────────────────
  {
    name: 'KeyHint',
    pkg: 'key-hint',
    description: 'Keyboard shortcut hints row',
    props: [
      {
        name: 'preset',
        type: 'enum',
        default: 'navigate',
        options: ['navigate', 'editor', 'dialog'],
        description: 'Hint preset',
      },
    ],
    render: (p) => {
      const presets: Record<string, { key: string; label: string }[]> = {
        navigate: [{ key: '↑↓', label: 'Navigate' }, { key: 'Enter', label: 'Select' }, { key: 'Esc', label: 'Cancel' }],
        editor: [{ key: 'Ctrl+S', label: 'Save' }, { key: 'Ctrl+Z', label: 'Undo' }, { key: 'Ctrl+C', label: 'Copy' }],
        dialog: [{ key: '← →', label: 'Actions' }, { key: 'Enter', label: 'Confirm' }, { key: 'Esc', label: 'Dismiss' }],
      };
      return <KeyHint keys={presets[String(p.preset)] ?? presets.navigate} theme={darkTheme} />;
    },
    code: (p) => {
      const presets: Record<string, string> = {
        navigate: `[{ key: '↑↓', label: 'Navigate' }, { key: 'Enter', label: 'Select' }, { key: 'Esc', label: 'Cancel' }]`,
        editor: `[{ key: 'Ctrl+S', label: 'Save' }, { key: 'Ctrl+Z', label: 'Undo' }]`,
        dialog: `[{ key: '← →', label: 'Actions' }, { key: 'Enter', label: 'Confirm' }]`,
      };
      return `import { KeyHint } from './components/ui/key-hint';\n\n<KeyHint\n  keys={${presets[String(p.preset)]}}\n/>`;
    },
  },

  // ── Divider ────────────────────────────────────────────────
  {
    name: 'Divider',
    pkg: 'divider',
    description: 'Full-width separator',
    props: [
      {
        name: 'style',
        type: 'enum',
        default: 'single',
        options: ['single', 'double', 'dashed', 'bold'],
        description: 'Line style',
      },
      {
        name: 'title',
        type: 'enum',
        default: 'Configuration',
        options: ['', 'Configuration', 'Settings', 'Output', 'Results'],
        description: 'Optional center title',
      },
    ],
    render: (p) => (
      <Box flexDirection="column" gap={1}>
        <Divider title={String(p.title) || undefined} style={p.style as any} width={36} theme={darkTheme} />
        <Divider style="double" width={36} theme={darkTheme} />
        <Divider style="dashed" width={36} theme={darkTheme} />
      </Box>
    ),
    code: (p) =>
      `import { Divider } from './components/ui/divider';\n\n` +
      (p.title
        ? `<Divider\n${fmtProp('title', p.title)}\n${fmtProp('style', p.style)}\n/>`
        : `<Divider style="${p.style}" />`),
  },

  // ── Header ─────────────────────────────────────────────────
  {
    name: 'Header',
    pkg: 'header',
    description: 'App header bar',
    props: [
      {
        name: 'style',
        type: 'enum',
        default: 'box',
        options: ['box', 'line', 'filled'],
        description: 'Visual style',
      },
      {
        name: 'title',
        type: 'enum',
        default: 'MyApp',
        options: ['MyApp', 'Deploy Tool', 'InkUI', 'Dashboard'],
        description: 'App name',
      },
    ],
    render: (p) => (
      <Header
        title={String(p.title)}
        version="1.0.0"
        subtitle="Terminal component library"
        style={p.style as any}
        theme={darkTheme}
      />
    ),
    code: (p) =>
      `import { Header } from './components/ui/header';\n\n` +
      `<Header\n${fmtProp('title', p.title)}\n  version="1.0.0"\n${fmtProp('style', p.style)}\n/>`,
  },

  // ── Panel ──────────────────────────────────────────────────
  {
    name: 'Panel',
    pkg: 'panel',
    description: 'Bordered box with embedded title',
    props: [
      {
        name: 'borderStyle',
        type: 'enum',
        default: 'rounded',
        options: ['rounded', 'single', 'double', 'bold', 'ascii'],
        description: 'Border style',
      },
      {
        name: 'title',
        type: 'enum',
        default: 'System Info',
        options: ['System Info', 'Status', 'Output', 'Configuration'],
        description: 'Panel title',
      },
    ],
    render: (p) => (
      <Panel title={String(p.title)} borderStyle={p.borderStyle as any} width={38} theme={darkTheme}>
        <Text>OS: Ubuntu 24.04</Text>
        <Text>Node: v22.0.0</Text>
        <Text color="green">Status: running</Text>
      </Panel>
    ),
    code: (p) =>
      `import { Panel } from './components/ui/panel';\n\n` +
      `<Panel\n${fmtProp('title', p.title)}\n${fmtProp('borderStyle', p.borderStyle)}\n>\n  <Text>Content here</Text>\n</Panel>`,
  },
];

export const registryMap = Object.fromEntries(registry.map((c) => [c.name, c]));
