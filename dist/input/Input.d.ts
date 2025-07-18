import React, { InputHTMLAttributes } from 'react';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    variant?: 'default' | 'error' | 'success';
    size?: 'sm' | 'md' | 'lg';
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
    brutalistShadow?: boolean;
}
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
