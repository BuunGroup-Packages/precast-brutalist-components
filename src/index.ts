// Import styles - this gets extracted to brutalist-ui.css during build
import './react/styles-bundle.css'

// Export all React components (default export)
export * from './react'

// Export Tailwind CSS Components (namespace export to avoid conflicts)
export * as Tailwind from './tailwind'