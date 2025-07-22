/**
 * @module Skeleton
 * @description A placeholder component used while content is loading. Provides a subtle animation to indicate loading state.
 */

import React, { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './Skeleton.module.css'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Shape of the skeleton */
  shape?: 'text' | 'circular' | 'rectangular'
  /** Animation type */
  animation?: 'pulse' | 'wave' | 'none'
  /** Width of the skeleton (for rectangular and circular) */
  width?: number | string
  /** Height of the skeleton (for rectangular and circular) */
  height?: number | string
  /** Number of text lines (only for text shape) */
  lines?: 1 | 2 | 3 | 4 | 5
  /** Variant style */
  variant?: 'default' | 'rounded'
  /** Additional CSS classes */
  className?: string
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      shape = 'text',
      animation = 'pulse',
      width,
      height,
      lines = 1,
      variant = 'default',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const isText = shape === 'text'
    const isCircular = shape === 'circular'

    // Generate styles for width and height
    const dimensionStyles: React.CSSProperties = {
      ...style,
      ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
      ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
    }

    // For circular, use width as diameter if height not specified
    if (isCircular && width && !height) {
      dimensionStyles.height = dimensionStyles.width
    }

    const baseClasses = clsx(
      styles.skeleton,
      styles[shape],
      styles[animation],
      styles[variant],
      className
    )

    // For text skeleton with multiple lines
    if (isText && lines > 1) {
      const textLines = Array.from({ length: lines }, (_, index) => {
        const isLastLine = index === lines - 1
        const lineWidth = isLastLine ? '75%' : '100%'
        
        return (
          <div
            key={index}
            className={clsx(styles.skeleton, styles.text, styles[animation], styles[variant])}
            style={{ 
              width: lineWidth,
              marginBottom: index < lines - 1 ? 'var(--brutal-space-2)' : 0 
            }}
            aria-hidden="true"
          />
        )
      })

      return (
        <div
          ref={ref}
          className={styles.textContainer}
          role="status"
          aria-label="Loading content"
          {...props}
        >
          {textLines}
        </div>
      )
    }

    // Single skeleton element
    return (
      <div
        ref={ref}
        className={baseClasses}
        style={dimensionStyles}
        role="status"
        aria-label="Loading content"
        aria-hidden="true"
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'