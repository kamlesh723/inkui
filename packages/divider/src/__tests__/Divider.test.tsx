import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from 'ink-testing-library';
import { Divider } from '../Divider.js';

describe('Divider', () => {
  it('renders without crashing', () => {
    const { lastFrame } = render(<Divider width={20} />);
    expect(lastFrame()).toBeTruthy();
    expect(lastFrame()!.length).toBeGreaterThan(0);
  });

  it('renders single style characters', () => {
    const { lastFrame } = render(<Divider style="single" width={10} />);
    expect(lastFrame()).toContain('─');
  });

  it('renders double style characters', () => {
    const { lastFrame } = render(<Divider style="double" width={10} />);
    expect(lastFrame()).toContain('═');
  });

  it('renders with a title', () => {
    const { lastFrame } = render(<Divider title="Config" width={30} />);
    expect(lastFrame()).toContain('Config');
  });
});
