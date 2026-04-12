import React from 'react';
import { render } from 'ink-testing-library';
import { describe, test, expect } from 'vitest';
import { Stepper } from '../src/Stepper.js';

const steps = [
  { key: 'setup', title: 'Setup', description: 'Install deps' },
  { key: 'configure', title: 'Configure', description: 'Set options' },
  { key: 'deploy', title: 'Deploy' },
];

describe('Stepper', () => {
  test('renders all step titles', () => {
    const { lastFrame } = render(<Stepper steps={steps} currentStep="configure" />);
    expect(lastFrame()).toContain('Setup');
    expect(lastFrame()).toContain('Configure');
    expect(lastFrame()).toContain('Deploy');
  });

  test('shows current step indicator ●', () => {
    const { lastFrame } = render(<Stepper steps={steps} currentStep="configure" />);
    expect(lastFrame()).toContain('●');
  });

  test('shows completed step indicator ✓', () => {
    const { lastFrame } = render(
      <Stepper steps={steps} currentStep="configure" completedSteps={['setup']} />
    );
    expect(lastFrame()).toContain('✓');
  });

  test('shows error step indicator ✕', () => {
    const { lastFrame } = render(
      <Stepper steps={steps} currentStep="configure" errorSteps={['deploy']} />
    );
    expect(lastFrame()).toContain('✕');
  });

  test('renders vertical orientation', () => {
    const { lastFrame } = render(<Stepper steps={steps} currentStep="setup" orientation="vertical" />);
    expect(lastFrame()).toContain('Setup');
    expect(lastFrame()).toContain('│');
  });
});
