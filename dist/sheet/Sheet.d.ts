import React from 'react';
interface SheetProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: React.ReactNode;
    className?: string;
}
interface SheetTriggerProps {
    children: React.ReactNode;
    className?: string;
    asChild?: boolean;
}
interface SheetContentProps {
    children: React.ReactNode;
    className?: string;
    side?: 'top' | 'bottom' | 'left' | 'right';
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    variant?: 'default' | 'brutal' | 'outline';
    showOverlay?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    container?: HTMLElement | null;
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    onPointerDownOutside?: (event: PointerEvent) => void;
    onInteractOutside?: (event: Event) => void;
    onOpenAutoFocus?: (event: Event) => void;
    onCloseAutoFocus?: (event: Event) => void;
}
interface SheetHeaderProps {
    children: React.ReactNode;
    className?: string;
}
interface SheetTitleProps {
    children: React.ReactNode;
    className?: string;
}
interface SheetDescriptionProps {
    children: React.ReactNode;
    className?: string;
}
interface SheetFooterProps {
    children: React.ReactNode;
    className?: string;
}
interface SheetCloseProps {
    children: React.ReactNode;
    className?: string;
    asChild?: boolean;
}
export declare const SheetNamespace: React.ForwardRefExoticComponent<SheetProps & React.RefAttributes<HTMLDivElement>> & {
    Trigger: React.ForwardRefExoticComponent<SheetTriggerProps & React.RefAttributes<HTMLButtonElement>>;
    Content: React.ForwardRefExoticComponent<SheetContentProps & React.RefAttributes<HTMLDivElement>>;
    Header: React.ForwardRefExoticComponent<SheetHeaderProps & React.RefAttributes<HTMLDivElement>>;
    Title: React.ForwardRefExoticComponent<SheetTitleProps & React.RefAttributes<HTMLHeadingElement>>;
    Description: React.ForwardRefExoticComponent<SheetDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
    Footer: React.ForwardRefExoticComponent<SheetFooterProps & React.RefAttributes<HTMLDivElement>>;
    Close: React.ForwardRefExoticComponent<SheetCloseProps & React.RefAttributes<HTMLButtonElement>>;
};
export { SheetNamespace as Sheet };
export type { SheetProps, SheetTriggerProps, SheetContentProps, SheetHeaderProps, SheetTitleProps, SheetDescriptionProps, SheetFooterProps, SheetCloseProps };
