import { BrutalistTheme, ThemeColors, CSS_VARIABLES_MAP, CSSVariableKey } from './types'
import { AVAILABLE_THEMES, DEFAULT_THEME } from './themes'

/**
 * Applies a theme by setting CSS custom properties on the document root
 */
export const applyTheme = (theme: BrutalistTheme): void => {
  const root = document.documentElement
  
  Object.entries(theme.colors).forEach(([colorKey, colorValue]) => {
    const cssVariable = CSS_VARIABLES_MAP[colorKey as CSSVariableKey]
    if (cssVariable) {
      root.style.setProperty(cssVariable, colorValue)
    }
  })
}

/**
 * Generates a random theme by mixing colors from existing themes
 */
export const generateRandomTheme = (): BrutalistTheme => {
  const randomId = `random-${Date.now()}`
  
  // Get random colors from different themes
  const randomColors: ThemeColors = {
    black: getRandomColorFromThemes('black'),
    white: getRandomColorFromThemes('white'),
    accent: getRandomColorFromThemes('accent'),
    accentDark: getRandomColorFromThemes('accentDark'),
    gray50: getRandomColorFromThemes('gray50'),
    gray100: getRandomColorFromThemes('gray100'),
    gray200: getRandomColorFromThemes('gray200'),
    gray300: getRandomColorFromThemes('gray300'),
    gray400: getRandomColorFromThemes('gray400'),
    gray500: getRandomColorFromThemes('gray500'),
    gray700: getRandomColorFromThemes('gray700'),
    gray900: getRandomColorFromThemes('gray900'),
    warning: getRandomColorFromThemes('warning'),
    success: getRandomColorFromThemes('success'),
    error: getRandomColorFromThemes('error'),
    info: getRandomColorFromThemes('info'),
  }

  return {
    id: randomId,
    name: 'Random Theme',
    description: 'Randomly generated color combination',
    colors: randomColors
  }
}

/**
 * Gets a random color value for a specific color key from all available themes
 */
const getRandomColorFromThemes = (colorKey: keyof ThemeColors): string => {
  const randomTheme = AVAILABLE_THEMES[Math.floor(Math.random() * AVAILABLE_THEMES.length)]
  return randomTheme.colors[colorKey]
}

/**
 * Generates CSS custom properties string for a theme
 */
export const generateThemeCSS = (theme: BrutalistTheme): string => {
  const cssLines = Object.entries(theme.colors).map(([colorKey, colorValue]) => {
    const cssVariable = CSS_VARIABLES_MAP[colorKey as CSSVariableKey]
    return `  ${cssVariable}: ${colorValue};`
  })
  
  return `:root {\n${cssLines.join('\n')}\n}`
}

/**
 * Generates JavaScript object for theme colors
 */
export const generateThemeJS = (theme: BrutalistTheme): string => {
  const jsObject = JSON.stringify(theme.colors, null, 2)
  return `const theme = ${jsObject}`
}

/**
 * Creates a copy-ready CSS variables snippet
 */
export const generateCSSVariablesCode = (theme: BrutalistTheme): string => {
  return `/* ${theme.name} Theme */\n${generateThemeCSS(theme)}`
}

/**
 * Creates a copy-ready React theme provider code
 */
export const generateReactThemeCode = (theme: BrutalistTheme): string => {
  return `import { ThemeProvider } from '@brutalist-ui/components'

const ${theme.id}Theme = ${JSON.stringify(theme, null, 2)}

function App() {
  return (
    <ThemeProvider theme={${theme.id}Theme}>
      {/* Your components */}
    </ThemeProvider>
  )
}`
}

/**
 * Generates separate theme definition file
 */
export const generateThemeFile = (theme: BrutalistTheme): string => {
  return `import { BrutalistTheme } from '@brutalist-ui/components'

export const ${theme.id}Theme: BrutalistTheme = ${JSON.stringify(theme, null, 2)}

export default ${theme.id}Theme`
}

/**
 * Generates App.tsx with theme provider
 */
export const generateAppFile = (theme: BrutalistTheme, componentName?: string): string => {
  const componentImport = componentName ? `import ${componentName} from './components/${componentName}'` : "import YourComponent from './components/YourComponent'"
  const componentUsage = componentName ? `<${componentName} />` : '<YourComponent />'
  
  return `import React from 'react'
import { ThemeProvider } from '@brutalist-ui/components'
import { ${theme.id}Theme } from './theme'
${componentImport}

function App() {
  return (
    <ThemeProvider theme={${theme.id}Theme}>
      <div className="app">
        ${componentUsage}
      </div>
    </ThemeProvider>
  )
}

export default App`
}

/**
 * Generates multi-file code examples
 */
export const generateMultiFileCode = (theme: BrutalistTheme, componentCode?: string, componentName?: string): {
  'theme.ts': string
  'App.tsx': string
  'component.tsx': string
} => {
  return {
    'theme.ts': generateThemeFile(theme),
    'App.tsx': generateAppFile(theme, componentName),
    'component.tsx': componentCode || '// Your component code goes here'
  }
}

/**
 * Saves theme to localStorage
 */
export const saveThemeToStorage = (theme: BrutalistTheme): void => {
  try {
    localStorage.setItem('brutalist-theme', JSON.stringify(theme))
  } catch (error) {
    console.warn('Failed to save theme to localStorage:', error)
  }
}

/**
 * Loads theme from localStorage
 */
export const loadThemeFromStorage = (): BrutalistTheme | null => {
  try {
    const savedTheme = localStorage.getItem('brutalist-theme')
    if (savedTheme) {
      return JSON.parse(savedTheme)
    }
  } catch (error) {
    console.warn('Failed to load theme from localStorage:', error)
  }
  return null
}

/**
 * Validates if a theme object has all required properties
 */
export const isValidTheme = (theme: unknown): theme is BrutalistTheme => {
  if (!theme || typeof theme !== 'object') return false
  
  const themeObj = theme as Record<string, unknown>
  
  const requiredProps = ['id', 'name', 'description', 'colors']
  const hasRequiredProps = requiredProps.every(prop => prop in themeObj)
  
  if (!hasRequiredProps) return false
  
  // Check if colors object exists and has all required color properties
  if (!themeObj.colors || typeof themeObj.colors !== 'object') return false
  
  const requiredColors = Object.keys(CSS_VARIABLES_MAP)
  const hasRequiredColors = requiredColors.every(color => color in (themeObj.colors as Record<string, unknown>))
  
  return hasRequiredColors
}

/**
 * Gets the current theme from CSS custom properties
 */
export const getCurrentThemeFromDOM = (): Partial<ThemeColors> => {
  const root = document.documentElement
  const computedStyle = getComputedStyle(root)
  
  const currentColors: Partial<ThemeColors> = {}
  
  Object.entries(CSS_VARIABLES_MAP).forEach(([colorKey, cssVariable]) => {
    const value = computedStyle.getPropertyValue(cssVariable).trim()
    if (value) {
      currentColors[colorKey as keyof ThemeColors] = value
    }
  })
  
  return currentColors
}

/**
 * Resets theme to default
 */
export const resetToDefaultTheme = (): void => {
  applyTheme(DEFAULT_THEME)
  localStorage.removeItem('brutalist-theme')
}