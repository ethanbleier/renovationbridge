#!/usr/bin/env node

const tqdm = require('tqdm');
const { spawn } = require('child_process');

console.log('Initializing development environment...');

// Simulate some pre-dev tasks with a progress bar
const steps = Array.from({ length: 20 });
for (const step of tqdm(steps)) {
  // Simulate work with a small delay
  const start = Date.now();
  while (Date.now() - start < 100) {
    // Artificial delay for demonstration
  }
}

console.log('Starting Next.js development server...');

// Start the Next.js dev server
const nextDev = spawn('npx', ['next', 'dev'], { 
  stdio: 'inherit',
  shell: true
});

// Handle process exit
nextDev.on('close', (code) => {
  process.exit(code);
});

// Forward signals to child process
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    nextDev.kill(signal);
  });
}); 