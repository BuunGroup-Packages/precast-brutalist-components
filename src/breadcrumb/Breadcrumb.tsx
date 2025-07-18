import React, { forwardRef, HTMLAttributes, AnchorHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './Breadcrumb.module.css'

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Separator between breadcrumb items */
  separator?: React.ReactNode
  /** Additional CSS classes */
  className?: string
}

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Whether this item is the current page */
  isCurrentPage?: boolean
  /** Additional CSS classes */
  className?: string
}

export interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Additional CSS classes */
  className?: string
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ separator = '/', className, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={clsx(styles.breadcrumb, className)}
        {...props}
      >
        <ol className={styles.list}>
          {React.Children.map(children, (child, index) => {
            if (!React.isValidElement(child)) return null
            
            const isLast = index === React.Children.count(children) - 1
            
            return (
              <>
                {child}
                {!isLast && (
                  <li className={styles.separator} aria-hidden="true">
                    {separator}
                  </li>
                )}
              </>
            )
          })}
        </ol>
      </nav>
    )
  }
)

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ isCurrentPage = false, className, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={clsx(
          styles.item,
          {
            [styles.current]: isCurrentPage,
          },
          className
        )}
        aria-current={isCurrentPage ? 'page' : undefined}
        {...props}
      >
        {children}
      </li>
    )
  }
)

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={clsx(styles.link, className)}
        {...props}
      >
        {children}
      </a>
    )
  }
)

export const BreadcrumbPage = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(styles.page, className)}
        {...props}
      >
        {children}
      </span>
    )
  }
)

// Display names
Breadcrumb.displayName = 'Breadcrumb'
BreadcrumbItem.displayName = 'BreadcrumbItem'
BreadcrumbLink.displayName = 'BreadcrumbLink'
BreadcrumbPage.displayName = 'BreadcrumbPage'

// Attach subcomponents
const BreadcrumbNamespace = Object.assign(Breadcrumb, {
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Page: BreadcrumbPage,
})

export default BreadcrumbNamespace