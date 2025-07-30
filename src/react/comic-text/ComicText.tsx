/**
 * @module ComicText
 * @description A bold, comic book-style text component with halftone dot pattern and brutalist aesthetics
 */

import React, { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './ComicText.module.css'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'

/**
 * Props for the ComicText component
 */
export interface ComicTextProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The text content to display
   */
  children: string
  
  /**
   * The size of the text in rem units
   * @default 5
   */
  fontSize?: number
  
  /**
   * The visual style variant
   * @default 'default'
   */
  variant?: 'default' | 'brutal' | 'outline' | 'shadow'
  
  /**
   * The color scheme
   * @default 'yellow'
   */
  color?: 'yellow' | 'red' | 'blue' | 'green' | 'purple' | 'orange'
  
  /**
   * The component element type
   * @default 'div'
   */
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p'
}

/**
 * ComicText component for displaying bold, comic book-style text with brutalist design
 *
 * @example
 * ```tsx
 * <ComicText fontSize={6} color="red">
 *   POW!
 * </ComicText>
 * ```
 */
export const ComicText = forwardRef<HTMLDivElement, ComicTextProps>(
  ({ 
    children, 
    className, 
    style,
    fontSize = 5,
    variant = 'default',
    color = 'yellow',
    as: Component = 'div',
    ...props 
  }, ref) => {
    if (typeof children !== 'string') {
      throw new Error('ComicText: children must be a string')
    }

    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.comicText,
        styles[variant],
        styles[color]
      )
    })

    const finalStyle = {
      ...processedStyle,
      '--comic-font-size': `${fontSize}rem`,
      '--comic-stroke-width': `${fontSize * 0.35}px`,
      '--comic-shadow-offset': `${fontSize * 0.8}px`
    } as React.CSSProperties

    return (
      <Component
        ref={ref as any}
        className={processedClassName}
        style={finalStyle}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

ComicText.displayName = 'ComicText'

export default ComicText