import React, { ButtonHTMLAttributes } from 'react';
export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    variant?: 'default' | 'brutal' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    pressed?: boolean;
    defaultPressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
    brutalistShadow?: boolean;
    asChild?: boolean;
}
export declare const Toggle: React.ForwardRefExoticComponent<ToggleProps & React.RefAttributes<HTMLButtonElement>>;
