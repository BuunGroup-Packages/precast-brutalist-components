import { HTMLAttributes } from 'react';
export interface AlertStackProps extends HTMLAttributes<HTMLDivElement> {
    /** Direction of the stack */
    direction?: 'vertical' | 'horizontal';
    /** Gap between alerts */
    gap?: 'sm' | 'md' | 'lg';
}
export declare const AlertStack: import("react").ForwardRefExoticComponent<AlertStackProps & import("react").RefAttributes<HTMLDivElement>>;
