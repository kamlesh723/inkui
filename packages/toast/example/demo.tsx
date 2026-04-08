import React, { useEffect } from 'react';
import { render } from 'ink';
import { ToastStack, useToast } from '../src/index.js';

function Demo() {
  const { toasts, show, dismiss } = useToast();

  useEffect(() => {
    show('Successfully deployed to production', 'success', 0);
    setTimeout(() => show('Warning: 3 deprecated packages found', 'warning', 0), 400);
    setTimeout(() => show('Error: Connection refused on port 5432', 'error', 0), 800);
    setTimeout(() => show('Server started on port 3000', 'info', 0), 1200);
  }, []);

  return <ToastStack toasts={toasts} onDismiss={dismiss} />;
}

render(<Demo />);
setTimeout(() => process.exit(0), 3000);
