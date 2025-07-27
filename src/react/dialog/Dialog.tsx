/**
 * @module Dialog
 * @description A modal dialog component for displaying content that requires user interaction. Supports accessibility features including focus trap and ESC key handling.
 */

import React, { forwardRef, HTMLAttributes, useEffect, useRef, useCallback, useState, createContext, useContext, CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { clsx } from 'clsx'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'
import styles from './Dialog.module.css'

export interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Whether the dialog is open */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Whether to show backdrop */
  backdrop?: boolean
  /** Whether clicking backdrop closes dialog */
  closeOnBackdropClick?: boolean
  /** Whether pressing escape closes dialog */
  closeOnEscape?: boolean
  /** Dialog size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Dialog position */
  position?: 'center' | 'top' | 'bottom'
  /** Whether to animate the dialog */
  animate?: boolean
  /** Whether to manage focus automatically */
  autoFocus?: boolean
  /** Initial focus element selector */
  initialFocus?: string
  /** Additional CSS classes */
  className?: string
  /** Custom styles to apply to the dialog */
  style?: CSSProperties
}

interface DialogContextValue {
  close: () => void
}

const DialogContext = createContext<DialogContextValue | null>(null)

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open = false,
      onOpenChange,
      backdrop = true,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      size = 'md',
      position = 'center',
      animate = true,
      autoFocus = true,
      initialFocus,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [isExiting, setIsExiting] = useState(false)
    const dialogRef = useRef<HTMLDivElement | null>(null)
    const previousActiveElementRef = useRef<HTMLElement | null>(null)

    // Combine refs
    const setRefs = useCallback(
      (element: HTMLDivElement | null) => {
        dialogRef.current = element
        if (ref) {
          if (typeof ref === 'function') {
            ref(element)
          } else {
            ref.current = element
          }
        }
      },
      [ref]
    )

    // Close dialog
    const close = useCallback(() => {
      if (animate) {
        setIsExiting(true)
        setTimeout(() => {
          onOpenChange?.(false)
          setIsExiting(false)
        }, 300) // Match animation duration
      } else {
        onOpenChange?.(false)
      }
    }, [animate, onOpenChange])

    // Handle backdrop click
    const handleBackdropClick = useCallback(
      (event: React.MouseEvent) => {
        if (closeOnBackdropClick && event.target === event.currentTarget) {
          close()
        }
      },
      [closeOnBackdropClick, close]
    )

    // Handle keyboard events
    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === 'Escape' && closeOnEscape) {
          close()
        }
      },
      [closeOnEscape, close]
    )

    // Focus management
    const handleFocusManagement = useCallback(() => {
      if (!autoFocus || !dialogRef.current) return

      const focusableElements = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )

      if (initialFocus) {
        const initialElement = dialogRef.current.querySelector(initialFocus) as HTMLElement
        if (initialElement) {
          initialElement.focus({ preventScroll: true })
          return
        }
      }

      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus({ preventScroll: true })
      } else {
        dialogRef.current.focus({ preventScroll: true })
      }
    }, [autoFocus, initialFocus])

    // Focus trap
    const handleFocusTrap = useCallback((event: KeyboardEvent) => {
      if (!dialogRef.current || event.key !== 'Tab') return

      const focusableElements = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )

      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus({ preventScroll: true })
          event.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus({ preventScroll: true })
          event.preventDefault()
        }
      }
    }, [])

    // Effects
    useEffect(() => {
      if (open) {
        previousActiveElementRef.current = document.activeElement as HTMLElement
        handleFocusManagement()

        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keydown', handleFocusTrap)

        // Prevent body scroll
        document.body.style.overflow = 'hidden'

        return () => {
          document.removeEventListener('keydown', handleKeyDown)
          document.removeEventListener('keydown', handleFocusTrap)
          document.body.style.overflow = ''

          // Restore focus
          if (previousActiveElementRef.current) {
            previousActiveElementRef.current.focus({ preventScroll: true })
          }
        }
      }
    }, [open, handleKeyDown, handleFocusTrap, handleFocusManagement])

    const contextValue: DialogContextValue = {
      close,
    }

    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.dialog,
        styles[size],
        styles[position],
        {
          [styles.animate]: animate,
          [styles.exiting]: isExiting,
        }
      )
    })

    if (!open && !isExiting) return null

    return createPortal(
      <DialogContext.Provider value={contextValue}>
        <div
          className={clsx(
            styles.backdrop,
            {
              [styles.visible]: backdrop,
              [styles.exiting]: isExiting,
            }
          )}
          onClick={handleBackdropClick}
        >
          <div
            ref={setRefs}
            className={processedClassName}
            style={processedStyle}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            {...props}
          >
            {children}
          </div>
        </div>
      </DialogContext.Provider>,
      document.body
    )
  }
)

// Dialog subcomponents
export const DialogHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { style?: CSSProperties }>(
  ({ className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.header
    })

    return (
      <div ref={ref} className={processedClassName} style={processedStyle} {...props}>
        {children}
      </div>
    )
  }
)

export const DialogTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement> & { style?: CSSProperties }>(
  ({ className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.title
    })

    return (
      <h2 ref={ref} className={processedClassName} style={processedStyle} {...props}>
        {children}
      </h2>
    )
  }
)

export const DialogBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { style?: CSSProperties }>(
  ({ className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.body
    })

    return (
      <div ref={ref} className={processedClassName} style={processedStyle} {...props}>
        {children}
      </div>
    )
  }
)

export const DialogFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { style?: CSSProperties }>(
  ({ className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.footer
    })

    return (
      <div ref={ref} className={processedClassName} style={processedStyle} {...props}>
        {children}
      </div>
    )
  }
)

interface DialogCloseProps extends HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  style?: CSSProperties
}

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, style, children, asChild, onClick, ...props }, ref) => {
    const context = useContext(DialogContext)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      context?.close()
    }

    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.close
    })

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
        onClick: handleClick,
      })
    }

    return (
      <button
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        onClick={handleClick}
        aria-label="Close dialog"
        {...props}
      >
        {children || '✕'}
      </button>
    )
  }
)

// Hook to use dialog context
export const useDialog = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useDialog must be used within a Dialog component')
  }
  return context
}

// Display names
Dialog.displayName = 'Dialog'
DialogHeader.displayName = 'DialogHeader'
DialogTitle.displayName = 'DialogTitle'
DialogBody.displayName = 'DialogBody'
DialogFooter.displayName = 'DialogFooter'
DialogClose.displayName = 'DialogClose'

// Attach subcomponents
const DialogNamespace = Object.assign(Dialog, {
  Header: DialogHeader,
  Title: DialogTitle,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: DialogClose,
})

export default DialogNamespace