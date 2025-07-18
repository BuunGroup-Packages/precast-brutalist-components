import React, { InputHTMLAttributes } from 'react';
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    size?: 'sm' | 'md' | 'lg';
    label?: React.ReactNode;
    indeterminate?: boolean;
    error?: boolean;
    brutalistShadow?: boolean;
}
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;
