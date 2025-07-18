import React, { InputHTMLAttributes } from 'react';
export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    size?: 'sm' | 'md' | 'lg';
    orientation?: 'horizontal' | 'vertical';
    showValue?: boolean;
    marks?: number[] | {
        value: number;
        label?: string;
    }[];
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    className?: string;
    trackClassName?: string;
    thumbClassName?: string;
    valueClassName?: string;
}
export declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLInputElement>>;
