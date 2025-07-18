import React, { HTMLAttributes } from 'react';
export interface NavigationProps extends HTMLAttributes<HTMLElement> {
    /** Whether the navigation is vertical */
    vertical?: boolean;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Additional CSS classes */
    className?: string;
}
export interface NavigationListProps extends HTMLAttributes<HTMLUListElement> {
    /** Additional CSS classes */
    className?: string;
}
export interface NavigationItemProps extends HTMLAttributes<HTMLLIElement> {
    /** Whether the item is active */
    isActive?: boolean;
    /** Whether the item is disabled */
    disabled?: boolean;
    /** Additional CSS classes */
    className?: string;
}
export interface NavigationLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    /** Link href */
    href?: string;
    /** Whether the link is active */
    isActive?: boolean;
    /** Whether the link is disabled */
    disabled?: boolean;
    /** Icon to display */
    icon?: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}
export interface NavigationSeparatorProps extends HTMLAttributes<HTMLHRElement> {
    /** Additional CSS classes */
    className?: string;
}
interface NavigationComponent extends React.ForwardRefExoticComponent<NavigationProps & React.RefAttributes<HTMLElement>> {
    List: typeof NavigationList;
    Item: typeof NavigationItem;
    Link: typeof NavigationLink;
    Separator: typeof NavigationSeparator;
}
export declare const Navigation: NavigationComponent;
export declare const NavigationList: React.ForwardRefExoticComponent<NavigationListProps & React.RefAttributes<HTMLUListElement>>;
export declare const NavigationItem: React.ForwardRefExoticComponent<NavigationItemProps & React.RefAttributes<HTMLLIElement>>;
export declare const NavigationLink: React.ForwardRefExoticComponent<NavigationLinkProps & React.RefAttributes<HTMLAnchorElement>>;
export declare const NavigationSeparator: React.ForwardRefExoticComponent<NavigationSeparatorProps & React.RefAttributes<HTMLHRElement>>;
export {};
