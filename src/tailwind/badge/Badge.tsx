import React, { forwardRef, HTMLAttributes } from 'react'

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
      className = '',
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

    const baseClasses = `
      inline-flex items-center justify-center
      font-mono font-bold uppercase tracking-wider
      border-[3px] border-solid border-black
      rounded-none whitespace-nowrap
      transition-all duration-150 ease-in-out
      shadow-[4px_4px_0px_black]
    `

    const sizeClasses = {
      sm: isDot ? 'w-2 h-2' : 'px-2 py-1 text-xs min-h-[20px]',
      md: isDot ? 'w-3 h-3' : 'px-3 py-2 text-sm min-h-[24px]',
      lg: isDot ? 'w-4 h-4' : 'px-4 py-3 text-base min-h-[32px]'
    }

    const variantClasses = {
      solid: 'bg-black text-white border-black',
      outline: 'bg-transparent text-black border-black',
      dot: 'rounded-full',
      secondary: 'bg-gray-100 text-gray-900 border-gray-600'
    }

    const colorClasses = {
      accent: variant === 'outline' ? 'text-red-500 border-red-500' : 'bg-red-500 text-white border-red-700',
      success: variant === 'outline' ? 'text-green-500 border-green-500' : 'bg-green-500 text-white border-green-700',
      warning: variant === 'outline' ? 'text-yellow-500 border-yellow-500' : 'bg-yellow-400 text-black border-yellow-600',
      error: variant === 'outline' ? 'text-red-500 border-red-500' : 'bg-red-500 text-white border-red-700',
      info: variant === 'outline' ? 'text-blue-500 border-blue-500' : 'bg-blue-500 text-white border-blue-700',
      neutral: variant === 'outline' ? 'text-gray-500 border-gray-500' : 'bg-gray-500 text-white border-gray-700'
    }

    const interactionClasses = isClickable
      ? 'cursor-pointer hover:shadow-[6px_6px_0px_black] hover:-translate-x-0.5 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
      : ''

    const combinedClasses = `
      ${baseClasses}
      ${sizeClasses[size]}
      ${variantClasses[variant]}
      ${variant !== 'solid' && variant !== 'secondary' ? colorClasses[color] : ''}
      ${interactionClasses}
      ${className}
    `.replace(/\s+/g, ' ').trim()

    // Dismiss icon
    const dismissIcon = (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3 h-3 ml-1"
        aria-hidden="true"
      >
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    )

    return (
      <span
        ref={ref}
        className={combinedClasses}
        style={{
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: 700,
          letterSpacing: '0.02em',
          lineHeight: 1,
          ...props.style
        }}
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
            className="ml-1 text-current hover:text-gray-700 focus:outline-none"
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