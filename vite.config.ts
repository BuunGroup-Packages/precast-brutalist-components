import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'BrutalistUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'brutalist-ui.css'
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
  },
  resolve: {
    alias: {
      '@brutalist-ui/styles': resolve(__dirname, './src/styles-bundle.css')
    }
  }
})