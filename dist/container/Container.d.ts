import { HTMLAttributes } from 'react';
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    /** Container size */
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    /** Whether the container should be centered */
    centered?: boolean;
    /** Container padding */
    padding?: 'none' | 'sm' | 'md' | 'lg';
    /** Additional CSS classes */
    className?: string;
}
export declare const Container: import("react").ForwardRefExoticComponent<ContainerProps & import("react").RefAttributes<HTMLDivElement>>;
