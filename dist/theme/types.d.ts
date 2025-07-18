export interface BrutalistTheme {
    id: string;
    name: string;
    description: string;
    colors: {
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
}
export interface ThemeContextValue {
    currentTheme: BrutalistTheme;
    setTheme: (theme: BrutalistTheme) => void;
    availableThemes: BrutalistTheme[];
    randomizeTheme: () => void;
    resetToDefault: () => void;
}
export type ThemeColors = BrutalistTheme['colors'];
export declare const CSS_VARIABLES_MAP: {
    readonly black: "--brutal-black";
    readonly white: "--brutal-white";
    readonly accent: "--brutal-accent";
    readonly accentDark: "--brutal-accent-dark";
    readonly gray50: "--brutal-gray-50";
    readonly gray100: "--brutal-gray-100";
    readonly gray200: "--brutal-gray-200";
    readonly gray300: "--brutal-gray-300";
    readonly gray400: "--brutal-gray-400";
    readonly gray500: "--brutal-gray-500";
    readonly gray700: "--brutal-gray-700";
    readonly gray900: "--brutal-gray-900";
    readonly warning: "--brutal-warning";
    readonly success: "--brutal-success";
    readonly error: "--brutal-error";
    readonly info: "--brutal-info";
};
export type CSSVariableKey = keyof typeof CSS_VARIABLES_MAP;
