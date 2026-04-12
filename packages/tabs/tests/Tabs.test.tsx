import React from 'react';
import { Text } from 'ink';
import { render } from 'ink-testing-library';
import { describe, test, expect, vi } from 'vitest';
import { Tabs } from '../src/Tabs.js';

const tabs = [
  { key: 'logs', label: 'Logs' },
  { key: 'metrics', label: 'Metrics' },
  { key: 'config', label: 'Config', disabled: true },
];

describe('Tabs', () => {
  test('renders tab labels', () => {
    const { lastFrame } = render(
      <Tabs tabs={tabs} activeKey="logs" onChange={() => {}} focus={false}>
        <Text>Logs content</Text>
        <Text>Metrics content</Text>
        <Text>Config content</Text>
      </Tabs>
    );
    expect(lastFrame()).toContain('Logs');
    expect(lastFrame()).toContain('Metrics');
    expect(lastFrame()).toContain('Config');
  });

  test('renders active tab content', () => {
    const { lastFrame } = render(
      <Tabs tabs={tabs} activeKey="metrics" onChange={() => {}} focus={false}>
        <Text>Logs content</Text>
        <Text>Metrics content</Text>
        <Text>Config content</Text>
      </Tabs>
    );
    expect(lastFrame()).toContain('Metrics content');
  });

  test('renders badge count when provided', () => {
    const tabsWithBadge = [{ key: 'alerts', label: 'Alerts', badge: 3 }];
    const { lastFrame } = render(
      <Tabs tabs={tabsWithBadge} activeKey="alerts" onChange={() => {}} focus={false}>
        <Text>Alerts content</Text>
      </Tabs>
    );
    expect(lastFrame()).toContain('(3)');
  });

  test('renders pills variant', () => {
    const { lastFrame } = render(
      <Tabs tabs={tabs} activeKey="logs" onChange={() => {}} variant="pills" focus={false}>
        <Text>Logs content</Text>
        <Text>Metrics content</Text>
        <Text>Config content</Text>
      </Tabs>
    );
    expect(lastFrame()).toContain('[Logs]');
  });

  test('renders bottom position', () => {
    const { lastFrame } = render(
      <Tabs tabs={tabs} activeKey="logs" onChange={() => {}} position="bottom" focus={false}>
        <Text>Logs content</Text>
        <Text>Metrics content</Text>
        <Text>Config content</Text>
      </Tabs>
    );
    expect(lastFrame()).toContain('Logs content');
    expect(lastFrame()).toContain('Logs');
  });
});
