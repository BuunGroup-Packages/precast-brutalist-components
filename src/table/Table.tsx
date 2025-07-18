import { forwardRef, HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './Table.module.css'

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /** Table variant */
  variant?: 'default' | 'striped' | 'bordered'
  /** Table size */
  size?: 'sm' | 'md' | 'lg'
  /** Whether the table is hoverable */
  hoverable?: boolean
  /** Whether the table should be full width */
  fullWidth?: boolean
  /** Additional CSS classes */
  className?: string
}

export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  /** Whether the header is sticky */
  sticky?: boolean
  /** Additional CSS classes */
  className?: string
}

export interface TableHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Alignment of the header */
  align?: 'left' | 'center' | 'right'
  /** Whether the column is sortable */
  sortable?: boolean
  /** Sort direction if sortable */
  sortDirection?: 'asc' | 'desc' | 'none'
  /** Callback when sort is clicked */
  onSort?: () => void
  /** Additional CSS classes */
  className?: string
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** Alignment of the cell */
  align?: 'left' | 'center' | 'right'
  /** Whether the cell contains numeric data */
  numeric?: boolean
  /** Additional CSS classes */
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