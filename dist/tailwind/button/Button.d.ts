import React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'brutal' | 'destructive' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    fullWidth?: boolean;
    loading?: boolean;
    brutalistShadow?: boolean;
    glitch?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
export declare const Button: React.FC<ButtonProps>;
