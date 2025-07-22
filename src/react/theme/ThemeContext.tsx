/**
 * @module ThemeContext
 * @description Theme management system providing context for theme switching, persistence, and customization. Supports multiple predefined themes and custom theme generation.
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { BrutalistTheme, ThemeContextValue } from './types'
import { 
  DEFAULT_THEME, 
  AVAILABLE_THEMES,
  getThemeById 
} from './themes'
import { 
  applyTheme, 
  generateRandomTheme, 
  saveThemeToStorage, 
  loadThemeFromStorage, 
  resetToDefaultTheme,
  isValidTheme 
} from './utils'

// Create the theme context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

/**
 * Props for the ThemeProvider component
 */
export interface ThemeProviderProps {
  /** Child components that will have access to theme context */
  children: ReactNode
  /** Initial theme to use. If not provided, will try to load from localStorage or use default */
  initialTheme?: BrutalistTheme
  /** Whether to persist theme changes to localStorage
   * @default true
   */
  enablePersistence?: boolean
}

/**
 * ThemeProvider component that manages theme state and provides theme functionality
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme,
  enablePersistence = true,
}) => {
  // Initialize theme state
  const [currentTheme, setCurrentTheme] = useState<BrutalistTheme>(() => {
    // Priority: initialTheme > localStorage > default
    if (initialTheme && isValidTheme(initialTheme)) {
      return initialTheme
    }
    
    if (enablePersistence) {
      const savedTheme = loadThemeFromStorage()
      if (savedTheme && isValidTheme(savedTheme)) {
        return savedTheme
      }
    }
    
    return DEFAULT_THEME
  })

  // Apply theme when currentTheme changes
  useEffect(() => {
    applyTheme(currentTheme)
    
    if (enablePersistence) {
      saveThemeToStorage(currentTheme)
    }
  }, [currentTheme, enablePersistence])

  // Theme management functions
  const setTheme = (theme: BrutalistTheme) => {
    if (isValidTheme(theme)) {
      setCurrentTheme(theme)
    } else {
      console.warn('Invalid theme provided to setTheme:', theme)
    }
  }

  const randomizeTheme = () => {
    const randomTheme = generateRandomTheme()
    setCurrentTheme(randomTheme)
  }

  const resetToDefault = () => {
    setCurrentTheme(DEFAULT_THEME)
    if (enablePersistence) {
      resetToDefaultTheme()
    }
  }

  // Context value
  const contextValue: ThemeContextValue = {
    currentTheme,
    setTheme,
    availableThemes: AVAILABLE_THEMES,
    randomizeTheme,
    resetToDefault,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Hook to consume theme context
 * @returns ThemeContextValue
 * @throws Error if used outside of ThemeProvider
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  
  return context
}

/**
 * Hook to get current theme colors
 * @returns Current theme colors
 */
export const useThemeColors = () => {
  const { currentTheme } = useTheme()
  return currentTheme.colors
}

/**
 * Hook to check if a specific theme is currently active
 * @param themeId - Theme ID to check
 * @returns boolean indicating if theme is active
 */
export const useIsThemeActive = (themeId: string): boolean => {
  const { currentTheme } = useTheme()
  return currentTheme.id === themeId
}

/**
 * Hook to switch to a theme by ID
 * @returns Function to switch theme by ID
 */
export const useThemeSwitcher = () => {
  const { setTheme } = useTheme()
  
  return (themeId: string) => {
    const theme = getThemeById(themeId)
    if (theme) {
      setTheme(theme)
    } else {
      console.warn(`Theme with ID "${themeId}" not found`)
    }
  }
}