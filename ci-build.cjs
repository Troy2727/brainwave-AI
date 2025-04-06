#!/usr/bin/env node

/* eslint-disable no-undef */
/* eslint-env node */

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
  // We need to use the CommonJS version of Vite in this context
  execSync('node ./node_modules/vite/bin/vite.js build', { stdio: 'inherit' });
  process.exit(0);
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
