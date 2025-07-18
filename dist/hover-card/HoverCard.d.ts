import React, { ReactNode } from 'react';
export interface HoverCardProps {
    children: ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    openDelay?: number;
    closeDelay?: number;
}
export declare const HoverCard: React.FC<HoverCardProps> & {
    Trigger: typeof HoverCardTrigger;
    Content: typeof HoverCardContent;
};
export interface HoverCardTriggerProps {
    children: ReactNode;
    asChild?: boolean;
    className?: string;
}
declare const HoverCardTrigger: React.ForwardRefExoticComponent<HoverCardTriggerProps & React.RefAttributes<HTMLDivElement>>;
export interface HoverCardContentProps {
    children: ReactNode;
    className?: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
    alignOffset?: number;
    collisionBoundary?: 'viewport' | 'parent' | HTMLElement;
    hideWhenDetached?: boolean;
    brutalistShadow?: boolean;
}
declare const HoverCardContent: React.ForwardRefExoticComponent<HoverCardContentProps & React.RefAttributes<HTMLDivElement>>;
export { HoverCardTrigger, HoverCardContent };
