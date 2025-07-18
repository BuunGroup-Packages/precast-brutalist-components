import React, { HTMLAttributes } from 'react';
export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Progress value (0-max for determinate, undefined for indeterminate) */
    value?: number;
    /** Maximum value */
    max?: number;
    /** Progress type */
    type?: 'linear' | 'circular';
    /** Progress variant */
    variant?: 'default' | 'striped' | 'animated';
    /** Progress size */
    size?: 'sm' | 'md' | 'lg';
    /** Whether to show the value label */
    showLabel?: boolean;
    /** Custom label text (overrides default percentage) */
    label?: string;
    /** Whether progress is indeterminate */
    indeterminate?: boolean;
    /** Progress bar color */
    color?: 'accent' | 'success' | 'warning' | 'error' | 'info';
    /** Additional CSS classes */
    className?: string;
}
export declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;
