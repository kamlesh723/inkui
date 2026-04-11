import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from 'ink-testing-library';
import { Toast, ToastStack } from './Toast.js';

describe('Toast', () => {
  it('renders without crashing', () => {
    const { lastFrame } = render(
      <Toast message="Deployment complete" duration={0} />
    );
    expect(lastFrame()).toBeTruthy();
    expect(lastFrame()!.length).toBeGreaterThan(0);
  });

  it('renders the message text', () => {
    const { lastFrame } = render(
      <Toast message="Build succeeded" duration={0} />
    );
    expect(lastFrame()).toContain('Build succeeded');
  });

  it('renders with success variant icon', () => {
    const { lastFrame } = render(
      <Toast message="Done" variant="success" duration={0} />
    );
    expect(lastFrame()).toContain('✔');
  });

  it('renders with error variant icon', () => {
    const { lastFrame } = render(
      <Toast message="Failed" variant="error" duration={0} />
    );
    expect(lastFrame()).toContain('✖');
  });

  it('renders with warning variant icon', () => {
    const { lastFrame } = render(
      <Toast message="Slow" variant="warning" duration={0} />
    );
    expect(lastFrame()).toContain('⚠');
  });
});

describe('ToastStack', () => {
  it('renders multiple toasts', () => {
    const toasts = [
      { id: 1, message: 'First toast',  variant: 'info'    as const, duration: 0 },
      { id: 2, message: 'Second toast', variant: 'success' as const, duration: 0 },
    ];
    const { lastFrame } = render(
      <ToastStack toasts={toasts} onDismiss={() => {}} />
    );
    expect(lastFrame()).toContain('First toast');
    expect(lastFrame()).toContain('Second toast');
  });
});
