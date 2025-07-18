import React from 'react';
interface ComboboxOption {
    value: string;
    label: string;
    disabled?: boolean;
}
interface ComboboxProps {
    options: ComboboxOption[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    emptyMessage?: string;
    searchPlaceholder?: string;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'brutal' | 'outline' | 'info' | 'system' | 'destructive' | 'success' | 'warning' | 'ghost' | 'neon' | 'retro';
    style?: React.CSSProperties;
}
interface ComboboxTriggerProps {
    children?: React.ReactNode;
    className?: string;
    placeholder?: string;
    icon?: React.ReactNode;
}
declare const ComboboxTrigger: React.ForwardRefExoticComponent<ComboboxTriggerProps & React.RefAttributes<HTMLButtonElement>>;
interface ComboboxContentProps {
    children?: React.ReactNode;
    className?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
}
declare const ComboboxContent: React.ForwardRefExoticComponent<ComboboxContentProps & React.RefAttributes<HTMLDivElement>>;
interface ComboboxOptionProps {
    value: string;
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
}
declare const ComboboxOption: React.ForwardRefExoticComponent<ComboboxOptionProps & React.RefAttributes<HTMLDivElement>>;
interface ComboboxCompound extends React.ForwardRefExoticComponent<ComboboxProps & React.RefAttributes<HTMLDivElement>> {
    Trigger: typeof ComboboxTrigger;
    Content: typeof ComboboxContent;
    Option: typeof ComboboxOption;
}
declare const ComboboxWithSubComponents: ComboboxCompound;
export { ComboboxWithSubComponents as Combobox };
export type { ComboboxProps, ComboboxOption, ComboboxTriggerProps, ComboboxContentProps, ComboboxOptionProps };
