import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { clsx } from 'clsx'
import styles from './CustomSelect.module.css'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectOptionGroup {
  label: string
  options: SelectOption[]
}

export interface CustomSelectProps {
  variant?: 'default' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
  options?: (SelectOption | SelectOptionGroup)[]
  placeholder?: string
  fullWidth?: boolean
  brutalistShadow?: boolean
  disabled?: boolean
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
  className?: string
  style?: React.CSSProperties
  name?: string
  id?: string
}

function isOptionGroup(option: SelectOption | SelectOptionGroup): option is SelectOptionGroup {
  return 'options' in option
}

export const CustomSelect = forwardRef<HTMLDivElement, CustomSelectProps>(
  (
    {
      className,
      style,
      variant = 'default',
      size = 'md',
      options = [],
      placeholder = 'Select an option...',
      fullWidth = false,
      brutalistShadow = true,
      disabled = false,
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      name,
      id,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(value || defaultValue || '')
    const [focusedIndex, setFocusedIndex] = useState(-1)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)

    useImperativeHandle(ref, () => dropdownRef.current!, [])

    // Flatten options for keyboard navigation
    const flatOptions: SelectOption[] = []
    options.forEach(option => {
      if (isOptionGroup(option)) {
        flatOptions.push(...option.options.filter(opt => !opt.disabled))
      } else if (!option.disabled) {
        flatOptions.push(option)
      }
    })

    // Update selectedValue when value prop changes
    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value)
      }
    }, [value])

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false)
          setFocusedIndex(-1)
        }
      }

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [isOpen])

    const handleToggle = () => {
      if (disabled) return
      
      setIsOpen(!isOpen)
      setFocusedIndex(-1)
      
      if (!isOpen) {
        onFocus?.()
      } else {
        onBlur?.()
      }
    }

    const handleOptionSelect = (optionValue: string) => {
      setSelectedValue(optionValue)
      setIsOpen(false)
      setFocusedIndex(-1)
      onChange?.(optionValue)
      onBlur?.()
      triggerRef.current?.focus()
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (disabled) return

      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault()
          if (isOpen && focusedIndex >= 0) {
            handleOptionSelect(flatOptions[focusedIndex].value)
          } else {
            setIsOpen(!isOpen)
          }
          break
        case 'Escape':
          setIsOpen(false)
          setFocusedIndex(-1)
          triggerRef.current?.focus()
          break
        case 'ArrowDown':
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
            setFocusedIndex(0)
          } else {
            setFocusedIndex(prev => 
              prev < flatOptions.length - 1 ? prev + 1 : prev
            )
          }
          break
        case 'ArrowUp':
          event.preventDefault()
          if (isOpen) {
            setFocusedIndex(prev => prev > 0 ? prev - 1 : prev)
          }
          break
      }
    }

    // Find selected option label
    const selectedOption = flatOptions.find(opt => opt.value === selectedValue)
    const displayValue = selectedOption?.label || placeholder

    return (
      <div
        ref={dropdownRef}
        className={clsx(
          styles.selectWrapper,
          styles[variant],
          styles[size],
          {
            [styles.fullWidth]: fullWidth,
            [styles.disabled]: disabled,
            [styles.withShadow]: brutalistShadow && !disabled,
            [styles.isOpen]: isOpen,
          },
          className
        )}
        style={style}
      >
        {/* Hidden input for form submission */}
        <input
          type="hidden"
          name={name}
          value={selectedValue}
        />
        
        {/* Trigger button */}
        <button
          ref={triggerRef}
          type="button"
          className={styles.trigger}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={id}
          id={id}
        >
          <span className={clsx(styles.value, { [styles.placeholder]: !selectedOption })}>
            {displayValue}
          </span>
          <div className={styles.arrow}>
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={clsx({ [styles.arrowOpen]: isOpen })}
            >
              <path
                d="M1 1L6 6L11 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
          </div>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className={styles.dropdown} role="listbox">
            {options.map((option, groupIndex) => {
              if (isOptionGroup(option)) {
                return (
                  <div key={`group-${groupIndex}`} className={styles.optionGroup}>
                    <div className={styles.groupLabel}>{option.label}</div>
                    {option.options.map((opt) => {
                      const flatIndex = flatOptions.findIndex(fo => fo.value === opt.value)
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          className={clsx(
                            styles.option,
                            {
                              [styles.selected]: opt.value === selectedValue,
                              [styles.focused]: flatIndex === focusedIndex,
                              [styles.disabled]: opt.disabled,
                            }
                          )}
                          onClick={() => !opt.disabled && handleOptionSelect(opt.value)}
                          disabled={opt.disabled}
                          role="option"
                          aria-selected={opt.value === selectedValue}
                        >
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                )
              } else {
                const flatIndex = flatOptions.findIndex(fo => fo.value === option.value)
                return (
                  <button
                    key={option.value}
                    type="button"
                    className={clsx(
                      styles.option,
                      {
                        [styles.selected]: option.value === selectedValue,
                        [styles.focused]: flatIndex === focusedIndex,
                        [styles.disabled]: option.disabled,
                      }
                    )}
                    onClick={() => !option.disabled && handleOptionSelect(option.value)}
                    disabled={option.disabled}
                    role="option"
                    aria-selected={option.value === selectedValue}
                  >
                    {option.label}
                  </button>
                )
              }
            })}
          </div>
        )}
      </div>
    )
  }
)

CustomSelect.displayName = 'CustomSelect'