import React, { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './Navigation.module.css'

export interface NavigationProps extends HTMLAttributes<HTMLElement> {
  /** Whether the navigation is vertical */
  vertical?: boolean
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Additional CSS classes */
  className?: string
}

export interface NavigationListProps extends HTMLAttributes<HTMLUListElement> {
  /** Additional CSS classes */
  className?: string
}

export interface NavigationItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Whether the item is active */
  isActive?: boolean
  /** Whether the item is disabled */
  disabled?: boolean
  /** Additional CSS classes */
  className?: string
}

export interface NavigationLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  /** Link href */
  href?: string
  /** Whether the link is active */
  isActive?: boolean
  /** Whether the link is disabled */
  disabled?: boolean
  /** Icon to display */
  icon?: React.ReactNode
  /** Additional CSS classes */
  className?: string
}

export interface NavigationSeparatorProps extends HTMLAttributes<HTMLHRElement> {
  /** Additional CSS classes */
  className?: string
}

// Create compound component interface
interface NavigationComponent extends React.ForwardRefExoticComponent<NavigationProps & React.RefAttributes<HTMLElement>> {
  List: typeof NavigationList;
  Item: typeof NavigationItem;
  Link: typeof NavigationLink;
  Separator: typeof NavigationSeparator;
}

export const Navigation = forwardRef<HTMLElement, NavigationProps>(
  ({ vertical = false, size = 'md', className, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={clsx(
          styles.navigation,
          {
            [styles.vertical]: vertical,
            [styles[size]]: size,
          },
          className
        )}
        {...props}
      >
        {children}
      </nav>
    )
  }
) as NavigationComponent

export const NavigationList = forwardRef<HTMLUListElement, NavigationListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        className={clsx(styles.list, className)}
        {...props}
      >
        {children}
      </ul>
    )
  }
)

export const NavigationItem = forwardRef<HTMLLIElement, NavigationItemProps>(
  ({ isActive, disabled, className, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={clsx(
          styles.item,
          {
            [styles.active]: isActive,
            [styles.disabled]: disabled,
          },
          className
        )}
        {...props}
      >
        {children}
      </li>
    )
  }
)

export const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  ({ href, isActive, disabled, icon, className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        className={clsx(
          styles.link,
          {
            [styles.active]: isActive,
            [styles.disabled]: disabled,
          },
          className
        )}
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
  ({ className, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        className={clsx(styles.separator, className)}
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