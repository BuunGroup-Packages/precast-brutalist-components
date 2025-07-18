import React, { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Progress value (0-max for determinate, undefined for indeterminate) */
  value?: number
  /** Maximum value */
  max?: number
  /** Progress type */
  type?: 'linear' | 'circular'
  /** Progress variant */
  variant?: 'default' | 'striped' | 'animated'
  /** Progress size */
  size?: 'sm' | 'md' | 'lg'
  /** Whether to show the value label */
  showLabel?: boolean
  /** Custom label text (overrides default percentage) */
  label?: string
  /** Whether progress is indeterminate */
  indeterminate?: boolean
  /** Progress bar color */
  color?: 'accent' | 'success' | 'warning' | 'error' | 'info'
  /** Additional CSS classes */
  className?: string
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      type = 'linear',
      variant = 'default', // eslint-disable-line @typescript-eslint/no-unused-vars
      size = 'md',
      showLabel = false,
      label,
      indeterminate = false,
      color = 'accent',
      className,
      ...props
    },
    ref
  ) => {
    // Calculate progress percentage
    const progressValue = indeterminate ? undefined : Math.min(Math.max((value ?? 0) / max * 100, 0), 100)
    const isCircular = type === 'circular'
    
    // Calculate label text
    const labelText = label || (progressValue !== undefined ? `${Math.round(progressValue)}%` : '')
    
    // Squared circular progress calculations
    const boxSize = isCircular ? (size === 'sm' ? 40 : size === 'lg' ? 80 : 60) : 0
    const pathLength = isCircular ? boxSize * 4 - 16 : 0 // Perimeter minus corners
    const dashOffset = isCircular && progressValue !== undefined 
      ? pathLength - (progressValue / 100) * pathLength 
      : 0

    // Accessibility props
    const progressRole = 'progressbar'
    const ariaValueNow = indeterminate ? undefined : value ?? 0
    const ariaValueMin = 0
    const ariaValueMax = max
    const ariaLabel = label || (indeterminate ? 'Loading' : `${Math.round(progressValue ?? 0)} percent complete`)

    // Base classes
    const baseClasses = clsx(
      'relative',
      'font-mono font-bold text-black',
      className
    )

    // Color variants
    const colorClasses = {
      accent: 'bg-yellow-400 border-yellow-400',
      success: 'bg-green-400 border-green-400',
      warning: 'bg-orange-400 border-orange-400',
      error: 'bg-red-400 border-red-400',
      info: 'bg-blue-400 border-blue-400'
    }

    const trackColorClasses = {
      accent: 'bg-yellow-100 border-yellow-400',
      success: 'bg-green-100 border-green-400',
      warning: 'bg-orange-100 border-orange-400',
      error: 'bg-red-100 border-red-400',
      info: 'bg-blue-100 border-blue-400'
    }

    if (isCircular) {
      const strokeWidth = size === 'sm' ? 3 : size === 'lg' ? 6 : 4
      const padding = strokeWidth + 2
      const svgSize = boxSize + padding * 2
      const cornerSize = 4

      const circularClasses = clsx(
        baseClasses,
        'inline-flex items-center justify-center'
      )

      const strokeColorClasses = {
        accent: 'stroke-yellow-400',
        success: 'stroke-green-400',
        warning: 'stroke-orange-400',
        error: 'stroke-red-400',
        info: 'stroke-blue-400'
      }

      const trackStrokeClasses = {
        accent: 'stroke-yellow-200',
        success: 'stroke-green-200',
        warning: 'stroke-orange-200',
        error: 'stroke-red-200',
        info: 'stroke-blue-200'
      }

      return (
        <div
          ref={ref}
          className={circularClasses}
          role={progressRole}
          aria-valuenow={ariaValueNow}
          aria-valuemin={ariaValueMin}
          aria-valuemax={ariaValueMax}
          aria-label={ariaLabel}
          {...props}
        >
          <div className="relative flex items-center justify-center">
            <svg
              className="transform rotate-0"
              width={svgSize}
              height={svgSize}
              viewBox={`0 0 ${svgSize} ${svgSize}`}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 'bold'
              }}
            >
              {/* Background square track */}
              <rect
                className={clsx('fill-white', trackStrokeClasses[color])}
                x={padding}
                y={padding}
                width={boxSize}
                height={boxSize}
                rx={cornerSize}
                ry={cornerSize}
                fill="none"
                strokeWidth={strokeWidth}
              />
              {/* Progress square */}
              <rect
                className={clsx('fill-none transition-all duration-300', strokeColorClasses[color])}
                x={padding}
                y={padding}
                width={boxSize}
                height={boxSize}
                rx={cornerSize}
                ry={cornerSize}
                fill="none"
                strokeWidth={strokeWidth}
                style={{
                  strokeDasharray: pathLength,
                  strokeDashoffset: dashOffset,
                }}
                strokeLinecap="square"
                transform={`rotate(-90 ${svgSize / 2} ${svgSize / 2})`}
              />
            </svg>
            {showLabel && (
              <div 
                className={clsx(
                  'absolute text-center font-bold text-black leading-none',
                  size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'
                )}
                style={{
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              >
                {labelText}
              </div>
            )}
          </div>
        </div>
      )
    }

    // Linear progress
    const linearClasses = clsx(
      baseClasses,
      'w-full',
      showLabel && 'mb-6'
    )

    const sizeClasses = {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4'
    }

    const trackClasses = clsx(
      'relative overflow-hidden border-2 border-black',
      'shadow-[inset_2px_2px_0px_rgba(0,0,0,0.2),3px_3px_0px_black]',
      'transform -translate-y-px',
      sizeClasses[size],
      trackColorClasses[color]
    )

    const barClasses = clsx(
      'h-full relative transition-all duration-300',
      'shadow-[inset_-2px_-2px_0px_rgba(0,0,0,0.2)]',
      'after:absolute after:top-0 after:right-0 after:w-1 after:h-full after:bg-black',
      colorClasses[color],
      indeterminate && 'animate-pulse'
    )

    return (
      <div
        ref={ref}
        className={linearClasses}
        role={progressRole}
        aria-valuenow={ariaValueNow}
        aria-valuemin={ariaValueMin}
        aria-valuemax={ariaValueMax}
        aria-label={ariaLabel}
        {...props}
      >
        <div className={trackClasses}>
          <div
            className={barClasses}
            style={{
              width: indeterminate ? '30%' : `${progressValue}%`,
              fontFamily: 'JetBrains Mono, monospace'
            }}
            aria-hidden="true"
          />
        </div>
        {showLabel && (
          <div 
            className="mt-2 text-sm font-bold text-center text-black"
            style={{
              fontFamily: 'JetBrains Mono, monospace'
            }}
          >
            {labelText}
          </div>
        )}
      </div>
    )
  }
)

Progress.displayName = 'Progress'