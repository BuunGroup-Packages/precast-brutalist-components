import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'BrutalistUI',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        if (format === 'es') return `${entryName}.js`
        if (format === 'cjs') return `${entryName}.cjs`
        return `${entryName}.${format}.js`
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
    modules: {
      // Use localsConvention to export both camelCase and kebab-case
      localsConvention: 'camelCaseOnly',
      // Use a deterministic pattern for class names
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      // Ensure hash is included in both CSS and JS
      exportGlobals: true
    },
    postcss: {
      plugins: []
    }
  }
})