import React, { ReactNode } from 'react';
import { BrutalistTheme, ThemeContextValue } from './types';
export interface ThemeProviderProps {
    children: ReactNode;
    /** Initial theme to use. If not provided, will try to load from localStorage or use default */
    initialTheme?: BrutalistTheme;
    /** Whether to persist theme changes to localStorage */
    enablePersistence?: boolean;
}
/**
 * ThemeProvider component that manages theme state and provides theme functionality
 */
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
/**
 * Hook to consume theme context
 * @returns ThemeContextValue
 * @throws Error if used outside of ThemeProvider
 */
export declare const useTheme: () => ThemeContextValue;
/**
 * Hook to get current theme colors
 * @returns Current theme colors
 */
export declare const useThemeColors: () => {
    black: string;
    white: string;
    accent: string;
    accentDark: string;
    gray50: string;
    gray100: string;
    gray200: string;
    gray300: string;
    gray400: string;
    gray500: string;
    gray700: string;
    gray900: string;
    warning: string;
    success: string;
    error: string;
    info: string;
};
/**
 * Hook to check if a specific theme is currently active
 * @param themeId - Theme ID to check
 * @returns boolean indicating if theme is active
 */
export declare const useIsThemeActive: (themeId: string) => boolean;
/**
 * Hook to switch to a theme by ID
 * @returns Function to switch theme by ID
 */
export declare const useThemeSwitcher: () => (themeId: string) => void;
