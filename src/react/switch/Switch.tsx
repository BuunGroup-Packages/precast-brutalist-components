/**
 * @module Switch
 * @description A toggle switch component for binary choices. Provides clear on/off states with smooth animations.
 */

import React, { forwardRef, InputHTMLAttributes, useState, useCallback } from 'react'
import { clsx } from 'clsx'
import styles from './Switch.module.css'

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  size?: 'sm' | 'md' | 'lg'
  label?: React.ReactNode
  labelPosition?: 'left' | 'right'
  loading?: boolean
  brutalistShadow?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      size = 'md',
      label,
      labelPosition = 'right',
      loading = false,
      brutalistShadow = true,
      disabled,
      checked: controlledChecked,
      defaultChecked,
      onChange,
      onCheckedChange,
      id,
      ...props
    },
    ref
  ) => {
    // Handle controlled/uncontrolled state
    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false)
    const isControlled = controlledChecked !== undefined
    const isChecked = isControlled ? controlledChecked : internalChecked

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked
      
      // Update internal state for uncontrolled mode
      if (!isControlled) {
        setInternalChecked(newChecked)
      }
      
      // Call event handlers
      onChange?.(event)
      onCheckedChange?.(newChecked)
    }, [isControlled, onChange, onCheckedChange])

    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`
    const isDisabled = disabled || loading

    const switchElement = (
      <div className={styles.switchWrapper}>
        <input
          ref={ref}
          type="checkbox"
          id={switchId}
          className={styles.input}
          disabled={isDisabled}
          checked={isChecked}
          onChange={handleChange}
          {...props}
        />
        <div 
          className={clsx(
            styles.switch,
            {
              [styles.withShadow]: brutalistShadow,
              [styles.checked]: isChecked,
              [styles.loading]: loading,
            }
          )}
        >
          <div className={styles.thumb}>
            {loading && (
              <div className={styles.loadingIndicator} />
            )}
          </div>
        </div>
      </div>
    )

    const labelElement = label && (
      <label htmlFor={switchId} className={styles.label}>
        {label}
      </label>
    )

    return (
      <div 
        className={clsx(
          styles.container,
          styles[size],
          {
            [styles.disabled]: isDisabled,
            [styles.labelLeft]: labelPosition === 'left',
          },
          className
        )}
      >
        {labelPosition === 'left' && labelElement}
        {switchElement}
        {labelPosition === 'right' && labelElement}
      </div>
    )
  }
)

Switch.displayName = 'Switch'