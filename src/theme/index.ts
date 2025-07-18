// Types
export type { 
  BrutalistTheme, 
  ThemeContextValue, 
  ThemeColors, 
  CSSVariableKey 
} from './types'

// Theme context and provider
export { 
  ThemeProvider, 
  useTheme, 
  useThemeColors, 
  useIsThemeActive, 
  useThemeSwitcher 
} from './ThemeContext'

// Theme picker component
export { ThemePicker } from './ThemePicker'
export type { ThemePickerProps } from './ThemePicker'

// Predefined themes
export {
  CLASSIC_THEME,
  NEON_THEME,
  PASTEL_THEME,
  DARK_THEME,
  RETRO_THEME,
  NATURE_THEME,
  OCEAN_THEME,
  MONOCHROME_THEME,
  AVAILABLE_THEMES,
  DEFAULT_THEME,
  getThemeById,
} from './themes'

// Utilities
export {
  applyTheme,
  generateRandomTheme,
  generateThemeCSS,
  generateThemeJS,
  generateCSSVariablesCode,
  generateReactThemeCode,
  generateThemeFile,
  generateAppFile,
  generateMultiFileCode,
  saveThemeToStorage,
  loadThemeFromStorage,
  isValidTheme,
  getCurrentThemeFromDOM,
  resetToDefaultTheme,
} from './utils'