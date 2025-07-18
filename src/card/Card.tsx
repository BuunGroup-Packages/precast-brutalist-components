import { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './Card.module.css'

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
      className,
      variant = 'elevated',
      padding = 'md',
      clickable = false,
      hover = true,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.card,
          styles[variant],
          styles[`padding-${padding}`],
          {
            [styles.clickable]: clickable,
            [styles.hover]: hover && !clickable,
          },
          className
        )}
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
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.header, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.body, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.footer, className)}
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