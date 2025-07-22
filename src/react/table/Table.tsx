/**
 * @module Table
 * @description A comprehensive table component with support for sorting, alignment, and various styling options. Includes compound components for building complex data tables with accessibility features.
 */

import { forwardRef, HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './Table.module.css'

/**
 * Props for the main Table component
 */
export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /**
   * Visual style variant of the table
   * @default 'default'
   */
  variant?: 'default' | 'striped' | 'bordered'
  
  /**
   * Size of the table affecting padding and font size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Whether table rows should highlight on hover
   * @default false
   */
  hoverable?: boolean
  
  /**
   * Whether the table should take full width of its container
   * @default true
   */
  fullWidth?: boolean
  
  /**
   * Additional CSS classes to apply to the table
   */
  className?: string
}

/**
 * Props for the TableHead component
 */
export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  /**
   * Whether the table header should stick to the top on scroll
   * @default false
   */
  sticky?: boolean
  
  /**
   * Additional CSS classes to apply to the table head
   */
  className?: string
}

/**
 * Props for the TableHeader component (th elements)
 */
export interface TableHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * Text alignment for the header content
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right'
  
  /**
   * Whether this column supports sorting
   * @default false
   */
  sortable?: boolean
  
  /**
   * Current sort direction for this column
   * @default 'none'
   */
  sortDirection?: 'asc' | 'desc' | 'none'
  
  /**
   * Callback function triggered when the sort button is clicked
   */
  onSort?: () => void
  
  /**
   * Additional CSS classes to apply to the header cell
   */
  className?: string
}

/**
 * Props for the TableCell component (td elements)
 */
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /**
   * Text alignment for the cell content
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right'
  
  /**
   * Whether this cell contains numeric data (affects styling)
   * @default false
   */
  numeric?: boolean
  
  /**
   * Additional CSS classes to apply to the cell
   */
  className?: string
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      variant = 'default',
      size = 'md',
      hoverable = false,
      fullWidth = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div className={clsx(styles.tableWrapper, { [styles.fullWidth]: fullWidth })}>
        <table
          ref={ref}
          className={clsx(
            styles.table,
            styles[variant],
            styles[size],
            {
              [styles.hoverable]: hoverable,
              [styles.fullWidth]: fullWidth,
            },
            className
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    )
  }
)

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ sticky = false, className, children, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={clsx(
          styles.thead,
          {
            [styles.sticky]: sticky,
          },
          className
        )}
        {...props}
      >
        {children}
      </thead>
    )
  }
)

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <tbody ref={ref} className={clsx(styles.tbody, className)} {...props}>
        {children}
      </tbody>
    )
  }
)

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <tr ref={ref} className={clsx(styles.tr, className)} {...props}>
        {children}
      </tr>
    )
  }
)

export const TableHeader = forwardRef<HTMLTableCellElement, TableHeaderProps>(
  (
    {
      align = 'left',
      sortable = false,
      sortDirection = 'none',
      onSort,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const handleClick = () => {
      if (sortable && onSort) {
        onSort()
      }
    }

    return (
      <th
        ref={ref}
        className={clsx(
          styles.th,
          styles[`align-${align}`],
          {
            [styles.sortable]: sortable,
            [styles.sorted]: sortDirection !== 'none',
          },
          className
        )}
        onClick={handleClick}
        role={sortable ? 'button' : undefined}
        tabIndex={sortable ? 0 : undefined}
        aria-sort={
          sortDirection === 'asc'
            ? 'ascending'
            : sortDirection === 'desc'
            ? 'descending'
            : 'none'
        }
        {...props}
      >
        <div className={styles.thContent}>
          {children}
          {sortable && (
            <span className={clsx(styles.sortIcon, styles[`sort-${sortDirection}`])}>
              {sortDirection === 'asc' && '↑'}
              {sortDirection === 'desc' && '↓'}
              {sortDirection === 'none' && '↕'}
            </span>
          )}
        </div>
      </th>
    )
  }
)

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ align = 'left', numeric = false, className, children, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={clsx(
          styles.td,
          styles[`align-${align}`],
          {
            [styles.numeric]: numeric,
          },
          className
        )}
        {...props}
      >
        {children}
      </td>
    )
  }
)

// Export compound components
Table.displayName = 'Table'
TableHead.displayName = 'TableHead'
TableBody.displayName = 'TableBody'
TableRow.displayName = 'TableRow'
TableHeader.displayName = 'TableHeader'
TableCell.displayName = 'TableCell'

// Attach subcomponents
const TableNamespace = Object.assign(Table, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Header: TableHeader,
  Cell: TableCell,
})

export default TableNamespace