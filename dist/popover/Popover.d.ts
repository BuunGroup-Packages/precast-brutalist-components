import React from 'react';
export type PopoverPosition = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' | 'auto';
export type PopoverTrigger = 'click' | 'focus' | 'manual';
export interface PopoverProps {
    /** The element that triggers the popover */
    children: React.ReactElement;
    /** The content to display inside the popover (when using simple mode) */
    content?: React.ReactNode;
    /** Position of the popover relative to the trigger */
    position?: PopoverPosition;
    /** How the popover is triggered */
    trigger?: PopoverTrigger;
    /** Whether the popover is currently visible (for manual trigger) */
    open?: boolean;
    /** Callback when visibility changes */
    onOpenChange?: (open: boolean) => void;
    /** Whether to close when clicking outside */
    closeOnClickOutside?: boolean;
    /** Whether to close when pressing escape */
    closeOnEscape?: boolean;
    /** Whether to show an arrow pointing to the trigger */
    showArrow?: boolean;
    /** Additional CSS classes */
    className?: string;
    /** Whether the popover is disabled */
    disabled?: boolean;
    /** Maximum width of the popover */
    maxWidth?: number;
    /** Whether to manage focus automatically */
    autoFocus?: boolean;
    /** Initial focus element selector */
    initialFocus?: string;
}
interface PopoverContextValue {
    close: () => void;
}
export declare const Popover: React.FC<PopoverProps> & {
    Content: typeof PopoverContent;
    Header: typeof PopoverHeader;
    Body: typeof PopoverBody;
    Footer: typeof PopoverFooter;
};
export declare const PopoverContent: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
export declare const PopoverHeader: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
export declare const PopoverBody: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
export declare const PopoverFooter: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
export declare const usePopover: () => PopoverContextValue;
export {};
