import React, { HTMLAttributes, ReactNode } from 'react';
export interface TypographyProps extends HTMLAttributes<HTMLElement> {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'lead' | 'large' | 'small' | 'muted' | 'blockquote' | 'code' | 'list';
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
    weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'black';
    align?: 'left' | 'center' | 'right' | 'justify';
    transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
    color?: 'default' | 'muted' | 'accent' | 'destructive' | 'warning' | 'success';
    family?: 'mono' | 'sans' | 'serif';
    truncate?: boolean;
    children: ReactNode;
    asChild?: boolean;
}
export declare const Typography: React.ForwardRefExoticComponent<TypographyProps & React.RefAttributes<HTMLElement>>;
export declare const TypographyH1: React.ForwardRefExoticComponent<Omit<TypographyProps, "variant"> & React.RefAttributes<HTMLHeadingElement>>;
export declare const TypographyH2: React.ForwardRefExoticComponent<Omit<TypographyProps, "variant"> & React.RefAttributes<HTMLHeadingElement>>;
export declare const TypographyH3: React.ForwardRefExoticComponent<Omit<TypographyProps, "variant"> & React.RefAttributes<HTMLHeadingElement>>;
export declare const TypographyH4: React.ForwardRefExoticComponent<Omit<TypographyProps, "variant"> & React.RefAttributes<HTMLHeadingElement>>;
export declare const TypographyP: React.ForwardRefExoticComponent<Omit<TypographyProps, "variant"> & React.RefAttributes<HTMLParagraphElement>>;
export declare const TypographyLead: React.ForwardRefExoticComponent<Omit<TypographyProps, "variant"> & React.RefAttributes<HTMLParagraphElement>>;
export declare const TypographyLarge: React.ForwardRefExoticComponent<Omit<TypographyProps, "variant"> & React.RefAttributes<HTMLParagraphElement>>;
export declare const TypographySmall: React.ForwardRefExoticComponent<Omit<TypographyProps, "variant"> & React.RefAttributes<HTMLParagraphElement>>;
export declare const TypographyMuted: React.ForwardRefExoticComponent<Omit<TypographyProps, "variant"> & React.RefAttributes<HTMLParagraphElement>>;
export declare const TypographyBlockquote: React.ForwardRefExoticComponent<Omit<TypographyProps, "variant"> & React.RefAttributes<HTMLQuoteElement>>;
export declare const TypographyCode: React.ForwardRefExoticComponent<Omit<TypographyProps, "variant"> & React.RefAttributes<HTMLElement>>;
export declare const TypographyList: React.ForwardRefExoticComponent<Omit<TypographyProps, "variant"> & React.RefAttributes<HTMLUListElement>>;
