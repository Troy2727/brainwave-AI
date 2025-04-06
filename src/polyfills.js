// This file provides polyfills for Node.js crypto module in the browser

// Import the crypto module from the node polyfills
import { Buffer } from 'buffer';
import crypto from 'crypto';

// Make sure Buffer is available globally
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

// Create a global crypto object if it doesn't exist
if (typeof window !== 'undefined' && !window.crypto) {
  window.crypto = {};
}

// Add getRandomValues if it doesn't exist
if (typeof window !== 'undefined' && window.crypto && !window.crypto.getRandomValues) {
  window.crypto.getRandomValues = function(array) {
    const bytes = crypto.randomBytes(array.length);

    for (let i = 0; i < array.length; i++) {
      array[i] = bytes[i];
    }

    return array;
  };
}

export default {};
