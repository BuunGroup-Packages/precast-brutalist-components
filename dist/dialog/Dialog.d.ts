import React, { HTMLAttributes } from 'react';
export interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Whether the dialog is open */
    open?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Whether to show backdrop */
    backdrop?: boolean;
    /** Whether clicking backdrop closes dialog */
    closeOnBackdropClick?: boolean;
    /** Whether pressing escape closes dialog */
    closeOnEscape?: boolean;
    /** Dialog size */
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    /** Dialog position */
    position?: 'center' | 'top' | 'bottom';
    /** Whether to animate the dialog */
    animate?: boolean;
    /** Whether to manage focus automatically */
    autoFocus?: boolean;
    /** Initial focus element selector */
    initialFocus?: string;
    /** Additional CSS classes */
    className?: string;
}
interface DialogContextValue {
    close: () => void;
}
export declare const Dialog: React.ForwardRefExoticComponent<DialogProps & React.RefAttributes<HTMLDivElement>>;
export declare const DialogHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export declare const DialogTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
export declare const DialogBody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export declare const DialogFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
interface DialogCloseProps extends HTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}
export declare const DialogClose: React.ForwardRefExoticComponent<DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
export declare const useDialog: () => DialogContextValue;
declare const DialogNamespace: React.ForwardRefExoticComponent<DialogProps & React.RefAttributes<HTMLDivElement>> & {
    Header: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
    Title: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
    Body: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
    Footer: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
    Close: React.ForwardRefExoticComponent<DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
};
export default DialogNamespace;
