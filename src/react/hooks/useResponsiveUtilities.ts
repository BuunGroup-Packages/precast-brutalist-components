/**
 * Enhanced hook for processing utility classes with responsive and state modifiers
 */

import { useMemo, useEffect, useRef } from 'react'
import { clsx } from 'clsx'
import { parseUtilityClass } from '../utils/utility-classes'
import { parseModifiedUtility, groupUtilitiesByModifiers, generateResponsiveCSS, generateStateCSS, breakpoints } from '../utils/responsive-utilities'
import type { CSSProperties } from 'react'

let styleId = 0

export interface UseResponsiveUtilitiesOptions {
  /**
   * The className prop from the component
   */
  className?: string
  
  /**
   * The style prop from the component
   */
  style?: CSSProperties
  
  /**
   * Base component classes (from CSS modules)
   */
  componentClasses?: string | string[]
  
  /**
   * Component instance ID for unique CSS generation
   */
  componentId?: string
}

export interface UseResponsiveUtilitiesResult {
  /**
   * Combined className string
   */
  className: string
  
  /**
   * Combined style object for base utilities
   */
  style?: CSSProperties
}

/**
 * Hook that processes utility classes with responsive and state modifiers
 * 
 * @example
 * ```tsx
 * const { className, style } = useResponsiveUtilities({
 *   className: "mt-4 hover:bg-gray-100 md:px-6 lg:hover:shadow-lg",
 *   style: { color: 'red' },
 *   componentClasses: styles.button
 * })
 * ```
 */
export function useResponsiveUtilities(options: UseResponsiveUtilitiesOptions): UseResponsiveUtilitiesResult {
  const {
    className = '',
    style = {},
    componentClasses = '',
    componentId
  } = options
  
  const styleElementRef = useRef<HTMLStyleElement | null>(null)
  const uniqueIdRef = useRef<string>(`brutal-${componentId || `util-${styleId++}`}`)
  
  const result = useMemo(() => {
    if (!className) {
      return {
        className: clsx(componentClasses),
        style
      }
    }
    
    const classes = className.split(' ').filter(Boolean)
    const utilityClasses: string[] = []
    const nonUtilityClasses: string[] = []
    const baseStyles: CSSProperties = {}
    
    // Separate utility classes from non-utility classes
    for (const cls of classes) {
      const { utility } = parseModifiedUtility(cls)
      const parsed = parseUtilityClass(utility)
      
      if (parsed) {
        utilityClasses.push(cls)
        // Only add base styles for non-modified utilities
        if (cls === utility) {
          Object.assign(baseStyles, parsed)
        }
      } else {
        nonUtilityClasses.push(cls)
      }
    }
    
    // Group utilities by modifiers
    const grouped = groupUtilitiesByModifiers(utilityClasses)
    
    // Generate CSS for responsive and state utilities
    let generatedCSS = ''
    const uniqueClass = uniqueIdRef.current
    
    // Generate responsive CSS
    for (const [breakpoint, utilities] of grouped.responsive) {
      const breakpointStyles: CSSProperties = {}
      for (const utility of utilities) {
        const parsed = parseUtilityClass(utility)
        if (parsed) {
          Object.assign(breakpointStyles, parsed)
        }
      }
      if (Object.keys(breakpointStyles).length > 0) {
        generatedCSS += generateResponsiveCSS(breakpoint, `.${uniqueClass}`, breakpointStyles)
      }
    }
    
    // Generate state CSS
    for (const [state, utilities] of grouped.states) {
      const stateStyles: CSSProperties = {}
      const transformValues: string[] = []
      
      for (const utility of utilities) {
        const parsed = parseUtilityClass(utility)
        if (parsed) {
          // Handle transform utilities specially to combine them
          if (parsed.transform && typeof parsed.transform === 'string') {
            transformValues.push(parsed.transform)
          } else {
            Object.assign(stateStyles, parsed)
          }
        }
      }
      
      // Combine transform values
      if (transformValues.length > 0) {
        stateStyles.transform = transformValues.join(' ')
      }
      
      if (Object.keys(stateStyles).length > 0) {
        generatedCSS += generateStateCSS(state, `.${uniqueClass}`, stateStyles)
      }
    }
    
    // Generate responsive state CSS
    for (const [key, utilities] of grouped.responsiveStates) {
      const [breakpoint, state] = key.split(':') as [string, string]
      const responsiveStateStyles: CSSProperties = {}
      const transformValues: string[] = []
      
      for (const utility of utilities) {
        const parsed = parseUtilityClass(utility)
        if (parsed) {
          // Handle transform utilities specially to combine them
          if (parsed.transform && typeof parsed.transform === 'string') {
            transformValues.push(parsed.transform)
          } else {
            Object.assign(responsiveStateStyles, parsed)
          }
        }
      }
      
      // Combine transform values
      if (transformValues.length > 0) {
        responsiveStateStyles.transform = transformValues.join(' ')
      }
      
      if (Object.keys(responsiveStateStyles).length > 0) {
        const stateCss = generateStateCSS(state as any, `.${uniqueClass}`, responsiveStateStyles)
        // Wrap state CSS in media query with resolved breakpoint value
        const breakpointValue = breakpoints[breakpoint as keyof typeof breakpoints]
        generatedCSS += `
        @media (min-width: ${breakpointValue}) {
          ${stateCss.trim()}
        }`
      }
    }
    
    return {
      className: clsx(
        componentClasses,
        generatedCSS ? uniqueClass : '',
        ...nonUtilityClasses
      ),
      style: Object.keys(baseStyles).length > 0
        ? { ...baseStyles, ...style }
        : style,
      generatedCSS
    }
  }, [className, style, componentClasses])
  
  // Inject generated CSS
  useEffect(() => {
    if (result.generatedCSS && typeof document !== 'undefined') {
      // Create or update style element
      if (!styleElementRef.current) {
        styleElementRef.current = document.createElement('style')
        styleElementRef.current.setAttribute('data-brutal-utilities', uniqueIdRef.current)
        document.head.appendChild(styleElementRef.current)
      }
      
      styleElementRef.current.textContent = result.generatedCSS
      
      // Debug logging
      if (process.env.NODE_ENV === 'development') {
        console.log('Generated CSS for', uniqueIdRef.current, ':\n', result.generatedCSS)
      }
      
      // Cleanup
      return () => {
        if (styleElementRef.current && styleElementRef.current.parentNode) {
          styleElementRef.current.parentNode.removeChild(styleElementRef.current)
          styleElementRef.current = null
        }
      }
    }
  }, [result.generatedCSS])
  
  return {
    className: result.className,
    style: result.style
  }
}

/**
 * Enhanced version of useUtilityStyles that supports responsive and state modifiers
 */
export function useEnhancedUtilityStyles(
  className?: string,
  style?: CSSProperties,
  componentClasses?: string | string[]
): UseResponsiveUtilitiesResult {
  return useResponsiveUtilities({
    className,
    style,
    componentClasses
  })
}