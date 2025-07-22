/**
 * @module ThemePicker
 * @description Interactive theme selection component with live preview, code generation, and theme customization. Allows users to browse predefined themes and generate custom themes.
 */

import React, { useState } from 'react'
import { clsx } from 'clsx'
import { useTheme } from './ThemeContext'
import { BrutalistTheme } from './types'
import { generateCSSVariablesCode, generateReactThemeCode } from './utils'
import styles from './ThemePicker.module.css'

/**
 * Props for the ThemePicker component
 */
export interface ThemePickerProps {
  /** Visual variant affecting size and layout
   * @default 'default'
   */
  variant?: 'default' | 'compact'
  /** Whether to show brutalist-style shadow effects
   * @default true
   */
  brutalistShadow?: boolean
  /** Whether to show code generation section
   * @default true
   */
  showCode?: boolean
  /** Additional CSS class names */
  className?: string
  /** Callback fired when theme changes */
  onThemeChange?: (theme: BrutalistTheme) => void
}

export const ThemePicker: React.FC<ThemePickerProps> = ({
  variant = 'default',
  brutalistShadow = true,
  showCode = true,
  className,
  onThemeChange,
}) => {
  const { currentTheme, setTheme, availableThemes, randomizeTheme, resetToDefault } = useTheme()
  const [showCodeSection, setShowCodeSection] = useState(false)
  const [codeType, setCodeType] = useState<'css' | 'react'>('css')
  const [copyFeedback, setCopyFeedback] = useState('')

  const handleThemeSelect = (theme: BrutalistTheme) => {
    setTheme(theme)
    onThemeChange?.(theme)
  }

  const handleRandomize = () => {
    randomizeTheme()
    onThemeChange?.(currentTheme)
  }

  const handleReset = () => {
    resetToDefault()
    onThemeChange?.(currentTheme)
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyFeedback(`${type} copied!`)
      setTimeout(() => setCopyFeedback(''), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      setCopyFeedback('Copy failed')
      setTimeout(() => setCopyFeedback(''), 2000)
    }
  }

  const generateCode = () => {
    return codeType === 'css' 
      ? generateCSSVariablesCode(currentTheme)
      : generateReactThemeCode(currentTheme)
  }

  // Get key colors for theme preview
  const getPreviewColors = (theme: BrutalistTheme) => [
    theme.colors.black,
    theme.colors.white,
    theme.colors.accent,
    theme.colors.gray500,
  ]

  return (
    <div 
      className={clsx(
        styles.container,
        {
          [styles.compact]: variant === 'compact',
          [styles.withShadow]: brutalistShadow,
        },
        className
      )}
    >
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>Theme Picker</h3>
        <div className={styles.actions}>
          <button 
            className={styles.actionButton}
            onClick={handleRandomize}
            title="Generate random theme"
          >
            🎲 Random
          </button>
          <button 
            className={styles.actionButton}
            onClick={handleReset}
            title="Reset to default theme"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Current Theme Info */}
      <div className={styles.currentTheme}>
        <h4 className={styles.currentThemeTitle}>Current Theme</h4>
        <div className={styles.currentThemeInfo}>
          <span className={styles.currentThemeName}>{currentTheme.name}</span>
          <button
            className={styles.copyButton}
            onClick={() => copyToClipboard(JSON.stringify(currentTheme, null, 2), 'Theme')}
          >
            {copyFeedback || 'Copy Theme'}
          </button>
        </div>
        
        {/* Color Palette */}
        <div className={styles.colorPalette}>
          {Object.entries(currentTheme.colors).map(([colorName, colorValue]) => (
            <div
              key={colorName}
              className={styles.paletteColor}
              style={{ backgroundColor: colorValue }}
              title={`${colorName}: ${colorValue}`}
              onClick={() => copyToClipboard(colorValue, colorName)}
            />
          ))}
        </div>
      </div>

      {/* Theme Grid */}
      <div className={styles.themeGrid}>
        {availableThemes.map((theme) => (
          <div
            key={theme.id}
            className={clsx(styles.themeCard, {
              [styles.active]: currentTheme.id === theme.id,
            })}
            onClick={() => handleThemeSelect(theme)}
          >
            {/* Color Preview */}
            <div className={styles.colorPreview}>
              {getPreviewColors(theme).map((color, index) => (
                <div
                  key={index}
                  className={styles.colorSwatch}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            
            {/* Theme Info */}
            <div className={styles.themeInfo}>
              <h4 className={styles.themeName}>{theme.name}</h4>
              {variant !== 'compact' && (
                <p className={styles.themeDescription}>{theme.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Code Section */}
      {showCode && (
        <div className={styles.codeSection}>
          <button
            className={styles.codeToggle}
            onClick={() => setShowCodeSection(!showCodeSection)}
          >
            {showCodeSection ? '🔻 Hide Code' : '🔺 Show Code'}
          </button>
          
          {showCodeSection && (
            <>
              {/* Code Type Selector */}
              <div className={styles.actions} style={{ marginBottom: 'var(--brutal-space-3)' }}>
                <button
                  className={clsx(styles.actionButton, {
                    [styles.active]: codeType === 'css'
                  })}
                  onClick={() => setCodeType('css')}
                >
                  CSS
                </button>
                <button
                  className={clsx(styles.actionButton, {
                    [styles.active]: codeType === 'react'
                  })}
                  onClick={() => setCodeType('react')}
                >
                  React
                </button>
              </div>

              {/* Code Block */}
              <div className={styles.codeBlock}>
                <button
                  className={styles.codeCopyButton}
                  onClick={() => copyToClipboard(generateCode(), codeType.toUpperCase())}
                >
                  {copyFeedback || 'Copy'}
                </button>
                <pre>{generateCode()}</pre>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}