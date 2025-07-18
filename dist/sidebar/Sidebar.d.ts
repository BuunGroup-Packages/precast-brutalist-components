import React, { HTMLAttributes } from 'react';
export interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
    /** Whether the sidebar is collapsible */
    collapsible?: boolean;
    /** Whether the sidebar is collapsed */
    collapsed?: boolean;
    /** Callback when collapse state changes */
    onCollapsedChange?: (collapsed: boolean) => void;
    /** Sidebar position */
    side?: 'left' | 'right';
    /** Sidebar variant */
    variant?: 'default' | 'floating' | 'inset';
    /** Additional CSS classes */
    className?: string;
}
export interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional CSS classes */
    className?: string;
}
export interface SidebarContentProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional CSS classes */
    className?: string;
}
export interface SidebarFooterProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional CSS classes */
    className?: string;
}
export interface SidebarGroupProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional CSS classes */
    className?: string;
}
export interface SidebarGroupLabelProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional CSS classes */
    className?: string;
}
export interface SidebarGroupContentProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional CSS classes */
    className?: string;
}
export interface SidebarMenuProps extends HTMLAttributes<HTMLUListElement> {
    /** Additional CSS classes */
    className?: string;
}
export interface SidebarMenuItemProps extends HTMLAttributes<HTMLLIElement> {
    /** Additional CSS classes */
    className?: string;
}
export interface SidebarMenuButtonProps extends HTMLAttributes<HTMLButtonElement> {
    /** Whether the menu item is active */
    isActive?: boolean;
    /** Icon to display */
    icon?: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}
interface SidebarContextValue {
    collapsed: boolean;
    collapsible: boolean;
}
export declare const Sidebar: React.ForwardRefExoticComponent<SidebarProps & React.RefAttributes<HTMLDivElement>>;
export declare const SidebarHeader: React.ForwardRefExoticComponent<SidebarHeaderProps & React.RefAttributes<HTMLDivElement>>;
export declare const SidebarContent: React.ForwardRefExoticComponent<SidebarContentProps & React.RefAttributes<HTMLDivElement>>;
export declare const SidebarFooter: React.ForwardRefExoticComponent<SidebarFooterProps & React.RefAttributes<HTMLDivElement>>;
export declare const SidebarGroup: React.ForwardRefExoticComponent<SidebarGroupProps & React.RefAttributes<HTMLDivElement>>;
export declare const SidebarGroupLabel: React.ForwardRefExoticComponent<SidebarGroupLabelProps & React.RefAttributes<HTMLDivElement>>;
export declare const SidebarGroupContent: React.ForwardRefExoticComponent<SidebarGroupContentProps & React.RefAttributes<HTMLDivElement>>;
export declare const SidebarMenu: React.ForwardRefExoticComponent<SidebarMenuProps & React.RefAttributes<HTMLUListElement>>;
export declare const SidebarMenuItem: React.ForwardRefExoticComponent<SidebarMenuItemProps & React.RefAttributes<HTMLLIElement>>;
export declare const SidebarMenuButton: React.ForwardRefExoticComponent<SidebarMenuButtonProps & React.RefAttributes<HTMLButtonElement>>;
export declare const useSidebar: () => SidebarContextValue;
declare const SidebarNamespace: React.ForwardRefExoticComponent<SidebarProps & React.RefAttributes<HTMLDivElement>> & {
    Header: React.ForwardRefExoticComponent<SidebarHeaderProps & React.RefAttributes<HTMLDivElement>>;
    Content: React.ForwardRefExoticComponent<SidebarContentProps & React.RefAttributes<HTMLDivElement>>;
    Footer: React.ForwardRefExoticComponent<SidebarFooterProps & React.RefAttributes<HTMLDivElement>>;
    Group: React.ForwardRefExoticComponent<SidebarGroupProps & React.RefAttributes<HTMLDivElement>>;
    GroupLabel: React.ForwardRefExoticComponent<SidebarGroupLabelProps & React.RefAttributes<HTMLDivElement>>;
    GroupContent: React.ForwardRefExoticComponent<SidebarGroupContentProps & React.RefAttributes<HTMLDivElement>>;
    Menu: React.ForwardRefExoticComponent<SidebarMenuProps & React.RefAttributes<HTMLUListElement>>;
    MenuItem: React.ForwardRefExoticComponent<SidebarMenuItemProps & React.RefAttributes<HTMLLIElement>>;
    MenuButton: React.ForwardRefExoticComponent<SidebarMenuButtonProps & React.RefAttributes<HTMLButtonElement>>;
};
export default SidebarNamespace;
