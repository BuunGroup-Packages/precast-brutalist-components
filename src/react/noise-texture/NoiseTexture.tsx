/**
 * @module NoiseTexture
 * @description A brutalist noise texture background component using SVG filters
 */

import React, { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './NoiseTexture.module.css'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'

/**
 * Props for the NoiseTexture component
 */
export interface NoiseTextureProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The intensity of the noise
   * @default 'medium'
   */
  intensity?: 'subtle' | 'medium' | 'heavy' | 'extreme'
  
  /**
   * The type of noise pattern
   * @default 'static'
   */
  variant?: 'static' | 'grainy' | 'rough' | 'organic'
  
  /**
   * The blend mode for the noise
   * @default 'multiply'
   */
  blendMode?: 'multiply' | 'screen' | 'overlay' | 'soft-light'
  
  /**
   * The base color of the noise
   * @default 'monochrome'
   */
  color?: 'monochrome' | 'warm' | 'cool' | 'rainbow'
  
  /**
   * Whether to animate the noise
   * @default false
   */
  animated?: boolean
  
  /**
   * The opacity of the noise layer
   * @default 0.5
   */
  opacity?: number
  
  /**
   * Additional className
   */
  className?: string
}

/**
 * NoiseTexture component for creating brutalist noise backgrounds
 *
 * @example
 * ```tsx
 * <NoiseTexture 
 *   intensity="heavy" 
 *   variant="grainy" 
 *   color="warm"
 *   animated
 * />
 * ```
 */
export const NoiseTexture = forwardRef<HTMLDivElement, NoiseTextureProps>(
  ({ 
    intensity = 'medium',
    variant = 'static',
    blendMode = 'multiply',
    color = 'monochrome',
    animated = false,
    opacity = 0.5,
    className,
    style,
    children,
    ...props 
  }, ref) => {
    const id = `noise-${Math.random().toString(36).substr(2, 9)}`

    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.noiseTexture,
        styles[intensity],
        styles[variant],
        styles[color],
        animated && styles.animated
      )
    })

    const noiseScale = {
      subtle: 0.003,
      medium: 0.008,
      heavy: 0.015,
      extreme: 0.03
    }[intensity]

    const turbulenceType = {
      static: 'fractalNoise',
      grainy: 'fractalNoise',
      rough: 'turbulence',
      organic: 'turbulence'
    }[variant] as 'fractalNoise' | 'turbulence'

    const numOctaves = {
      static: 1,
      grainy: 3,
      rough: 2,
      organic: 4
    }[variant]

    return (
      <div
        ref={ref}
        className={processedClassName}
        style={{
          ...processedStyle,
          '--noise-opacity': opacity,
          '--noise-blend-mode': blendMode
        } as React.CSSProperties}
        {...props}
      >
        <svg className={styles.noiseSvg} aria-hidden="true">
          <defs>
            <filter id={id}>
              <feTurbulence
                type={turbulenceType}
                baseFrequency={noiseScale}
                numOctaves={numOctaves}
                seed={animated ? undefined : 5}
              >
                {animated && (
                  <animate
                    attributeName="seed"
                    from="0"
                    to="100"
                    dur="0.1s"
                    repeatCount="indefinite"
                  />
                )}
              </feTurbulence>
              
              {color === 'warm' && (
                <feColorMatrix
                  type="matrix"
                  values="1 0 0 0 0.2
                          0 0.8 0 0 0.1
                          0 0 0.6 0 0
                          0 0 0 1 0"
                />
              )}
              
              {color === 'cool' && (
                <feColorMatrix
                  type="matrix"
                  values="0.6 0 0 0 0
                          0 0.8 0 0 0.1
                          0 0 1 0 0.2
                          0 0 0 1 0"
                />
              )}
              
              {color === 'rainbow' && (
                <feColorMatrix
                  type="hueRotate"
                  values="0"
                >
                  {animated && (
                    <animate
                      attributeName="values"
                      from="0"
                      to="360"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  )}
                </feColorMatrix>
              )}
              
              <feComponentTransfer>
                <feFuncA type="discrete" tableValues="0 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 1" />
              </feComponentTransfer>
            </filter>
          </defs>
          <rect
            width="100%"
            height="100%"
            filter={`url(#${id})`}
            className={styles.noiseRect}
          />
        </svg>
        {children}
      </div>
    )
  }
)

NoiseTexture.displayName = 'NoiseTexture'

export default NoiseTexture