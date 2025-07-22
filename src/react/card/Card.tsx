/**
 * @module Card
 * @description A versatile card component for displaying content in a contained format. Supports multiple variants, compound components, and interactive states with brutalist design aesthetics.
 */

import { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './Card.module.css'

/**
 * Props for the Card component
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the card
   * @default 'elevated'
   */
  variant?: 'elevated' | 'flat' | 'outline'
  
  /**
   * Padding size for the card content
   * @default 'md'
   */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  
  /**
   * Whether the card is clickable/interactive
   * @default false
   */
  clickable?: boolean
  
  /**
   * Whether to show hover effects when not clickable
   * @default true
   */
  hover?: boolean
}

/**
 * Props for the Card.Header component
 */
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Props for the Card.Body component
 */
export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Props for the Card.Footer component
 */
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * A container component for grouping related content and actions.
 * Supports compound components for flexible layouts.
 * 
 * @example
 * ```tsx
 * <Card variant="elevated" padding="lg">
 *   <Card.Header>
 *     <h3>Card Title</h3>
 *   </Card.Header>
 *   <Card.Body>
 *     <p>Card content goes here</p>
 *   </Card.Body>
 *   <Card.Footer>
 *     <Button>Action</Button>
 *   </Card.Footer>
 * </Card>
 * ```
 */
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

/**
 * Header section of the Card component.
 * Typically contains the title and optional actions.
 */
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

/**
 * Main content area of the Card component.
 * Contains the primary content of the card.
 */
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

/**
 * Footer section of the Card component.
 * Typically contains actions or additional information.
 */
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