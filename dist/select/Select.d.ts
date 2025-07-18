import React, { SelectHTMLAttributes } from 'react';
export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export interface SelectOptionGroup {
    label: string;
    options: SelectOption[];
}
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    variant?: 'default' | 'error' | 'success';
    size?: 'sm' | 'md' | 'lg';
    options?: (SelectOption | SelectOptionGroup)[];
    placeholder?: string;
    fullWidth?: boolean;
    brutalistShadow?: boolean;
    customArrow?: boolean;
    useCustomDropdown?: boolean;
    onValueChange?: (value: string) => void;
}
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
