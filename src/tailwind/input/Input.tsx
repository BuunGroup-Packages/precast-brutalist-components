import React, { forwardRef, InputHTMLAttributes } from 'react'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  brutalistShadow?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      variant = 'default',
      size = 'md',
      leftIcon,
      rightIcon,
      fullWidth = false,
      brutalistShadow = true,
      disabled,
      readOnly,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const baseClasses = `
      border-[3px] border-solid border-black
      bg-white text-black placeholder-gray-500
      transition-all duration-150 ease-in-out
      focus:outline-none focus:border-black
      hover:border-gray-700
      disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-100
      read-only:cursor-default read-only:bg-gray-100
      w-full block
      rounded-none
    `

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm leading-tight',
      md: 'px-4 py-3 text-base leading-normal',
      lg: 'px-5 py-4 text-lg leading-normal'
    }

    const variantClasses = {
      default: 'border-black focus:border-black',
      error: 'border-red-500 focus:border-red-500 bg-red-50',
      success: 'border-green-500 focus:border-green-500 bg-green-50'
    }

    const shadowClasses = brutalistShadow && !disabled && !readOnly
      ? 'shadow-[4px_4px_0px_black] focus:shadow-[6px_6px_0px_black] focus:-translate-x-0.5 focus:-translate-y-0.5'
      : ''

    const widthClasses = fullWidth ? 'w-full' : ''

    const iconPadding = {
      left: leftIcon ? 'pl-12' : '',
      right: rightIcon ? 'pr-12' : ''
    }

    if (leftIcon || rightIcon) {
      return (
        <div className={`relative ${fullWidth ? 'w-full' : 'inline-block'}`}>
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={`
              ${baseClasses}
              ${sizeClasses[size]}
              ${variantClasses[variant]}
              ${shadowClasses}
              ${widthClasses}
              ${iconPadding.left}
              ${iconPadding.right}
              ${className}
            `.replace(/\s+/g, ' ').trim()}
            style={{
              fontFamily: "'JetBrains Mono', 'Courier New', monospace",
              fontWeight: 500,
              ...props.style
            }}
            disabled={disabled}
            readOnly={readOnly}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
      )
    }

    return (
      <input
        ref={ref}
        type={type}
        className={`
          ${baseClasses}
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${shadowClasses}
          ${widthClasses}
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        style={{
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontWeight: 500,
          ...props.style
        }}
        disabled={disabled}
        readOnly={readOnly}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'