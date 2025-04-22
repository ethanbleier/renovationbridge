#!/usr/bin/env node

/**
 * Example script demonstrating different ways to use tqdm for progress tracking
 * Run with: node scripts/example-progress.js
 */

const tqdm = require('tqdm');

console.log('Example 1: Basic progress bar with an array');
const items = Array.from({ length: 50 });
for (const item of tqdm(items)) {
  // Simulate work
  const start = Date.now();
  while (Date.now() - start < 50) {
    // Artificial delay
  }
}

console.log('\nExample 2: Progress bar with a custom description');
const tasks = Array.from({ length: 30 });
for (const task of tqdm(tasks, { desc: 'Processing files' })) {
  // Simulate work
  const start = Date.now();
  while (Date.now() - start < 70) {
    // Artificial delay
  }
}

console.log('\nExample 3: Progress bar with custom position and total');
let counter = 0;
const total = 40;
const bar = new tqdm.Bar({ total, desc: 'Custom counter' });
const interval = setInterval(() => {
  counter++;
  bar.update(1);
  
  if (counter >= total) {
    clearInterval(interval);
    bar.close();
    console.log('\nAll examples completed!');
  }
}, 50); 