/**
 * @module Box
 * @description A primitive component that supports all utility classes for layout and styling
 */

import React, { forwardRef, HTMLAttributes } from 'react'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'

/**
 * Props for the Box component
 */
export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The HTML element to render
   * @default 'div'
   */
  as?: keyof JSX.IntrinsicElements
}

/**
 * A primitive component that supports all utility classes for layout and styling.
 * Can be used as any HTML element via the 'as' prop.
 * 
 * @example
 * ```tsx
 * <Box className="p-4 bg-gray-100 rounded-lg shadow-brutal">
 *   <Box as="h1" className="text-2xl font-bold mb-4">Title</Box>
 *   <Box as="p" className="text-gray-600">Content goes here</Box>
 * </Box>
 * ```
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ as: Component = 'div', className, style, children, ...props }, ref) => {
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style
    })

    return React.createElement(
      Component,
      {
        ...props,
        ref,
        className: processedClassName,
        style: processedStyle,
      },
      children
    )
  }
)

Box.displayName = 'Box'