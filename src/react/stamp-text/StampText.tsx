/**
 * @module StampText
 * @description A rubber stamp-style text component with ink bleed and distressed effects
 */

import { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './StampText.module.css'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'

/**
 * Props for the StampText component
 */
export interface StampTextProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The text content to display
   */
  children: string
  
  /**
   * The size of the stamp
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  
  /**
   * The stamp style variant
   * @default 'approved'
   */
  variant?: 'approved' | 'rejected' | 'urgent' | 'classified' | 'draft' | 'void'
  
  /**
   * The rotation angle of the stamp
   * @default 'slight'
   */
  rotation?: 'none' | 'slight' | 'tilted' | 'heavy'
  
  /**
   * The ink effect intensity
   * @default 'normal'
   */
  ink?: 'light' | 'normal' | 'heavy' | 'worn'
  
  /**
   * The component element type
   * @default 'div'
   */
  as?: 'div' | 'span' | 'p'
}

/**
 * StampText component for displaying text with rubber stamp effects
 *
 * @example
 * ```tsx
 * <StampText size="lg" variant="approved" rotation="tilted">
 *   APPROVED
 * </StampText>
 * ```
 */
export const StampText = forwardRef<HTMLDivElement, StampTextProps>(
  ({ 
    children, 
    className, 
    style,
    size = 'md',
    variant = 'approved',
    rotation = 'slight',
    ink = 'normal',
    as: Component = 'div',
    ...props 
  }, ref) => {
    if (typeof children !== 'string') {
      throw new Error('StampText: children must be a string')
    }

    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.stampText,
        styles[size],
        styles[variant],
        styles[rotation],
        styles[ink]
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
        <span className={styles.stampContent}>{children}</span>
      </Component>
    )
  }
)

StampText.displayName = 'StampText'

export default StampText