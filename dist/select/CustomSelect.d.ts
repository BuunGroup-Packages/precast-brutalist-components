import React from 'react';
export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export interface SelectOptionGroup {
    label: string;
    options: SelectOption[];
}
export interface CustomSelectProps {
    variant?: 'default' | 'error' | 'success';
    size?: 'sm' | 'md' | 'lg';
    options?: (SelectOption | SelectOptionGroup)[];
    placeholder?: string;
    fullWidth?: boolean;
    brutalistShadow?: boolean;
    disabled?: boolean;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    className?: string;
    name?: string;
    id?: string;
}
export declare const CustomSelect: React.ForwardRefExoticComponent<CustomSelectProps & React.RefAttributes<HTMLDivElement>>;
