import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from 'ink-testing-library';
import { Confirm } from './Confirm.js';

describe('Confirm', () => {
  it('renders without crashing', () => {
    const { lastFrame } = render(
      <Confirm message="Delete file?" onConfirm={() => {}} />
    );
    expect(lastFrame()).toBeTruthy();
    expect(lastFrame()!.length).toBeGreaterThan(0);
  });

  it('renders the message text', () => {
    const { lastFrame } = render(
      <Confirm message="Are you sure?" onConfirm={() => {}} />
    );
    expect(lastFrame()).toContain('Are you sure?');
  });

  it('renders Y/n hint when defaultValue is true', () => {
    const { lastFrame } = render(
      <Confirm message="Continue?" defaultValue={true} onConfirm={() => {}} />
    );
    expect(lastFrame()).toContain('Y/n');
  });

  it('renders y/N hint when defaultValue is false', () => {
    const { lastFrame } = render(
      <Confirm message="Continue?" defaultValue={false} onConfirm={() => {}} />
    );
    expect(lastFrame()).toContain('y/N');
  });
});
