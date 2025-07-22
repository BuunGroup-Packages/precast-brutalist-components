import { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './AlertStack.module.css'

export interface AlertStackProps extends HTMLAttributes<HTMLDivElement> {
  /** Direction of the stack */
  direction?: 'vertical' | 'horizontal'
  /** Gap between alerts */
  gap?: 'sm' | 'md' | 'lg'
}

export const AlertStack = forwardRef<HTMLDivElement, AlertStackProps>(
  (
    {
      children,
      className,
      direction = 'vertical',
      gap = 'md',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.stack,
          styles[direction],
          styles[`gap-${gap}`],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

AlertStack.displayName = 'AlertStack'