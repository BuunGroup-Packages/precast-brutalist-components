import React, { forwardRef, InputHTMLAttributes, createContext, useContext, useState } from 'react'
import { clsx } from 'clsx'
import styles from './Radio.module.css'

// RadioGroup Context
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

// RadioGroup Component
export interface RadioGroupProps {
  name: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  children: React.ReactNode
  direction?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  error?: boolean
  brutalistShadow?: boolean
  className?: string
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
        className={clsx(
          styles.group,
          styles[direction],
          {
            [styles.disabled]: disabled,
            [styles.error]: error,
          },
          className
        )}
        role="radiogroup"
        aria-invalid={error}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

// Radio Component
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange'> {
  value: string
  label?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  error?: boolean
  brutalistShadow?: boolean
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
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

    return (
      <div 
        className={clsx(
          styles.container,
          styles[size],
          {
            [styles.disabled]: disabled,
            [styles.error]: error,
            [styles.checked]: isChecked,
          },
          className
        )}
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