/**
 * @module AspectRatio
 * @description A container component that maintains a specific width-to-height ratio for responsive content. Perfect for images, videos, embeds, and any content requiring consistent proportions across different screen sizes.
 */

import React, { forwardRef, CSSProperties } from 'react'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'
import styles from './AspectRatio.module.css'

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The aspect ratio to maintain (e.g., 16/9, 4/3, 1/1) */
  ratio?: number
  /** Content to display within the aspect ratio container */
  children: React.ReactNode
  /** Additional CSS classes */
  className?: string
  /** Custom inline styles (supports utility classes) */
  style?: CSSProperties
  /** Whether to apply object-fit to child images/videos */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  /** Background color when content doesn't fill the container */
  backgroundColor?: string
}

/**
 * AspectRatio component maintains a specific width-to-height ratio for its content.
 * Useful for responsive images, videos, embeds, and any content that needs consistent dimensions.
 */
export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ 
    ratio = 16/9, 
    children, 
    className,
    objectFit = 'cover',
    backgroundColor,
    style,
    ...props 
  }, ref) => {
    const paddingBottom = `${(1 / ratio) * 100}%`
    
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.container
    })

    return (
      <div
        ref={ref}
        className={processedClassName}
        style={{
          ...processedStyle,
          backgroundColor
        }}
        data-object-fit={objectFit}
        {...props}
      >
        <div 
          className={styles.sizer} 
          style={{ paddingBottom }}
        />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    )
  }
)

AspectRatio.displayName = 'AspectRatio'