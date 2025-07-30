/**
 * @module GlitchText
 * @description A glitchy, cyberpunk-style text component with digital distortion effects
 */

import { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './GlitchText.module.css'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'

/**
 * Props for the GlitchText component
 */
export interface GlitchTextProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The text content to display
   */
  children: string
  
  /**
   * The size of the text
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  
  /**
   * The glitch intensity
   * @default 'medium'
   */
  intensity?: 'subtle' | 'medium' | 'extreme'
  
  /**
   * The color scheme
   * @default 'cyber'
   */
  color?: 'cyber' | 'vhs' | 'matrix' | 'corrupt' | 'neon'
  
  /**
   * Whether to animate the glitch effect
   * @default true
   */
  animated?: boolean
  
  /**
   * The component element type
   * @default 'div'
   */
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p'
}

/**
 * GlitchText component for displaying text with digital glitch effects
 *
 * @example
 * ```tsx
 * <GlitchText size="lg" intensity="extreme" color="cyber">
 *   SYSTEM ERROR
 * </GlitchText>
 * ```
 */
export const GlitchText = forwardRef<HTMLDivElement, GlitchTextProps>(
  ({ 
    children, 
    className, 
    style,
    size = 'md',
    intensity = 'medium',
    color = 'cyber',
    animated = true,
    as: Component = 'div',
    ...props 
  }, ref) => {
    if (typeof children !== 'string') {
      throw new Error('GlitchText: children must be a string')
    }

    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.glitchText,
        styles[size],
        styles[intensity],
        styles[color],
        animated && styles.animated
      )
    })

    return (
      <Component
        ref={ref as any}
        className={processedClassName}
        style={processedStyle}
        data-text={children}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

GlitchText.displayName = 'GlitchText'

export default GlitchText