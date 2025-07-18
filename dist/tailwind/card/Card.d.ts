import { HTMLAttributes } from 'react';
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    /** Visual variant of the card */
    variant?: 'elevated' | 'flat' | 'outline';
    /** Padding options */
    padding?: 'none' | 'sm' | 'md' | 'lg';
    /** Whether the card is clickable */
    clickable?: boolean;
    /** Whether to show hover effects */
    hover?: boolean;
}
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
}
export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
}
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
}
declare const Card: import("react").ForwardRefExoticComponent<CardProps & import("react").RefAttributes<HTMLDivElement>>;
declare const CardHeader: import("react").ForwardRefExoticComponent<CardHeaderProps & import("react").RefAttributes<HTMLDivElement>>;
declare const CardBody: import("react").ForwardRefExoticComponent<CardBodyProps & import("react").RefAttributes<HTMLDivElement>>;
declare const CardFooter: import("react").ForwardRefExoticComponent<CardFooterProps & import("react").RefAttributes<HTMLDivElement>>;
declare const CardComponent: typeof Card & {
    Header: typeof CardHeader;
    Body: typeof CardBody;
    Footer: typeof CardFooter;
};
export { CardComponent as Card };
