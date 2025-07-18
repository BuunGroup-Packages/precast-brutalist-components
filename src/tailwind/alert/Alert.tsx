import { forwardRef, HTMLAttributes, useState } from 'react'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Type of alert */
  type?: 'info' | 'success' | 'warning' | 'error'
  /** Visual variant */
  variant?: 'filled' | 'outline'
  /** Size of the alert */
  size?: 'sm' | 'md' | 'lg'
  /** Whether the alert can be dismissed */
  dismissible?: boolean
  /** Callback when alert is dismissed */
  onDismiss?: () => void
}

export interface AlertIconProps extends HTMLAttributes<HTMLDivElement> {}
export interface AlertContentProps extends HTMLAttributes<HTMLDivElement> {}
export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
export interface AlertDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
export interface AlertActionsProps extends HTMLAttributes<HTMLDivElement> {}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      className = '',
      type = 'info',
      variant = 'filled',
      size = 'md',
      dismissible = false,
      onDismiss,
      ...props
    },
    ref
  ) => {
    const [dismissed, setDismissed] = useState(false)
    const [isExiting, setIsExiting] = useState(false)

    const handleDismiss = () => {
      setIsExiting(true)
      // Wait for animation to complete before removing from DOM
      setTimeout(() => {
        setDismissed(true)
        onDismiss?.()
      }, 300) // Match animation duration
    }

    if (dismissed) {
      return null
    }

    const baseClasses = `
      relative flex items-start gap-3
      border-[3px] border-solid rounded-none
      font-medium transition-all duration-150 ease-in-out
      shadow-[4px_4px_0px_black]
      hover:shadow-[6px_6px_0px_black] hover:-translate-x-0.5 hover:-translate-y-0.5
      motion-reduce:transition-none motion-reduce:animate-none
      contrast-more:border-[4px]
    `

    const sizeClasses = {
      sm: 'p-3 text-sm leading-tight',
      md: 'p-4 text-base leading-normal',
      lg: 'p-6 text-lg leading-normal'
    }

    const typeVariantClasses = {
      info: {
        filled: 'bg-blue-500 border-black text-white',
        outline: 'bg-white border-blue-500 text-blue-500 border-[5px]'
      },
      success: {
        filled: 'bg-green-500 border-black text-white',
        outline: 'bg-white border-green-500 text-green-500 border-[5px]'
      },
      warning: {
        filled: 'bg-yellow-400 border-black text-black',
        outline: 'bg-white border-yellow-400 text-yellow-600 border-[5px]'
      },
      error: {
        filled: 'bg-red-500 border-black text-white hover:animate-[alertShake_0.15s_ease-in-out]',
        outline: 'bg-white border-red-500 text-red-500 border-[5px] hover:animate-[alertShake_0.15s_ease-in-out]'
      }
    }

    const dismissibleClasses = dismissible ? 'pr-12' : ''

    const combinedClasses = `
      ${baseClasses}
      ${sizeClasses[size]}
      ${typeVariantClasses[type][variant]}
      ${dismissibleClasses}
      ${className}
    `.replace(/\s+/g, ' ').trim()

    return (
      <div
        ref={ref}
        className={combinedClasses}
        style={{
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          animation: isExiting 
            ? 'alertExit 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards'
            : 'alertEnter 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          ...props.style
        }}
        role="alert"
        aria-live="polite"
        {...props}
      >
        <style>
          {`
            @keyframes alertEnter {
              from {
                opacity: 0;
                transform: translateY(-20px) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            @keyframes alertExit {
              from {
                opacity: 1;
                transform: translateX(0) scale(1);
              }
              to {
                opacity: 0;
                transform: translateX(100px) scale(0.9);
              }
            }
            @keyframes alertShake {
              0%, 100% {
                transform: translateX(0);
              }
              25% {
                transform: translateX(-4px);
              }
              75% {
                transform: translateX(4px);
              }
            }
          `}
        </style>
        {children}
        {dismissible && (
          <button
            className={`
              absolute top-3 right-3 bg-transparent border-none text-current cursor-pointer
              p-1 flex items-center justify-center rounded-none opacity-70 transition-all duration-100 ease-in-out
              hover:opacity-100 hover:scale-110 active:scale-95
              focus:outline focus:outline-2 focus:outline-current focus:outline-offset-1
              motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100
              ${size === 'sm' ? 'top-2 right-2 p-0.5' : size === 'lg' ? 'top-4 right-4' : ''}
            `}
            onClick={handleDismiss}
            aria-label="Dismiss alert"
            type="button"
          >
            <svg
              width={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
              height={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </button>
        )}
      </div>
    )
  }
)

const AlertIcon = forwardRef<HTMLDivElement, AlertIconProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          flex-shrink-0 flex items-center justify-center mt-1
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        {...props}
      >
        {children || <DefaultIcon />}
      </div>
    )
  }
)

const AlertContent = forwardRef<HTMLDivElement, AlertContentProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          flex-1 min-w-0
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        {...props}
      >
        {children}
      </div>
    )
  }
)

const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <h4
        ref={ref}
        className={`
          font-bold text-inherit leading-tight uppercase tracking-wider
          m-0 mb-1
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        style={{
          fontFamily: "'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          letterSpacing: '0.05em',
          ...props.style
        }}
        {...props}
      >
        {children}
      </h4>
    )
  }
)

const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={`
          m-0 leading-normal opacity-90
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        {...props}
      >
        {children}
      </p>
    )
  }
)

const AlertActions = forwardRef<HTMLDivElement, AlertActionsProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          flex items-center gap-2 mt-3 flex-wrap
          max-md:flex-col max-md:items-stretch max-md:[&>button]:w-full
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// Default icon component
const DefaultIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="10"
      cy="10"
      r="8"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M10 6V10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
    />
    <circle
      cx="10"
      cy="14"
      r="1"
      fill="currentColor"
    />
  </svg>
)

Alert.displayName = 'Alert'
AlertIcon.displayName = 'Alert.Icon'
AlertContent.displayName = 'Alert.Content'
AlertTitle.displayName = 'Alert.Title'
AlertDescription.displayName = 'Alert.Description'
AlertActions.displayName = 'Alert.Actions'

// Compound component
const AlertComponent = Alert as typeof Alert & {
  Icon: typeof AlertIcon
  Content: typeof AlertContent
  Title: typeof AlertTitle
  Description: typeof AlertDescription
  Actions: typeof AlertActions
}

AlertComponent.Icon = AlertIcon
AlertComponent.Content = AlertContent
AlertComponent.Title = AlertTitle
AlertComponent.Description = AlertDescription
AlertComponent.Actions = AlertActions

export { AlertComponent as Alert }