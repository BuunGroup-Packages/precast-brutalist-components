import React, { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './Badge.module.css'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Badge content */
  children?: React.ReactNode
  /** Badge variant */
  variant?: 'solid' | 'outline' | 'dot' | 'secondary'
  /** Badge color */
  color?: 'accent' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  /** Badge size */
  size?: 'sm' | 'md' | 'lg'
  /** Whether the badge is dismissible */
  dismissible?: boolean
  /** Click handler for dismissible badges */
  onDismiss?: () => void
  /** Additional CSS classes */
  className?: string
  /** Custom click handler */
  onClick?: () => void
  /** Whether the badge is clickable */
  clickable?: boolean
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = 'solid',
      color = 'accent',
      size = 'md',
      dismissible = false,
      onDismiss,
      className,
      onClick,
      clickable = false,
      ...props
    },
    ref
  ) => {
    const isDot = variant === 'dot'
    const isClickable = clickable || !!onClick
    const isDismissible = dismissible && !!onDismiss

    const handleDismiss = (e: React.MouseEvent) => {
      e.stopPropagation()
      onDismiss?.()
    }

    const handleClick = () => {
      if (isClickable) {
        onClick?.()
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        onClick?.()
      }
    }

    // For dot variant, don't render children
    const content = isDot ? null : children

    // Dismiss icon
    const dismissIcon = (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={styles.dismissIcon}
        aria-hidden="true"
      >
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    )

    return (
      <span
        ref={ref}
        className={clsx(
          styles.badge,
          styles[variant],
          styles[color],
          styles[size],
          {
            [styles.clickable]: isClickable,
            [styles.dismissible]: isDismissible,
            [styles.dot]: isDot,
          },
          className
        )}
        onClick={isClickable ? handleClick : undefined}
        onKeyDown={isClickable ? handleKeyDown : undefined}
        role={isClickable ? 'button' : isDot ? 'status' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        aria-label={
          isDot 
            ? `${color} status indicator` 
            : typeof children === 'string' 
              ? children 
              : undefined
        }
        {...props}
      >
        {content}
        
        {isDismissible && (
          <button
            type="button"
            className={styles.dismissButton}
            onClick={handleDismiss}
            aria-label="Dismiss badge"
            tabIndex={-1}
          >
            {dismissIcon}
          </button>
        )}
      </span>
    )
  }
)

Badge.displayName = 'Badge'