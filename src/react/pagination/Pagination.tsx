/**
 * @module Pagination
 * @description A component for navigating through pages of content. Includes page numbers, previous/next buttons, and optional page size selection.
 */

import React, { forwardRef, useMemo } from 'react'
import { clsx } from 'clsx'
import styles from './Pagination.module.css'

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Current active page number (1-indexed) */
  currentPage: number
  /** Total number of pages */
  totalPages: number
  /** Number of sibling pages to show on each side of current page */
  siblingCount?: number
  /** Number of boundary pages to show at start and end */
  boundaryCount?: number
  /** Callback when page changes */
  onChange?: (page: number) => void
  /** Show previous/next buttons */
  showPrevNext?: boolean
  /** Show first/last buttons */
  showFirstLast?: boolean
  /** Custom labels for navigation buttons */
  labels?: {
    previous?: string
    next?: string
    first?: string
    last?: string
  }
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Additional CSS classes */
  className?: string
  /** Disabled state */
  disabled?: boolean
}

const DOTS = '...'

// Helper function to generate pagination range
function usePaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
  boundaryCount: number
): (number | string)[] {
  return useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 5 + boundaryCount * 2

    // If the number of pages is less than the page numbers we want to show
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

    const shouldShowLeftDots = leftSiblingIndex > boundaryCount + 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - boundaryCount - 1

    const firstPages = Array.from({ length: boundaryCount }, (_, i) => i + 1)
    const lastPages = Array.from({ length: boundaryCount }, (_, i) => totalPages - boundaryCount + i + 1)

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
      return [...leftRange, DOTS, ...lastPages]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      )
      return [...firstPages, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      )
      return [...firstPages, DOTS, ...middleRange, DOTS, ...lastPages]
    }

    return []
  }, [currentPage, totalPages, siblingCount, boundaryCount])
}

/**
 * Pagination component for navigating through pages of content.
 * Features a brutalist design with bold styling and clear visual feedback.
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      siblingCount = 1,
      boundaryCount = 1,
      onChange,
      showPrevNext = true,
      showFirstLast = false,
      labels = {
        previous: 'Previous',
        next: 'Next',
        first: 'First',
        last: 'Last'
      },
      size = 'md',
      className,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const paginationRange = usePaginationRange(currentPage, totalPages, siblingCount, boundaryCount)

    const handleClick = (page: number) => {
      if (!disabled && onChange && page !== currentPage && page >= 1 && page <= totalPages) {
        onChange(page)
      }
    }

    if (totalPages <= 1) {
      return null
    }

    return (
      <nav
        ref={ref}
        className={clsx(
          styles.pagination,
          styles[size],
          disabled && styles.disabled,
          className
        )}
        aria-label="Pagination Navigation"
        {...props}
      >
        <ul className={styles.list}>
          {/* First button */}
          {showFirstLast && (
            <li>
              <button
                className={clsx(styles.item, styles.nav)}
                onClick={() => handleClick(1)}
                disabled={disabled || currentPage === 1}
                aria-label={labels.first}
                type="button"
              >
                <span className={styles.navIcon}>«</span>
                <span className={styles.navText}>{labels.first}</span>
              </button>
            </li>
          )}

          {/* Previous button */}
          {showPrevNext && (
            <li>
              <button
                className={clsx(styles.item, styles.nav)}
                onClick={() => handleClick(currentPage - 1)}
                disabled={disabled || currentPage === 1}
                aria-label={labels.previous}
                type="button"
              >
                <span className={styles.navIcon}>‹</span>
                <span className={styles.navText}>{labels.previous}</span>
              </button>
            </li>
          )}

          {/* Page numbers */}
          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
              return (
                <li key={`dots-${index}`}>
                  <span className={clsx(styles.item, styles.dots)}>...</span>
                </li>
              )
            }

            return (
              <li key={pageNumber}>
                <button
                  className={clsx(
                    styles.item,
                    styles.page,
                    pageNumber === currentPage && styles.active
                  )}
                  onClick={() => handleClick(pageNumber as number)}
                  disabled={disabled}
                  aria-label={`Go to page ${pageNumber}`}
                  aria-current={pageNumber === currentPage ? 'page' : undefined}
                  type="button"
                >
                  {pageNumber}
                </button>
              </li>
            )
          })}

          {/* Next button */}
          {showPrevNext && (
            <li>
              <button
                className={clsx(styles.item, styles.nav)}
                onClick={() => handleClick(currentPage + 1)}
                disabled={disabled || currentPage === totalPages}
                aria-label={labels.next}
                type="button"
              >
                <span className={styles.navText}>{labels.next}</span>
                <span className={styles.navIcon}>›</span>
              </button>
            </li>
          )}

          {/* Last button */}
          {showFirstLast && (
            <li>
              <button
                className={clsx(styles.item, styles.nav)}
                onClick={() => handleClick(totalPages)}
                disabled={disabled || currentPage === totalPages}
                aria-label={labels.last}
                type="button"
              >
                <span className={styles.navText}>{labels.last}</span>
                <span className={styles.navIcon}>»</span>
              </button>
            </li>
          )}
        </ul>
      </nav>
    )
  }
)

Pagination.displayName = 'Pagination'