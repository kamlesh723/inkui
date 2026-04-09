import React from 'react';
import { render } from 'ink';
import { ListCommand }       from './commands/List.js';
import { AddCommand }        from './commands/Add.js';
import { HelpCommand }       from './commands/Help.js';
import { PlaygroundCommand } from './commands/Playground.js';

const args    = process.argv.slice(2);
const command = args[0];
const target  = args[1] ?? '';

switch (command) {
  case 'list':
    render(<ListCommand />);
    break;

  case 'add':
    if (!target) {
      console.error('Usage: inkui add <component> | --all');
      process.exit(1);
    }
    render(<AddCommand target={target} />);
    break;

  case 'playground':
    render(<PlaygroundCommand />);
    break;

  default:
    render(<HelpCommand />);
    break;
}
