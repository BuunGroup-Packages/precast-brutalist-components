/**
 * @module Radio
 * @description A radio button component system with group management for single-selection scenarios. Features brutalist styling with customizable sizes and validation states.
 */

import React, { forwardRef, InputHTMLAttributes, createContext, useContext, useState } from 'react'
import { clsx } from 'clsx'
import styles from './Radio.module.css'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'

/**
 * Context value interface for RadioGroup
 */
interface RadioGroupContextValue {
  name: string
  value: string | undefined
  onChange: (value: string) => void
  disabled?: boolean
  error?: boolean
  size?: 'sm' | 'md' | 'lg'
  brutalistShadow?: boolean
}

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(undefined)

/**
 * Props for the RadioGroup component
 */
export interface RadioGroupProps {
  /**
   * Name attribute for the radio group (required for form handling)
   */
  name: string
  
  /**
   * Currently selected value (controlled mode)
   */
  value?: string
  
  /**
   * Default selected value (uncontrolled mode)
   */
  defaultValue?: string
  
  /**
   * Callback function called when the selection changes
   */
  onChange?: (value: string) => void
  
  /**
   * Radio buttons to render within the group
   */
  children: React.ReactNode
  
  /**
   * Layout direction for the radio buttons
   * @default 'vertical'
   */
  direction?: 'horizontal' | 'vertical'
  
  /**
   * Size variant for all radio buttons in the group
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Whether all radio buttons in the group are disabled
   * @default false
   */
  disabled?: boolean
  
  /**
   * Whether the group is in an error state
   * @default false
   */
  error?: boolean
  
  /**
   * Whether to apply brutalist shadow effect to radio buttons
   * @default true
   */
  brutalistShadow?: boolean
  
  /**
   * Additional CSS classes to apply to the group container
   */
  className?: string
  
  /**
   * Additional inline styles to apply to the group container
   */
  style?: React.CSSProperties
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value: controlledValue,
  defaultValue,
  onChange,
  children,
  direction = 'vertical',
  size = 'md',
  disabled = false,
  error = false,
  brutalistShadow = true,
  className,
  style,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(newValue)
    }
    onChange?.(newValue)
  }

  // Process group utilities
  const { className: groupClassName, style: groupStyle } = useResponsiveUtilities({
    className,
    style,
    componentClasses: clsx(
      styles.group,
      styles[direction],
      {
        [styles.disabled]: disabled,
        [styles.error]: error,
      }
    )
  })

  return (
    <RadioGroupContext.Provider 
      value={{ 
        name, 
        value, 
        onChange: handleChange, 
        disabled, 
        error,
        size,
        brutalistShadow
      }}
    >
      <div 
        className={groupClassName}
        style={groupStyle}
        role="radiogroup"
        aria-invalid={error}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

/**
 * Props for the Radio component
 */
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange'> {
  /**
   * The value of this radio button
   */
  value: string
  
  /**
   * Label text or element to display next to the radio button
   */
  label?: React.ReactNode
  
  /**
   * Size variant for this specific radio button (overrides group size)
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Whether this specific radio button is disabled (overrides group disabled)
   */
  disabled?: boolean
  
  /**
   * Whether this specific radio button is in error state (overrides group error)
   */
  error?: boolean
  
  /**
   * Whether to apply brutalist shadow effect (overrides group setting)
   */
  brutalistShadow?: boolean
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      style,
      value,
      label,
      size: propSize,
      disabled: propDisabled,
      error: propError,
      brutalistShadow: propShadow,
      id,
      ...props
    },
    ref
  ) => {
    const context = useContext(RadioGroupContext)
    
    if (!context) {
      throw new Error('Radio must be used within RadioGroup')
    }

    const { 
      name, 
      value: groupValue, 
      onChange, 
      disabled: groupDisabled, 
      error: groupError,
      size: groupSize,
      brutalistShadow: groupShadow
    } = context

    const size = propSize || groupSize || 'md'
    const disabled = propDisabled || groupDisabled
    const error = propError || groupError
    const brutalistShadow = propShadow !== undefined ? propShadow : groupShadow
    const isChecked = value === groupValue
    const radioId = id || `radio-${name}-${value}`

    const handleChange = () => {
      if (!disabled) {
        onChange(value)
      }
    }

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
          [styles.checked]: isChecked,
        }
      )
    })

    return (
      <div 
        className={containerClassName}
        style={containerStyle}
      >
        <div className={styles.radioWrapper}>
          <input
            ref={ref}
            type="radio"
            id={radioId}
            name={name}
            value={value}
            checked={isChecked}
            onChange={() => handleChange()}
            className={styles.input}
            disabled={disabled}
            aria-invalid={error}
            {...props}
          />
          <div 
            className={clsx(
              styles.radio,
              {
                [styles.withShadow]: brutalistShadow,
              }
            )}
          >
            <div className={styles.indicator} />
          </div>
        </div>
        {label && (
          <label htmlFor={radioId} className={styles.label}>
            {label}
          </label>
        )}
      </div>
    )
  }
)

Radio.displayName = 'Radio'