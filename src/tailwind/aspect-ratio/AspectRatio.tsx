import React, { forwardRef } from 'react'

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The aspect ratio to maintain (e.g., 16/9, 4/3, 1/1) */
  ratio?: number
  /** Content to display within the aspect ratio container */
  children: React.ReactNode
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
    className = '',
    objectFit = 'cover',
    backgroundColor,
    style,
    ...props 
  }, ref) => {
    const paddingBottom = `${(1 / ratio) * 100}%`

    const baseClasses = `
      relative w-full overflow-hidden
      border-[3px] border-solid border-black
      bg-gray-100
      shadow-[4px_4px_0px_black]
      rounded-none
      transition-none
      dark:bg-gray-800 dark:border-white
      contrast-more:border-[4px] contrast-more:shadow-[5px_5px_0px_black]
      print:shadow-none print:border print:border-black
    `

    const objectFitClasses = {
      contain: '[&>div>img]:object-contain [&>div>video]:object-contain',
      cover: '[&>div>img]:object-cover [&>div>video]:object-cover',
      fill: '[&>div>img]:object-fill [&>div>video]:object-fill',
      none: '[&>div>img]:object-none [&>div>video]:object-none',
      'scale-down': '[&>div>img]:object-scale-down [&>div>video]:object-scale-down'
    }

    const combinedClasses = `
      ${baseClasses}
      ${objectFitClasses[objectFit]}
      ${className}
    `.replace(/\s+/g, ' ').trim()

    return (
      <div
        ref={ref}
        className={combinedClasses}
        style={{
          ...style,
          backgroundColor: backgroundColor || undefined
        }}
        {...props}
      >
        {/* Sizer div to maintain aspect ratio */}
        <div style={{ paddingBottom }} />
        
        {/* Content container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full [&>img]:w-full [&>img]:h-full [&>img]:block [&>video]:w-full [&>video]:h-full [&>video]:block [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:block [&>svg]:w-full [&>svg]:h-full [&>svg]:block">
            {children}
          </div>
        </div>
      </div>
    )
  }
)

AspectRatio.displayName = 'AspectRatio'