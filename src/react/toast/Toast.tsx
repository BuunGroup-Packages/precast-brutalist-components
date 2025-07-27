/**
 * @module Toast
 * @description A notification system with support for different types, positioning, and actions. Provides both hook-based and imperative APIs for showing temporary messages to users.
 */

import React, { useState, useEffect, createContext, useContext, useCallback, CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { clsx } from 'clsx'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'
import styles from './Toast.module.css'

/**
 * Available toast notification types
 */
export type ToastType = 'info' | 'success' | 'warning' | 'error'

/**
 * Available positions for toast notifications
 */
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

/**
 * Data structure for a toast notification
 */
export interface ToastData {
  /**
   * Unique identifier for the toast
   */
  id: string
  
  /**
   * Type of the notification affecting appearance and icon
   */
  type: ToastType
  
  /**
   * Optional title displayed above the message
   */
  title?: string
  
  /**
   * Main message content of the toast
   */
  message: string
  
  /**
   * Duration in milliseconds before auto-dismissal (0 = no auto-dismiss)
   * @default 5000
   */
  duration?: number
  
  /**
   * Whether the toast can be manually dismissed by the user
   * @default true
   */
  dismissible?: boolean
  
  /**
   * Optional action button configuration
   */
  action?: {
    /**
     * Text label for the action button
     */
    label: string
    /**
     * Callback function when action button is clicked
     */
    onClick: () => void
  }
}

/**
 * Context value interface for toast management
 */
interface ToastContextValue {
  /**
   * Array of currently active toasts
   */
  toasts: ToastData[]
  
  /**
   * Function to display a new toast notification
   */
  showToast: (toast: Omit<ToastData, 'id'>) => string
  
  /**
   * Function to hide a specific toast by ID
   */
  hideToast: (id: string) => void
  
  /**
   * Function to hide all active toasts
   */
  hideAllToasts: () => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

/**
 * Props for the ToastProvider component
 */
export interface ToastProviderProps {
  /**
   * Child components that will have access to toast functionality
   */
  children: React.ReactNode
  
  /**
   * Position where toasts should appear on screen
   * @default 'bottom-right'
   */
  position?: ToastPosition
  
  /**
   * Maximum number of toasts to display at once
   * @default 5
   */
  maxToasts?: number
  
  /**
   * Additional CSS classes to apply to the toast container
   */
  className?: string
  
  /**
   * Custom styles to apply to the toast container
   */
  style?: CSSProperties
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  children, 
  position = 'bottom-right',
  maxToasts = 5,
  className,
  style
}) => {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const showToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`
    const newToast = { ...toast, id }
    
    setToasts(prev => {
      const updated = [...prev, newToast]
      // Keep only the latest maxToasts
      return updated.slice(-maxToasts)
    })
    
    return id
  }, [maxToasts])

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const hideAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  const contextValue = React.useMemo(() => ({ 
    toasts, 
    showToast, 
    hideToast, 
    hideAllToasts 
  }), [toasts, showToast, hideToast, hideAllToasts])

  // Register the store for imperative API
  useEffect(() => {
    registerToastStore(contextValue)
    return () => {
      toastStore = null
    }
  }, [contextValue])

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer position={position} className={className} style={style} />
    </ToastContext.Provider>
  )
}

interface ToastContainerProps {
  position: ToastPosition
  className?: string
  style?: CSSProperties
}

const ToastContainer: React.FC<ToastContainerProps> = ({ position, className, style }) => {
  const context = useContext(ToastContext)
  
  // Process utility classes - must be called before any conditional returns
  const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
    className,
    style,
    componentClasses: clsx(styles.container, styles[position])
  })
  
  if (!context) return null

  const { toasts } = context

  if (toasts.length === 0) return null

  return createPortal(
    <div className={processedClassName} style={processedStyle}>
      {toasts.map(toast => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </div>,
    document.body
  )
}

interface ToastItemProps extends ToastData {
  className?: string
  style?: CSSProperties
}

const ToastItem: React.FC<ToastItemProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  dismissible = true,
  action,
  className,
  style
}) => {
  const context = useContext(ToastContext)
  const [isExiting, setIsExiting] = useState(false)

  const handleDismiss = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => {
      context?.hideToast(id)
    }, 300) // Match animation duration
  }, [context, id])

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration, handleDismiss])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓'
      case 'error':
        return '✕'
      case 'warning':
        return '!'
      case 'info':
      default:
        return 'i'
    }
  }

  // Process utility classes
  const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
    className,
    style,
    componentClasses: clsx(
      styles.toast,
      styles[type],
      {
        [styles.exiting]: isExiting
      }
    )
  })

  return (
    <div
      className={processedClassName}
      style={processedStyle}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.icon}>
        <span>{getIcon()}</span>
      </div>
      
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.message}>{message}</div>
        {action && (
          <button
            className={styles.action}
            onClick={() => {
              action.onClick()
              handleDismiss()
            }}
          >
            {action.label}
          </button>
        )}
      </div>

      {dismissible && (
        <button
          className={styles.dismiss}
          onClick={handleDismiss}
          aria-label="Dismiss"
        >
          ✕
        </button>
      )}
    </div>
  )
}

// Hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

// Store for imperative toast API
let toastStore: ToastContextValue | null = null

// Register toast store (called by provider)
export const registerToastStore = (store: ToastContextValue) => {
  toastStore = store
}

// Convenience methods
export const toast = {
  info: (message: string, options?: Partial<Omit<ToastData, 'id' | 'type' | 'message'>>) => {
    if (!toastStore) {
      // ToastProvider not found. Make sure to wrap your app with ToastProvider.
      return ''
    }
    return toastStore.showToast({ ...options, type: 'info', message })
  },
  success: (message: string, options?: Partial<Omit<ToastData, 'id' | 'type' | 'message'>>) => {
    if (!toastStore) {
      // ToastProvider not found. Make sure to wrap your app with ToastProvider.
      return ''
    }
    return toastStore.showToast({ ...options, type: 'success', message })
  },
  warning: (message: string, options?: Partial<Omit<ToastData, 'id' | 'type' | 'message'>>) => {
    if (!toastStore) {
      // ToastProvider not found. Make sure to wrap your app with ToastProvider.
      return ''
    }
    return toastStore.showToast({ ...options, type: 'warning', message })
  },
  error: (message: string, options?: Partial<Omit<ToastData, 'id' | 'type' | 'message'>>) => {
    if (!toastStore) {
      // ToastProvider not found. Make sure to wrap your app with ToastProvider.
      return ''
    }
    return toastStore.showToast({ ...options, type: 'error', message })
  }
}