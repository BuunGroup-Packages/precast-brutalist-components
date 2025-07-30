/**
 * @module Wireframe
 * @description A brutalist wireframe component for building layouts with a sketchy, hand-drawn aesthetic. Perfect for prototyping and creating low-fidelity mockups with distinctive brutalist styling.
 */

import { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './Wireframe.module.css'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'

/**
 * Props for the Wireframe component
 */
export interface WireframeProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the wireframe
   * @default 'box'
   */
  variant?: 'box' | 'dashed' | 'dotted' | 'sketch'
  
  /**
   * The type of wireframe element
   * @default 'container'
   */
  type?: 'container' | 'text' | 'image' | 'button' | 'input' | 'header' | 'nav' | 'content'
  
  /**
   * Height of the wireframe element
   * @default 'auto'
   */
  height?: 'auto' | 'sm' | 'md' | 'lg' | 'full' | string
  
  /**
   * Whether to show a label inside the wireframe
   * @default true
   */
  showLabel?: boolean
  
  /**
   * Custom label text (defaults to the type)
   */
  label?: string
  
  /**
   * Whether to add diagonal lines pattern
   * @default false
   */
  hatched?: boolean
  
  /**
   * Whether the wireframe should have interactive hover effects
   * @default false
   */
  interactive?: boolean
  
  /**
   * Padding size for the wireframe content
   * @default 'md'
   */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  
  /**
   * Whether to make the wireframe scrollable
   * @default false
   */
  scrollable?: boolean
  
  /**
   * Scroll direction when scrollable is true
   * @default 'vertical'
   */
  scrollDirection?: 'vertical' | 'horizontal' | 'both'
}

/**
 * Props for Wireframe.Group component
 */
export interface WireframeGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Direction of the group layout
   * @default 'vertical'
   */
  direction?: 'horizontal' | 'vertical'
  
  /**
   * Gap between wireframe items
   * @default 'md'
   */
  gap?: 'sm' | 'md' | 'lg'
}

/**
 * A brutalist wireframe component for creating low-fidelity layouts and mockups.
 * Features hand-drawn aesthetics with various styles like sketchy borders, hatching patterns, and labels.
 * 
 * @example
 * ```tsx
 * <Wireframe type="header" height="sm">
 *   <Wireframe.Group direction="horizontal">
 *     <Wireframe type="image" variant="sketch" />
 *     <Wireframe type="nav" variant="dashed" />
 *   </Wireframe.Group>
 * </Wireframe>
 * ```
 */
export const Wireframe = forwardRef<HTMLDivElement, WireframeProps>(
  (
    {
      variant = 'box',
      type = 'container',
      height = 'auto',
      showLabel = true,
      label,
      hatched = false,
      interactive = false,
      padding = 'md',
      scrollable = false,
      scrollDirection = 'vertical',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.wireframe,
        styles[variant],
        styles[`type-${type}`],
        styles[`padding-${padding}`],
        {
          [styles.hatched]: hatched,
          [styles.interactive]: interactive,
          [styles[`height-${height}`]]: typeof height === 'string' && ['sm', 'md', 'lg', 'full'].includes(height),
          [styles.scrollable]: scrollable,
          [styles[`scroll-${scrollDirection}`]]: scrollable
        }
      )
    })

    const customHeight = !['auto', 'sm', 'md', 'lg', 'full'].includes(height) ? height : undefined

    return (
      <div
        ref={ref}
        className={processedClassName}
        style={{
          ...processedStyle,
          ...(customHeight && { height: customHeight })
        }}
        data-wireframe-type={type}
        {...props}
      >
        {showLabel && !children && (
          <span className={styles.label}>{label || type.toUpperCase()}</span>
        )}
        {children}
      </div>
    )
  }
)

Wireframe.displayName = 'Wireframe'

/**
 * Group component for organizing multiple wireframe elements
 */
const WireframeGroup = forwardRef<HTMLDivElement, WireframeGroupProps>(
  (
    {
      direction = 'vertical',
      gap = 'md',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.group,
        styles[`direction-${direction}`],
        styles[`gap-${gap}`]
      )
    })

    return (
      <div
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        {...props}
      >
        {children}
      </div>
    )
  }
)

WireframeGroup.displayName = 'Wireframe.Group'

// Attach Group as a static property
export const WireframeWithGroup = Object.assign(Wireframe, {
  Group: WireframeGroup
})