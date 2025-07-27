/**
 * @module Navigation
 * @description A flexible navigation component system that supports vertical and horizontal layouts with keyboard navigation and accessibility features. Includes list, item, link, and separator sub-components.
 */

import React, { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { clsx } from 'clsx'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'
import styles from './Navigation.module.css'

/**
 * Props for the Navigation component
 */
export interface NavigationProps extends HTMLAttributes<HTMLElement> {
  /**
   * Whether the navigation should be laid out vertically
   * @default false
   */
  vertical?: boolean
  
  /**
   * Size variant for the navigation
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Additional CSS classes to apply to the navigation
   */
  className?: string
  
  /**
   * Custom styles to apply to the navigation
   */
  style?: CSSProperties
}

/**
 * Props for the NavigationList component
 */
export interface NavigationListProps extends HTMLAttributes<HTMLUListElement> {
  /**
   * Additional CSS classes to apply to the navigation list
   */
  className?: string
  
  /**
   * Custom styles to apply to the navigation list
   */
  style?: CSSProperties
}

/**
 * Props for the NavigationItem component
 */
export interface NavigationItemProps extends HTMLAttributes<HTMLLIElement> {
  /**
   * Whether this navigation item is currently active
   * @default false
   */
  isActive?: boolean
  
  /**
   * Whether this navigation item is disabled
   * @default false
   */
  disabled?: boolean
  
  /**
   * Additional CSS classes to apply to the navigation item
   */
  className?: string
  
  /**
   * Custom styles to apply to the navigation item
   */
  style?: CSSProperties
}

/**
 * Props for the NavigationLink component
 */
export interface NavigationLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  /**
   * The URL that the link points to
   */
  href?: string
  
  /**
   * Whether this navigation link is currently active
   * @default false
   */
  isActive?: boolean
  
  /**
   * Whether this navigation link is disabled
   * @default false
   */
  disabled?: boolean
  
  /**
   * Icon element to display alongside the link text
   */
  icon?: React.ReactNode
  
  /**
   * Additional CSS classes to apply to the navigation link
   */
  className?: string
  
  /**
   * Custom styles to apply to the navigation link
   */
  style?: CSSProperties
}

/**
 * Props for the NavigationSeparator component
 */
export interface NavigationSeparatorProps extends HTMLAttributes<HTMLHRElement> {
  /**
   * Additional CSS classes to apply to the navigation separator
   */
  className?: string
  
  /**
   * Custom styles to apply to the navigation separator
   */
  style?: CSSProperties
}

// Create compound component interface
interface NavigationComponent extends React.ForwardRefExoticComponent<NavigationProps & React.RefAttributes<HTMLElement>> {
  List: typeof NavigationList;
  Item: typeof NavigationItem;
  Link: typeof NavigationLink;
  Separator: typeof NavigationSeparator;
}

export const Navigation = forwardRef<HTMLElement, NavigationProps>(
  ({ vertical = false, size = 'md', className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.navigation,
        {
          [styles.vertical]: vertical,
          [styles[size]]: size,
        }
      )
    })

    return (
      <nav
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        {...props}
      >
        {children}
      </nav>
    )
  }
) as NavigationComponent

export const NavigationList = forwardRef<HTMLUListElement, NavigationListProps>(
  ({ className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.list
    })

    return (
      <ul
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        {...props}
      >
        {children}
      </ul>
    )
  }
)

export const NavigationItem = forwardRef<HTMLLIElement, NavigationItemProps>(
  ({ isActive, disabled, className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.item,
        {
          [styles.active]: isActive,
          [styles.disabled]: disabled,
        }
      )
    })

    return (
      <li
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        {...props}
      >
        {children}
      </li>
    )
  }
)

export const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  ({ href, isActive, disabled, icon, className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.link,
        {
          [styles.active]: isActive,
          [styles.disabled]: disabled,
        }
      )
    })

    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        className={processedClassName}
        style={processedStyle}
        aria-current={isActive ? 'page' : undefined}
        tabIndex={disabled ? -1 : undefined}
        {...props}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.text}>{children}</span>
      </a>
    )
  }
)

export const NavigationSeparator = forwardRef<HTMLHRElement, NavigationSeparatorProps>(
  ({ className, style, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.separator
    })

    return (
      <hr
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        {...props}
      />
    )
  }
)

// Display names
Navigation.displayName = 'Navigation'
NavigationList.displayName = 'NavigationList'
NavigationItem.displayName = 'NavigationItem'
NavigationLink.displayName = 'NavigationLink'
NavigationSeparator.displayName = 'NavigationSeparator'

// Attach subcomponents
Navigation.List = NavigationList
Navigation.Item = NavigationItem
Navigation.Link = NavigationLink
Navigation.Separator = NavigationSeparator