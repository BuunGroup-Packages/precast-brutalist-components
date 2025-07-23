// UMD wrapper for Brutalist UI components
// This file creates a global BrutalistUI object with all components

import * as BrutalistComponents from './index.js'

// Create global BrutalistUI object
if (typeof window !== 'undefined') {
  window.BrutalistUI = BrutalistComponents
}

// Also export for module systems
export * from './index.js'