import React, { HTMLAttributes } from 'react';
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    /** Badge content */
    children?: React.ReactNode;
    /** Badge variant */
    variant?: 'solid' | 'outline' | 'dot' | 'secondary';
    /** Badge color */
    color?: 'accent' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
    /** Badge size */
    size?: 'sm' | 'md' | 'lg';
    /** Whether the badge is dismissible */
    dismissible?: boolean;
    /** Click handler for dismissible badges */
    onDismiss?: () => void;
    /** Additional CSS classes */
    className?: string;
    /** Custom click handler */
    onClick?: () => void;
    /** Whether the badge is clickable */
    clickable?: boolean;
}
export declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;
