/**
 * @module Checkbox
 * @description A customizable checkbox component with indeterminate state support and keyboard accessibility.
 */

import React, { forwardRef, InputHTMLAttributes, useRef, useEffect } from 'react'
import { clsx } from 'clsx'
import styles from './Checkbox.module.css'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  size?: 'sm' | 'md' | 'lg'
  label?: React.ReactNode
  indeterminate?: boolean
  error?: boolean
  brutalistShadow?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      style,
      size = 'md',
      label,
      indeterminate = false,
      error = false,
      brutalistShadow = true,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLInputElement>(null)
    const checkboxRef = ref || internalRef

    // Handle indeterminate state
    useEffect(() => {
      const checkbox = typeof checkboxRef === 'function' ? null : checkboxRef.current
      if (checkbox) {
        checkbox.indeterminate = indeterminate
      }
    }, [indeterminate, checkboxRef])

    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

    // Process container utilities
    const { className: containerClassName, style: containerStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.container,
        styles[size],
        {
          [styles.disabled]: disabled,
          [styles.error]: error,
        }
      )
    })

    return (
      <div 
        className={containerClassName}
        style={containerStyle}
      >
        <div className={styles.checkboxWrapper}>
          <input
            ref={checkboxRef as React.Ref<HTMLInputElement>}
            type="checkbox"
            id={checkboxId}
            className={styles.input}
            disabled={disabled}
            aria-invalid={error}
            {...props}
          />
          <div 
            className={clsx(
              styles.checkbox,
              {
                [styles.withShadow]: brutalistShadow,
                [styles.indeterminate]: indeterminate,
              }
            )}
          >
            <svg 
              className={styles.checkmark} 
              viewBox="0 0 24 24" 
              fill="none"
              aria-hidden="true"
            >
              <path 
                d="M5 13L9 17L19 7" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="square" 
                strokeLinejoin="miter"
              />
            </svg>
            <div className={styles.indeterminateLine} />
          </div>
        </div>
        {label && (
          <label htmlFor={checkboxId} className={styles.label}>
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'