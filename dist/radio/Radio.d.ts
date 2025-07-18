import React, { InputHTMLAttributes } from 'react';
export interface RadioGroupProps {
    name: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    children: React.ReactNode;
    direction?: 'horizontal' | 'vertical';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    error?: boolean;
    brutalistShadow?: boolean;
    className?: string;
}
export declare const RadioGroup: React.FC<RadioGroupProps>;
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange'> {
    value: string;
    label?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    error?: boolean;
    brutalistShadow?: boolean;
}
export declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLInputElement>>;
