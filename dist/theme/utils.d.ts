import { BrutalistTheme, ThemeColors } from './types';
/**
 * Applies a theme by setting CSS custom properties on the document root
 */
export declare const applyTheme: (theme: BrutalistTheme) => void;
/**
 * Generates a random theme by mixing colors from existing themes
 */
export declare const generateRandomTheme: () => BrutalistTheme;
/**
 * Generates CSS custom properties string for a theme
 */
export declare const generateThemeCSS: (theme: BrutalistTheme) => string;
/**
 * Generates JavaScript object for theme colors
 */
export declare const generateThemeJS: (theme: BrutalistTheme) => string;
/**
 * Creates a copy-ready CSS variables snippet
 */
export declare const generateCSSVariablesCode: (theme: BrutalistTheme) => string;
/**
 * Creates a copy-ready React theme provider code
 */
export declare const generateReactThemeCode: (theme: BrutalistTheme) => string;
/**
 * Generates separate theme definition file
 */
export declare const generateThemeFile: (theme: BrutalistTheme) => string;
/**
 * Generates App.tsx with theme provider
 */
export declare const generateAppFile: (theme: BrutalistTheme, componentName?: string) => string;
/**
 * Generates multi-file code examples
 */
export declare const generateMultiFileCode: (theme: BrutalistTheme, componentCode?: string, componentName?: string) => {
    "theme.ts": string;
    "App.tsx": string;
    "component.tsx": string;
};
/**
 * Saves theme to localStorage
 */
export declare const saveThemeToStorage: (theme: BrutalistTheme) => void;
/**
 * Loads theme from localStorage
 */
export declare const loadThemeFromStorage: () => BrutalistTheme | null;
/**
 * Validates if a theme object has all required properties
 */
export declare const isValidTheme: (theme: unknown) => theme is BrutalistTheme;
/**
 * Gets the current theme from CSS custom properties
 */
export declare const getCurrentThemeFromDOM: () => Partial<ThemeColors>;
/**
 * Resets theme to default
 */
export declare const resetToDefaultTheme: () => void;
