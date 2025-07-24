#!/usr/bin/env node

import { build } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function buildPlaygroundBundle() {
  console.log('Building playground bundle...')
  
  await build({
    configFile: false,
    plugins: [react()],
    define: {
      'process.env.NODE_ENV': JSON.stringify('production')
    },
    build: {
      lib: {
        entry: resolve(__dirname, '../src/index.ts'),
        name: 'BrutalistUI',
        formats: ['iife'],
        fileName: () => 'brutalist-ui-playground.js'
      },
      outDir: resolve(__dirname, '../../../apps/website/public'),
      emptyOutDir: false,
      rollupOptions: {
        external: [],
        output: {
          format: 'iife',
          name: 'BrutalistUI',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
          },
          // Include React imports in the bundle
          intro: `
            const React = window.React;
            const ReactDOM = window.ReactDOM;
          `
        }
      },
      minify: false,
      sourcemap: false
    }
  })
  
  console.log('✅ Playground bundle built successfully!')
}

buildPlaygroundBundle().catch(console.error)