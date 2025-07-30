/**
 * @module BrutalGrid
 * @description A brutalist grid pattern background component with thick lines and bold aesthetics
 */

import React, { forwardRef, SVGProps, useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import styles from './BrutalGrid.module.css'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'

/**
 * Props for the BrutalGrid component
 */
export interface BrutalGridProps extends SVGProps<SVGSVGElement> {
  /**
   * The width of grid cells
   * @default 40
   */
  cellWidth?: number
  
  /**
   * The height of grid cells
   * @default 40
   */
  cellHeight?: number
  
  /**
   * The thickness of grid lines
   * @default 3
   */
  strokeWidth?: number
  
  /**
   * The pattern style
   * @default 'solid'
   */
  variant?: 'solid' | 'dashed' | 'double' | 'offset'
  
  /**
   * The color scheme
   * @default 'black'
   */
  color?: 'black' | 'white' | 'accent' | 'red' | 'blue' | 'yellow'
  
  /**
   * Whether to animate the grid
   * @default false
   */
  animated?: boolean
  
  /**
   * Additional className
   */
  className?: string
}

/**
 * BrutalGrid component for creating brutalist grid pattern backgrounds
 *
 * @example
 * ```tsx
 * <BrutalGrid 
 *   cellWidth={50} 
 *   strokeWidth={4} 
 *   variant="dashed" 
 *   color="accent"
 * />
 * ```
 */
export const BrutalGrid = forwardRef<SVGSVGElement, BrutalGridProps>(
  ({ 
    cellWidth = 40,
    cellHeight = 40,
    strokeWidth = 3,
    variant = 'solid',
    color = 'black',
    animated = false,
    className,
    style,
    ...props 
  }, ref) => {
    const containerRef = useRef<SVGSVGElement>(null)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const id = `brutal-grid-${Math.random().toString(36).substr(2, 9)}`

    useEffect(() => {
      const updateDimensions = () => {
        if (containerRef.current) {
          const { width, height } = containerRef.current.getBoundingClientRect()
          setDimensions({ width, height })
        }
      }

      updateDimensions()
      window.addEventListener('resize', updateDimensions)
      return () => window.removeEventListener('resize', updateDimensions)
    }, [])

    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.brutalGrid,
        styles[variant],
        styles[color],
        animated && styles.animated
      )
    })

    const cols = Math.ceil(dimensions.width / cellWidth)
    const rows = Math.ceil(dimensions.height / cellHeight)

    return (
      <svg
        ref={(node) => {
          containerRef.current = node
          if (ref) {
            if (typeof ref === 'function') ref(node)
            else ref.current = node
          }
        }}
        className={processedClassName}
        style={processedStyle}
        aria-hidden="true"
        {...props}
      >
        <defs>
          {variant === 'dashed' && (
            <pattern
              id={`${id}-dash`}
              patternUnits="userSpaceOnUse"
              width="10"
              height="1"
            >
              <line
                x1="0"
                y1="0"
                x2="6"
                y2="0"
                stroke="currentColor"
                strokeWidth={strokeWidth}
              />
            </pattern>
          )}
        </defs>

        <g className={styles.gridLines}>
          {/* Vertical lines */}
          {Array.from({ length: cols + 1 }, (_, i) => (
            <line
              key={`v-${i}`}
              x1={i * cellWidth}
              y1={0}
              x2={i * cellWidth}
              y2={dimensions.height}
              stroke={variant === 'dashed' ? `url(#${id}-dash)` : 'currentColor'}
              strokeWidth={strokeWidth}
              className={styles.verticalLine}
              style={{
                animationDelay: animated ? `${i * 0.05}s` : undefined
              }}
            />
          ))}

          {/* Horizontal lines */}
          {Array.from({ length: rows + 1 }, (_, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={i * cellHeight}
              x2={dimensions.width}
              y2={i * cellHeight}
              stroke={variant === 'dashed' ? `url(#${id}-dash)` : 'currentColor'}
              strokeWidth={strokeWidth}
              className={styles.horizontalLine}
              style={{
                animationDelay: animated ? `${i * 0.05}s` : undefined
              }}
            />
          ))}

          {/* Double lines variant */}
          {variant === 'double' && (
            <>
              {Array.from({ length: cols + 1 }, (_, i) => (
                <line
                  key={`v2-${i}`}
                  x1={i * cellWidth + strokeWidth * 2}
                  y1={0}
                  x2={i * cellWidth + strokeWidth * 2}
                  y2={dimensions.height}
                  stroke="currentColor"
                  strokeWidth={strokeWidth}
                  opacity={0.5}
                />
              ))}
              {Array.from({ length: rows + 1 }, (_, i) => (
                <line
                  key={`h2-${i}`}
                  x1={0}
                  y1={i * cellHeight + strokeWidth * 2}
                  x2={dimensions.width}
                  y2={i * cellHeight + strokeWidth * 2}
                  stroke="currentColor"
                  strokeWidth={strokeWidth}
                  opacity={0.5}
                />
              ))}
            </>
          )}

          {/* Offset variant - creates a brick-like pattern */}
          {variant === 'offset' && (
            <>
              {Array.from({ length: rows }, (_, row) => 
                Array.from({ length: cols }, (_, col) => (
                  <rect
                    key={`cell-${row}-${col}`}
                    x={col * cellWidth + (row % 2 ? cellWidth / 2 : 0)}
                    y={row * cellHeight}
                    width={cellWidth}
                    height={cellHeight}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                  />
                ))
              )}
            </>
          )}
        </g>
      </svg>
    )
  }
)

BrutalGrid.displayName = 'BrutalGrid'

export default BrutalGrid