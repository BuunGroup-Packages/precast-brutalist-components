import React from 'react';
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';
export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';
export interface TooltipProps {
    /** The content to display inside the tooltip */
    content: React.ReactNode;
    /** The element that triggers the tooltip */
    children: React.ReactElement;
    /** Position of the tooltip relative to the trigger */
    position?: TooltipPosition;
    /** How the tooltip is triggered */
    trigger?: TooltipTrigger;
    /** Delay before showing tooltip (ms) */
    showDelay?: number;
    /** Delay before hiding tooltip (ms) */
    hideDelay?: number;
    /** Whether the tooltip is currently visible (for manual trigger) */
    visible?: boolean;
    /** Callback when visibility changes (for manual trigger) */
    onVisibilityChange?: (visible: boolean) => void;
    /** Whether to show an arrow pointing to the trigger */
    showArrow?: boolean;
    /** Additional CSS classes */
    className?: string;
    /** Whether the tooltip is disabled */
    disabled?: boolean;
    /** Maximum width of the tooltip */
    maxWidth?: number;
}
export declare const Tooltip: React.FC<TooltipProps>;
