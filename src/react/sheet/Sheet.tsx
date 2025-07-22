/**
 * @module Sheet
 * @description A slide-out panel component that displays content in an overlay from any side of the screen. Features backdrop blur, focus management, and smooth animations with multiple size variants.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import styles from './Sheet.module.css'

/**
 * Props for the Sheet component
 */
interface SheetProps {
  /**
   * Whether the sheet is currently open (controlled mode)
   */
  open?: boolean
  
  /**
   * Whether the sheet should be open by default (uncontrolled mode)
   * @default false
   */
  defaultOpen?: boolean
  
  /**
   * Callback function called when the sheet open state changes
   */
  onOpenChange?: (open: boolean) => void
  
  /**
   * Content to render within the sheet provider
   */
  children?: React.ReactNode
  
  /**
   * Additional CSS classes to apply to the sheet container
   */
  className?: string
}

/**
 * Context value interface for Sheet components
 */
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

/**
 * Props for the SheetTrigger component
 */
interface SheetTriggerProps {
  /**
   * Content to render inside the trigger button
   */
  children: React.ReactNode
  
  /**
   * Additional CSS classes to apply to the trigger
   */
  className?: string
  
  /**
   * Whether to use the child element as the trigger instead of a button
   * @default false
   */
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

/**
 * Props for the SheetContent component
 */
interface SheetContentProps {
  /**
   * Content to render inside the sheet
   */
  children: React.ReactNode
  
  /**
   * Additional CSS classes to apply to the sheet content
   */
  className?: string
  
  /**
   * Side of the screen from which the sheet should slide out
   * @default 'right'
   */
  side?: 'top' | 'bottom' | 'left' | 'right'
  
  /**
   * Size variant for the sheet
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  
  /**
   * Visual style variant for the sheet
   * @default 'default'
   */
  variant?: 'default' | 'brutal' | 'outline'
  
  /**
   * Whether to show the backdrop overlay
   * @default true
   */
  showOverlay?: boolean
  
  /**
   * Whether clicking the overlay should close the sheet
   * @default true
   */
  closeOnOverlayClick?: boolean
  
  /**
   * Whether pressing Escape should close the sheet
   * @default true
   */
  closeOnEscape?: boolean
  
  /**
   * Custom container element to portal the sheet into
   */
  container?: HTMLElement | null
  
  /**
   * Callback when the Escape key is pressed
   */
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  
  /**
   * Callback when a pointer down event occurs outside the sheet
   */
  onPointerDownOutside?: (event: PointerEvent) => void
  
  /**
   * Callback when any interaction occurs outside the sheet
   */
  onInteractOutside?: (event: Event) => void
  
  /**
   * Callback when the sheet opens and focus is applied
   */
  onOpenAutoFocus?: (event: Event) => void
  
  /**
   * Callback when the sheet closes and focus is restored
   */
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

    const sheetRefCallback = useCallback((node: HTMLDivElement | null) => {
      if (contentRef && contentRef.current !== node) {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node
      }
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
      }
    }, [ref])

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
          ref={sheetRefCallback}
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

/**
 * Props for the SheetHeader component
 */
interface SheetHeaderProps {
  /**
   * Content to render in the sheet header
   */
  children: React.ReactNode
  
  /**
   * Additional CSS classes to apply to the header
   */
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

/**
 * Props for the SheetTitle component
 */
interface SheetTitleProps {
  /**
   * Title text or content
   */
  children: React.ReactNode
  
  /**
   * Additional CSS classes to apply to the title
   */
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

/**
 * Props for the SheetDescription component
 */
interface SheetDescriptionProps {
  /**
   * Description text or content
   */
  children: React.ReactNode
  
  /**
   * Additional CSS classes to apply to the description
   */
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

/**
 * Props for the SheetFooter component
 */
interface SheetFooterProps {
  /**
   * Content to render in the sheet footer
   */
  children: React.ReactNode
  
  /**
   * Additional CSS classes to apply to the footer
   */
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

/**
 * Props for the SheetClose component
 */
interface SheetCloseProps {
  /**
   * Content to render inside the close button
   */
  children: React.ReactNode
  
  /**
   * Additional CSS classes to apply to the close button
   */
  className?: string
  
  /**
   * Whether to use the child element as the close trigger instead of a button
   * @default false
   */
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