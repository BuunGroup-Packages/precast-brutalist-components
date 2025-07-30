/**
 * @module HalftonePattern
 * @description A halftone dot pattern background component inspired by comic book and print media
 */

import React, { forwardRef, SVGProps, useEffect, useState } from 'react'
import { clsx } from 'clsx'
import styles from './HalftonePattern.module.css'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'

/**
 * Props for the HalftonePattern component
 */
export interface HalftonePatternProps extends SVGProps<SVGSVGElement> {
  /**
   * The spacing between dots
   * @default 20
   */
  dotSpacing?: number
  
  /**
   * The maximum radius of dots
   * @default 8
   */
  maxRadius?: number
  
  /**
   * The minimum radius of dots
   * @default 1
   */
  minRadius?: number
  
  /**
   * The pattern type
   * @default 'radial'
   */
  variant?: 'radial' | 'linear' | 'noise' | 'wave'
  
  /**
   * The color scheme
   * @default 'black'
   */
  color?: 'black' | 'white' | 'red' | 'blue' | 'yellow' | 'cyan'
  
  /**
   * Whether to animate the pattern
   * @default false
   */
  animated?: boolean
  
  /**
   * The angle for linear gradient (in degrees)
   * @default 45
   */
  angle?: number
  
  /**
   * Additional className
   */
  className?: string
}

/**
 * HalftonePattern component for creating comic book style halftone backgrounds
 *
 * @example
 * ```tsx
 * <HalftonePattern 
 *   dotSpacing={15} 
 *   maxRadius={6} 
 *   variant="wave" 
 *   color="cyan"
 *   animated
 * />
 * ```
 */
export const HalftonePattern = forwardRef<SVGSVGElement, HalftonePatternProps>(
  ({ 
    dotSpacing = 20,
    maxRadius = 8,
    minRadius = 1,
    variant = 'radial',
    color = 'black',
    animated = false,
    angle = 45,
    className,
    style,
    ...props 
  }, ref) => {
    const [svgElement, setSvgElement] = useState<SVGSVGElement | null>(null)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    useEffect(() => {
      const updateDimensions = () => {
        if (svgElement) {
          const { width, height } = svgElement.getBoundingClientRect()
          setDimensions({ width, height })
        }
      }

      updateDimensions()
      window.addEventListener('resize', updateDimensions)
      return () => window.removeEventListener('resize', updateDimensions)
    }, [svgElement])

    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.halftonePattern,
        styles[color],
        animated && styles.animated
      )
    })

    const cols = Math.ceil(dimensions.width / dotSpacing)
    const rows = Math.ceil(dimensions.height / dotSpacing)
    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2

    const calculateRadius = (x: number, y: number): number => {
      switch (variant) {
        case 'radial': {
          const distance = Math.sqrt(
            Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
          )
          const maxDistance = Math.sqrt(
            Math.pow(centerX, 2) + Math.pow(centerY, 2)
          )
          const normalized = 1 - (distance / maxDistance)
          return minRadius + (maxRadius - minRadius) * normalized
        }
        case 'linear': {
          const radians = (angle * Math.PI) / 180
          const dotProduct = x * Math.cos(radians) + y * Math.sin(radians)
          const maxDot = dimensions.width * Math.abs(Math.cos(radians)) + 
                        dimensions.height * Math.abs(Math.sin(radians))
          const normalized = dotProduct / maxDot
          return minRadius + (maxRadius - minRadius) * normalized
        }
        case 'noise': {
          // Pseudo-random based on position
          const hash = (x * 12.9898 + y * 78.233) * 43758.5453
          const random = hash - Math.floor(hash)
          return minRadius + (maxRadius - minRadius) * random
        }
        case 'wave': {
          const waveX = Math.sin((x / dimensions.width) * Math.PI * 4)
          const waveY = Math.cos((y / dimensions.height) * Math.PI * 3)
          const combined = (waveX + waveY + 2) / 4
          return minRadius + (maxRadius - minRadius) * combined
        }
        default:
          return maxRadius / 2
      }
    }

    const dots = []
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * dotSpacing + dotSpacing / 2
        const y = row * dotSpacing + dotSpacing / 2
        const radius = calculateRadius(x, y)
        
        if (radius > 0.5) {
          dots.push({
            x,
            y,
            radius,
            delay: animated ? (row + col) * 0.01 : 0
          })
        }
      }
    }

    return (
      <svg
        ref={(node) => {
          setSvgElement(node)
          if (ref) {
            if (typeof ref === 'function') {
              ref(node)
            } else {
              (ref as React.MutableRefObject<SVGSVGElement | null>).current = node
            }
          }
        }}
        className={processedClassName}
        style={processedStyle}
        aria-hidden="true"
        {...props}
      >
        <g className={styles.dots}>
          {dots.map((dot) => (
            <circle
              key={`${dot.x}-${dot.y}`}
              cx={dot.x}
              cy={dot.y}
              r={dot.radius}
              fill="currentColor"
              className={styles.dot}
              style={{
                animationDelay: `${dot.delay}s`
              }}
            />
          ))}
        </g>
      </svg>
    )
  }
)

HalftonePattern.displayName = 'HalftonePattern'

export default HalftonePattern