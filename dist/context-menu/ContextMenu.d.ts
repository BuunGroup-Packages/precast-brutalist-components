import React from 'react';
export interface ContextMenuProps {
    children: React.ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'brutal' | 'dark';
    onOpenChange?: (open: boolean) => void;
}
export interface ContextMenuTriggerProps {
    children: React.ReactNode;
    className?: string;
    asChild?: boolean;
}
export interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
    alignOffset?: number;
    collisionPadding?: number;
    avoidCollisions?: boolean;
    container?: HTMLElement | null;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'brutal' | 'dark';
}
export interface ContextMenuItemProps {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    destructive?: boolean;
    onSelect?: (e: React.MouseEvent) => void;
    closeOnSelect?: boolean;
    icon?: React.ReactNode;
    shortcut?: string;
    checked?: boolean;
    dotted?: boolean;
}
export interface ContextMenuSeparatorProps {
    className?: string;
}
export interface ContextMenuLabelProps {
    children: React.ReactNode;
    className?: string;
}
export interface ContextMenuSubProps {
    children: React.ReactNode;
    className?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
export interface ContextMenuSubTriggerProps {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
}
export interface ContextMenuSubContentProps extends Omit<ContextMenuContentProps, 'container'> {
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}
export declare const ContextMenuNamespace: React.ForwardRefExoticComponent<ContextMenuProps & React.RefAttributes<HTMLDivElement>> & {
    Trigger: React.ForwardRefExoticComponent<ContextMenuTriggerProps & React.RefAttributes<HTMLDivElement>>;
    Content: React.ForwardRefExoticComponent<ContextMenuContentProps & React.RefAttributes<HTMLDivElement>>;
    Item: React.ForwardRefExoticComponent<ContextMenuItemProps & React.RefAttributes<HTMLDivElement>>;
    Separator: React.ForwardRefExoticComponent<ContextMenuSeparatorProps & React.RefAttributes<HTMLDivElement>>;
    Label: React.ForwardRefExoticComponent<ContextMenuLabelProps & React.RefAttributes<HTMLDivElement>>;
    Sub: React.ForwardRefExoticComponent<ContextMenuSubProps & React.RefAttributes<HTMLDivElement>>;
    SubTrigger: React.ForwardRefExoticComponent<ContextMenuSubTriggerProps & React.RefAttributes<HTMLDivElement>>;
    SubContent: React.ForwardRefExoticComponent<ContextMenuSubContentProps & React.RefAttributes<HTMLDivElement>>;
};
export { ContextMenuNamespace as ContextMenu };
