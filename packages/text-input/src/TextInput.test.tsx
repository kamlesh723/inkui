import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from 'ink-testing-library';
import { TextInput } from './TextInput.js';

// All tests pass focus={false} so the component always renders the non-focused
// InputDisplay path — avoids raw-mode cursor decoration that varies by CI environment.
describe('TextInput', () => {
  it('renders without crashing', () => {
    const { lastFrame } = render(
      <TextInput value="" onChange={() => {}} focus={false} />
    );
    expect(lastFrame()).toBeTruthy();
    expect(lastFrame()!.length).toBeGreaterThan(0);
  });

  it('renders the current value', () => {
    const { lastFrame } = render(
      <TextInput value="hello" onChange={() => {}} focus={false} />
    );
    expect(lastFrame()).toContain('hello');
  });

  it('renders placeholder when value is empty', () => {
    const { lastFrame } = render(
      <TextInput value="" onChange={() => {}} placeholder="Type here..." focus={false} />
    );
    expect(lastFrame()).toContain('Type here...');
  });

  it('renders with a label', () => {
    const { lastFrame } = render(
      <TextInput value="" onChange={() => {}} label="Name:" focus={false} />
    );
    expect(lastFrame()).toContain('Name:');
  });

  it('masks value in password mode', () => {
    const { lastFrame } = render(
      <TextInput value="secret" onChange={() => {}} password focus={false} />
    );
    expect(lastFrame()).not.toContain('secret');
    expect(lastFrame()).toContain('*');
  });
});
