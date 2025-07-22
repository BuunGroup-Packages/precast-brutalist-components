/**
 * @module Container
 * @description A responsive container component that provides consistent max-width constraints and padding. Essential for creating well-structured page layouts with proper content alignment.
 */

import { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './Container.module.css'

/**
 * Props for the Container component
 */
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The maximum width size of the container
   * @default 'lg'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  
  /**
   * Whether the container should be horizontally centered
   * @default true
   */
  centered?: boolean
  
  /**
   * The amount of padding inside the container
   * @default 'md'
   */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
}

/**
 * A responsive container that constrains content width and provides consistent padding.
 * Commonly used as a top-level wrapper for page content to ensure proper layout on different screen sizes.
 * 
 * @example
 * ```tsx
 * <Container size="lg" padding="lg">
 *   <h1>Page Title</h1>
 *   <p>Your content goes here...</p>
 * </Container>
 * ```
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      size = 'lg',
      centered = true,
      padding = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.container,
          styles[size],
          styles[`padding-${padding}`],
          {
            [styles.centered]: centered,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'