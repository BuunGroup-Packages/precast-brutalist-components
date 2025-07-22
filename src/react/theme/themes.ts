import { BrutalistTheme } from './types'

export const CLASSIC_THEME: BrutalistTheme = {
  id: 'classic',
  name: 'Classic Brutalist',
  description: 'The original black, white, and red brutalist aesthetic',
  colors: {
    black: '#000000',
    white: '#FFFFFF',
    accent: '#FF0000',
    accentDark: '#CC0000',
    gray50: '#FAFAFA',
    gray100: '#F5F5F5',
    gray200: '#E5E5E5',
    gray300: '#D4D4D4',
    gray400: '#A3A3A3',
    gray500: '#737373',
    gray700: '#404040',
    gray900: '#171717',
    warning: '#FFC107',
    success: '#22C55E',
    error: '#FF0000',
    info: '#0000FF',
  }
}

export const NEON_THEME: BrutalistTheme = {
  id: 'neon',
  name: 'Neon Cyber',
  description: 'Electric cyberpunk brutalism with neon highlights',
  colors: {
    black: '#0A0A0A',
    white: '#F0F0F0',
    accent: '#00FF88',
    accentDark: '#00CC6A',
    gray50: '#F8F8F8',
    gray100: '#E8E8E8',
    gray200: '#D8D8D8',
    gray300: '#C8C8C8',
    gray400: '#888888',
    gray500: '#555555',
    gray700: '#333333',
    gray900: '#111111',
    warning: '#FFAA00',
    success: '#00FF88',
    error: '#FF0044',
    info: '#00AAFF',
  }
}

export const PASTEL_THEME: BrutalistTheme = {
  id: 'pastel',
  name: 'Soft Brutalism',
  description: 'Gentle pastel colors with brutalist structure',
  colors: {
    black: '#2D2D2D',
    white: '#FFFBF7',
    accent: '#FF6B9D',
    accentDark: '#E85A8A',
    gray50: '#FDF9F5',
    gray100: '#F7F0E8',
    gray200: '#F0E6DB',
    gray300: '#E8DCCE',
    gray400: '#C4B5A0',
    gray500: '#9A8B7A',
    gray700: '#5D4E42',
    gray900: '#2D2D2D',
    warning: '#FFB347',
    success: '#77DD77',
    error: '#FF6B9D',
    info: '#87CEEB',
  }
}

export const DARK_THEME: BrutalistTheme = {
  id: 'dark',
  name: 'Dark Brutalism',
  description: 'Dark mode brutalism with bright accents',
  colors: {
    black: '#FFFFFF',
    white: '#0F0F0F',
    accent: '#FF4444',
    accentDark: '#DD2222',
    gray50: '#1A1A1A',
    gray100: '#242424',
    gray200: '#2E2E2E',
    gray300: '#383838',
    gray400: '#666666',
    gray500: '#999999',
    gray700: '#CCCCCC',
    gray900: '#F0F0F0',
    warning: '#FFB000',
    success: '#00DD55',
    error: '#FF4444',
    info: '#4488FF',
  }
}

export const RETRO_THEME: BrutalistTheme = {
  id: 'retro',
  name: 'Retro Future',
  description: '80s-inspired brutalism with vintage computing vibes',
  colors: {
    black: '#1A0D1A',
    white: '#F5F5DC',
    accent: '#FF00FF',
    accentDark: '#CC00CC',
    gray50: '#F0F0E6',
    gray100: '#E6E6DC',
    gray200: '#DCDCD2',
    gray300: '#C8C8BE',
    gray400: '#A0A096',
    gray500: '#78786E',
    gray700: '#464640',
    gray900: '#2D2D27',
    warning: '#FFAA00',
    success: '#00FF00',
    error: '#FF00FF',
    info: '#00FFFF',
  }
}

export const NATURE_THEME: BrutalistTheme = {
  id: 'nature',
  name: 'Earth Brutalism',
  description: 'Natural earth tones with brutalist structure',
  colors: {
    black: '#2F2F23',
    white: '#F7F5F0',
    accent: '#8B4513',
    accentDark: '#6B3410',
    gray50: '#F5F3EE',
    gray100: '#EBE7DD',
    gray200: '#E1DBCC',
    gray300: '#D7CFBB',
    gray400: '#B8A990',
    gray500: '#998365',
    gray700: '#5C5140',
    gray900: '#3A3328',
    warning: '#DAA520',
    success: '#228B22',
    error: '#A0522D',
    info: '#4682B4',
  }
}

export const OCEAN_THEME: BrutalistTheme = {
  id: 'ocean',
  name: 'Ocean Brutalism',
  description: 'Deep blue ocean-inspired color palette',
  colors: {
    black: '#0F1419',
    white: '#F0F8FF',
    accent: '#1E90FF',
    accentDark: '#1874CD',
    gray50: '#F8FBFF',
    gray100: '#E6F2FF',
    gray200: '#D4E9FF',
    gray300: '#C2E0FF',
    gray400: '#85C1F5',
    gray500: '#4A90E2',
    gray700: '#2E5984',
    gray900: '#1A3A5C',
    warning: '#FF8C00',
    success: '#00CED1',
    error: '#DC143C',
    info: '#1E90FF',
  }
}

export const MONOCHROME_THEME: BrutalistTheme = {
  id: 'monochrome',
  name: 'Pure Monochrome',
  description: 'Strict black and white with minimal color',
  colors: {
    black: '#000000',
    white: '#FFFFFF',
    accent: '#000000',
    accentDark: '#333333',
    gray50: '#FAFAFA',
    gray100: '#F0F0F0',
    gray200: '#E0E0E0',
    gray300: '#D0D0D0',
    gray400: '#A0A0A0',
    gray500: '#707070',
    gray700: '#404040',
    gray900: '#101010',
    warning: '#666666',
    success: '#444444',
    error: '#000000',
    info: '#888888',
  }
}

// Collection of all available themes
export const AVAILABLE_THEMES: BrutalistTheme[] = [
  CLASSIC_THEME,
  NEON_THEME,
  PASTEL_THEME,
  DARK_THEME,
  RETRO_THEME,
  NATURE_THEME,
  OCEAN_THEME,
  MONOCHROME_THEME,
]

// Default theme
export const DEFAULT_THEME = CLASSIC_THEME

// Helper to get theme by ID
export const getThemeById = (id: string): BrutalistTheme | undefined => {
  return AVAILABLE_THEMES.find(theme => theme.id === id)
}