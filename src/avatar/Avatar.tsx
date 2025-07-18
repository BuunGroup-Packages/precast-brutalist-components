import React, { useState, forwardRef, ImgHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './Avatar.module.css'

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
      className,
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
        className={styles.defaultIcon}
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    )

    const isClickable = clickable || !!onClick

    return (
      <div
        ref={ref}
        className={clsx(
          styles.container,
          styles[size],
          {
            [styles.clickable]: isClickable,
            [styles.hasStatus]: !!status,
          },
          className
        )}
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
        <div className={styles.avatar}>
          {showImage && (
            <img
              src={src}
              alt={alt}
              className={clsx(styles.image, {
                [styles.loaded]: imageLoaded,
              })}
              onError={handleImageError}
              onLoad={handleImageLoad}
              {...props}
            />
          )}
          
          {showInitials && (
            <span className={styles.initials} aria-label={`Initials: ${displayInitials}`}>
              {displayInitials}
            </span>
          )}
          
          {showIcon && (
            <span className={styles.iconWrapper} aria-label="Avatar icon">
              {icon}
            </span>
          )}
          
          {!showImage && !showInitials && !showIcon && (
            <span className={styles.iconWrapper} aria-label="Default avatar">
              {defaultIcon}
            </span>
          )}
        </div>
        
        {status && (
          <div
            className={clsx(styles.status, styles[status])}
            aria-label={`Status: ${status}`}
            role="img"
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'