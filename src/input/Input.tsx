import React, { forwardRef, InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './Input.module.css'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  brutalistShadow?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
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
    const inputElement = (
      <input
        ref={ref}
        type={type}
        className={clsx(
          styles.input,
          styles[variant],
          styles[size],
          {
            [styles.withLeftIcon]: leftIcon,
            [styles.withRightIcon]: rightIcon,
            [styles.disabled]: disabled,
            [styles.readOnly]: readOnly,
            [styles.withShadow]: brutalistShadow && !disabled && !readOnly,
          },
          className
        )}
        disabled={disabled}
        readOnly={readOnly}
        {...props}
      />
    )

    if (leftIcon || rightIcon) {
      return (
        <div
          className={clsx(
            styles.inputWrapper,
            styles[variant],
            styles[size],
            {
              [styles.fullWidth]: fullWidth,
              [styles.disabled]: disabled,
              [styles.readOnly]: readOnly,
              [styles.withShadow]: brutalistShadow && !disabled && !readOnly,
            }
          )}
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