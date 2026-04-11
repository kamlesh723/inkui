import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from 'ink-testing-library';
import { Header } from '../Header.js';

describe('Header', () => {
  it('renders without crashing', () => {
    const { lastFrame } = render(<Header title="MyApp" />);
    expect(lastFrame()).toBeTruthy();
    expect(lastFrame()!.length).toBeGreaterThan(0);
  });

  it('renders the title text', () => {
    const { lastFrame } = render(<Header title="DeployKit" />);
    expect(lastFrame()).toContain('DeployKit');
  });

  it('renders with version', () => {
    const { lastFrame } = render(<Header title="MyApp" version="2.0.0" />);
    expect(lastFrame()).toContain('MyApp');
    expect(lastFrame()).toContain('2.0.0');
  });

  it('renders with subtitle in box style', () => {
    const { lastFrame } = render(
      <Header title="App" subtitle="Deploy tool" style="box" />
    );
    expect(lastFrame()).toContain('App');
    expect(lastFrame()).toContain('Deploy tool');
  });
});
