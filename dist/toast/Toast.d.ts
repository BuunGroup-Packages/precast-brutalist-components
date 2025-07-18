import React from 'react';
export type ToastType = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export interface ToastData {
    id: string;
    type: ToastType;
    title?: string;
    message: string;
    duration?: number;
    dismissible?: boolean;
    action?: {
        label: string;
        onClick: () => void;
    };
}
interface ToastContextValue {
    toasts: ToastData[];
    showToast: (toast: Omit<ToastData, 'id'>) => string;
    hideToast: (id: string) => void;
    hideAllToasts: () => void;
}
export interface ToastProviderProps {
    children: React.ReactNode;
    position?: ToastPosition;
    maxToasts?: number;
}
export declare const ToastProvider: React.FC<ToastProviderProps>;
export declare const useToast: () => ToastContextValue;
export declare const registerToastStore: (store: ToastContextValue) => void;
export declare const toast: {
    info: (message: string, options?: Partial<Omit<ToastData, "id" | "type" | "message">>) => string;
    success: (message: string, options?: Partial<Omit<ToastData, "id" | "type" | "message">>) => string;
    warning: (message: string, options?: Partial<Omit<ToastData, "id" | "type" | "message">>) => string;
    error: (message: string, options?: Partial<Omit<ToastData, "id" | "type" | "message">>) => string;
};
export {};
