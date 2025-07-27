/**
 * @module Button
 * @description A versatile button component that supports multiple variants, sizes, and states. Built with accessibility in mind and follows WAI-ARIA guidelines.
 */

import React, { forwardRef, ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './Button.module.css'
import { useUtilityStyles } from '../hooks/useUtilityClasses'

/**
 * Props for the Button component
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style variant of the button
   * @default 'default'
   */
  variant?: 'default' | 'destructive' | 'outline' | 'ghost' | 'brutal' | 'primary' | 'secondary' | 'danger'
  
  /**
   * The size of the button
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  
  /**
   * Whether the button should take full width of its container
   * @default false
   */
  fullWidth?: boolean
  
  /**
   * Shows a loading spinner and disables the button
   * @default false
   */
  loading?: boolean
  
  /**
   * Icon to display on the left side of the button content
   */
  leftIcon?: React.ReactNode
  
  /**
   * Icon to display on the right side of the button content
   */
  rightIcon?: React.ReactNode
  
  /**
   * Whether to apply the brutalist shadow effect
   * @default true
   */
  brutalistShadow?: boolean
  
  /**
   * Applies a glitch animation effect to the button
   * @default false
   */
  glitch?: boolean
}

/**
 * A versatile button component that supports multiple variants, sizes, and states.
 * Built with accessibility in mind and follows WAI-ARIA guidelines.
 * 
 * @example
 * ```tsx
 * <Button variant="brutal" size="lg" leftIcon={<FaRocket />}>
 *   Launch App
 * </Button>
 * ```
 */
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
      style,
      ...props
    },
    ref
  ) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useUtilityStyles(
      className,
      style,
      clsx(
        styles.button,
        styles[variant],
        styles[size],
        {
          [styles.fullWidth]: fullWidth,
          [styles.loading]: loading,
          [styles.withShadow]: brutalistShadow,
          [styles.glitch]: glitch,
          [styles.disabled]: disabled || loading,
        }
      )
    )

    return (
      <button
        ref={ref}
        className={processedClassName}
        style={processedStyle}
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