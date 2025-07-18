import React, { ReactNode } from 'react';
export interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    onSelect?: (value: string) => void;
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    filter?: (value: string, search: string, keywords?: string[]) => number;
    shouldFilter?: boolean;
    placeholder?: string;
}
export declare const Command: React.FC<CommandProps> & {
    Input: typeof CommandInput;
    List: typeof CommandList;
    Empty: typeof CommandEmpty;
    Group: typeof CommandGroup;
    Item: typeof CommandItem;
    Separator: typeof CommandSeparator;
};
export interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}
declare const CommandInput: React.ForwardRefExoticComponent<CommandInputProps & React.RefAttributes<HTMLInputElement>>;
export interface CommandListProps {
    children: ReactNode;
    className?: string;
}
declare const CommandList: React.ForwardRefExoticComponent<CommandListProps & React.RefAttributes<HTMLDivElement>>;
export interface CommandEmptyProps {
    children: ReactNode;
    className?: string;
}
declare const CommandEmpty: React.ForwardRefExoticComponent<CommandEmptyProps & React.RefAttributes<HTMLDivElement>>;
export interface CommandGroupProps {
    children: ReactNode;
    heading?: string;
    className?: string;
}
declare const CommandGroup: React.ForwardRefExoticComponent<CommandGroupProps & React.RefAttributes<HTMLDivElement>>;
export interface CommandItemProps {
    children: ReactNode;
    value: string;
    keywords?: string[];
    disabled?: boolean;
    className?: string;
    onSelect?: (value: string) => void;
}
declare const CommandItem: React.ForwardRefExoticComponent<CommandItemProps & React.RefAttributes<HTMLDivElement>>;
export interface CommandSeparatorProps {
    className?: string;
}
declare const CommandSeparator: React.ForwardRefExoticComponent<CommandSeparatorProps & React.RefAttributes<HTMLDivElement>>;
export { CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator };
