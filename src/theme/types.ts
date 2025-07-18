export interface BrutalistTheme {
  id: string
  name: string
  description: string
  colors: {
    // Primary colors
    black: string
    white: string
    accent: string
    accentDark: string
    
    // Gray scale
    gray50: string
    gray100: string
    gray200: string
    gray300: string
    gray400: string
    gray500: string
    gray700: string
    gray900: string
    
    // Status colors
    warning: string
    success: string
    error: string
    info: string
  }
}

export interface ThemeContextValue {
  currentTheme: BrutalistTheme
  setTheme: (theme: BrutalistTheme) => void
  availableThemes: BrutalistTheme[]
  randomizeTheme: () => void
  resetToDefault: () => void
}

export type ThemeColors = BrutalistTheme['colors']

// CSS custom properties mapping
export const CSS_VARIABLES_MAP = {
  black: '--brutal-black',
  white: '--brutal-white',
  accent: '--brutal-accent',
  accentDark: '--brutal-accent-dark',
  gray50: '--brutal-gray-50',
  gray100: '--brutal-gray-100',
  gray200: '--brutal-gray-200',
  gray300: '--brutal-gray-300',
  gray400: '--brutal-gray-400',
  gray500: '--brutal-gray-500',
  gray700: '--brutal-gray-700',
  gray900: '--brutal-gray-900',
  warning: '--brutal-warning',
  success: '--brutal-success',
  error: '--brutal-error',
  info: '--brutal-info',
} as const

export type CSSVariableKey = keyof typeof CSS_VARIABLES_MAP