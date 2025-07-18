import { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './Spinner.module.css'

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
    const renderSpinner = () => {
      switch (variant) {
        case 'dots':
          return (
            <>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </>
          )
        case 'bars':
          return (
            <>
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
            </>
          )
        case 'square':
          return <span className={styles.square} />
        case 'glitch':
          return (
            <>
              <span className={styles.glitchSquare} />
              <span className={styles.glitchSquare} />
              <span className={styles.glitchSquare} />
            </>
          )
        default:
          return null
      }
    }

    return (
      <div
        ref={ref}
        className={clsx(
          styles.spinner,
          styles[size],
          styles[color],
          styles[variant],
          styles[`speed-${speed}`],
          className
        )}
        role="status"
        aria-label={label}
        {...props}
      >
        {renderSpinner()}
        <span className={styles.srOnly}>{label}</span>
      </div>
    )
  }
)

Spinner.displayName = 'Spinner'