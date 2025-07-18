import React from 'react';
export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
    /** Current active page number (1-indexed) */
    currentPage: number;
    /** Total number of pages */
    totalPages: number;
    /** Number of sibling pages to show on each side of current page */
    siblingCount?: number;
    /** Number of boundary pages to show at start and end */
    boundaryCount?: number;
    /** Callback when page changes */
    onChange?: (page: number) => void;
    /** Show previous/next buttons */
    showPrevNext?: boolean;
    /** Show first/last buttons */
    showFirstLast?: boolean;
    /** Custom labels for navigation buttons */
    labels?: {
        previous?: string;
        next?: string;
        first?: string;
        last?: string;
    };
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Additional CSS classes */
    className?: string;
    /** Disabled state */
    disabled?: boolean;
}
/**
 * Pagination component for navigating through pages of content.
 * Features a brutalist design with bold styling and clear visual feedback.
 */
export declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLElement>>;
