const fs = require('fs');
const path = require('path');

// Read the generated JS files
const distDir = path.join(__dirname, '..', 'dist');
const indexJs = path.join(distDir, 'index.js');
const indexCjs = path.join(distDir, 'index.cjs');

// CSS import statement
const cssImport = `import './brutalist-ui.css';\n`;
const cssRequire = `require('./brutalist-ui.css');\n`;

// Inject CSS import into ES module
if (fs.existsSync(indexJs)) {
  const content = fs.readFileSync(indexJs, 'utf8');
  if (!content.includes('brutalist-ui.css')) {
    fs.writeFileSync(indexJs, cssImport + content);
    console.log('✅ Injected CSS import into index.js');
  }
}

// Inject CSS require into CommonJS module
if (fs.existsSync(indexCjs)) {
  const content = fs.readFileSync(indexCjs, 'utf8');
  if (!content.includes('brutalist-ui.css')) {
    fs.writeFileSync(indexCjs, cssRequire + content);
    console.log('✅ Injected CSS require into index.cjs');
  }
}