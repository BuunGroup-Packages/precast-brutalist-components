// Auto-import version that includes styles automatically
// This is the main entry point for users who want styles included automatically

// Import CSS as string and inject it
import cssText from '../dist/brutalist-ui.css?inline'

// Auto-inject styles on import
if (typeof document !== 'undefined') {
  const existingStyle = document.querySelector('[data-brutalist-ui="auto"]')
  if (!existingStyle) {
    const style = document.createElement('style')
    style.setAttribute('data-brutalist-ui', 'auto')
    style.textContent = cssText
    document.head.appendChild(style)
  }
}

// Re-export everything from the main index
export * from './index'