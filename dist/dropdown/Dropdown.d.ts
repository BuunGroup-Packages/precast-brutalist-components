import React, { HTMLAttributes } from 'react';
export type DropdownPosition = 'bottom' | 'bottom-start' | 'bottom-end' | 'top' | 'top-start' | 'top-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';
export interface DropdownProps {
    /** The trigger element */
    children: React.ReactNode;
    /** Whether the dropdown is open */
    open?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Position of the dropdown */
    position?: DropdownPosition;
    /** Alignment offset */
    offset?: number;
    /** Whether to close on item click */
    closeOnItemClick?: boolean;
    /** Whether to close when clicking outside */
    closeOnClickOutside?: boolean;
    /** Whether to close when pressing escape */
    closeOnEscape?: boolean;
    /** Additional CSS classes */
    className?: string;
}
interface DropdownContextValue {
    close: () => void;
    closeOnItemClick: boolean;
}
export declare const Dropdown: React.FC<DropdownProps> & {
    Menu: typeof DropdownMenu;
    Item: typeof DropdownItem;
    Separator: typeof DropdownSeparator;
    Label: typeof DropdownLabel;
};
export declare const DropdownMenu: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
interface DropdownItemProps extends HTMLAttributes<HTMLDivElement> {
    /** Whether the item is disabled */
    disabled?: boolean;
    /** Whether the item is destructive */
    destructive?: boolean;
    /** Icon to display before the text */
    icon?: React.ReactNode;
    /** Shortcut to display */
    shortcut?: string;
}
export declare const DropdownItem: React.ForwardRefExoticComponent<DropdownItemProps & React.RefAttributes<HTMLDivElement>>;
export declare const DropdownSeparator: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export declare const DropdownLabel: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export declare const useDropdown: () => DropdownContextValue;
export {};
