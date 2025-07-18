import React from 'react'
import { clsx } from 'clsx'

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
  
  // Base classes
  const baseClasses = clsx(
    'flex items-center relative text-black',
    isHorizontal ? 'w-full my-6' : 'h-full mx-6 flex-col',
    className
  )

  // Thickness classes
  const thicknessClasses = {
    thin: isHorizontal ? 'border-t' : 'border-l',
    medium: isHorizontal ? 'border-t-2' : 'border-l-2',
    thick: isHorizontal ? 'border-t-4' : 'border-l-4'
  }

  // Style classes
  const styleClasses = {
    solid: 'border-black',
    dashed: 'border-black border-dashed',
    dotted: 'border-black border-dotted',
    double: 'border-black border-double'
  }

  // If there's a label and it's horizontal, use different layout
  if (label && isHorizontal) {
    const lineClasses = clsx(
      'flex-1 bg-black',
      thickness === 'thin' ? 'h-px' : thickness === 'thick' ? 'h-1' : 'h-0.5'
    )

    // Special handling for different line styles
    const getLineStyle = () => {
      switch (variant) {
        case 'dashed':
          return {
            background: 'repeating-linear-gradient(to right, black 0, black 8px, transparent 8px, transparent 16px)',
            backgroundSize: '16px 100%',
            backgroundColor: 'transparent'
          }
        case 'dotted':
          return {
            background: 'repeating-linear-gradient(to right, black 0, black 4px, transparent 4px, transparent 8px)',
            backgroundSize: '8px 100%',
            backgroundColor: 'transparent'
          }
        case 'double':
          return {
            backgroundColor: 'transparent',
            borderTop: '2px solid black',
            borderBottom: '2px solid black',
            height: '6px'
          }
        default:
          return {}
      }
    }

    const labelClasses = clsx(
      'flex-shrink-0 px-2 font-mono text-sm font-bold uppercase tracking-wide',
      'text-black'
    )

    return (
      <div
        className={clsx(baseClasses, 'gap-4 border-none')}
        style={{
          ...style,
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 'bold'
        }}
        role="separator"
        aria-orientation={orientation}
        aria-label={ariaLabel}
      >
        {labelPosition !== 'start' && (
          <div className={lineClasses} style={getLineStyle()} />
        )}
        <div className={labelClasses}>
          {typeof label === 'string' ? <span>{label}</span> : label}
        </div>
        {labelPosition !== 'end' && (
          <div className={lineClasses} style={getLineStyle()} />
        )}
      </div>
    )
  }

  // Simple separator without label
  return (
    <div
      className={clsx(
        baseClasses,
        thicknessClasses[thickness],
        styleClasses[variant]
      )}
      style={{
        ...style,
        fontFamily: 'JetBrains Mono, monospace',
        fontWeight: 'bold'
      }}
      role="separator"
      aria-orientation={orientation}
      aria-label={ariaLabel}
    />
  )
}

Separator.displayName = 'Separator'