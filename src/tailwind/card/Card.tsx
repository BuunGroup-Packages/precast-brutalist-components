import { forwardRef, HTMLAttributes } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual variant of the card */
  variant?: 'elevated' | 'flat' | 'outline'
  /** Padding options */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Whether the card is clickable */
  clickable?: boolean
  /** Whether to show hover effects */
  hover?: boolean
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className = '',
      variant = 'elevated',
      padding = 'md',
      clickable = false,
      hover = true,
      ...props
    },
    ref
  ) => {
    const baseClasses = `
      bg-white border-[3px] border-solid border-black
      transition-all duration-150 ease-in-out
      rounded-none
    `

    const variantClasses = {
      elevated: 'shadow-[8px_8px_0px_black]',
      flat: '',
      outline: 'bg-transparent'
    }

    const paddingClasses = {
      none: '',
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8'
    }

    const interactionClasses = clickable 
      ? 'cursor-pointer hover:shadow-[12px_12px_0px_black] hover:-translate-x-1 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
      : hover
        ? 'hover:shadow-[12px_12px_0px_black] hover:-translate-x-1 hover:-translate-y-1'
        : ''

    const combinedClasses = `
      ${baseClasses}
      ${variantClasses[variant]}
      ${paddingClasses[padding]}
      ${interactionClasses}
      ${className}
    `.replace(/\s+/g, ' ').trim()

    return (
      <div
        ref={ref}
        className={combinedClasses}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        {...props}
      >
        {children}
      </div>
    )
  }
)

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = '', ...props }, ref) => {
    const headerClasses = `
      pb-4 border-b-[2px] border-black mb-4
      ${className}
    `.replace(/\s+/g, ' ').trim()

    return (
      <div
        ref={ref}
        className={headerClasses}
        {...props}
      >
        {children}
      </div>
    )
  }
)

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className = '', ...props }, ref) => {
    const bodyClasses = `
      ${className}
    `.replace(/\s+/g, ' ').trim()

    return (
      <div
        ref={ref}
        className={bodyClasses}
        {...props}
      >
        {children}
      </div>
    )
  }
)

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = '', ...props }, ref) => {
    const footerClasses = `
      pt-4 border-t-[2px] border-black mt-4
      ${className}
    `.replace(/\s+/g, ' ').trim()

    return (
      <div
        ref={ref}
        className={footerClasses}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
CardHeader.displayName = 'Card.Header'
CardBody.displayName = 'Card.Body'
CardFooter.displayName = 'Card.Footer'

// Compound component
const CardComponent = Card as typeof Card & {
  Header: typeof CardHeader
  Body: typeof CardBody
  Footer: typeof CardFooter
}

CardComponent.Header = CardHeader
CardComponent.Body = CardBody
CardComponent.Footer = CardFooter

export { CardComponent as Card }