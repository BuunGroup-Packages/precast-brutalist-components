import React, { HTMLAttributes } from 'react';
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    /** Shape of the skeleton */
    shape?: 'text' | 'circular' | 'rectangular';
    /** Animation type */
    animation?: 'pulse' | 'wave' | 'none';
    /** Width of the skeleton (for rectangular and circular) */
    width?: number | string;
    /** Height of the skeleton (for rectangular and circular) */
    height?: number | string;
    /** Number of text lines (only for text shape) */
    lines?: 1 | 2 | 3 | 4 | 5;
    /** Variant style */
    variant?: 'default' | 'rounded';
    /** Additional CSS classes */
    className?: string;
}
export declare const Skeleton: React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLDivElement>>;
