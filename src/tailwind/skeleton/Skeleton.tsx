import React, { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'

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
      fontFamily: 'JetBrains Mono, monospace',
      fontWeight: 'bold'
    }

    // For circular, use width as diameter if height not specified
    if (isCircular && width && !height) {
      dimensionStyles.height = dimensionStyles.width
    }

    // Base classes
    const baseClasses = clsx(
      'bg-gray-200 border border-black block relative overflow-hidden',
      // Shape classes
      isText && 'h-5 leading-normal',
      isCircular && 'rounded-full min-w-10 min-h-10',
      shape === 'rectangular' && 'min-w-50 min-h-30',
      // Variant classes
      variant === 'rounded' && !isCircular && 'rounded',
      // Animation classes
      animation === 'pulse' && 'animate-pulse',
      animation === 'wave' && 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[wave_1.6s_linear_infinite]',
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
            className={clsx(
              'bg-gray-200 border border-black block relative overflow-hidden h-5 leading-normal',
              animation === 'pulse' && 'animate-pulse',
              animation === 'wave' && 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[wave_1.6s_linear_infinite]',
              variant === 'rounded' && 'rounded'
            )}
            style={{ 
              width: lineWidth,
              marginBottom: index < lines - 1 ? '8px' : 0,
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 'bold'
            }}
            aria-hidden="true"
          />
        )
      })

      return (
        <div
          ref={ref}
          className="flex flex-col w-full"
          role="status"
          aria-label="Loading content"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 'bold'
          }}
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