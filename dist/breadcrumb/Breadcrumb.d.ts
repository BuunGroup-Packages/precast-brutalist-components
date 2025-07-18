import React, { HTMLAttributes, AnchorHTMLAttributes } from 'react';
export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
    /** Separator between breadcrumb items */
    separator?: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}
export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
    /** Whether this item is the current page */
    isCurrentPage?: boolean;
    /** Additional CSS classes */
    className?: string;
}
export interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Additional CSS classes */
    className?: string;
}
export declare const Breadcrumb: React.ForwardRefExoticComponent<BreadcrumbProps & React.RefAttributes<HTMLElement>>;
export declare const BreadcrumbItem: React.ForwardRefExoticComponent<BreadcrumbItemProps & React.RefAttributes<HTMLLIElement>>;
export declare const BreadcrumbLink: React.ForwardRefExoticComponent<BreadcrumbLinkProps & React.RefAttributes<HTMLAnchorElement>>;
export declare const BreadcrumbPage: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;
declare const BreadcrumbNamespace: React.ForwardRefExoticComponent<BreadcrumbProps & React.RefAttributes<HTMLElement>> & {
    Item: React.ForwardRefExoticComponent<BreadcrumbItemProps & React.RefAttributes<HTMLLIElement>>;
    Link: React.ForwardRefExoticComponent<BreadcrumbLinkProps & React.RefAttributes<HTMLAnchorElement>>;
    Page: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;
};
export default BreadcrumbNamespace;
