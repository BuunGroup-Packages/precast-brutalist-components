/**
 * @module Breadcrumb
 * @description A navigation component that shows the current page location within a hierarchical structure. Helps users understand their location and navigate back.
 */

import React, { forwardRef, HTMLAttributes, AnchorHTMLAttributes, CSSProperties } from 'react'
import { clsx } from 'clsx'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'
import styles from './Breadcrumb.module.css'

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Separator between breadcrumb items */
  separator?: React.ReactNode
  /** Additional CSS classes */
  className?: string
  /** Custom CSS styles (supports utility classes) */
  style?: CSSProperties
}

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Whether this item is the current page */
  isCurrentPage?: boolean
  /** Additional CSS classes */
  className?: string
  /** Custom CSS styles (supports utility classes) */
  style?: CSSProperties
}

export interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Additional CSS classes */
  className?: string
  /** Custom CSS styles (supports utility classes) */
  style?: CSSProperties
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ separator = '/', className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.breadcrumb
    })

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={processedClassName}
        style={processedStyle}
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
  ({ isCurrentPage = false, className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.item,
        {
          [styles.current]: isCurrentPage,
        }
      )
    })

    return (
      <li
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        aria-current={isCurrentPage ? 'page' : undefined}
        {...props}
      >
        {children}
      </li>
    )
  }
)

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.link
    })

    return (
      <a
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        {...props}
      >
        {children}
      </a>
    )
  }
)

export interface BreadcrumbPageProps extends HTMLAttributes<HTMLSpanElement> {
  /** Additional CSS classes */
  className?: string
  /** Custom CSS styles (supports utility classes) */
  style?: CSSProperties
}

export const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.page
    })

    return (
      <span
        ref={ref}
        className={processedClassName}
        style={processedStyle}
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