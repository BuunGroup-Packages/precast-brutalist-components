// Import styles - this gets bundled into the output
import './react/styles-bundle.css'

// Export all React components (default export)
export * from './react'

// Export Tailwind CSS Components (namespace export to avoid conflicts)
export * as Tailwind from './tailwind'