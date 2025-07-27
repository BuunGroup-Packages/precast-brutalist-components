/**
 * TypeScript interfaces for utility classes in Brutalist UI
 */

import { CSSProperties } from 'react'

// Spacing scale type
export type SpacingScale = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '20' | '24'

// Utility class types
export type PaddingUtility = `p-${SpacingScale}` | `pt-${SpacingScale}` | `pr-${SpacingScale}` | `pb-${SpacingScale}` | `pl-${SpacingScale}` | `px-${SpacingScale}` | `py-${SpacingScale}`
export type MarginUtility = `m-${SpacingScale}` | `mt-${SpacingScale}` | `mr-${SpacingScale}` | `mb-${SpacingScale}` | `ml-${SpacingScale}` | `mx-${SpacingScale}` | `my-${SpacingScale}` | 'm-auto' | 'mt-auto' | 'mr-auto' | 'mb-auto' | 'ml-auto' | 'mx-auto' | 'my-auto'
export type GapUtility = `gap-${SpacingScale}` | `gap-x-${SpacingScale}` | `gap-y-${SpacingScale}`

export type DisplayUtility = 'block' | 'inline-block' | 'inline' | 'flex' | 'inline-flex' | 'grid' | 'hidden'
export type FlexDirectionUtility = 'flex-row' | 'flex-row-reverse' | 'flex-col' | 'flex-col-reverse'
export type FlexWrapUtility = 'flex-wrap' | 'flex-nowrap'
export type AlignItemsUtility = 'items-start' | 'items-end' | 'items-center' | 'items-baseline' | 'items-stretch'
export type JustifyContentUtility = 'justify-start' | 'justify-end' | 'justify-center' | 'justify-between' | 'justify-around' | 'justify-evenly'
export type SizeUtility = 'w-full' | 'w-auto' | 'h-full' | 'h-auto'
export type PositionUtility = 'relative' | 'absolute' | 'fixed' | 'sticky' | 'static'
export type OverflowUtility = 'overflow-auto' | 'overflow-hidden' | 'overflow-visible' | 'overflow-scroll' | 'overflow-x-auto' | 'overflow-y-auto'
export type TextAlignUtility = 'text-left' | 'text-center' | 'text-right' | 'text-justify'
export type FontWeightUtility = 'font-normal' | 'font-medium' | 'font-bold' | 'font-black'
export type TextTransformUtility = 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case'

// Typography utilities
export type FontSizeUtility = 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl' | 'text-2xl' | 'text-3xl' | 'text-4xl' | 'text-5xl' | 'text-6xl'
export type TextColorUtility = 'text-black' | 'text-white' | 'text-accent' | 'text-gray-50' | 'text-gray-100' | 'text-gray-200' | 'text-gray-300' | 'text-gray-400' | 'text-gray-500' | 'text-gray-600' | 'text-gray-700' | 'text-gray-800' | 'text-gray-900' | 'text-red' | 'text-blue' | 'text-green' | 'text-yellow' | 'text-purple' | 'text-pink'
export type BackgroundColorUtility = 'bg-black' | 'bg-white' | 'bg-accent' | 'bg-gray-50' | 'bg-gray-100' | 'bg-gray-200' | 'bg-gray-300' | 'bg-gray-400' | 'bg-gray-500' | 'bg-gray-600' | 'bg-gray-700' | 'bg-gray-800' | 'bg-gray-900' | 'bg-red' | 'bg-blue' | 'bg-green' | 'bg-yellow' | 'bg-purple' | 'bg-pink'
export type LineHeightUtility = 'leading-none' | 'leading-tight' | 'leading-snug' | 'leading-normal' | 'leading-relaxed' | 'leading-loose'
export type LetterSpacingUtility = 'tracking-tighter' | 'tracking-tight' | 'tracking-normal' | 'tracking-wide' | 'tracking-wider' | 'tracking-widest'

// Border utilities
export type BorderUtility = 'border' | 'border-0' | 'border-2' | 'border-4' | 'border-8' | 'border-t' | 'border-r' | 'border-b' | 'border-l'
export type BorderColorUtility = 'border-black' | 'border-white' | 'border-accent'
export type BorderRadiusUtility = 'rounded-none' | 'rounded-sm' | 'rounded' | 'rounded-md' | 'rounded-lg' | 'rounded-xl' | 'rounded-2xl' | 'rounded-full'

// Shadow utilities
export type ShadowUtility = 'shadow-none' | 'shadow-brutal' | 'shadow-brutal-sm' | 'shadow-brutal-md' | 'shadow-brutal-lg' | 'shadow-brutal-xl'

// Combined utility type
export type UtilityClass = 
  | PaddingUtility 
  | MarginUtility 
  | GapUtility 
  | DisplayUtility 
  | FlexDirectionUtility 
  | FlexWrapUtility 
  | AlignItemsUtility 
  | JustifyContentUtility 
  | SizeUtility 
  | PositionUtility 
  | OverflowUtility
  | TextAlignUtility
  | FontWeightUtility
  | TextTransformUtility
  | FontSizeUtility
  | TextColorUtility
  | BackgroundColorUtility
  | LineHeightUtility
  | LetterSpacingUtility
  | BorderUtility
  | BorderColorUtility
  | BorderRadiusUtility
  | ShadowUtility

// Props interface for components with utility support
export interface UtilityProps {
  /**
   * Utility classes for styling
   * Supports padding, margin, gap, display, flexbox, and more
   * @example "pt-4 pb-2 mt-6 flex gap-4"
   */
  className?: string
  
  /**
   * Inline styles (merged with utility classes)
   */
  style?: CSSProperties
}

// Enhanced props for components
export interface EnhancedComponentProps extends UtilityProps {
  /**
   * Whether to use CSS modules for utility classes
   * @default false - uses inline styles
   */
  useUtilityCSS?: boolean
}

// Responsive utility types (for future implementation)
export type ResponsivePrefix = 'sm:' | 'md:' | 'lg:' | 'xl:' | '2xl:'
export type ResponsiveUtility<T extends string> = T | `${ResponsivePrefix}${T}`

// Hover and focus state utilities (for future implementation)
export type StatePrefix = 'hover:' | 'focus:' | 'active:' | 'disabled:'
export type StateUtility<T extends string> = T | `${StatePrefix}${T}`