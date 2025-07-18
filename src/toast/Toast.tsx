import React, { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { clsx } from 'clsx'
import styles from './Toast.module.css'

export type ToastType = 'info' | 'success' | 'warning' | 'error'
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

export interface ToastData {
  id: string
  type: ToastType
  title?: string
  message: string
  duration?: number
  dismissible?: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextValue {
  toasts: ToastData[]
  showToast: (toast: Omit<ToastData, 'id'>) => string
  hideToast: (id: string) => void
  hideAllToasts: () => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export interface ToastProviderProps {
  children: React.ReactNode
  position?: ToastPosition
  maxToasts?: number
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  children, 
  position = 'bottom-right',
  maxToasts = 5 
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

  const contextValue = { toasts, showToast, hideToast, hideAllToasts }

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
      <ToastContainer position={position} />
    </ToastContext.Provider>
  )
}

interface ToastContainerProps {
  position: ToastPosition
}

const ToastContainer: React.FC<ToastContainerProps> = ({ position }) => {
  const context = useContext(ToastContext)
  if (!context) return null

  const { toasts } = context

  if (toasts.length === 0) return null

  return createPortal(
    <div className={clsx(styles.container, styles[position])}>
      {toasts.map(toast => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </div>,
    document.body
  )
}

interface ToastItemProps extends ToastData {}

const ToastItem: React.FC<ToastItemProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  dismissible = true,
  action
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

  return (
    <div
      className={clsx(
        styles.toast,
        styles[type],
        {
          [styles.exiting]: isExiting
        }
      )}
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
      console.warn('ToastProvider not found. Make sure to wrap your app with ToastProvider.')
      return ''
    }
    return toastStore.showToast({ ...options, type: 'info', message })
  },
  success: (message: string, options?: Partial<Omit<ToastData, 'id' | 'type' | 'message'>>) => {
    if (!toastStore) {
      console.warn('ToastProvider not found. Make sure to wrap your app with ToastProvider.')
      return ''
    }
    return toastStore.showToast({ ...options, type: 'success', message })
  },
  warning: (message: string, options?: Partial<Omit<ToastData, 'id' | 'type' | 'message'>>) => {
    if (!toastStore) {
      console.warn('ToastProvider not found. Make sure to wrap your app with ToastProvider.')
      return ''
    }
    return toastStore.showToast({ ...options, type: 'warning', message })
  },
  error: (message: string, options?: Partial<Omit<ToastData, 'id' | 'type' | 'message'>>) => {
    if (!toastStore) {
      console.warn('ToastProvider not found. Make sure to wrap your app with ToastProvider.')
      return ''
    }
    return toastStore.showToast({ ...options, type: 'error', message })
  }
}