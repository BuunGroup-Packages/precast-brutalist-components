import React, { InputHTMLAttributes } from 'react';
export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    size?: 'sm' | 'md' | 'lg';
    label?: React.ReactNode;
    labelPosition?: 'left' | 'right';
    loading?: boolean;
    brutalistShadow?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}
export declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLInputElement>>;
