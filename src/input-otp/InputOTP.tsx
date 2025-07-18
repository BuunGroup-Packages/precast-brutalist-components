import React, { forwardRef, useRef, useState, useEffect, KeyboardEvent, ClipboardEvent } from 'react'
import { clsx } from 'clsx'
import styles from './InputOTP.module.css'

export interface InputOTPProps {
  length?: number
  value?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  variant?: 'default' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  autoFocus?: boolean
  type?: 'text' | 'number'
  placeholder?: string
  className?: string
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
      brutalistShadow = true,
    },
    ref
  ) => {
    const [otp, setOtp] = useState<string[]>(() => {
      const arr = value.split('').slice(0, length)
      return [...arr, ...Array(length - arr.length).fill('')]
    })
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

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
      const lastFilledIndex = newOtp.findLastIndex(val => val !== '')
      focusInput(Math.min(lastFilledIndex + 1, length - 1))

      // Check if complete
      if (otpValue.length === length && !newOtp.includes('')) {
        onComplete?.(otpValue)
      }
    }

    return (
      <div
        ref={ref}
        className={clsx(
          styles.container,
          styles[size],
          className
        )}
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