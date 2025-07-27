/**
 * @module Textarea
 * @description An enhanced textarea component with auto-resize capabilities and character counting. Supports all native textarea attributes.
 */

import React, { forwardRef, TextareaHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react'
import { clsx } from 'clsx'
import styles from './Textarea.module.css'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  variant?: 'default' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
  autoResize?: boolean
  showCharacterCount?: boolean
  maxCharacters?: number
  minRows?: number
  maxRows?: number
  fullWidth?: boolean
  brutalistShadow?: boolean
  width?: string | number
  minWidth?: string | number
  maxWidth?: string | number
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      style,
      variant = 'default',
      size = 'md',
      autoResize = false,
      showCharacterCount = false,
      maxCharacters,
      minRows = 3,
      maxRows = 10,
      fullWidth = false,
      brutalistShadow = true,
      width,
      minWidth,
      maxWidth,
      disabled,
      readOnly,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue || '')
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    // Determine controlled vs uncontrolled
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue
    const charCount = String(currentValue).length

    // Handle ref forwarding
    const setRefs = useCallback(
      (element: HTMLTextAreaElement | null) => {
        textareaRef.current = element
        if (ref) {
          if (typeof ref === 'function') {
            ref(element)
          } else {
            ref.current = element
          }
        }
      },
      [ref]
    )

    // Auto-resize functionality
    const adjustHeight = useCallback(() => {
      const textarea = textareaRef.current
      if (!textarea || !autoResize) return

      // Reset to auto to get natural scroll height
      textarea.style.height = 'auto'
      const scrollHeight = textarea.scrollHeight

      // Set minimum height based on minRows  
      const minHeight = `${minRows * 1.5}rem` // Simple rem-based calculation
      const maxHeight = `${maxRows * 1.5}rem`

      if (scrollHeight <= parseInt(minHeight) * 16) {
        textarea.style.height = minHeight
        textarea.style.overflowY = 'hidden'
      } else if (scrollHeight >= parseInt(maxHeight) * 16) {
        textarea.style.height = maxHeight
        textarea.style.overflowY = 'auto'
      } else {
        textarea.style.height = `${scrollHeight}px`
        textarea.style.overflowY = 'hidden'
      }
    }, [autoResize, minRows, maxRows])

    // Adjust height on mount and when value changes
    useEffect(() => {
      adjustHeight()
    }, [currentValue, adjustHeight])

    // Adjust height on window resize
    useEffect(() => {
      if (!autoResize) return

      const handleResize = () => adjustHeight()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [autoResize, adjustHeight])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value

      // Enforce max characters if specified
      if (maxCharacters && newValue.length > maxCharacters) {
        return
      }

      if (!isControlled) {
        setInternalValue(newValue)
      }

      onChange?.(e)
      
      // Trigger resize on change for better responsiveness
      if (autoResize) {
        setTimeout(() => adjustHeight(), 0)
      }
    }

    const isOverLimit = maxCharacters ? charCount > maxCharacters : false

    // Convert width values to CSS strings
    const getWidthValue = (value: string | number | undefined) => {
      if (value === undefined) return undefined
      return typeof value === 'number' ? `${value}px` : value
    }

    const wrapperStyle: React.CSSProperties = {
      // Don't set width if fullWidth is true, let CSS class handle it
      width: fullWidth ? undefined : getWidthValue(width),
      minWidth: getWidthValue(minWidth),
      maxWidth: getWidthValue(maxWidth),
    }

    // Process wrapper utilities
    const { className: wrapperClassName, style: wrapperStyleProcessed } = useResponsiveUtilities({
      className: '',
      style: { ...wrapperStyle, ...style },
      componentClasses: clsx(
        styles.wrapper,
        {
          [styles.fullWidth]: fullWidth,
        }
      )
    })

    // Process textarea utilities
    const { className: textareaClassName, style: textareaStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.textarea,
        styles[variant],
        styles[size],
        {
          [styles.disabled]: disabled,
          [styles.readOnly]: readOnly,
          [styles.withShadow]: brutalistShadow && !disabled && !readOnly,
          [styles.autoResize]: autoResize,
          [styles.overLimit]: isOverLimit,
        }
      )
    })

    return (
      <div
        className={wrapperClassName}
        style={wrapperStyleProcessed}
      >
        <textarea
          ref={setRefs}
          className={textareaClassName}
          style={textareaStyle}
          disabled={disabled}
          readOnly={readOnly}
          value={currentValue}
          onChange={handleChange}
          rows={!autoResize ? minRows : undefined}
          {...props}
        />
        {showCharacterCount && (
          <div
            className={clsx(
              styles.characterCount,
              {
                [styles.error]: isOverLimit || variant === 'error',
                [styles.success]: variant === 'success',
              }
            )}
          >
            <span className={styles.count}>
              {charCount}
              {maxCharacters && ` / ${maxCharacters}`}
            </span>
          </div>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'