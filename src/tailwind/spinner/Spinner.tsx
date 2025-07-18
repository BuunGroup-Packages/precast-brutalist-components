import { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface SpinnerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Size of the spinner */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Color variant */
  color?: 'default' | 'accent' | 'success' | 'warning' | 'error' | 'info'
  /** Animation variant */
  variant?: 'dots' | 'bars' | 'square' | 'glitch'
  /** Speed of animation */
  speed?: 'slow' | 'normal' | 'fast'
  /** Label for accessibility */
  label?: string
  /** Additional CSS classes */
  className?: string
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = 'md',
      color = 'default',
      variant = 'dots',
      speed = 'normal',
      label = 'Loading',
      className,
      ...props
    },
    ref
  ) => {
    // Size classes
    const sizeClasses = {
      sm: {
        container: 'w-4 h-4',
        dot: 'w-1 h-1',
        bar: 'w-0.5 h-2',
        square: 'w-4 h-4',
        glitch: 'w-4 h-4'
      },
      md: {
        container: 'w-6 h-6',
        dot: 'w-1.5 h-1.5',
        bar: 'w-0.5 h-3',
        square: 'w-6 h-6',
        glitch: 'w-6 h-6'
      },
      lg: {
        container: 'w-8 h-8',
        dot: 'w-2 h-2',
        bar: 'w-1 h-4',
        square: 'w-8 h-8',
        glitch: 'w-8 h-8'
      },
      xl: {
        container: 'w-12 h-12',
        dot: 'w-3 h-3',
        bar: 'w-1.5 h-6',
        square: 'w-12 h-12',
        glitch: 'w-12 h-12'
      }
    }

    // Color classes
    const colorClasses = {
      default: 'bg-black border-black',
      accent: 'bg-yellow-400 border-yellow-400',
      success: 'bg-green-400 border-green-400',
      warning: 'bg-orange-400 border-orange-400',
      error: 'bg-red-400 border-red-400',
      info: 'bg-blue-400 border-blue-400'
    }

    // Animation speed classes
    const speedClasses = {
      slow: 'duration-2000',
      normal: 'duration-1000',
      fast: 'duration-500'
    }

    const renderSpinner = () => {
      const baseClasses = clsx(
        'border-2 border-black',
        colorClasses[color],
        speedClasses[speed]
      )

      switch (variant) {
        case 'dots':
          return (
            <>
              <span 
                className={clsx(
                  baseClasses,
                  sizeClasses[size].dot,
                  'animate-pulse'
                )}
                style={{
                  animationDelay: '0ms',
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              />
              <span 
                className={clsx(
                  baseClasses,
                  sizeClasses[size].dot,
                  'animate-pulse'
                )}
                style={{
                  animationDelay: '200ms',
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              />
              <span 
                className={clsx(
                  baseClasses,
                  sizeClasses[size].dot,
                  'animate-pulse'
                )}
                style={{
                  animationDelay: '400ms',
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              />
            </>
          )
        case 'bars':
          return (
            <>
              <span 
                className={clsx(
                  baseClasses,
                  sizeClasses[size].bar,
                  'animate-bounce'
                )}
                style={{
                  animationDelay: '0ms',
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              />
              <span 
                className={clsx(
                  baseClasses,
                  sizeClasses[size].bar,
                  'animate-bounce'
                )}
                style={{
                  animationDelay: '100ms',
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              />
              <span 
                className={clsx(
                  baseClasses,
                  sizeClasses[size].bar,
                  'animate-bounce'
                )}
                style={{
                  animationDelay: '200ms',
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              />
              <span 
                className={clsx(
                  baseClasses,
                  sizeClasses[size].bar,
                  'animate-bounce'
                )}
                style={{
                  animationDelay: '300ms',
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              />
            </>
          )
        case 'square':
          return (
            <span 
              className={clsx(
                baseClasses,
                sizeClasses[size].square,
                'animate-spin border-4'
              )}
              style={{
                fontFamily: 'JetBrains Mono, monospace'
              }}
            />
          )
        case 'glitch':
          return (
            <>
              <span 
                className={clsx(
                  baseClasses,
                  sizeClasses[size].glitch,
                  'absolute animate-ping border-4'
                )}
                style={{
                  animationDelay: '0ms',
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              />
              <span 
                className={clsx(
                  'absolute border-2 bg-transparent',
                  colorClasses[color].replace('bg-', 'border-'),
                  sizeClasses[size].glitch,
                  'animate-pulse'
                )}
                style={{
                  animationDelay: '100ms',
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              />
              <span 
                className={clsx(
                  'absolute bg-black border-none scale-75',
                  sizeClasses[size].glitch,
                  'animate-ping'
                )}
                style={{
                  animationDelay: '200ms',
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              />
            </>
          )
        default:
          return null
      }
    }

    const containerClasses = clsx(
      'inline-flex items-center justify-center gap-2',
      variant === 'glitch' && 'relative',
      variant === 'bars' && sizeClasses[size].container,
      className
    )

    return (
      <div
        ref={ref}
        className={containerClasses}
        role="status"
        aria-label={label}
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 'bold'
        }}
        {...props}
      >
        {renderSpinner()}
        <span className="sr-only">{label}</span>
      </div>
    )
  }
)

Spinner.displayName = 'Spinner'