import React, { useState, forwardRef, ImgHTMLAttributes } from 'react'

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size' | 'children'> {
  /** Image source URL */
  src?: string
  /** Alt text for the image */
  alt?: string
  /** Initials to display when no image */
  initials?: string
  /** Icon to display as fallback */
  icon?: React.ReactNode
  /** Avatar size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Status indicator */
  status?: 'online' | 'offline' | 'busy' | 'away'
  /** Additional CSS classes */
  className?: string
  /** Custom click handler */
  onClick?: () => void
  /** Whether the avatar is clickable */
  clickable?: boolean
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      initials,
      icon,
      size = 'md',
      status,
      className = '',
      onClick,
      clickable = false,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    const handleImageError = () => {
      setImageError(true)
    }

    const handleImageLoad = () => {
      setImageLoaded(true)
      setImageError(false)
    }

    const hasImage = src && !imageError
    const hasInitials = initials && initials.length > 0
    const hasIcon = icon

    // Determine what to display based on available data and fallback order
    const showImage = hasImage
    const showInitials = !hasImage && hasInitials
    const showIcon = !hasImage && !hasInitials && hasIcon

    // Get initials (first 2 characters max)
    const displayInitials = initials ? initials.slice(0, 2).toUpperCase() : ''

    // Default icon if no image, initials, or custom icon
    const defaultIcon = (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-full h-full"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    )

    const isClickable = clickable || !!onClick

    const sizeClasses = {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16'
    }

    const textSizeClasses = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl'
    }

    const statusSizeClasses = {
      xs: 'w-1.5 h-1.5',
      sm: 'w-2 h-2',
      md: 'w-2.5 h-2.5',
      lg: 'w-3 h-3',
      xl: 'w-4 h-4'
    }

    const statusColorClasses = {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      busy: 'bg-red-500',
      away: 'bg-yellow-500'
    }

    const containerClasses = `
      relative inline-block
      ${isClickable ? 'cursor-pointer' : ''}
      ${className}
    `

    const avatarClasses = `
      ${sizeClasses[size]}
      bg-gray-100 border-[3px] border-solid border-black
      rounded-none shadow-[4px_4px_0px_black]
      flex items-center justify-center
      overflow-hidden text-black font-bold
      transition-all duration-150 ease-in-out
      ${isClickable ? 'hover:shadow-[6px_6px_0px_black] hover:-translate-x-0.5 hover:-translate-y-0.5' : ''}
      ${isClickable ? 'active:shadow-[2px_2px_0px_black] active:translate-x-0.5 active:translate-y-0.5' : ''}
      ${isClickable ? 'focus:outline focus:outline-2 focus:outline-red-500 focus:outline-offset-2' : ''}
    `

    const statusClasses = `
      absolute -bottom-0.5 -right-0.5 
      ${statusSizeClasses[size]}
      ${statusColorClasses[status!]}
      border-2 border-white rounded-full
      shadow-[2px_2px_0px_black]
    `

    return (
      <div
        ref={ref}
        className={containerClasses}
        onClick={isClickable ? onClick : undefined}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={
          isClickable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onClick?.()
                }
              }
            : undefined
        }
        aria-label={alt || `Avatar${initials ? ` for ${initials}` : ''}`}
      >
        <div className={avatarClasses}>
          {showImage && (
            <img
              src={src}
              alt={alt}
              className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              {...props}
            />
          )}
          
          {showInitials && (
            <span 
              className={`${textSizeClasses[size]} font-bold uppercase`}
              style={{
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}
              aria-label={`Initials: ${displayInitials}`}
            >
              {displayInitials}
            </span>
          )}
          
          {showIcon && (
            <span 
              className="w-3/5 h-3/5 flex items-center justify-center text-gray-600" 
              aria-label="Avatar icon"
            >
              {icon}
            </span>
          )}
          
          {!showImage && !showInitials && !showIcon && (
            <span 
              className="w-3/5 h-3/5 flex items-center justify-center text-gray-600" 
              aria-label="Default avatar"
            >
              {defaultIcon}
            </span>
          )}
        </div>
        
        {status && (
          <div
            className={statusClasses}
            aria-label={`Status: ${status}`}
            role="img"
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'