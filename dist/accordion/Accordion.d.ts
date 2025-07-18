import { HTMLAttributes, ReactNode } from 'react';
export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
    /** Type of accordion behavior */
    type?: 'single' | 'multiple';
    /** For single type: whether an item can be collapsed */
    collapsible?: boolean;
    /** Default open items (for controlled) */
    defaultValue?: string | string[];
    /** Controlled value */
    value?: string | string[];
    /** Callback when value changes */
    onValueChange?: (value: string | string[]) => void;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Visual variant */
    variant?: 'default' | 'brutal' | 'outline';
    /** Disabled state */
    disabled?: boolean;
}
export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
    /** Unique value for this item */
    value: string;
    /** Whether this item is disabled */
    disabled?: boolean;
}
export interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    /** Custom icon to display */
    icon?: ReactNode;
    /** Hide the default chevron icon */
    hideIcon?: boolean;
}
export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
    /** Content to display when expanded */
    children: ReactNode;
}
declare const Accordion: import("react").ForwardRefExoticComponent<AccordionProps & import("react").RefAttributes<HTMLDivElement>>;
declare const AccordionItem: import("react").ForwardRefExoticComponent<AccordionItemProps & import("react").RefAttributes<HTMLDivElement>>;
declare const AccordionTrigger: import("react").ForwardRefExoticComponent<AccordionTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
declare const AccordionContent: import("react").ForwardRefExoticComponent<AccordionContentProps & import("react").RefAttributes<HTMLDivElement>>;
declare const AccordionComponent: typeof Accordion & {
    Item: typeof AccordionItem;
    Trigger: typeof AccordionTrigger;
    Content: typeof AccordionContent;
};
export { AccordionComponent as Accordion };
