import React, { forwardRef, ButtonHTMLAttributes, useState, useCallback } from 'react'
import { clsx } from 'clsx'
import styles from './Toggle.module.css'

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: 'default' | 'brutal' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  brutalistShadow?: boolean
  asChild?: boolean
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      pressed: controlledPressed,
      defaultPressed = false,
      onPressedChange,
      onClick,
      disabled,
      brutalistShadow = true,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    // Handle controlled/uncontrolled state
    const [internalPressed, setInternalPressed] = useState(defaultPressed)
    const isControlled = controlledPressed !== undefined
    const isPressed = isControlled ? controlledPressed : internalPressed

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return
      
      const newPressed = !isPressed
      
      // Update internal state for uncontrolled mode
      if (!isControlled) {
        setInternalPressed(newPressed)
      }
      
      // Call event handlers
      onClick?.(event)
      onPressedChange?.(newPressed)
    }, [isControlled, isPressed, onClick, onPressedChange, disabled])

    const Comp = asChild ? 'span' : 'button'

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : 'button'}
        role="button"
        aria-pressed={isPressed}
        data-state={isPressed ? 'on' : 'off'}
        className={clsx(
          styles.toggle,
          styles[variant],
          styles[size],
          {
            [styles.pressed]: isPressed,
            [styles.disabled]: disabled,
            [styles.withShadow]: brutalistShadow && !disabled,
          },
          className
        )}
        onClick={handleClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)

Toggle.displayName = 'Toggle'