import React, { forwardRef, ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './Button.module.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost' | 'brutal' | 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  brutalistShadow?: boolean
  glitch?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'default',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      brutalistShadow = true,
      glitch = false,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          styles.button,
          styles[variant],
          styles[size],
          {
            [styles.fullWidth]: fullWidth,
            [styles.loading]: loading,
            [styles.withShadow]: brutalistShadow,
            [styles.glitch]: glitch,
            [styles.disabled]: disabled || loading,
          },
          className
        )}
        disabled={disabled || loading}
        data-text={glitch ? children : undefined}
        {...props}
      >
        {loading && <span className={styles.loader} />}
        {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
        <span className={styles.content}>{children}</span>
        {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'