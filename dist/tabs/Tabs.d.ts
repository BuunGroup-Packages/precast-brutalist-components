import React, { HTMLAttributes } from 'react';
export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
    /** The default active tab */
    defaultValue?: string;
    /** The controlled active tab */
    value?: string;
    /** Callback when active tab changes */
    onValueChange?: (value: string) => void;
    /** Orientation of the tabs */
    orientation?: 'horizontal' | 'vertical';
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Whether tabs should be full width */
    fullWidth?: boolean;
    /** Additional CSS classes */
    className?: string;
}
interface TabsContextValue {
    activeTab: string;
    setActiveTab: (value: string) => void;
    orientation: 'horizontal' | 'vertical';
    size: 'sm' | 'md' | 'lg';
}
export declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;
interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional CSS classes */
    className?: string;
}
export declare const TabsList: React.ForwardRefExoticComponent<TabsListProps & React.RefAttributes<HTMLDivElement>>;
interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    /** The value of the tab */
    value: string;
    /** Whether the tab is disabled */
    disabled?: boolean;
    /** Additional CSS classes */
    className?: string;
}
export declare const TabsTrigger: React.ForwardRefExoticComponent<TabsTriggerProps & React.RefAttributes<HTMLButtonElement>>;
interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
    /** The value of the tab */
    value: string;
    /** Whether to force mount the content */
    forceMount?: boolean;
    /** Additional CSS classes */
    className?: string;
}
export declare const TabsContent: React.ForwardRefExoticComponent<TabsContentProps & React.RefAttributes<HTMLDivElement>>;
export declare const useTabs: () => TabsContextValue;
declare const TabsNamespace: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>> & {
    List: React.ForwardRefExoticComponent<TabsListProps & React.RefAttributes<HTMLDivElement>>;
    Trigger: React.ForwardRefExoticComponent<TabsTriggerProps & React.RefAttributes<HTMLButtonElement>>;
    Content: React.ForwardRefExoticComponent<TabsContentProps & React.RefAttributes<HTMLDivElement>>;
};
export default TabsNamespace;
