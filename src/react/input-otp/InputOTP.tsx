/**
 * @module InputOTP
 * @description A one-time password input component that provides an intuitive interface for entering verification codes. Features automatic focus management, paste support, and full keyboard navigation.
 */

import { forwardRef, useRef, useState, useEffect, KeyboardEvent, ClipboardEvent, CSSProperties } from 'react'
import { clsx } from 'clsx'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'
import styles from './InputOTP.module.css'

/**
 * Props for the InputOTP component
 */
export interface InputOTPProps {
  /**
   * Number of input fields to display
   * @default 6
   */
  length?: number
  
  /**
   * Current value of the OTP input (controlled)
   * @default ''
   */
  value?: string
  
  /**
   * Callback function called when the value changes
   */
  onChange?: (value: string) => void
  
  /**
   * Callback function called when all fields are filled
   */
  onComplete?: (value: string) => void
  
  /**
   * Visual variant for validation states
   * @default 'default'
   */
  variant?: 'default' | 'error' | 'success'
  
  /**
   * Size variant for the input fields
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean
  
  /**
   * Whether to automatically focus the first input on mount
   * @default false
   */
  autoFocus?: boolean
  
  /**
   * Input type - 'text' allows any characters, 'number' restricts to digits only
   * @default 'text'
   */
  type?: 'text' | 'number'
  
  /**
   * Placeholder character to show in empty fields
   * @default '•'
   */
  placeholder?: string
  
  /**
   * Additional CSS classes to apply to the container
   */
  className?: string
  
  /**
   * Custom inline styles (supports utility classes)
   */
  style?: CSSProperties
  
  /**
   * Whether to apply the brutalist shadow effect to input fields
   * @default true
   */
  brutalistShadow?: boolean
}

export const InputOTP = forwardRef<HTMLDivElement, InputOTPProps>(
  (
    {
      length = 6,
      value = '',
      onChange,
      onComplete,
      variant = 'default',
      size = 'md',
      disabled = false,
      autoFocus = false,
      type = 'text',
      placeholder = '•',
      className,
      style,
      brutalistShadow = true,
    },
    ref
  ) => {
    const [otp, setOtp] = useState<string[]>(() => {
      const arr = value.split('').slice(0, length)
      return [...arr, ...Array(length - arr.length).fill('')]
    })
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.container,
        styles[variant],
        styles[size],
        {
          [styles.brutalistShadow]: brutalistShadow,
          [styles.disabled]: disabled,
        }
      )
    })

    useEffect(() => {
      const arr = value.split('').slice(0, length)
      setOtp([...arr, ...Array(length - arr.length).fill('')])
    }, [value, length])

    const focusInput = (index: number) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index]?.focus()
        inputRefs.current[index]?.select()
      }
    }

    const handleChange = (index: number, val: string) => {
      if (type === 'number' && val && !/^\d+$/.test(val)) return

      const newOtp = [...otp]
      newOtp[index] = val.slice(-1) // Only take last character

      setOtp(newOtp)
      const otpValue = newOtp.join('')
      onChange?.(otpValue)

      // Move to next input if value entered
      if (val && index < length - 1) {
        focusInput(index + 1)
      }

      // Check if complete
      if (otpValue.length === length && !newOtp.includes('')) {
        onComplete?.(otpValue)
      }
    }

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !otp[index] && index > 0) {
        e.preventDefault()
        focusInput(index - 1)
      } else if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault()
        focusInput(index - 1)
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        e.preventDefault()
        focusInput(index + 1)
      }
    }

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pastedData = e.clipboardData.getData('text/plain').slice(0, length)
      
      if (type === 'number' && !/^\d+$/.test(pastedData)) return

      const newOtp = [...otp]
      pastedData.split('').forEach((char, i) => {
        if (i < length) {
          newOtp[i] = char
        }
      })

      setOtp(newOtp)
      const otpValue = newOtp.join('')
      onChange?.(otpValue)

      // Focus last filled input or last input
      const lastFilledIndex = newOtp.map((val, i) => val !== '' ? i : -1).filter(i => i !== -1).pop() ?? -1
      focusInput(Math.min(lastFilledIndex + 1, length - 1))

      // Check if complete
      if (otpValue.length === length && !newOtp.includes('')) {
        onComplete?.(otpValue)
      }
    }

    return (
      <div
        ref={ref}
        className={processedClassName}
        style={processedStyle}
      >
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={el => inputRefs.current[index] = el}
            type="text"
            inputMode={type === 'number' ? 'numeric' : 'text'}
            pattern={type === 'number' ? '\\d*' : undefined}
            maxLength={1}
            value={otp[index]}
            onChange={e => handleChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            onFocus={e => e.target.select()}
            placeholder={placeholder}
            disabled={disabled}
            autoFocus={autoFocus && index === 0}
            className={clsx(
              styles.input,
              styles[variant],
              styles[size],
              {
                [styles.filled]: otp[index],
                [styles.disabled]: disabled,
                [styles.withShadow]: brutalistShadow && !disabled,
              }
            )}
          />
        ))}
      </div>
    )
  }
)

InputOTP.displayName = 'InputOTP'