/**
 * @module Drawer
 * @description A slide-out panel component that appears from the edge of the screen. Perfect for navigation menus, forms, and supplementary content with full accessibility support.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'
import styles from './Drawer.module.css'

/**
 * Props for the Drawer component
 */
interface DrawerProps {
  /**
   * Controlled open state
   */
  open?: boolean
  
  /**
   * Default open state when uncontrolled
   * @default false
   */
  defaultOpen?: boolean
  
  /**
   * Callback fired when the drawer opens or closes
   */
  onOpenChange?: (open: boolean) => void
  
  /**
   * The edge of the screen from which the drawer appears
   * @default 'right'
   */
  direction?: 'left' | 'right' | 'top' | 'bottom'
  
  /**
   * The size of the drawer
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  
  /**
   * The visual style variant of the drawer
   * @default 'default'
   */
  variant?: 'default' | 'brutal' | 'outline'
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
  
  /**
   * Custom styles to apply to the drawer
   */
  style?: CSSProperties
  
  /**
   * Drawer trigger and content components
   */
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

/**
 * A slide-out panel that appears from the edge of the screen.
 * Manages open state and provides context for child components.
 * 
 * @example
 * ```tsx
 * <Drawer>
 *   <Drawer.Trigger>Open Menu</Drawer.Trigger>
 *   <Drawer.Content>
 *     <Drawer.Header>
 *       <Drawer.Title>Navigation</Drawer.Title>
 *       <Drawer.Close />
 *     </Drawer.Header>
 *     <Drawer.Body>
 *       <nav>...</nav>
 *     </Drawer.Body>
 *   </Drawer.Content>
 * </Drawer>
 * ```
 */
const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({ 
    open, 
    defaultOpen = false, 
    onOpenChange, 
    direction = 'right',
    size = 'md',
    variant = 'default',
    className,
    style, 
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

    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: ''
    })

    return (
      <DrawerContext.Provider value={contextValue}>
        <div ref={ref} className={processedClassName} style={processedStyle} {...props}>
          {children}
        </div>
      </DrawerContext.Provider>
    )
  }
)

/**
 * Props for the Drawer.Trigger component
 */
interface DrawerTriggerProps {
  /**
   * The trigger element content
   */
  children: React.ReactNode
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
  
  /**
   * Custom styles to apply to the trigger
   */
  style?: CSSProperties
  
  /**
   * Whether to render as a child element instead of a button
   * @default false
   */
  asChild?: boolean
}

/**
 * Button or element that opens the drawer when clicked.
 */
const DrawerTrigger = React.forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ children, className, style, asChild = false, ...props }, ref) => {
    const { setOpen } = useDrawer()

    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.trigger
    })

    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        onClick: () => setOpen(true),
        ...props
      })
    }

    return (
      <button
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        onClick={() => setOpen(true)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

/**
 * Props for the Drawer.Content component
 */
interface DrawerContentProps {
  /**
   * The drawer content (header, body, footer, etc.)
   */
  children: React.ReactNode
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
  
  /**
   * Custom styles to apply to the content
   */
  style?: CSSProperties
  
  /**
   * Whether to show a backdrop overlay
   * @default true
   */
  showOverlay?: boolean
  
  /**
   * Whether clicking the overlay closes the drawer
   * @default true
   */
  closeOnOverlayClick?: boolean
  
  /**
   * Whether pressing Escape closes the drawer
   * @default true
   */
  closeOnEscape?: boolean
}

/**
 * The sliding panel content of the drawer.
 * Handles animations, focus management, and accessibility.
 */
const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ 
    children, 
    className,
    style, 
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

    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.content,
        styles[`content--${direction}`],
        styles[`content--${size}`],
        styles[`content--${variant}`]
      )
    })

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
          className={processedClassName}
          style={processedStyle}
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

/**
 * Props for the Drawer.Header component
 */
interface DrawerHeaderProps {
  /**
   * Header content (typically title and close button)
   */
  children: React.ReactNode
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
  
  /**
   * Custom styles to apply to the header
   */
  style?: CSSProperties
}

/**
 * Header section of the drawer.
 * Typically contains the title and close button.
 */
const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ children, className, style, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.header
    })

    return (
      <div
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        {...props}
      >
        {children}
      </div>
    )
  }
)

/**
 * Props for the Drawer.Title component
 */
interface DrawerTitleProps {
  /**
   * The title text content
   */
  children: React.ReactNode
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
  
  /**
   * Custom styles to apply to the title
   */
  style?: CSSProperties
}

/**
 * Title element for the drawer header.
 * Renders as an h2 element.
 */
const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ children, className, style, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.title
    })

    return (
      <h2
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        {...props}
      >
        {children}
      </h2>
    )
  }
)

/**
 * Props for the Drawer.Description component
 */
interface DrawerDescriptionProps {
  /**
   * The description text content
   */
  children: React.ReactNode
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
  
  /**
   * Custom styles to apply to the description
   */
  style?: CSSProperties
}

/**
 * Description text for the drawer.
 * Provides additional context below the title.
 */
const DrawerDescription = React.forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  ({ children, className, style, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.description
    })

    return (
      <p
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        {...props}
      >
        {children}
      </p>
    )
  }
)

/**
 * Props for the Drawer.Body component
 */
interface DrawerBodyProps {
  /**
   * The main content of the drawer
   */
  children: React.ReactNode
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
  
  /**
   * Custom styles to apply to the body
   */
  style?: CSSProperties
}

/**
 * Main content area of the drawer.
 * Scrollable when content exceeds the drawer height.
 */
const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, className, style, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.body
    })

    return (
      <div
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        {...props}
      >
        {children}
      </div>
    )
  }
)

/**
 * Props for the Drawer.Footer component
 */
interface DrawerFooterProps {
  /**
   * Footer content (typically action buttons)
   */
  children: React.ReactNode
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
  
  /**
   * Custom styles to apply to the footer
   */
  style?: CSSProperties
}

/**
 * Footer section of the drawer.
 * Typically contains action buttons.
 */
const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ children, className, style, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.footer
    })

    return (
      <div
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        {...props}
      >
        {children}
      </div>
    )
  }
)

/**
 * Props for the Drawer.Close component
 */
interface DrawerCloseProps {
  /**
   * Custom close button content (defaults to X icon)
   */
  children?: React.ReactNode
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
  
  /**
   * Custom styles to apply to the close button
   */
  style?: CSSProperties
  
  /**
   * Whether to render as a child element instead of a button
   * @default false
   */
  asChild?: boolean
}

/**
 * Close button for the drawer.
 * Typically placed in the drawer header.
 */
const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ children, className, style, asChild = false, ...props }, ref) => {
    const { setOpen } = useDrawer()

    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.close
    })

    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        onClick: () => setOpen(false),
        ...props
      })
    }

    return (
      <button
        ref={ref}
        className={processedClassName}
        style={processedStyle}
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