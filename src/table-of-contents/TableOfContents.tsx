import React, { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './TableOfContents.module.css'

export interface TableOfContentsProps extends HTMLAttributes<HTMLElement> {
  /** Title for the table of contents */
  title?: string
  /** Whether to show the title */
  showTitle?: boolean
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Position variant */
  position?: 'default' | 'sticky' | 'floating'
  /** Additional CSS classes */
  className?: string
}

export interface TableOfContentsListProps extends HTMLAttributes<HTMLOListElement> {
  /** Additional CSS classes */
  className?: string
}

export interface TableOfContentsItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Heading level (1-6) */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  /** Whether the item is active */
  isActive?: boolean
  /** Additional CSS classes */
  className?: string
}

export interface TableOfContentsLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  /** Link href (usually an anchor) */
  href: string
  /** Whether the link is active */
  isActive?: boolean
  /** Heading level for styling */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  /** Additional CSS classes */
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
    children, 
    ...props 
  }, ref) => {
    return (
      <nav
        ref={ref}
        className={clsx(
          styles.tableOfContents,
          styles[size],
          styles[position],
          className
        )}
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
  ({ href, isActive, level = 1, className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={clsx(
          styles.link,
          styles[`linkLevel${level}`],
          {
            [styles.activeLink]: isActive,
          },
          className
        )}
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