/**
 * @module Input
 * @description A flexible input component with support for different types, sizes, and validation states. Follows accessibility best practices with full keyboard support and ARIA compliance.
 */

import React, { forwardRef, InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './Input.module.css'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'

/**
 * Props for the Input component
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The validation state variant of the input
   * @default 'default'
   */
  variant?: 'default' | 'error' | 'success'
  
  /**
   * The size of the input field
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Icon to display on the left side of the input
   */
  leftIcon?: React.ReactNode
  
  /**
   * Icon to display on the right side of the input
   */
  rightIcon?: React.ReactNode
  
  /**
   * Whether the input should take full width of its container
   * @default false
   */
  fullWidth?: boolean
  
  /**
   * Whether to apply the brutalist shadow effect
   * @default true
   */
  brutalistShadow?: boolean
}

/**
 * A flexible input component that supports various input types, validation states, and icons.
 * Provides a consistent brutalist design with customizable sizing and styling options.
 * 
 * @example
 * ```tsx
 * <Input
 *   type="email"
 *   placeholder="Enter your email"
 *   variant="default"
 *   size="md"
 *   leftIcon={<MailIcon />}
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      style,
      variant = 'default',
      size = 'md',
      leftIcon,
      rightIcon,
      fullWidth = false,
      brutalistShadow = true,
      disabled,
      readOnly,
      type = 'text',
      ...props
    },
    ref
  ) => {
    // Process input utilities
    const { className: inputClassName, style: inputStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.input,
        styles[variant],
        styles[size],
        {
          [styles.withLeftIcon]: leftIcon,
          [styles.withRightIcon]: rightIcon,
          [styles.disabled]: disabled,
          [styles.readOnly]: readOnly,
          [styles.withShadow]: brutalistShadow && !disabled && !readOnly,
        }
      )
    })

    // Process wrapper utilities (will only be used if icons are present)
    const { className: wrapperClassName, style: wrapperStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.inputWrapper,
        styles[variant],
        styles[size],
        {
          [styles.fullWidth]: fullWidth,
          [styles.disabled]: disabled,
          [styles.readOnly]: readOnly,
          [styles.withShadow]: brutalistShadow && !disabled && !readOnly,
        }
      )
    })

    const inputElement = (
      <input
        ref={ref}
        type={type}
        className={inputClassName}
        style={inputStyle}
        disabled={disabled}
        readOnly={readOnly}
        {...props}
      />
    )

    if (leftIcon || rightIcon) {
      return (
        <div
          className={wrapperClassName}
          style={wrapperStyle}
        >
          {leftIcon && (
            <span className={clsx(styles.icon, styles.leftIcon)}>{leftIcon}</span>
          )}
          {inputElement}
          {rightIcon && (
            <span className={clsx(styles.icon, styles.rightIcon)}>{rightIcon}</span>
          )}
        </div>
      )
    }

    return inputElement
  }
)

Input.displayName = 'Input'