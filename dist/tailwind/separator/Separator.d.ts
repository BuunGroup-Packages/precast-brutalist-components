import React from 'react';
export interface SeparatorProps {
    /** Orientation of the separator */
    orientation?: 'horizontal' | 'vertical';
    /** Thickness variant */
    thickness?: 'thin' | 'medium' | 'thick';
    /** Style variant */
    variant?: 'solid' | 'dashed' | 'dotted' | 'double';
    /** Custom CSS class */
    className?: string;
    /** Additional CSS properties */
    style?: React.CSSProperties;
    /** Decorative element in the middle (horizontal only) */
    label?: string | React.ReactNode;
    /** Position of the label */
    labelPosition?: 'start' | 'center' | 'end';
    /** ARIA label for accessibility */
    ariaLabel?: string;
}
export declare const Separator: React.FC<SeparatorProps>;
