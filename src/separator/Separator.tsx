import React from 'react'
import { clsx } from 'clsx'
import styles from './Separator.module.css'

export interface SeparatorProps {
  /** Orientation of the separator */
  orientation?: 'horizontal' | 'vertical'
  /** Thickness variant */
  thickness?: 'thin' | 'medium' | 'thick'
  /** Style variant */
  variant?: 'solid' | 'dashed' | 'dotted' | 'double'
  /** Custom CSS class */
  className?: string
  /** Additional CSS properties */
  style?: React.CSSProperties
  /** Decorative element in the middle (horizontal only) */
  label?: string | React.ReactNode
  /** Position of the label */
  labelPosition?: 'start' | 'center' | 'end'
  /** ARIA label for accessibility */
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