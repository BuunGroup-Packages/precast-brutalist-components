import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import styles from './Drawer.module.css'

interface DrawerProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  direction?: 'left' | 'right' | 'top' | 'bottom'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  variant?: 'default' | 'brutal' | 'outline'
  className?: string
  children?: React.ReactNode
}

interface DrawerContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  direction: 'left' | 'right' | 'top' | 'bottom'
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  variant: 'default' | 'brutal' | 'outline'
}

const DrawerContext = createContext<DrawerContextValue | null>(null)

const useDrawer = () => {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error('Drawer components must be used within a Drawer')
  }
  return context
}

const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({ 
    open, 
    defaultOpen = false, 
    onOpenChange, 
    direction = 'right',
    size = 'md',
    variant = 'default',
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

    const contextValue: DrawerContextValue = {
      open: isOpen,
      setOpen: handleOpenChange,
      direction,
      size,
      variant
    }

    return (
      <DrawerContext.Provider value={contextValue}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </DrawerContext.Provider>
    )
  }
)

interface DrawerTriggerProps {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

const DrawerTrigger = React.forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ children, className, asChild = false, ...props }, ref) => {
    const { setOpen } = useDrawer()

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

interface DrawerContentProps {
  children: React.ReactNode
  className?: string
  showOverlay?: boolean
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
}

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ 
    children, 
    className, 
    showOverlay = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    ...props 
  }, ref) => {
    const { open, setOpen, direction, size, variant } = useDrawer()

    // Handle escape key
    useEffect(() => {
      if (!closeOnEscape || !open) return

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false)
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [open, closeOnEscape, setOpen])

    // Handle body scroll
    useEffect(() => {
      if (open) {
        const originalStyle = window.getComputedStyle(document.body).overflow
        document.body.style.overflow = 'hidden'
        return () => {
          document.body.style.overflow = originalStyle
        }
      }
    }, [open])

    // Focus management
    useEffect(() => {
      if (open) {
        const activeElement = document.activeElement as HTMLElement
        const drawerContent = document.querySelector('[data-drawer-content]') as HTMLElement
        if (drawerContent) {
          const focusableElement = drawerContent.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) as HTMLElement
          if (focusableElement) {
            focusableElement.focus()
          }
        }
        return () => {
          if (activeElement) {
            activeElement.focus()
          }
        }
      }
    }, [open])

    if (!open) return null

    const content = (
      <>
        {showOverlay && (
          <div 
            className={styles.overlay}
            onClick={() => closeOnOverlayClick && setOpen(false)}
            aria-hidden="true"
          />
        )}
        <div
          ref={ref}
          className={clsx(
            styles.content,
            styles[`content--${direction}`],
            styles[`content--${size}`],
            styles[`content--${variant}`],
            className
          )}
          role="dialog"
          aria-modal="true"
          data-drawer-content
          data-state={open ? 'open' : 'closed'}
          {...props}
        >
          {children}
        </div>
      </>
    )

    return createPortal(content, document.body)
  }
)

interface DrawerHeaderProps {
  children: React.ReactNode
  className?: string
}

const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
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

interface DrawerTitleProps {
  children: React.ReactNode
  className?: string
}

const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
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

interface DrawerDescriptionProps {
  children: React.ReactNode
  className?: string
}

const DrawerDescription = React.forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
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

interface DrawerBodyProps {
  children: React.ReactNode
  className?: string
}

const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.body, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

interface DrawerFooterProps {
  children: React.ReactNode
  className?: string
}

const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
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

interface DrawerCloseProps {
  children?: React.ReactNode
  className?: string
  asChild?: boolean
}

const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ children, className, asChild = false, ...props }, ref) => {
    const { setOpen } = useDrawer()

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
        aria-label="Close drawer"
        {...props}
      >
        {children || (
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
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    )
  }
)

// Display names
Drawer.displayName = 'Drawer'
DrawerTrigger.displayName = 'DrawerTrigger'
DrawerContent.displayName = 'DrawerContent'
DrawerHeader.displayName = 'DrawerHeader'
DrawerTitle.displayName = 'DrawerTitle'
DrawerDescription.displayName = 'DrawerDescription'
DrawerBody.displayName = 'DrawerBody'
DrawerFooter.displayName = 'DrawerFooter'
DrawerClose.displayName = 'DrawerClose'

// Compound component pattern with proper typing
interface DrawerCompound extends React.ForwardRefExoticComponent<DrawerProps & React.RefAttributes<HTMLDivElement>> {
  Trigger: typeof DrawerTrigger
  Content: typeof DrawerContent
  Header: typeof DrawerHeader
  Title: typeof DrawerTitle
  Description: typeof DrawerDescription
  Body: typeof DrawerBody
  Footer: typeof DrawerFooter
  Close: typeof DrawerClose
}

const DrawerWithSubComponents = Drawer as DrawerCompound
DrawerWithSubComponents.Trigger = DrawerTrigger
DrawerWithSubComponents.Content = DrawerContent
DrawerWithSubComponents.Header = DrawerHeader
DrawerWithSubComponents.Title = DrawerTitle
DrawerWithSubComponents.Description = DrawerDescription
DrawerWithSubComponents.Body = DrawerBody
DrawerWithSubComponents.Footer = DrawerFooter
DrawerWithSubComponents.Close = DrawerClose

export { DrawerWithSubComponents as Drawer }
export type { 
  DrawerProps, 
  DrawerTriggerProps, 
  DrawerContentProps, 
  DrawerHeaderProps,
  DrawerTitleProps,
  DrawerDescriptionProps,
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerCloseProps
}