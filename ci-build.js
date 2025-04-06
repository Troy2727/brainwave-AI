#!/usr/bin/env node

// This is a CommonJS file

// Polyfill for crypto.getRandomValues
if (typeof global !== 'undefined') {
  if (!global.crypto) {
    global.crypto = {};
  }

  if (!global.crypto.getRandomValues) {
    const crypto = require('crypto');
    global.crypto.getRandomValues = function(array) {
      const randomBytes = crypto.randomBytes(array.length);
      for (let i = 0; i < array.length; i++) {
        array[i] = randomBytes[i];
      }
      return array;
    };
  }
}

// Run the build command
const { execSync } = require('child_process');
try {
  console.log('Building with patched crypto...');
  console.log('Crypto polyfill applied:', !!global.crypto.getRandomValues);

  // Use the execSync to run the build command
  execSync('npx vite build', { stdio: 'inherit' });
  process.exit(0);
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
