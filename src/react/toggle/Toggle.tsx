/**
 * @module Toggle
 * @description A button component that can be toggled between pressed and unpressed states. Supports both controlled and uncontrolled usage patterns with accessibility features.
 */

import React, { forwardRef, ButtonHTMLAttributes, useState, useCallback, CSSProperties } from 'react'
import { clsx } from 'clsx'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'
import styles from './Toggle.module.css'

/**
 * Props for the Toggle component
 */
export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * Visual style variant of the toggle button
   * @default 'default'
   */
  variant?: 'default' | 'brutal' | 'outline'
  
  /**
   * Size of the toggle button
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Controlled pressed state of the toggle
   */
  pressed?: boolean
  
  /**
   * Default pressed state for uncontrolled usage
   * @default false
   */
  defaultPressed?: boolean
  
  /**
   * Callback function triggered when the pressed state changes
   */
  onPressedChange?: (pressed: boolean) => void
  
  /**
   * Whether to apply the brutalist shadow effect
   * @default true
   */
  brutalistShadow?: boolean
  
  /**
   * Render as a child component (span) instead of button
   * @default false
   */
  asChild?: boolean

  /**
   * Custom styles to apply to the toggle
   */
  style?: CSSProperties
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      style,
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

    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.toggle,
        styles[variant],
        styles[size],
        {
          [styles.pressed]: isPressed,
          [styles.disabled]: disabled,
          [styles.withShadow]: brutalistShadow && !disabled,
        }
      )
    })

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
        className={processedClassName}
        style={processedStyle}
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