/**
 * Utility class system for Brutalist UI components
 * Provides Tailwind-like utility classes without external dependencies
 */

// Spacing scale mapping to CSS variables
const spacingScale: Record<string, string> = {
  '0': '0',
  '1': 'var(--brutal-space-1)',
  '2': 'var(--brutal-space-2)',
  '3': 'var(--brutal-space-3)',
  '4': 'var(--brutal-space-4)',
  '5': 'var(--brutal-space-5)',
  '6': 'var(--brutal-space-6)',
  '8': 'var(--brutal-space-8)',
  '10': 'var(--brutal-space-10)',
  '12': 'var(--brutal-space-12)',
  '16': 'var(--brutal-space-16)',
  '20': 'var(--brutal-space-20)',
  '24': 'var(--brutal-space-24)',
}

// Utility class patterns
const utilityPatterns = {
  // Padding
  'p': (value: string) => ({ padding: spacingScale[value] }),
  'pt': (value: string) => ({ paddingTop: spacingScale[value] }),
  'pr': (value: string) => ({ paddingRight: spacingScale[value] }),
  'pb': (value: string) => ({ paddingBottom: spacingScale[value] }),
  'pl': (value: string) => ({ paddingLeft: spacingScale[value] }),
  'px': (value: string) => ({ paddingLeft: spacingScale[value], paddingRight: spacingScale[value] }),
  'py': (value: string) => ({ paddingTop: spacingScale[value], paddingBottom: spacingScale[value] }),
  
  // Margin
  'm': (value: string) => ({ margin: spacingScale[value] }),
  'mt': (value: string) => ({ marginTop: spacingScale[value] }),
  'mr': (value: string) => ({ marginRight: spacingScale[value] }),
  'mb': (value: string) => ({ marginBottom: spacingScale[value] }),
  'ml': (value: string) => ({ marginLeft: spacingScale[value] }),
  'mx': (value: string) => ({ marginLeft: spacingScale[value], marginRight: spacingScale[value] }),
  'my': (value: string) => ({ marginTop: spacingScale[value], marginBottom: spacingScale[value] }),
  
  // Gap
  'gap': (value: string) => ({ gap: spacingScale[value] }),
  'gap-x': (value: string) => ({ columnGap: spacingScale[value] }),
  'gap-y': (value: string) => ({ rowGap: spacingScale[value] }),
}

// Display utilities
const displayUtilities: Record<string, React.CSSProperties> = {
  'block': { display: 'block' },
  'inline-block': { display: 'inline-block' },
  'inline': { display: 'inline' },
  'flex': { display: 'flex' },
  'inline-flex': { display: 'inline-flex' },
  'grid': { display: 'grid' },
  'hidden': { display: 'none' },
}

// Flexbox utilities
const flexUtilities: Record<string, React.CSSProperties> = {
  'flex-row': { flexDirection: 'row' },
  'flex-row-reverse': { flexDirection: 'row-reverse' },
  'flex-col': { flexDirection: 'column' },
  'flex-col-reverse': { flexDirection: 'column-reverse' },
  'flex-wrap': { flexWrap: 'wrap' },
  'flex-nowrap': { flexWrap: 'nowrap' },
  'items-start': { alignItems: 'flex-start' },
  'items-end': { alignItems: 'flex-end' },
  'items-center': { alignItems: 'center' },
  'items-baseline': { alignItems: 'baseline' },
  'items-stretch': { alignItems: 'stretch' },
  'justify-start': { justifyContent: 'flex-start' },
  'justify-end': { justifyContent: 'flex-end' },
  'justify-center': { justifyContent: 'center' },
  'justify-between': { justifyContent: 'space-between' },
  'justify-around': { justifyContent: 'space-around' },
  'justify-evenly': { justifyContent: 'space-evenly' },
}

// Size utilities
const sizeUtilities: Record<string, React.CSSProperties> = {
  'w-full': { width: '100%' },
  'w-auto': { width: 'auto' },
  'h-full': { height: '100%' },
  'h-auto': { height: 'auto' },
}

// Position utilities
const positionUtilities: Record<string, React.CSSProperties> = {
  'relative': { position: 'relative' },
  'absolute': { position: 'absolute' },
  'fixed': { position: 'fixed' },
  'sticky': { position: 'sticky' },
  'static': { position: 'static' },
}

// Overflow utilities
const overflowUtilities: Record<string, React.CSSProperties> = {
  'overflow-auto': { overflow: 'auto' },
  'overflow-hidden': { overflow: 'hidden' },
  'overflow-visible': { overflow: 'visible' },
  'overflow-scroll': { overflow: 'scroll' },
  'overflow-x-auto': { overflowX: 'auto' },
  'overflow-y-auto': { overflowY: 'auto' },
}

// Typography utilities
const typographyUtilities: Record<string, React.CSSProperties> = {
  // Font sizes
  'text-xs': { fontSize: '0.75rem', lineHeight: '1rem' },
  'text-sm': { fontSize: '0.875rem', lineHeight: '1.25rem' },
  'text-base': { fontSize: '1rem', lineHeight: '1.5rem' },
  'text-lg': { fontSize: '1.125rem', lineHeight: '1.75rem' },
  'text-xl': { fontSize: '1.25rem', lineHeight: '1.75rem' },
  'text-2xl': { fontSize: '1.5rem', lineHeight: '2rem' },
  'text-3xl': { fontSize: '1.875rem', lineHeight: '2.25rem' },
  'text-4xl': { fontSize: '2.25rem', lineHeight: '2.5rem' },
  'text-5xl': { fontSize: '3rem', lineHeight: '1' },
  'text-6xl': { fontSize: '3.75rem', lineHeight: '1' },
  
  // Text alignment
  'text-left': { textAlign: 'left' },
  'text-center': { textAlign: 'center' },
  'text-right': { textAlign: 'right' },
  'text-justify': { textAlign: 'justify' },
  
  // Font weight
  'font-normal': { fontWeight: 'var(--brutal-font-regular)' },
  'font-medium': { fontWeight: 'var(--brutal-font-medium)' },
  'font-bold': { fontWeight: 'var(--brutal-font-bold)' },
  'font-black': { fontWeight: 'var(--brutal-font-black)' },
  
  // Text transform
  'uppercase': { textTransform: 'uppercase' },
  'lowercase': { textTransform: 'lowercase' },
  'capitalize': { textTransform: 'capitalize' },
  'normal-case': { textTransform: 'none' },
  
  // Line height
  'leading-none': { lineHeight: '1' },
  'leading-tight': { lineHeight: '1.25' },
  'leading-snug': { lineHeight: '1.375' },
  'leading-normal': { lineHeight: '1.5' },
  'leading-relaxed': { lineHeight: '1.625' },
  'leading-loose': { lineHeight: '2' },
  
  // Letter spacing
  'tracking-tighter': { letterSpacing: '-0.05em' },
  'tracking-tight': { letterSpacing: '-0.025em' },
  'tracking-normal': { letterSpacing: '0' },
  'tracking-wide': { letterSpacing: '0.025em' },
  'tracking-wider': { letterSpacing: '0.05em' },
  'tracking-widest': { letterSpacing: '0.1em' },
}

// Color utilities
const colorUtilities: Record<string, React.CSSProperties> = {
  // Text colors
  'text-black': { color: 'var(--brutal-black)' },
  'text-white': { color: 'var(--brutal-white)' },
  'text-accent': { color: 'var(--brutal-accent)' },
  'text-gray-50': { color: '#f9fafb' },
  'text-gray-100': { color: '#f3f4f6' },
  'text-gray-200': { color: '#e5e7eb' },
  'text-gray-300': { color: '#d1d5db' },
  'text-gray-400': { color: '#9ca3af' },
  'text-gray-500': { color: '#6b7280' },
  'text-gray-600': { color: '#4b5563' },
  'text-gray-700': { color: '#374151' },
  'text-gray-800': { color: '#1f2937' },
  'text-gray-900': { color: '#111827' },
  'text-red': { color: '#ef4444' },
  'text-blue': { color: '#3b82f6' },
  'text-green': { color: '#10b981' },
  'text-yellow': { color: '#f59e0b' },
  'text-purple': { color: '#8b5cf6' },
  'text-pink': { color: '#ec4899' },
  
  // Background colors
  'bg-black': { backgroundColor: 'var(--brutal-black)' },
  'bg-white': { backgroundColor: 'var(--brutal-white)' },
  'bg-accent': { backgroundColor: 'var(--brutal-accent)' },
  'bg-gray-50': { backgroundColor: '#f9fafb' },
  'bg-gray-100': { backgroundColor: '#f3f4f6' },
  'bg-gray-200': { backgroundColor: '#e5e7eb' },
  'bg-gray-300': { backgroundColor: '#d1d5db' },
  'bg-gray-400': { backgroundColor: '#9ca3af' },
  'bg-gray-500': { backgroundColor: '#6b7280' },
  'bg-gray-600': { backgroundColor: '#4b5563' },
  'bg-gray-700': { backgroundColor: '#374151' },
  'bg-gray-800': { backgroundColor: '#1f2937' },
  'bg-gray-900': { backgroundColor: '#111827' },
  'bg-red': { backgroundColor: '#ef4444' },
  'bg-blue': { backgroundColor: '#3b82f6' },
  'bg-green': { backgroundColor: '#10b981' },
  'bg-yellow': { backgroundColor: '#f59e0b' },
  'bg-purple': { backgroundColor: '#8b5cf6' },
  'bg-pink': { backgroundColor: '#ec4899' },
}

// Border utilities
const borderUtilities: Record<string, React.CSSProperties> = {
  'border': { border: 'var(--brutal-border-width) solid var(--brutal-black)' },
  'border-0': { borderWidth: '0' },
  'border-2': { borderWidth: '2px', borderStyle: 'solid' },
  'border-4': { borderWidth: '4px', borderStyle: 'solid' },
  'border-8': { borderWidth: '8px', borderStyle: 'solid' },
  'border-t': { borderTop: 'var(--brutal-border-width) solid var(--brutal-black)' },
  'border-r': { borderRight: 'var(--brutal-border-width) solid var(--brutal-black)' },
  'border-b': { borderBottom: 'var(--brutal-border-width) solid var(--brutal-black)' },
  'border-l': { borderLeft: 'var(--brutal-border-width) solid var(--brutal-black)' },
  'border-black': { borderColor: 'var(--brutal-black)' },
  'border-white': { borderColor: 'var(--brutal-white)' },
  'border-accent': { borderColor: 'var(--brutal-accent)' },
  'border-gray-50': { borderColor: '#f9fafb' },
  'border-gray-100': { borderColor: '#f3f4f6' },
  'border-gray-200': { borderColor: '#e5e7eb' },
  'border-gray-300': { borderColor: '#d1d5db' },
  'border-gray-400': { borderColor: '#9ca3af' },
  'border-gray-500': { borderColor: '#6b7280' },
  'border-gray-600': { borderColor: '#4b5563' },
  'border-gray-700': { borderColor: '#374151' },
  'border-gray-800': { borderColor: '#1f2937' },
  'border-gray-900': { borderColor: '#111827' },
  
  // Border radius
  'rounded-none': { borderRadius: '0' },
  'rounded-sm': { borderRadius: '0.125rem' },
  'rounded': { borderRadius: '0.25rem' },
  'rounded-md': { borderRadius: '0.375rem' },
  'rounded-lg': { borderRadius: '0.5rem' },
  'rounded-xl': { borderRadius: '0.75rem' },
  'rounded-2xl': { borderRadius: '1rem' },
  'rounded-full': { borderRadius: '9999px' },
}

// Shadow utilities
const shadowUtilities: Record<string, React.CSSProperties> = {
  'shadow-none': { boxShadow: 'none' },
  'shadow-brutal': { boxShadow: 'var(--brutal-shadow)' },
  'shadow-brutal-sm': { boxShadow: '2px 2px 0 var(--brutal-black)' },
  'shadow-brutal-md': { boxShadow: '4px 4px 0 var(--brutal-black)' },
  'shadow-brutal-lg': { boxShadow: '6px 6px 0 var(--brutal-black)' },
  'shadow-brutal-xl': { boxShadow: '8px 8px 0 var(--brutal-black)' },
}

// Opacity utilities
const opacityUtilities: Record<string, React.CSSProperties> = {
  'opacity-0': { opacity: '0' },
  'opacity-5': { opacity: '0.05' },
  'opacity-10': { opacity: '0.1' },
  'opacity-20': { opacity: '0.2' },
  'opacity-25': { opacity: '0.25' },
  'opacity-30': { opacity: '0.3' },
  'opacity-40': { opacity: '0.4' },
  'opacity-50': { opacity: '0.5' },
  'opacity-60': { opacity: '0.6' },
  'opacity-70': { opacity: '0.7' },
  'opacity-75': { opacity: '0.75' },
  'opacity-80': { opacity: '0.8' },
  'opacity-90': { opacity: '0.9' },
  'opacity-95': { opacity: '0.95' },
  'opacity-100': { opacity: '1' },
}

// Ring utilities (focus rings)
const ringUtilities: Record<string, React.CSSProperties> = {
  'ring-0': { boxShadow: '0 0 0 0px var(--brutal-black)' },
  'ring-1': { boxShadow: '0 0 0 1px var(--brutal-black)' },
  'ring-2': { boxShadow: '0 0 0 2px var(--brutal-black)' },
  'ring-4': { boxShadow: '0 0 0 4px var(--brutal-black)' },
  'ring-8': { boxShadow: '0 0 0 8px var(--brutal-black)' },
  'ring-black': { boxShadow: '0 0 0 2px var(--brutal-black)' },
  'ring-white': { boxShadow: '0 0 0 2px var(--brutal-white)' },
  'ring-accent': { boxShadow: '0 0 0 2px var(--brutal-accent)' },
  'ring-purple': { boxShadow: '0 0 0 4px #8b5cf6' },
  // Ring offset utilities
  'ring-offset-0': { boxShadow: '0 0 0 0px #fff, 0 0 0 0px var(--brutal-black)' },
  'ring-offset-1': { boxShadow: '0 0 0 1px #fff, 0 0 0 3px var(--brutal-accent)' },
  'ring-offset-2': { boxShadow: '0 0 0 2px #fff, 0 0 0 4px var(--brutal-accent)' },
  'ring-offset-4': { boxShadow: '0 0 0 4px #fff, 0 0 0 6px var(--brutal-accent)' },
  'ring-offset-8': { boxShadow: '0 0 0 8px #fff, 0 0 0 10px var(--brutal-accent)' },
}

// Transform utilities
const transformUtilities: Record<string, React.CSSProperties> = {
  'translate-x-0': { transform: 'translateX(0px)' },
  'translate-x-1': { transform: 'translateX(0.25rem)' },
  'translate-x-2': { transform: 'translateX(0.5rem)' },
  'translate-x-4': { transform: 'translateX(1rem)' },
  'translate-y-0': { transform: 'translateY(0px)' },
  'translate-y-1': { transform: 'translateY(0.25rem)' },
  'translate-y-2': { transform: 'translateY(0.5rem)' },
  'translate-y-4': { transform: 'translateY(1rem)' },
  'scale-0': { transform: 'scale(0)' },
  'scale-50': { transform: 'scale(0.5)' },
  'scale-75': { transform: 'scale(0.75)' },
  'scale-90': { transform: 'scale(0.9)' },
  'scale-95': { transform: 'scale(0.95)' },
  'scale-100': { transform: 'scale(1)' },
  'scale-105': { transform: 'scale(1.05)' },
  'scale-110': { transform: 'scale(1.1)' },
  'scale-125': { transform: 'scale(1.25)' },
  'scale-150': { transform: 'scale(1.5)' },
  'rotate-0': { transform: 'rotate(0deg)' },
  'rotate-1': { transform: 'rotate(1deg)' },
  'rotate-2': { transform: 'rotate(2deg)' },
  'rotate-3': { transform: 'rotate(3deg)' },
  'rotate-6': { transform: 'rotate(6deg)' },
  'rotate-12': { transform: 'rotate(12deg)' },
  'rotate-45': { transform: 'rotate(45deg)' },
  'rotate-90': { transform: 'rotate(90deg)' },
  'rotate-180': { transform: 'rotate(180deg)' },
}

// Cursor utilities
const cursorUtilities: Record<string, React.CSSProperties> = {
  'cursor-auto': { cursor: 'auto' },
  'cursor-default': { cursor: 'default' },
  'cursor-pointer': { cursor: 'pointer' },
  'cursor-wait': { cursor: 'wait' },
  'cursor-text': { cursor: 'text' },
  'cursor-move': { cursor: 'move' },
  'cursor-help': { cursor: 'help' },
  'cursor-not-allowed': { cursor: 'not-allowed' },
  'cursor-none': { cursor: 'none' },
  'cursor-context-menu': { cursor: 'context-menu' },
  'cursor-progress': { cursor: 'progress' },
  'cursor-cell': { cursor: 'cell' },
  'cursor-crosshair': { cursor: 'crosshair' },
  'cursor-vertical-text': { cursor: 'vertical-text' },
  'cursor-alias': { cursor: 'alias' },
  'cursor-copy': { cursor: 'copy' },
  'cursor-no-drop': { cursor: 'no-drop' },
  'cursor-grab': { cursor: 'grab' },
  'cursor-grabbing': { cursor: 'grabbing' },
}

// Transition utilities
const transitionUtilities: Record<string, React.CSSProperties> = {
  'transition-none': { transition: 'none' },
  'transition-all': { transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)' },
  'transition': { transition: 'color 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 150ms cubic-bezier(0.4, 0, 0.2, 1), fill 150ms cubic-bezier(0.4, 0, 0.2, 1), stroke 150ms cubic-bezier(0.4, 0, 0.2, 1)' },
  'transition-colors': { transition: 'color 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 150ms cubic-bezier(0.4, 0, 0.2, 1), fill 150ms cubic-bezier(0.4, 0, 0.2, 1), stroke 150ms cubic-bezier(0.4, 0, 0.2, 1)' },
  'transition-opacity': { transition: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)' },
  'transition-shadow': { transition: 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)' },
  'transition-transform': { transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)' },
  // Duration modifiers
  'duration-75': { transitionDuration: '75ms' },
  'duration-100': { transitionDuration: '100ms' },
  'duration-150': { transitionDuration: '150ms' },
  'duration-200': { transitionDuration: '200ms' },
  'duration-300': { transitionDuration: '300ms' },
  'duration-500': { transitionDuration: '500ms' },
  'duration-700': { transitionDuration: '700ms' },
  'duration-1000': { transitionDuration: '1000ms' },
}

/**
 * Parse a utility class and return corresponding CSS properties
 */
export function parseUtilityClass(className: string): React.CSSProperties | null {
  // Check display utilities
  if (displayUtilities[className]) {
    return displayUtilities[className]
  }
  
  // Check flex utilities
  if (flexUtilities[className]) {
    return flexUtilities[className]
  }
  
  // Check size utilities
  if (sizeUtilities[className]) {
    return sizeUtilities[className]
  }
  
  // Check position utilities
  if (positionUtilities[className]) {
    return positionUtilities[className]
  }
  
  // Check overflow utilities
  if (overflowUtilities[className]) {
    return overflowUtilities[className]
  }
  
  // Check typography utilities
  if (typographyUtilities[className]) {
    return typographyUtilities[className]
  }
  
  // Check color utilities
  if (colorUtilities[className]) {
    return colorUtilities[className]
  }
  
  // Check border utilities
  if (borderUtilities[className]) {
    return borderUtilities[className]
  }
  
  // Check shadow utilities
  if (shadowUtilities[className]) {
    return shadowUtilities[className]
  }
  
  // Check opacity utilities
  if (opacityUtilities[className]) {
    return opacityUtilities[className]
  }
  
  // Check ring utilities
  if (ringUtilities[className]) {
    return ringUtilities[className]
  }
  
  // Check transform utilities
  if (transformUtilities[className]) {
    return transformUtilities[className]
  }
  
  // Check transition utilities
  if (transitionUtilities[className]) {
    return transitionUtilities[className]
  }
  
  // Check cursor utilities
  if (cursorUtilities[className]) {
    return cursorUtilities[className]
  }
  
  // Check spacing utilities
  for (const [prefix, generator] of Object.entries(utilityPatterns)) {
    if (className.startsWith(`${prefix}-`)) {
      const value = className.slice(prefix.length + 1)
      if (spacingScale[value]) {
        return generator(value)
      }
    }
  }
  
  // Check for margin auto utilities
  if (className === 'm-auto') return { margin: 'auto' }
  if (className === 'mt-auto') return { marginTop: 'auto' }
  if (className === 'mr-auto') return { marginRight: 'auto' }
  if (className === 'mb-auto') return { marginBottom: 'auto' }
  if (className === 'ml-auto') return { marginLeft: 'auto' }
  if (className === 'mx-auto') return { marginLeft: 'auto', marginRight: 'auto' }
  if (className === 'my-auto') return { marginTop: 'auto', marginBottom: 'auto' }
  
  return null
}

/**
 * Parse multiple utility classes and merge into a single style object
 */
export function parseUtilityClasses(classNames: string): React.CSSProperties {
  const classes = classNames.split(' ').filter(Boolean)
  const styles: React.CSSProperties = {}
  
  for (const className of classes) {
    const parsed = parseUtilityClass(className)
    if (parsed) {
      Object.assign(styles, parsed)
    }
  }
  
  return styles
}

/**
 * Extract utility classes and non-utility classes from a className string
 */
export function extractUtilityClasses(className: string): {
  utilities: string[]
  others: string[]
  styles: React.CSSProperties
} {
  const classes = className.split(' ').filter(Boolean)
  const utilities: string[] = []
  const others: string[] = []
  const styles: React.CSSProperties = {}
  
  for (const cls of classes) {
    const parsed = parseUtilityClass(cls)
    if (parsed) {
      utilities.push(cls)
      Object.assign(styles, parsed)
    } else {
      others.push(cls)
    }
  }
  
  return { utilities, others, styles }
}