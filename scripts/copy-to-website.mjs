#!/usr/bin/env node

import { copyFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Source files
const umdSource = resolve(__dirname, '../dist/umd.js');
const cssSource = resolve(__dirname, '../dist/brutalist-ui.css');

// Destination files
const websitePublic = resolve(__dirname, '../../../apps/website/public');
const umdDest = resolve(websitePublic, 'brutalist-ui-umd.js');
const cssDest = resolve(websitePublic, 'brutalist-ui.css');

try {
  // Copy UMD bundle
  copyFileSync(umdSource, umdDest);
  console.log('✅ Copied UMD bundle to website');
  
  // Copy CSS
  copyFileSync(cssSource, cssDest);
  console.log('✅ Copied CSS to website');
  
  console.log('📦 Playground files updated successfully!');
} catch (error) {
  console.error('❌ Error copying files:', error.message);
  process.exit(1);
}