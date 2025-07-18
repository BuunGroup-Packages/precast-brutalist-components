import React, { forwardRef, InputHTMLAttributes, useRef, useEffect } from 'react'

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
      className = '',
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

    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5', 
      lg: 'w-6 h-6'
    }

    const labelSizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    }

    const containerClasses = `
      inline-flex items-center gap-3 relative select-none
      ${disabled ? 'cursor-not-allowed opacity-50' : ''}
      ${className}
    `

    const checkboxClasses = `
      flex items-center justify-center
      bg-white border-[3px] border-solid rounded-none
      cursor-pointer transition-all duration-150 ease-in-out
      relative overflow-hidden
      ${sizeClasses[size]}
      ${brutalistShadow ? 'shadow-[4px_4px_0px_black]' : ''}
      ${error ? 'border-red-500' : 'border-black'}
      ${disabled ? 'cursor-not-allowed bg-gray-300' : ''}
      hover:bg-gray-100 hover:-translate-x-0.5 hover:-translate-y-0.5
      ${brutalistShadow ? 'hover:shadow-[6px_6px_0px_black]' : ''}
      ${error && brutalistShadow ? 'hover:shadow-[6px_6px_0px_red-500]' : ''}
      active:translate-x-0.5 active:translate-y-0.5
      ${brutalistShadow ? 'active:shadow-[2px_2px_0px_black]' : ''}
      ${error && brutalistShadow ? 'active:shadow-[2px_2px_0px_red-500]' : ''}
      focus-within:outline focus-within:outline-2 focus-within:outline-red-500 focus-within:outline-offset-2
      ${disabled ? 'hover:bg-gray-300 hover:translate-x-0 hover:translate-y-0 hover:shadow-[4px_4px_0px_black]' : ''}
    `

    const inputClasses = `
      absolute opacity-0 w-full h-full cursor-pointer z-10
      ${disabled ? 'cursor-not-allowed' : ''}
    `

    const checkmarkClasses = `
      w-full h-full opacity-0 transform scale-75 transition-all duration-150 ease-in-out
      ${error ? 'text-red-500' : 'text-black'}
      ${indeterminate ? 'opacity-0' : ''}
    `

    const indeterminateLineClasses = `
      absolute h-[3px] w-[60%] transition-opacity duration-150 ease-in-out
      ${indeterminate ? 'opacity-100' : 'opacity-0'}
      ${error ? 'bg-red-500' : 'bg-black'}
    `

    const labelClasses = `
      font-medium text-black cursor-pointer transition-colors duration-150 ease-in-out
      ${labelSizeClasses[size]}
      ${disabled ? 'cursor-not-allowed text-gray-500' : 'hover:text-gray-700'}
    `

    return (
      <div className={containerClasses}>
        <div className="relative inline-block leading-[0]">
          <input
            ref={checkboxRef as React.Ref<HTMLInputElement>}
            type="checkbox"
            id={checkboxId}
            className={`${inputClasses} checked:~[&+div>svg]:opacity-100 checked:~[&+div>svg]:scale-100`}
            disabled={disabled}
            aria-invalid={error}
            {...props}
          />
          <div className={checkboxClasses}>
            <svg 
              className={checkmarkClasses}
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
            <div className={indeterminateLineClasses} />
          </div>
        </div>
        {label && (
          <label 
            htmlFor={checkboxId} 
            className={labelClasses}
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
            }}
          >
            {label}
          </label>
        )}
        
        <style>
          {`
            input:checked + div svg {
              opacity: 1;
              transform: scale(1);
            }
          `}
        </style>
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'