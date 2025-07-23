#!/usr/bin/env node
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

// Fix the index.d.ts file to remove CSS imports
const indexDtsPath = join(process.cwd(), 'dist/index.d.ts');

try {
  let content = readFileSync(indexDtsPath, 'utf-8');
  
  // Remove any CSS import lines
  content = content.replace(/^import\s+['"].*\.css['"];?\s*$/gm, '');
  
  // Write back the cleaned content
  writeFileSync(indexDtsPath, content);
  
  console.log('✅ Fixed index.d.ts - removed CSS imports');
} catch (error) {
  console.error('Error fixing declarations:', error);
  process.exit(1);
}