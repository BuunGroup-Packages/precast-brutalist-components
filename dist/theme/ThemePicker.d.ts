import React from 'react';
import { BrutalistTheme } from './types';
export interface ThemePickerProps {
    /** Compact mode for smaller spaces */
    variant?: 'default' | 'compact';
    /** Show shadow */
    brutalistShadow?: boolean;
    /** Show code examples */
    showCode?: boolean;
    /** Custom className */
    className?: string;
    /** Callback when theme changes */
    onThemeChange?: (theme: BrutalistTheme) => void;
}
export declare const ThemePicker: React.FC<ThemePickerProps>;
