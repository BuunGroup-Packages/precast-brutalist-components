import { HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from 'react';
export interface TableProps extends HTMLAttributes<HTMLTableElement> {
    /** Table variant */
    variant?: 'default' | 'striped' | 'bordered';
    /** Table size */
    size?: 'sm' | 'md' | 'lg';
    /** Whether the table is hoverable */
    hoverable?: boolean;
    /** Whether the table should be full width */
    fullWidth?: boolean;
    /** Additional CSS classes */
    className?: string;
}
export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
    /** Whether the header is sticky */
    sticky?: boolean;
    /** Additional CSS classes */
    className?: string;
}
export interface TableHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
    /** Alignment of the header */
    align?: 'left' | 'center' | 'right';
    /** Whether the column is sortable */
    sortable?: boolean;
    /** Sort direction if sortable */
    sortDirection?: 'asc' | 'desc' | 'none';
    /** Callback when sort is clicked */
    onSort?: () => void;
    /** Additional CSS classes */
    className?: string;
}
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
    /** Alignment of the cell */
    align?: 'left' | 'center' | 'right';
    /** Whether the cell contains numeric data */
    numeric?: boolean;
    /** Additional CSS classes */
    className?: string;
}
export declare const Table: import("react").ForwardRefExoticComponent<TableProps & import("react").RefAttributes<HTMLTableElement>>;
export declare const TableHead: import("react").ForwardRefExoticComponent<TableHeadProps & import("react").RefAttributes<HTMLTableSectionElement>>;
export declare const TableBody: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement> & import("react").RefAttributes<HTMLTableSectionElement>>;
export declare const TableRow: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLTableRowElement> & import("react").RefAttributes<HTMLTableRowElement>>;
export declare const TableHeader: import("react").ForwardRefExoticComponent<TableHeaderProps & import("react").RefAttributes<HTMLTableCellElement>>;
export declare const TableCell: import("react").ForwardRefExoticComponent<TableCellProps & import("react").RefAttributes<HTMLTableCellElement>>;
declare const TableNamespace: import("react").ForwardRefExoticComponent<TableProps & import("react").RefAttributes<HTMLTableElement>> & {
    Head: import("react").ForwardRefExoticComponent<TableHeadProps & import("react").RefAttributes<HTMLTableSectionElement>>;
    Body: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement> & import("react").RefAttributes<HTMLTableSectionElement>>;
    Row: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLTableRowElement> & import("react").RefAttributes<HTMLTableRowElement>>;
    Header: import("react").ForwardRefExoticComponent<TableHeaderProps & import("react").RefAttributes<HTMLTableCellElement>>;
    Cell: import("react").ForwardRefExoticComponent<TableCellProps & import("react").RefAttributes<HTMLTableCellElement>>;
};
export default TableNamespace;
