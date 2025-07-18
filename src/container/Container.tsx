import { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './Container.module.css'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Container size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Whether the container should be centered */
  centered?: boolean
  /** Container padding */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Additional CSS classes */
  className?: string
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      size = 'lg',
      centered = true,
      padding = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.container,
          styles[size],
          styles[`padding-${padding}`],
          {
            [styles.centered]: centered,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'