import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'brutal' | 'destructive' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  loading?: boolean
  brutalistShadow?: boolean
  glitch?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  fullWidth = false,
  loading = false,
  brutalistShadow = true,
  glitch = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = `
    relative inline-flex items-center justify-center gap-[0.5rem]
    font-bold uppercase tracking-wider
    border-[3px] border-solid border-black
    cursor-pointer transition-all duration-[150ms] ease-in-out
    select-none whitespace-nowrap outline-none
    focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-red-500 focus-visible:outline-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    rounded-none
  `

  const sizeClasses = {
    sm: 'py-[0.5rem] px-[1rem] text-xs',      // --brutal-space-2 (0.5rem) --brutal-space-4 (1rem)
    md: 'py-[0.75rem] px-[1.5rem] text-sm',   // --brutal-space-3 (0.75rem) --brutal-space-6 (1.5rem) 
    lg: 'py-[1rem] px-[2rem] text-base',      // --brutal-space-4 (1rem) --brutal-space-8 (2rem)
    xl: 'py-[1.5rem] px-[2.5rem] text-lg'     // --brutal-space-6 (1.5rem) --brutal-space-10 (2.5rem)
  }

  const variantClasses = {
    default: `
      bg-white text-black
      hover:bg-[#f5f5f5]
      disabled:hover:bg-white
    `,
    brutal: `
      bg-black text-white
      hover:bg-[#171717]
      disabled:hover:bg-black
    `,
    destructive: `
      bg-[#ff0000] text-white border-[#cc0000]
      hover:bg-[#cc0000]
      disabled:hover:bg-[#ff0000]
    `,
    outline: `
      bg-transparent text-black
      hover:bg-black hover:text-white
      disabled:hover:bg-transparent disabled:hover:text-black
    `,
    ghost: `
      bg-transparent text-black border-transparent
      hover:bg-[#f5f5f5] hover:border-black
      disabled:hover:bg-transparent disabled:hover:border-transparent
    `
  }

  const shadowClasses = brutalistShadow && !disabled ? `
    shadow-[8px_8px_0px_black]
    hover:shadow-[12px_12px_0px_black] hover:-translate-x-[4px] hover:-translate-y-[4px]
    active:shadow-[4px_4px_0px_black] active:translate-x-0 active:translate-y-0
  ` : brutalistShadow && disabled ? 'shadow-[8px_8px_0px_black]' : ''

  const glitchClasses = glitch ? 'before:content-[attr(data-text)] after:content-[attr(data-text)] before:absolute after:absolute before:top-0 after:top-0 before:left-0 after:left-0 before:w-full after:w-full before:h-full after:h-full before:flex after:flex before:items-center after:items-center before:justify-center after:justify-center before:px-inherit after:px-inherit before:py-inherit after:py-inherit before:animate-[glitch-1_0.5s_infinite] after:animate-[glitch-2_0.5s_infinite] before:text-red-500 after:text-blue-600 before:-z-10 after:-z-20 before:opacity-80 after:opacity-80 hover:before:animate-[glitch-1_0.2s_infinite] hover:after:animate-[glitch-2_0.2s_infinite]' : ''

  const widthClasses = fullWidth ? 'w-full' : ''
  const loadingClasses = loading ? 'text-transparent' : ''

  const combinedClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${shadowClasses}
    ${glitchClasses}
    ${widthClasses}
    ${loadingClasses}
    ${className}
  `.replace(/\s+/g, ' ').trim()

  return (
    <button
      className={combinedClasses}
      style={{
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        letterSpacing: '0.05em',
        ...props.style
      }}
      disabled={disabled || loading}
      data-text={glitch ? children : undefined}
      {...props}
    >
      {loading && (
        <span className="absolute w-4 h-4 border-2 border-current border-r-transparent animate-spin rounded-full" />
      )}
      {leftIcon && <span className="inline-flex items-center justify-center">{leftIcon}</span>}
      <span className="inline-flex items-center">{children}</span>
      {rightIcon && <span className="inline-flex items-center justify-center">{rightIcon}</span>}
    </button>
  )
}