import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'BrutalistUI',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'index.js'
        if (format === 'cjs') return 'index.cjs'
        if (format === 'umd') return 'index.umd.js'
        return `index.${format}.js`
      }
    },
    rollupOptions: {
      external: (id) => {
        if (id === 'react' || id === 'react-dom') return true
        if (id === 'react/jsx-runtime') {
          return false
        }
        return false
      },
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('style.css')) return 'brutalist-ui.css'
          return assetInfo.name || 'asset'
        }
      }
    },
    sourcemap: true,
    minify: true
  },
  css: {
    postcss: {
      plugins: []
    }
  }
})