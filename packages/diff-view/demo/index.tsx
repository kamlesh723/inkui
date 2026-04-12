import React from 'react';
import { render } from 'ink';
import { DiffView } from '../src/DiffView.js';

const before = `const timeout = 30;
const retries = 3;
const baseUrl = "https://api.example.com";
const debug = false;`;

const after = `const timeout = 30;
const retries = 5;
const baseUrl = "https://api.example.com";
const debug = true;
const version = "2.0";`;

render(<DiffView before={before} after={after} beforeLabel="v1" afterLabel="v2" />);
setTimeout(() => process.exit(0), 3000);
