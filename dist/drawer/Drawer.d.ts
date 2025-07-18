import React from 'react';
interface DrawerProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    direction?: 'left' | 'right' | 'top' | 'bottom';
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    variant?: 'default' | 'brutal' | 'outline';
    className?: string;
    children?: React.ReactNode;
}
interface DrawerTriggerProps {
    children: React.ReactNode;
    className?: string;
    asChild?: boolean;
}
declare const DrawerTrigger: React.ForwardRefExoticComponent<DrawerTriggerProps & React.RefAttributes<HTMLButtonElement>>;
interface DrawerContentProps {
    children: React.ReactNode;
    className?: string;
    showOverlay?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
}
declare const DrawerContent: React.ForwardRefExoticComponent<DrawerContentProps & React.RefAttributes<HTMLDivElement>>;
interface DrawerHeaderProps {
    children: React.ReactNode;
    className?: string;
}
declare const DrawerHeader: React.ForwardRefExoticComponent<DrawerHeaderProps & React.RefAttributes<HTMLDivElement>>;
interface DrawerTitleProps {
    children: React.ReactNode;
    className?: string;
}
declare const DrawerTitle: React.ForwardRefExoticComponent<DrawerTitleProps & React.RefAttributes<HTMLHeadingElement>>;
interface DrawerDescriptionProps {
    children: React.ReactNode;
    className?: string;
}
declare const DrawerDescription: React.ForwardRefExoticComponent<DrawerDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
interface DrawerBodyProps {
    children: React.ReactNode;
    className?: string;
}
declare const DrawerBody: React.ForwardRefExoticComponent<DrawerBodyProps & React.RefAttributes<HTMLDivElement>>;
interface DrawerFooterProps {
    children: React.ReactNode;
    className?: string;
}
declare const DrawerFooter: React.ForwardRefExoticComponent<DrawerFooterProps & React.RefAttributes<HTMLDivElement>>;
interface DrawerCloseProps {
    children?: React.ReactNode;
    className?: string;
    asChild?: boolean;
}
declare const DrawerClose: React.ForwardRefExoticComponent<DrawerCloseProps & React.RefAttributes<HTMLButtonElement>>;
interface DrawerCompound extends React.ForwardRefExoticComponent<DrawerProps & React.RefAttributes<HTMLDivElement>> {
    Trigger: typeof DrawerTrigger;
    Content: typeof DrawerContent;
    Header: typeof DrawerHeader;
    Title: typeof DrawerTitle;
    Description: typeof DrawerDescription;
    Body: typeof DrawerBody;
    Footer: typeof DrawerFooter;
    Close: typeof DrawerClose;
}
declare const DrawerWithSubComponents: DrawerCompound;
export { DrawerWithSubComponents as Drawer };
export type { DrawerProps, DrawerTriggerProps, DrawerContentProps, DrawerHeaderProps, DrawerTitleProps, DrawerDescriptionProps, DrawerBodyProps, DrawerFooterProps, DrawerCloseProps };
