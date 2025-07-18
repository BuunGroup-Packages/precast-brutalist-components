import React, { HTMLAttributes } from 'react';
export interface SpinnerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Size of the spinner */
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /** Color variant */
    color?: 'default' | 'accent' | 'success' | 'warning' | 'error' | 'info';
    /** Animation variant */
    variant?: 'dots' | 'bars' | 'square' | 'glitch';
    /** Speed of animation */
    speed?: 'slow' | 'normal' | 'fast';
    /** Label for accessibility */
    label?: string;
    /** Additional CSS classes */
    className?: string;
}
export declare const Spinner: React.ForwardRefExoticComponent<SpinnerProps & React.RefAttributes<HTMLDivElement>>;
