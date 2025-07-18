import React, { HTMLAttributes } from 'react';
export interface TableOfContentsProps extends HTMLAttributes<HTMLElement> {
    /** Title for the table of contents */
    title?: string;
    /** Whether to show the title */
    showTitle?: boolean;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Position variant */
    position?: 'default' | 'sticky' | 'floating';
    /** Additional CSS classes */
    className?: string;
}
export interface TableOfContentsListProps extends HTMLAttributes<HTMLOListElement> {
    /** Additional CSS classes */
    className?: string;
}
export interface TableOfContentsItemProps extends HTMLAttributes<HTMLLIElement> {
    /** Heading level (1-6) */
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Whether the item is active */
    isActive?: boolean;
    /** Additional CSS classes */
    className?: string;
}
export interface TableOfContentsLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    /** Link href (usually an anchor) */
    href: string;
    /** Whether the link is active */
    isActive?: boolean;
    /** Heading level for styling */
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Additional CSS classes */
    className?: string;
}
export interface TableOfContentsComponent extends React.ForwardRefExoticComponent<TableOfContentsProps & React.RefAttributes<HTMLElement>> {
    List: typeof TableOfContentsList;
    Item: typeof TableOfContentsItem;
    Link: typeof TableOfContentsLink;
}
export declare const TableOfContents: TableOfContentsComponent;
export declare const TableOfContentsList: React.ForwardRefExoticComponent<TableOfContentsListProps & React.RefAttributes<HTMLOListElement>>;
export declare const TableOfContentsItem: React.ForwardRefExoticComponent<TableOfContentsItemProps & React.RefAttributes<HTMLLIElement>>;
export declare const TableOfContentsLink: React.ForwardRefExoticComponent<TableOfContentsLinkProps & React.RefAttributes<HTMLAnchorElement>>;
