/**
 * @module TableOfContents
 * @description A navigational component that displays a hierarchical list of page sections with support for active states and multiple positioning options. Perfect for documentation and long-form content.
 */

import React, { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { clsx } from 'clsx'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'
import styles from './TableOfContents.module.css'

/**
 * Props for the main TableOfContents component
 */
export interface TableOfContentsProps extends HTMLAttributes<HTMLElement> {
  /**
   * Title text displayed at the top of the table of contents
   * @default 'Table of Contents'
   */
  title?: string
  
  /**
   * Whether to display the title header
   * @default true
   */
  showTitle?: boolean
  
  /**
   * Size variant affecting spacing and typography
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Positioning behavior of the table of contents
   * @default 'default'
   */
  position?: 'default' | 'sticky' | 'floating'
  
  /**
   * Additional CSS classes to apply to the component
   */
  className?: string
  
  /**
   * Custom inline styles (supports utility classes)
   */
  style?: CSSProperties
}

/**
 * Props for the TableOfContentsList component
 */
export interface TableOfContentsListProps extends HTMLAttributes<HTMLOListElement> {
  /**
   * Additional CSS classes to apply to the ordered list
   */
  className?: string
}

/**
 * Props for the TableOfContentsItem component
 */
export interface TableOfContentsItemProps extends HTMLAttributes<HTMLLIElement> {
  /**
   * Heading level for proper indentation and styling
   * @default 1
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  
  /**
   * Whether this item represents the currently active section
   * @default false
   */
  isActive?: boolean
  
  /**
   * Additional CSS classes to apply to the list item
   */
  className?: string
}

/**
 * Props for the TableOfContentsLink component
 */
export interface TableOfContentsLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  /**
   * URL or anchor link that the item should navigate to
   */
  href: string
  
  /**
   * Whether this link represents the currently active section
   * @default false
   */
  isActive?: boolean
  
  /**
   * Heading level for appropriate styling and indentation
   * @default 1
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  
  /**
   * Additional CSS classes to apply to the link element
   */
  className?: string
}

// Create compound component type interface
export interface TableOfContentsComponent extends React.ForwardRefExoticComponent<TableOfContentsProps & React.RefAttributes<HTMLElement>> {
  List: typeof TableOfContentsList;
  Item: typeof TableOfContentsItem;
  Link: typeof TableOfContentsLink;
}

export const TableOfContents = forwardRef<HTMLElement, TableOfContentsProps>(
  ({ 
    title = 'Table of Contents', 
    showTitle = true, 
    size = 'md', 
    position = 'default',
    className,
    style,
    children, 
    ...props 
  }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.tableOfContents,
        styles[size],
        styles[position]
      )
    })
    
    return (
      <nav
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        aria-label="Table of contents"
        {...props}
      >
        {showTitle && (
          <h2 className={styles.title}>
            {title}
          </h2>
        )}
        {children}
      </nav>
    )
  }
) as TableOfContentsComponent

export const TableOfContentsList = forwardRef<HTMLOListElement, TableOfContentsListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ol
        ref={ref}
        className={clsx(styles.list, className)}
        {...props}
      >
        {children}
      </ol>
    )
  }
)

export const TableOfContentsItem = forwardRef<HTMLLIElement, TableOfContentsItemProps>(
  ({ level = 1, isActive, className, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={clsx(
          styles.item,
          styles[`level${level}`],
          {
            [styles.active]: isActive,
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

export const TableOfContentsLink = forwardRef<HTMLAnchorElement, TableOfContentsLinkProps>(
  ({ href, isActive, level = 1, className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.link,
        styles[`linkLevel${level}`],
        {
          [styles.activeLink]: isActive,
        }
      )
    })
    
    return (
      <a
        ref={ref}
        href={href}
        className={processedClassName}
        style={processedStyle}
        aria-current={isActive ? 'location' : undefined}
        {...props}
      >
        <span className={styles.linkText}>{children}</span>
      </a>
    )
  }
)

// Display names
TableOfContents.displayName = 'TableOfContents'
TableOfContentsList.displayName = 'TableOfContentsList'
TableOfContentsItem.displayName = 'TableOfContentsItem'
TableOfContentsLink.displayName = 'TableOfContentsLink'

// Attach subcomponents
TableOfContents.List = TableOfContentsList
TableOfContents.Item = TableOfContentsItem
TableOfContents.Link = TableOfContentsLink