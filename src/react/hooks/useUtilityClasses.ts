/**
 * Hook for processing utility classes in Brutalist UI components
 * Handles both inline styles and CSS module classes
 */

import { useMemo } from 'react'
import { clsx } from 'clsx'
import { extractUtilityClasses } from '../utils/utility-classes'
import { useResponsiveUtilities } from './useResponsiveUtilities'
import type { CSSProperties } from 'react'

export interface UseUtilityClassesOptions {
  /**
   * The className prop from the component
   */
  className?: string
  
  /**
   * The style prop from the component
   */
  style?: CSSProperties
  
  /**
   * Whether to use CSS modules for utility classes
   * @default false - uses inline styles
   */
  useUtilityCSS?: boolean
  
  /**
   * Base component classes (from CSS modules)
   */
  componentClasses?: string | string[]
}

export interface UseUtilityClassesResult {
  /**
   * Combined className string (component classes + non-utility classes + utility CSS classes if enabled)
   */
  className: string
  
  /**
   * Combined style object (component styles + utility styles if not using CSS)
   */
  style?: CSSProperties
}

/**
 * Hook that processes utility classes and merges them with component classes and styles
 * 
 * @example
 * ```tsx
 * const { className, style } = useUtilityClasses({
 *   className: "mt-4 mb-2 custom-class",
 *   style: { color: 'red' },
 *   componentClasses: styles.button
 * })
 * ```
 */
export function useUtilityClasses(options: UseUtilityClassesOptions): UseUtilityClassesResult {
  const {
    className = '',
    style = {},
    useUtilityCSS = false,
    componentClasses = ''
  } = options
  
  return useMemo(() => {
    // Extract utility classes and parse them
    const { utilities, others, styles: parsedStyles } = extractUtilityClasses(className)
    
    if (useUtilityCSS) {
      // Use CSS module classes for utilities
      // Note: This would require importing the CSS module, which we'll handle in component implementation
      return {
        className: clsx(
          componentClasses,
          ...utilities, // Pass through utility classes for now
          ...others
        ),
        style: style
      }
    } else {
      // Use inline styles for utilities
      return {
        className: clsx(
          componentClasses,
          ...others
        ),
        style: Object.keys(parsedStyles).length > 0
          ? { ...parsedStyles, ...style }
          : style
      }
    }
  }, [className, style, useUtilityCSS, componentClasses])
}

/**
 * Alternative hook that always uses inline styles (simpler API)
 * 
 * @example
 * ```tsx
 * const { className, style } = useUtilityStyles(
 *   "mt-4 mb-2 custom-class",
 *   { color: 'red' },
 *   styles.button
 * )
 * ```
 */
export function useUtilityStyles(
  className?: string,
  style?: CSSProperties,
  componentClasses?: string | string[]
): UseUtilityClassesResult {
  // Use the enhanced responsive utilities hook
  return useResponsiveUtilities({
    className,
    style,
    componentClasses
  }) as UseUtilityClassesResult
}

/**
 * Alternative hook that always uses CSS module classes
 * 
 * @example
 * ```tsx
 * const { className } = useUtilityCSSClasses(
 *   "mt-4 mb-2 custom-class",
 *   styles.button
 * )
 * ```
 */
export function useUtilityCSSClasses(
  className?: string,
  componentClasses?: string | string[]
): UseUtilityClassesResult {
  return useUtilityClasses({
    className,
    useUtilityCSS: true,
    componentClasses
  })
}