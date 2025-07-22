/**
 * @module Separator
 * @description A visual separator component for dividing content sections with customizable styles, orientations, and optional labels. Supports horizontal and vertical layouts with various border styles.
 */

import React from 'react'
import { clsx } from 'clsx'
import styles from './Separator.module.css'

/**
 * Props for the Separator component
 */
export interface SeparatorProps {
  /**
   * Orientation of the separator line
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'
  
  /**
   * Thickness variant for the separator line
   * @default 'medium'
   */
  thickness?: 'thin' | 'medium' | 'thick'
  
  /**
   * Visual style variant for the separator line
   * @default 'solid'
   */
  variant?: 'solid' | 'dashed' | 'dotted' | 'double'
  
  /**
   * Additional CSS classes to apply to the separator
   */
  className?: string
  
  /**
   * Inline styles to apply to the separator
   */
  style?: React.CSSProperties
  
  /**
   * Decorative text or element to display in the middle of the separator (horizontal only)
   */
  label?: string | React.ReactNode
  
  /**
   * Position of the label along the separator line
   * @default 'center'
   */
  labelPosition?: 'start' | 'center' | 'end'
  
  /**
   * Accessible label for screen readers
   * @default 'Separator'
   */
  ariaLabel?: string
}

export const Separator: React.FC<SeparatorProps> = ({
  orientation = 'horizontal',
  thickness = 'medium',
  variant = 'solid',
  className,
  style,
  label,
  labelPosition = 'center',
  ariaLabel = 'Separator',
}) => {
  const isHorizontal = orientation === 'horizontal'
  
  return (
    <div
      className={clsx(
        styles.separator,
        styles[orientation],
        styles[thickness],
        styles[variant],
        {
          [styles.withLabel]: label && isHorizontal,
          [styles[`label-${labelPosition}`]]: label && isHorizontal,
        },
        className
      )}
      style={style}
      role="separator"
      aria-orientation={orientation}
      aria-label={ariaLabel}
    >
      {label && isHorizontal && (
        <>
          <div className={styles.line} />
          <div className={styles.label}>
            {typeof label === 'string' ? <span>{label}</span> : label}
          </div>
          <div className={styles.line} />
        </>
      )}
    </div>
  )
}

Separator.displayName = 'Separator'

export default Separator