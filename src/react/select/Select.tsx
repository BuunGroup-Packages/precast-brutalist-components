/**
 * @module Select
 * @description A customizable select dropdown component with support for single selection, search, and keyboard navigation.
 */

import React, { forwardRef, SelectHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import { CustomSelect } from './CustomSelect'
import styles from './Select.module.css'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectOptionGroup {
  label: string
  options: SelectOption[]
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  variant?: 'default' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
  options?: (SelectOption | SelectOptionGroup)[]
  placeholder?: string
  fullWidth?: boolean
  brutalistShadow?: boolean
  customArrow?: boolean
  useCustomDropdown?: boolean
  onValueChange?: (value: string) => void
}

function isOptionGroup(option: SelectOption | SelectOptionGroup): option is SelectOptionGroup {
  return 'options' in option
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      style,
      variant = 'default',
      size = 'md',
      options = [],
      placeholder,
      fullWidth = false,
      brutalistShadow = true,
      customArrow = true,
      useCustomDropdown = true,
      onValueChange,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Process select utilities
    const { className: selectClassName, style: selectStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.select,
        styles[variant],
        styles[size],
        {
          [styles.disabled]: disabled,
          [styles.withShadow]: brutalistShadow && !disabled,
          [styles.fullWidth]: fullWidth,
          [styles.hasPlaceholder]: placeholder && !props.value && !props.defaultValue,
        }
      )
    })

    // Process wrapper utilities
    const { className: wrapperClassName, style: wrapperStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.selectWrapper,
        styles[variant],
        styles[size],
        {
          [styles.fullWidth]: fullWidth,
          [styles.disabled]: disabled,
          [styles.withShadow]: brutalistShadow && !disabled,
        }
      )
    })

    // Use custom dropdown by default for better styling
    if (useCustomDropdown) {
      // Convert JSX children to options array if options prop is empty
      let processedOptions = options
      
      if (options.length === 0 && children) {
        processedOptions = []
        React.Children.forEach(children, (child) => {
          if (React.isValidElement(child)) {
            if (child.type === 'option') {
              const value = child.props.value || ''
              const label = child.props.children || ''
              if (value && label) {
                processedOptions.push({
                  value: value,
                  label: label,
                  disabled: child.props.disabled
                })
              }
            } else if (child.type === 'optgroup') {
              const groupLabel = child.props.label || ''
              const groupOptions: SelectOption[] = []
              
              React.Children.forEach(child.props.children, (optionChild) => {
                if (React.isValidElement(optionChild) && optionChild.type === 'option') {
                  const props = optionChild.props as React.OptionHTMLAttributes<HTMLOptionElement>
                  const value = props.value || ''
                  const label = props.children || ''
                  if (value && label) {
                    groupOptions.push({
                      value: String(value),
                      label: String(label),
                      disabled: props.disabled
                    })
                  }
                }
              })
              
              if (groupOptions.length > 0) {
                processedOptions.push({
                  label: groupLabel,
                  options: groupOptions
                })
              }
            }
          }
        })
      }
      
      return (
        <CustomSelect
          variant={variant}
          size={size}
          options={processedOptions}
          placeholder={placeholder}
          fullWidth={fullWidth}
          brutalistShadow={brutalistShadow}
          disabled={disabled}
          value={props.value as string}
          defaultValue={props.defaultValue as string}
          onChange={onValueChange || ((value) => {
            // Create a synthetic event for compatibility
            const syntheticEvent = {
              target: { value },
              currentTarget: { value }
            } as React.ChangeEvent<HTMLSelectElement>
            props.onChange?.(syntheticEvent)
          })}
          onBlur={props.onBlur ? () => props.onBlur?.({} as React.FocusEvent<HTMLSelectElement>) : undefined}
          onFocus={props.onFocus ? () => props.onFocus?.({} as React.FocusEvent<HTMLSelectElement>) : undefined}
          className={className}
          style={style}
          name={props.name}
          id={props.id}
        />
      )
    }

    const selectElement = (
      <select
        ref={ref}
        className={selectClassName}
        style={selectStyle}
        disabled={disabled}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {children
          ? children
          : options.map((option, index) => {
              if (isOptionGroup(option)) {
                return (
                  <optgroup key={`group-${index}`} label={option.label}>
                    {option.options.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        disabled={opt.disabled}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </optgroup>
                )
              } else {
                return (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                )
              }
            })}
      </select>
    )

    if (customArrow) {
      return (
        <div
          className={wrapperClassName}
          style={wrapperStyle}
        >
          {selectElement}
          <div className={styles.arrow}>
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
        </div>
      )
    }

    return selectElement
  }
)

Select.displayName = 'Select'