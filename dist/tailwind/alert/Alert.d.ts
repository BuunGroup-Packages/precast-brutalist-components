import { HTMLAttributes } from 'react';
export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
    /** Type of alert */
    type?: 'info' | 'success' | 'warning' | 'error';
    /** Visual variant */
    variant?: 'filled' | 'outline';
    /** Size of the alert */
    size?: 'sm' | 'md' | 'lg';
    /** Whether the alert can be dismissed */
    dismissible?: boolean;
    /** Callback when alert is dismissed */
    onDismiss?: () => void;
}
export interface AlertIconProps extends HTMLAttributes<HTMLDivElement> {
}
export interface AlertContentProps extends HTMLAttributes<HTMLDivElement> {
}
export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {
}
export interface AlertDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
}
export interface AlertActionsProps extends HTMLAttributes<HTMLDivElement> {
}
declare const Alert: import("react").ForwardRefExoticComponent<AlertProps & import("react").RefAttributes<HTMLDivElement>>;
declare const AlertIcon: import("react").ForwardRefExoticComponent<AlertIconProps & import("react").RefAttributes<HTMLDivElement>>;
declare const AlertContent: import("react").ForwardRefExoticComponent<AlertContentProps & import("react").RefAttributes<HTMLDivElement>>;
declare const AlertTitle: import("react").ForwardRefExoticComponent<AlertTitleProps & import("react").RefAttributes<HTMLHeadingElement>>;
declare const AlertDescription: import("react").ForwardRefExoticComponent<AlertDescriptionProps & import("react").RefAttributes<HTMLParagraphElement>>;
declare const AlertActions: import("react").ForwardRefExoticComponent<AlertActionsProps & import("react").RefAttributes<HTMLDivElement>>;
declare const AlertComponent: typeof Alert & {
    Icon: typeof AlertIcon;
    Content: typeof AlertContent;
    Title: typeof AlertTitle;
    Description: typeof AlertDescription;
    Actions: typeof AlertActions;
};
export { AlertComponent as Alert };
