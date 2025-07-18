import { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './Stack.module.css'

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Stack direction */
  direction?: 'horizontal' | 'vertical'
  /** Gap between items */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Alignment of items */
  align?: 'start' | 'center' | 'end' | 'stretch'
  /** Justification of items */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  /** Whether items should wrap */
  wrap?: boolean
  /** Stack element type */
  as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'nav'
  /** Additional CSS classes */
  className?: string
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'vertical',
      gap = 'md',
      align = 'stretch',
      justify = 'start',
      wrap = false,
      as: Component = 'div',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={clsx(
          styles.stack,
          styles[direction],
          styles[`gap-${gap}`],
          styles[`align-${align}`],
          styles[`justify-${justify}`],
          {
            [styles.wrap]: wrap,
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Stack.displayName = 'Stack'