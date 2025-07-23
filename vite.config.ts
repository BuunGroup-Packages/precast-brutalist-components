import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        auto: resolve(__dirname, 'src/auto.ts')
      },
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
      // Generate stable class names for library builds
      generateScopedName: (name, filename) => {
        // Use a hash of the filename + class name for consistency
        const hash = Buffer.from(filename + name).toString('base64').substring(0, 5).replace(/[^a-zA-Z0-9]/g, 'x')
        return `_${name}_${hash}`
      }
    },
    postcss: {
      plugins: []
    }
  }
})