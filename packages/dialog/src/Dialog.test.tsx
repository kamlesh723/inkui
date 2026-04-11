import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from 'ink-testing-library';
import { Dialog } from './Dialog.js';

const ACTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No',  value: 'no' },
];

describe('Dialog', () => {
  it('renders nothing when isOpen is false', () => {
    const { lastFrame } = render(
      <Dialog
        isOpen={false}
        message="Confirm action?"
        actions={ACTIONS}
        onAction={() => {}}
      />
    );
    expect(lastFrame()).toBe('');
  });

  it('renders the message when isOpen is true', () => {
    const { lastFrame } = render(
      <Dialog
        isOpen={true}
        message="Confirm action?"
        actions={ACTIONS}
        onAction={() => {}}
      />
    );
    expect(lastFrame()).toContain('Confirm action?');
  });

  it('renders the title when provided', () => {
    const { lastFrame } = render(
      <Dialog
        isOpen={true}
        title="Warning"
        message="This cannot be undone."
        actions={ACTIONS}
        onAction={() => {}}
      />
    );
    expect(lastFrame()).toContain('Warning');
    expect(lastFrame()).toContain('This cannot be undone.');
  });

  it('renders action labels', () => {
    const { lastFrame } = render(
      <Dialog
        isOpen={true}
        message="Ready?"
        actions={ACTIONS}
        onAction={() => {}}
      />
    );
    expect(lastFrame()).toContain('Yes');
    expect(lastFrame()).toContain('No');
  });
});
