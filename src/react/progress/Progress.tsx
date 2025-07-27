/**
 * @module Progress
 * @description A progress bar component for showing task completion or loading states. Supports determinate and indeterminate modes.
 */

import { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './Progress.module.css'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'

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
      variant = 'default',
      size = 'md',
      showLabel = false,
      label,
      indeterminate = false,
      color = 'accent',
      className,
      style,
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

    const progressBarStyles = {
      ...(type === 'linear' && progressValue !== undefined && {
        width: `${progressValue}%`,
      }),
      ...(isCircular && progressValue !== undefined && {
        strokeDasharray: pathLength,
        strokeDashoffset: dashOffset,
      }),
    }

    // Process progress utilities
    const { className: progressClassName, style: progressStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.progress,
        styles[type],
        styles[variant],
        styles[size],
        styles[color],
        {
          [styles.indeterminate]: indeterminate,
          [styles.withLabel]: showLabel,
        }
      )
    })

    // Accessibility props
    const progressRole = 'progressbar'
    const ariaValueNow = indeterminate ? undefined : value ?? 0
    const ariaValueMin = 0
    const ariaValueMax = max
    const ariaLabel = label || (indeterminate ? 'Loading' : `${Math.round(progressValue ?? 0)} percent complete`)

    if (isCircular) {
      const strokeWidth = size === 'sm' ? 3 : size === 'lg' ? 6 : 4
      const padding = strokeWidth + 2
      const svgSize = boxSize + padding * 2
      const cornerSize = 4

      return (
        <div
          ref={ref}
          className={progressClassName}
          style={progressStyle}
          role={progressRole}
          aria-valuenow={ariaValueNow}
          aria-valuemin={ariaValueMin}
          aria-valuemax={ariaValueMax}
          aria-label={ariaLabel}
          {...props}
        >
          <div className={styles.circularContainer}>
            <svg
              className={styles.circularSvg}
              width={svgSize}
              height={svgSize}
              viewBox={`0 0 ${svgSize} ${svgSize}`}
            >
              {/* Background square track */}
              <rect
                className={styles.circularTrack}
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
                className={styles.circularBar}
                x={padding}
                y={padding}
                width={boxSize}
                height={boxSize}
                rx={cornerSize}
                ry={cornerSize}
                fill="none"
                strokeWidth={strokeWidth}
                style={progressBarStyles}
                strokeLinecap="square"
                transform={`rotate(-90 ${svgSize / 2} ${svgSize / 2})`}
              />
            </svg>
            {showLabel && (
              <div className={styles.circularLabel}>
                {labelText}
              </div>
            )}
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={progressClassName}
        style={progressStyle}
        role={progressRole}
        aria-valuenow={ariaValueNow}
        aria-valuemin={ariaValueMin}
        aria-valuemax={ariaValueMax}
        aria-label={ariaLabel}
        {...props}
      >
        <div className={styles.track}>
          <div
            className={styles.bar}
            style={progressBarStyles}
            aria-hidden="true"
          />
        </div>
        {showLabel && (
          <div className={styles.label}>
            {labelText}
          </div>
        )}
      </div>
    )
  }
)

Progress.displayName = 'Progress'