/**
 * @module Alert
 * @description A component for displaying important messages to users. Supports different severity levels and optional dismiss functionality.
 */

import { forwardRef, HTMLAttributes, useState } from 'react'
import { clsx } from 'clsx'
import styles from './Alert.module.css'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Type of alert */
  type?: 'info' | 'success' | 'warning' | 'error'
  /** Visual variant */
  variant?: 'filled' | 'outline'
  /** Size of the alert */
  size?: 'sm' | 'md' | 'lg'
  /** Whether the alert can be dismissed */
  dismissible?: boolean
  /** Callback when alert is dismissed */
  onDismiss?: () => void
}

export interface AlertIconProps extends HTMLAttributes<HTMLDivElement> {}
export interface AlertContentProps extends HTMLAttributes<HTMLDivElement> {}
export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
export interface AlertDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
export interface AlertActionsProps extends HTMLAttributes<HTMLDivElement> {}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      className,
      type = 'info',
      variant = 'filled',
      size = 'md',
      dismissible = false,
      onDismiss,
      ...props
    },
    ref
  ) => {
    const [dismissed, setDismissed] = useState(false)
    const [isExiting, setIsExiting] = useState(false)

    const handleDismiss = () => {
      setIsExiting(true)
      // Wait for animation to complete before removing from DOM
      setTimeout(() => {
        setDismissed(true)
        onDismiss?.()
      }, 300) // Match animation duration
    }

    if (dismissed) {
      return null
    }

    return (
      <div
        ref={ref}
        className={clsx(
          styles.alert,
          styles[type],
          styles[variant],
          styles[size],
          {
            [styles.dismissible]: dismissible,
            [styles.exiting]: isExiting,
          },
          className
        )}
        role="alert"
        aria-live="polite"
        {...props}
      >
        {children}
        {dismissible && (
          <button
            className={styles.dismissButton}
            onClick={handleDismiss}
            aria-label="Dismiss alert"
            type="button"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </button>
        )}
      </div>
    )
  }
)

const AlertIcon = forwardRef<HTMLDivElement, AlertIconProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.icon, className)}
        {...props}
      >
        {children || <DefaultIcon />}
      </div>
    )
  }
)

const AlertContent = forwardRef<HTMLDivElement, AlertContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.content, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h4
        ref={ref}
        className={clsx(styles.title, className)}
        {...props}
      >
        {children}
      </h4>
    )
  }
)

const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={clsx(styles.description, className)}
        {...props}
      >
        {children}
      </p>
    )
  }
)

const AlertActions = forwardRef<HTMLDivElement, AlertActionsProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.actions, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// Default icon component
const DefaultIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="10"
      cy="10"
      r="8"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M10 6V10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
    />
    <circle
      cx="10"
      cy="14"
      r="1"
      fill="currentColor"
    />
  </svg>
)

Alert.displayName = 'Alert'
AlertIcon.displayName = 'Alert.Icon'
AlertContent.displayName = 'Alert.Content'
AlertTitle.displayName = 'Alert.Title'
AlertDescription.displayName = 'Alert.Description'
AlertActions.displayName = 'Alert.Actions'

// Compound component
const AlertComponent = Alert as typeof Alert & {
  Icon: typeof AlertIcon
  Content: typeof AlertContent
  Title: typeof AlertTitle
  Description: typeof AlertDescription
  Actions: typeof AlertActions
}

AlertComponent.Icon = AlertIcon
AlertComponent.Content = AlertContent
AlertComponent.Title = AlertTitle
AlertComponent.Description = AlertDescription
AlertComponent.Actions = AlertActions

export { AlertComponent as Alert }