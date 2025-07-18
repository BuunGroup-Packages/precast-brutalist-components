import { HTMLAttributes } from 'react';
export interface StackProps extends HTMLAttributes<HTMLDivElement> {
    /** Stack direction */
    direction?: 'horizontal' | 'vertical';
    /** Gap between items */
    gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /** Alignment of items */
    align?: 'start' | 'center' | 'end' | 'stretch';
    /** Justification of items */
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    /** Whether items should wrap */
    wrap?: boolean;
    /** Stack element type */
    as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'nav';
    /** Additional CSS classes */
    className?: string;
}
export declare const Stack: import("react").ForwardRefExoticComponent<StackProps & import("react").RefAttributes<HTMLDivElement>>;
