import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import styles from './Sheet.module.css'

interface SheetProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
  className?: string
}

interface SheetContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const SheetContext = createContext<SheetContextValue | null>(null)

const useSheet = () => {
  const context = useContext(SheetContext)
  if (!context) {
    throw new Error('Sheet components must be used within a Sheet')
  }
  return context
}

const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(
  ({ 
    open, 
    defaultOpen = false, 
    onOpenChange, 
    className, 
    children, 
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = useState(open ?? defaultOpen)

    // Handle controlled state
    useEffect(() => {
      if (open !== undefined) {
        setIsOpen(open)
      }
    }, [open])

    const handleOpenChange = useCallback((newOpen: boolean) => {
      setIsOpen(newOpen)
      onOpenChange?.(newOpen)
    }, [onOpenChange])

    const contextValue: SheetContextValue = {
      open: isOpen,
      setOpen: handleOpenChange
    }

    return (
      <SheetContext.Provider value={contextValue}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </SheetContext.Provider>
    )
  }
)

interface SheetTriggerProps {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ children, className, asChild = false, ...props }, ref) => {
    const { setOpen } = useSheet()

    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        onClick: () => setOpen(true),
        ...props
      })
    }

    return (
      <button
        ref={ref}
        className={clsx(styles.trigger, className)}
        onClick={() => setOpen(true)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

interface SheetContentProps {
  children: React.ReactNode
  className?: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  variant?: 'default' | 'brutal' | 'outline'
  showOverlay?: boolean
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  container?: HTMLElement | null
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onPointerDownOutside?: (event: PointerEvent) => void
  onInteractOutside?: (event: Event) => void
  onOpenAutoFocus?: (event: Event) => void
  onCloseAutoFocus?: (event: Event) => void
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ 
    children, 
    className,
    side = 'right',
    size = 'md',
    variant = 'default',
    showOverlay = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    container,
    onEscapeKeyDown,
    onPointerDownOutside,
    onInteractOutside,
    onOpenAutoFocus,
    onCloseAutoFocus,
    ...props 
  }, ref) => {
    const { open, setOpen } = useSheet()
    const contentRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    // Handle escape key
    useEffect(() => {
      if (!open || !closeOnEscape) return

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onEscapeKeyDown?.(event)
          if (!event.defaultPrevented) {
            setOpen(false)
          }
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, closeOnEscape, onEscapeKeyDown, setOpen])

    // Handle body scroll lock
    useEffect(() => {
      if (!open) return

      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      document.body.style.userSelect = 'none'

      return () => {
        document.body.style.overflow = originalStyle
        document.body.style.userSelect = ''
      }
    }, [open])

    // Handle focus management
    useEffect(() => {
      if (!open) return

      const previousActiveElement = document.activeElement as HTMLElement
      const content = contentRef.current

      if (content) {
        // Focus the content or first focusable element
        const focusableElements = content.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstFocusable = focusableElements[0] as HTMLElement
        
        if (firstFocusable) {
          firstFocusable.focus()
        } else {
          content.focus()
        }

        const focusEvent = new Event('focus')
        onOpenAutoFocus?.(focusEvent)
      }

      return () => {
        if (previousActiveElement) {
          previousActiveElement.focus()
          const focusEvent = new Event('focus')
          onCloseAutoFocus?.(focusEvent)
        }
      }
    }, [open, onOpenAutoFocus, onCloseAutoFocus])

    // Handle outside clicks
    useEffect(() => {
      if (!open || !closeOnOverlayClick) return

      const handlePointerDown = (event: PointerEvent) => {
        const target = event.target as Node
        const overlay = overlayRef.current
        const content = contentRef.current

        if (overlay && content && target) {
          // Check if click was on overlay but not on content
          if (overlay.contains(target) && !content.contains(target)) {
            onPointerDownOutside?.(event)
            onInteractOutside?.(event)
            
            if (!event.defaultPrevented) {
              setOpen(false)
            }
          }
        }
      }

      document.addEventListener('pointerdown', handlePointerDown)
      return () => document.removeEventListener('pointerdown', handlePointerDown)
    }, [open, closeOnOverlayClick, onPointerDownOutside, onInteractOutside, setOpen])

    if (!open) return null

    const content = (
      <>
        {showOverlay && (
          <div
            ref={overlayRef}
            className={styles.overlay}
            data-side={side}
            data-variant={variant}
          />
        )}
        <div
          ref={(node) => {
            if (contentRef) {
              contentRef.current = node
            }
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref && 'current' in ref) {
              ref.current = node
            }
          }}
          className={clsx(
            styles.content,
            styles[`side-${side}`],
            styles[`size-${size}`],
            styles[`variant-${variant}`],
            className
          )}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          data-side={side}
          data-size={size}
          data-variant={variant}
          data-state={open ? 'open' : 'closed'}
          {...props}
        >
          {children}
        </div>
      </>
    )

    return createPortal(content, container || document.body)
  }
)

interface SheetHeaderProps {
  children: React.ReactNode
  className?: string
}

const SheetHeader = React.forwardRef<HTMLDivElement, SheetHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.header, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

interface SheetTitleProps {
  children: React.ReactNode
  className?: string
}

const SheetTitle = React.forwardRef<HTMLHeadingElement, SheetTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={clsx(styles.title, className)}
        {...props}
      >
        {children}
      </h2>
    )
  }
)

interface SheetDescriptionProps {
  children: React.ReactNode
  className?: string
}

const SheetDescription = React.forwardRef<HTMLParagraphElement, SheetDescriptionProps>(
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

interface SheetFooterProps {
  children: React.ReactNode
  className?: string
}

const SheetFooter = React.forwardRef<HTMLDivElement, SheetFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.footer, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

interface SheetCloseProps {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

const SheetClose = React.forwardRef<HTMLButtonElement, SheetCloseProps>(
  ({ children, className, asChild = false, ...props }, ref) => {
    const { setOpen } = useSheet()

    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        onClick: () => setOpen(false),
        ...props
      })
    }

    return (
      <button
        ref={ref}
        className={clsx(styles.close, className)}
        onClick={() => setOpen(false)}
        aria-label="Close sheet"
        {...props}
      >
        {children}
      </button>
    )
  }
)

// Set display names
Sheet.displayName = 'Sheet'
SheetTrigger.displayName = 'Sheet.Trigger'
SheetContent.displayName = 'Sheet.Content'
SheetHeader.displayName = 'Sheet.Header'
SheetTitle.displayName = 'Sheet.Title'
SheetDescription.displayName = 'Sheet.Description'
SheetFooter.displayName = 'Sheet.Footer'
SheetClose.displayName = 'Sheet.Close'

// Compound component pattern
export const SheetNamespace = Object.assign(Sheet, {
  Trigger: SheetTrigger,
  Content: SheetContent,
  Header: SheetHeader,
  Title: SheetTitle,
  Description: SheetDescription,
  Footer: SheetFooter,
  Close: SheetClose
})

export { SheetNamespace as Sheet }
export type {
  SheetProps,
  SheetTriggerProps,
  SheetContentProps,
  SheetHeaderProps,
  SheetTitleProps,
  SheetDescriptionProps,
  SheetFooterProps,
  SheetCloseProps
}