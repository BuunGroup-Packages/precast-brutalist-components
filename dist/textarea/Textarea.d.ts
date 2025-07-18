import React, { TextareaHTMLAttributes } from 'react';
export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    variant?: 'default' | 'error' | 'success';
    size?: 'sm' | 'md' | 'lg';
    autoResize?: boolean;
    showCharacterCount?: boolean;
    maxCharacters?: number;
    minRows?: number;
    maxRows?: number;
    fullWidth?: boolean;
    brutalistShadow?: boolean;
    width?: string | number;
    minWidth?: string | number;
    maxWidth?: string | number;
}
export declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
