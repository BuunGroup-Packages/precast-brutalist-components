/**
 * @module Stack
 * @description A layout component for arranging child elements in horizontal or vertical stacks with customizable spacing, alignment, and semantic HTML elements. Provides flexible layout options with CSS flexbox.
 */

import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { clsx } from 'clsx'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'
import styles from './Stack.module.css'

/**
 * Props for the Stack component
 */
export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Direction in which to arrange the child elements
   * @default 'vertical'
   */
  direction?: 'horizontal' | 'vertical'
  
  /**
   * Amount of space between child elements
   * @default 'md'
   */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  
  /**
   * Cross-axis alignment of child elements
   * @default 'stretch'
   */
  align?: 'start' | 'center' | 'end' | 'stretch'
  
  /**
   * Main-axis justification of child elements
   * @default 'start'
   */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  
  /**
   * Whether child elements should wrap to new lines when space is limited
   * @default false
   */
  wrap?: boolean
  
  /**
   * The HTML element type to render as the stack container
   * @default 'div'
   */
  as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'nav'
  
  /**
   * Additional CSS classes to apply to the stack container
   */
  className?: string

  /**
   * Custom styles to apply to the stack
   */
  style?: CSSProperties
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'vertical',
      gap = 'md',
      align = 'stretch',
      justify = 'start',
      wrap = false,
      as: Component = 'div',
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
        styles.stack,
        styles[direction],
        styles[`gap-${gap}`],
        styles[`align-${align}`],
        styles[`justify-${justify}`],
        {
          [styles.wrap]: wrap,
        }
      )
    })

    return (
      <Component
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Stack.displayName = 'Stack'