/**
 * Responsive and state-based utility system for Brutalist UI
 */

// Breakpoint definitions
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const

// State modifiers
export const stateModifiers = [
  'hover',
  'focus',
  'active',
  'disabled',
  'focus-within',
  'focus-visible'
] as const

export type Breakpoint = keyof typeof breakpoints
export type StateModifier = typeof stateModifiers[number]

/**
 * Parse a utility class with modifiers
 * Examples: 
 * - "sm:px-4" -> { breakpoint: 'sm', utility: 'px-4' }
 * - "hover:bg-gray-100" -> { state: 'hover', utility: 'bg-gray-100' }
 * - "md:hover:text-blue" -> { breakpoint: 'md', state: 'hover', utility: 'text-blue' }
 */
export function parseModifiedUtility(className: string): {
  breakpoint?: Breakpoint
  state?: StateModifier
  utility: string
} {
  const parts = className.split(':')
  
  if (parts.length === 1) {
    // No modifiers
    return { utility: parts[0] }
  }
  
  let breakpoint: Breakpoint | undefined
  let state: StateModifier | undefined
  let utility: string
  
  if (parts.length === 2) {
    // One modifier
    const [modifier, utilityPart] = parts
    
    if (modifier in breakpoints) {
      breakpoint = modifier as Breakpoint
    } else if (stateModifiers.includes(modifier as StateModifier)) {
      state = modifier as StateModifier
    }
    
    utility = utilityPart
  } else if (parts.length === 3) {
    // Two modifiers (breakpoint and state)
    const [breakpointPart, statePart, utilityPart] = parts
    
    if (breakpointPart in breakpoints) {
      breakpoint = breakpointPart as Breakpoint
    }
    
    if (stateModifiers.includes(statePart as StateModifier)) {
      state = statePart as StateModifier
    }
    
    utility = utilityPart
  } else {
    // Invalid format, return the last part as utility
    utility = parts[parts.length - 1]
  }
  
  return { breakpoint, state, utility }
}

/**
 * Generate CSS for responsive utilities
 */
export function generateResponsiveCSS(
  breakpoint: Breakpoint,
  selector: string,
  styles: React.CSSProperties
): string {
  const cssProperties = Object.entries(styles)
    .map(([prop, value]) => {
      const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase()
      return `${cssProp}: ${value};`
    })
    .join('\n    ')
  
  return `
  @media (min-width: ${breakpoints[breakpoint]}) {
    ${selector} {
      ${cssProperties}
    }
  }`
}

/**
 * Generate CSS for state-based utilities
 */
export function generateStateCSS(
  state: StateModifier,
  selector: string,
  styles: React.CSSProperties
): string {
  const cssProperties = Object.entries(styles)
    .map(([prop, value]) => {
      const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase()
      // Add !important to ensure state styles override base styles
      return `${cssProp}: ${value} !important;`
    })
    .join('\n    ')
  
  const stateSelector = state === 'focus-within' ? 'focus-within' : 
                       state === 'focus-visible' ? 'focus-visible' :
                       state
  
  return `
  ${selector}:${stateSelector} {
    ${cssProperties}
  }`
}

/**
 * Group utilities by their modifiers for efficient CSS generation
 */
export function groupUtilitiesByModifiers(classNames: string[]): {
  base: string[]
  responsive: Map<Breakpoint, string[]>
  states: Map<StateModifier, string[]>
  responsiveStates: Map<`${Breakpoint}:${StateModifier}`, string[]>
} {
  const base: string[] = []
  const responsive = new Map<Breakpoint, string[]>()
  const states = new Map<StateModifier, string[]>()
  const responsiveStates = new Map<`${Breakpoint}:${StateModifier}`, string[]>()
  
  for (const className of classNames) {
    const { breakpoint, state, utility } = parseModifiedUtility(className)
    
    if (!breakpoint && !state) {
      base.push(utility)
    } else if (breakpoint && !state) {
      if (!responsive.has(breakpoint)) {
        responsive.set(breakpoint, [])
      }
      responsive.get(breakpoint)!.push(utility)
    } else if (!breakpoint && state) {
      if (!states.has(state)) {
        states.set(state, [])
      }
      states.get(state)!.push(utility)
    } else if (breakpoint && state) {
      const key = `${breakpoint}:${state}` as const
      if (!responsiveStates.has(key)) {
        responsiveStates.set(key, [])
      }
      responsiveStates.get(key)!.push(utility)
    }
  }
  
  return { base, responsive, states, responsiveStates }
}