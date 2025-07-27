/**
 * @module ContextMenu
 * @description A context menu component that appears on right-click. Supports nested menus, keyboard navigation, and customizable items with icons and shortcuts.
 */

import React, { createContext, useContext, useState, useRef, useEffect, useCallback, forwardRef, CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'
import styles from './ContextMenu.module.css'

// Context for managing context menu state
interface ContextMenuContextValue {
  isOpen: boolean
  position: { x: number; y: number } | null
  onOpen: (e: React.MouseEvent) => void
  onClose: () => void
  onKeepOpen?: () => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'brutal' | 'dark'
}

const ContextMenuContext = createContext<ContextMenuContextValue | undefined>(undefined)

function useContextMenu() {
  const context = useContext(ContextMenuContext)
  if (!context) {
    throw new Error('ContextMenu components must be used within ContextMenu')
  }
  return context
}

/**
 * Props for the ContextMenu component
 */
export interface ContextMenuProps {
  /**
   * The trigger and content elements for the context menu
   */
  children: React.ReactNode
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
  
  /**
   * Custom styles to apply to the context menu
   */
  style?: CSSProperties
  
  /**
   * The size variant of the context menu
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * The visual style variant of the context menu
   * @default 'default'
   */
  variant?: 'default' | 'brutal' | 'dark'
  
  /**
   * Callback fired when the menu opens or closes
   */
  onOpenChange?: (open: boolean) => void
}

/**
 * A context menu that appears on right-click.
 * Provides a flexible structure for building context-sensitive menus with keyboard navigation.
 * 
 * @example
 * ```tsx
 * <ContextMenu>
 *   <ContextMenu.Trigger asChild>
 *     <div>Right-click me</div>
 *   </ContextMenu.Trigger>
 *   <ContextMenu.Content>
 *     <ContextMenu.Item onSelect={() => console.log('Edit')}>
 *       Edit
 *     </ContextMenu.Item>
 *     <ContextMenu.Separator />
 *     <ContextMenu.Item destructive>Delete</ContextMenu.Item>
 *   </ContextMenu.Content>
 * </ContextMenu>
 * ```
 */
const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ children, className, style, size = 'md', variant = 'default', onOpenChange }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [position, setPosition] = useState<{ x: number; y: number } | null>(null)

    const onOpen = useCallback((e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      
      setPosition({ x: e.clientX, y: e.clientY })
      setIsOpen(true)
      onOpenChange?.(true)
      
      // Lock body scroll
      document.body.style.overflow = 'hidden'
      document.body.style.userSelect = 'none'
    }, [onOpenChange])

    const onClose = useCallback(() => {
      setIsOpen(false)
      setPosition(null)
      onOpenChange?.(false)
      
      // Restore body scroll
      document.body.style.overflow = ''
      document.body.style.userSelect = ''
    }, [onOpenChange])

    // Close on escape key
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          onClose()
        }
      }

      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
      }
    }, [isOpen, onClose])
    
    // Cleanup on unmount
    useEffect(() => {
      return () => {
        if (isOpen) {
          document.body.style.overflow = ''
          document.body.style.userSelect = ''
        }
      }
    }, [isOpen])

    const contextValue: ContextMenuContextValue = {
      isOpen,
      position,
      onOpen,
      onClose,
      size,
      variant
    }

    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.root
    })

    return (
      <ContextMenuContext.Provider value={contextValue}>
        <div ref={ref} className={processedClassName} style={processedStyle}>
          {children}
        </div>
      </ContextMenuContext.Provider>
    )
  }
)

/**
 * Props for the ContextMenu.Trigger component
 */
export interface ContextMenuTriggerProps {
  /**
   * The element that triggers the context menu on right-click
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
   * Whether to render as a child element instead of wrapping in a div
   * @default false
   */
  asChild?: boolean
}

/**
 * The trigger area for the context menu.
 * Activates the menu on right-click (context menu event).
 */
const ContextMenuTrigger = forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ children, className, style, asChild = false }, ref) => {
    const { onOpen } = useContextMenu()
    
    // Process utility classes - must be called before any returns
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.trigger
    })

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ onContextMenu?: (e: React.MouseEvent) => void; ref?: React.Ref<HTMLElement> }>, {
        onContextMenu: onOpen,
        ref
      })
    }

    return (
      <div 
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        onContextMenu={onOpen}
      >
        {children}
      </div>
    )
  }
)

/**
 * Props for the ContextMenu.Content component
 */
export interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Menu items and other content
   */
  children: React.ReactNode
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
  
  /**
   * How to align the menu relative to the trigger
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end'
  
  /**
   * Distance in pixels from the trigger
   * @default 5
   */
  sideOffset?: number
  
  /**
   * Offset along the alignment axis
   * @default 0
   */
  alignOffset?: number
  
  /**
   * Minimum distance from viewport edges
   * @default 8
   */
  collisionPadding?: number
  
  /**
   * Whether to adjust position to stay in viewport
   * @default true
   */
  avoidCollisions?: boolean
  
  /**
   * Container element for the portal
   */
  container?: HTMLElement | null
  
  /**
   * Override the size from the root component
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Override the variant from the root component
   */
  variant?: 'default' | 'brutal' | 'dark'
}

/**
 * The content area of the context menu.
 * Rendered in a portal with automatic positioning and collision detection.
 */
const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ 
    children, 
    className, 
    align = 'start',
    sideOffset = 5,
    alignOffset = 0,
    collisionPadding = 8,
    avoidCollisions = true,
    container,
    size: sizeProp,
    variant: variantProp,
    ...rest
  }, ref) => {
    const { isOpen, position, onClose, size: contextSize, variant: contextVariant } = useContextMenu()
    const size = sizeProp || contextSize
    const variant = variantProp || contextVariant
    const contentRef = useRef<HTMLDivElement>(null)
    
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style: rest.style,
      componentClasses: styles.content
    })

    // Define ref callback outside of conditionals
    const refCallback = useCallback((node: HTMLDivElement | null) => {
      if (contentRef.current !== node) {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node
      }
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
      }
    }, [ref])

    // No need for click-outside detection since we have backdrop

    // Calculate position with collision detection
    const [adjustedPosition, setAdjustedPosition] = useState(position)

    useEffect(() => {
      if (!position || !contentRef.current || !avoidCollisions) {
        setAdjustedPosition(position)
        return
      }

      const rect = contentRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let x = position.x + sideOffset
      let y = position.y + sideOffset

      // Adjust horizontal position
      if (x + rect.width > viewportWidth - collisionPadding) {
        x = position.x - rect.width - sideOffset
      }
      if (x < collisionPadding) {
        x = collisionPadding
      }

      // Adjust vertical position
      if (y + rect.height > viewportHeight - collisionPadding) {
        y = position.y - rect.height - sideOffset
      }
      if (y < collisionPadding) {
        y = collisionPadding
      }

      // Apply alignment offset
      switch (align) {
        case 'center':
          x = position.x - rect.width / 2
          break
        case 'end':
          x = position.x - rect.width
          break
      }

      x += alignOffset

      setAdjustedPosition({ x, y })
    }, [position, align, alignOffset, sideOffset, collisionPadding, avoidCollisions])

    if (!isOpen || !adjustedPosition) return null

    const content = (
      <>
        {/* Backdrop to capture clicks and prevent interaction */}
        <div 
          className={styles.backdrop}
          onClick={onClose}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
            cursor: 'default',
            pointerEvents: 'auto'
          }}
        />
        <div
          ref={refCallback}
          className={processedClassName}
          data-size={size}
          data-variant={variant}
          style={{
            position: 'fixed',
            left: `${adjustedPosition.x}px`,
            top: `${adjustedPosition.y}px`,
            zIndex: 9999,
            ...processedStyle
          }}
          role="menu"
          aria-orientation="vertical"
          onMouseEnter={rest.onMouseEnter}
          onMouseLeave={rest.onMouseLeave}
        >
          {children}
        </div>
      </>
    )

    return createPortal(content, container || document.body)
  }
)

/**
 * Props for the ContextMenu.Item component
 */
export interface ContextMenuItemProps {
  /**
   * The content of the menu item
   */
  children: React.ReactNode
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
  
  /**
   * Custom styles to apply to the menu item
   */
  style?: CSSProperties
  
  /**
   * Whether the item is disabled and cannot be selected
   * @default false
   */
  disabled?: boolean
  
  /**
   * Whether the item represents a destructive action (shown in red)
   * @default false
   */
  destructive?: boolean
  
  /**
   * Callback fired when the item is selected
   */
  onSelect?: (e: React.MouseEvent) => void
  
  /**
   * Whether to close the menu when this item is selected
   * @default true
   */
  closeOnSelect?: boolean
  
  /**
   * Icon to display before the item text
   */
  icon?: React.ReactNode
  
  /**
   * Keyboard shortcut to display
   */
  shortcut?: string
  
  /**
   * Whether to show a checkmark (for checked items)
   */
  checked?: boolean
  
  /**
   * Whether to show a dot indicator
   */
  dotted?: boolean
}

/**
 * Individual menu item within the context menu.
 * Supports icons, shortcuts, and various states.
 */
const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ children, className, style, disabled = false, destructive = false, onSelect, closeOnSelect = true, icon, shortcut, checked, dotted }, ref) => {
    const { onClose } = useContextMenu()
    const [isHighlighted, setIsHighlighted] = useState(false)
    
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.item,
        disabled && styles.itemDisabled,
        destructive && styles.itemDestructive
      )
    })

    const handleClick = (e: React.MouseEvent) => {
      // Context menu item clicked
      if (disabled) {
        e.preventDefault()
        return
      }
      
      e.stopPropagation() // Prevent backdrop from closing
      onSelect?.(e)
      
      if (closeOnSelect && !e.defaultPrevented) {
        onClose()
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return
      
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick(e as unknown as React.MouseEvent)
      }
    }

    return (
      <div
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-checked={checked}
        data-highlighted={isHighlighted}
        data-disabled={disabled}
        data-destructive={destructive}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHighlighted(true)}
        onMouseLeave={() => setIsHighlighted(false)}
      >
        {(checked || dotted) && (
          <span className={styles.indicator}>
            {checked ? '✓' : '•'}
          </span>
        )}
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.itemText}>{children}</span>
        {shortcut && <span className={styles.shortcut}>{shortcut}</span>}
      </div>
    )
  }
)

/**
 * Props for the ContextMenu.Separator component
 */
export interface ContextMenuSeparatorProps {
  /**
   * Additional CSS class name for styling
   */
  className?: string
  
  /**
   * Custom styles to apply to the separator
   */
  style?: CSSProperties
}

/**
 * Visual separator between menu items or groups.
 */
const ContextMenuSeparator = forwardRef<HTMLDivElement, ContextMenuSeparatorProps>(
  ({ className, style }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.separator
    })
    return (
      <div
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        role="separator"
        aria-orientation="horizontal"
      />
    )
  }
)

/**
 * Props for the ContextMenu.Label component
 */
export interface ContextMenuLabelProps {
  /**
   * The label text content
   */
  children: React.ReactNode
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
  
  /**
   * Custom styles to apply to the label
   */
  style?: CSSProperties
}

/**
 * Label for grouping menu items.
 * Non-interactive and used for organizational purposes.
 */
const ContextMenuLabel = forwardRef<HTMLDivElement, ContextMenuLabelProps>(
  ({ children, className, style }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.label
    })
    return (
      <div
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        role="presentation"
      >
        {children}
      </div>
    )
  }
)

/**
 * Props for the ContextMenu.Sub component
 */
export interface ContextMenuSubProps {
  /**
   * The trigger and content for the submenu
   */
  children: React.ReactNode
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
  
  /**
   * Custom styles to apply to the sub menu
   */
  style?: CSSProperties
  
  /**
   * Controlled open state
   */
  open?: boolean
  
  /**
   * Callback fired when the submenu opens or closes
   */
  onOpenChange?: (open: boolean) => void
}

/**
 * Container for nested submenus.
 * Manages the open state and positioning of submenu content.
 */
const ContextMenuSub = forwardRef<HTMLDivElement, ContextMenuSubProps>(
  ({ children, className, style, open: controlledOpen, onOpenChange }, ref) => {
    const parentContext = useContextMenu()
    const [internalOpen, setInternalOpen] = useState(false)
    const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen
    const hoverTimeoutRef = useRef<NodeJS.Timeout>()
    const closeTimeoutRef = useRef<NodeJS.Timeout>()
    
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: undefined // No default classes for Sub
    })

    const handleOpenChange = (newOpen: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    }

    const handleOpen = (e: React.MouseEvent) => {
      clearTimeout(closeTimeoutRef.current)
      const element = e.currentTarget as HTMLElement
      hoverTimeoutRef.current = setTimeout(() => {
        const rect = element.getBoundingClientRect()
        setPosition({ x: rect.right - 4, y: rect.top - 4 })
        handleOpenChange(true)
      }, 100)
    }

    const handleKeepOpen = () => {
      // Just clear the close timeout without repositioning
      clearTimeout(closeTimeoutRef.current)
    }

    const handleClose = () => {
      clearTimeout(hoverTimeoutRef.current)
      closeTimeoutRef.current = setTimeout(() => {
        handleOpenChange(false)
      }, 300)
    }

    useEffect(() => {
      return () => {
        clearTimeout(hoverTimeoutRef.current)
        clearTimeout(closeTimeoutRef.current)
      }
    }, [])

    return (
      <ContextMenuContext.Provider value={{
        isOpen,
        position,
        onOpen: handleOpen,
        onClose: handleClose,
        onKeepOpen: handleKeepOpen,
        size: parentContext.size,
        variant: parentContext.variant
      }}>
        <div 
          ref={ref} 
          className={processedClassName}
          style={processedStyle}
          onMouseEnter={() => {
            clearTimeout(closeTimeoutRef.current)
            clearTimeout(hoverTimeoutRef.current)
          }}
          onMouseLeave={() => handleClose()}
        >
          {children}
        </div>
      </ContextMenuContext.Provider>
    )
  }
)

/**
 * Props for the ContextMenu.SubTrigger component
 */
export interface ContextMenuSubTriggerProps {
  /**
   * The trigger content for the submenu
   */
  children: React.ReactNode
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
  
  /**
   * Custom styles to apply to the sub trigger
   */
  style?: CSSProperties
  
  /**
   * Whether the submenu trigger is disabled
   * @default false
   */
  disabled?: boolean
  
  /**
   * Icon to display before the trigger text
   */
  icon?: React.ReactNode
}

/**
 * Trigger item that opens a submenu on hover.
 * Displays an arrow indicator to show it has a submenu.
 */
const ContextMenuSubTrigger = forwardRef<HTMLDivElement, ContextMenuSubTriggerProps>(
  ({ children, className, style, disabled = false, icon }, ref) => {
    const { onOpen, onClose, isOpen } = useContextMenu()
    const [isHighlighted, setIsHighlighted] = useState(false)
    
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.subTrigger,
        disabled && styles.itemDisabled,
        isOpen && styles.subTriggerOpen
      )
    })

    const handleMouseEnter = (e: React.MouseEvent) => {
      setIsHighlighted(true)
      if (!disabled) {
        onOpen(e)
      }
    }

    const handleMouseLeave = () => {
      setIsHighlighted(false)
      // Don't close immediately - let the Sub component handle the timing
      onClose()
    }

    return (
      <div
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-disabled={disabled}
        data-highlighted={isHighlighted}
        data-disabled={disabled}
        data-state={isOpen ? 'open' : 'closed'}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.itemText}>{children}</span>
        <span className={styles.subTriggerIcon} aria-hidden="true">▶</span>
      </div>
    )
  }
)

/**
 * Props for the ContextMenu.SubContent component
 */
export interface ContextMenuSubContentProps extends Omit<ContextMenuContentProps, 'container'> {
  /**
   * Callback when mouse enters the submenu
   */
  onMouseEnter?: () => void
  
  /**
   * Callback when mouse leaves the submenu
   */
  onMouseLeave?: () => void
}

/**
 * Content area for a submenu.
 * Positioned relative to its trigger with automatic collision detection.
 */
const ContextMenuSubContent = forwardRef<HTMLDivElement, ContextMenuSubContentProps>(
  ({ className, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const context = useContextMenu()
    const elementRef = useRef<HTMLDivElement>(null)
    
    const subRefCallback = useCallback((node: HTMLDivElement | null) => {
      if (elementRef.current !== node) {
        (elementRef as React.MutableRefObject<HTMLDivElement | null>).current = node
      }
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
      }
    }, [ref])
    
    const handleMouseEnter = () => {
      // When hovering over sub-content, keep it open by calling onKeepOpen 
      // which will clear any pending close timeout without repositioning
      context.onKeepOpen?.()
      onMouseEnter?.()
    }

    const handleMouseLeave = () => {
      // Start the close timer when leaving the sub-content
      onMouseLeave?.()
      context.onClose()
    }

    // Sub content uses the position from the parent context
    return (
      <ContextMenuContent 
        {...props} 
        ref={subRefCallback}
        className={clsx(styles.subContent, className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    )
  }
)

// Set display names
ContextMenu.displayName = 'ContextMenu'
ContextMenuTrigger.displayName = 'ContextMenu.Trigger'
ContextMenuContent.displayName = 'ContextMenu.Content'
ContextMenuItem.displayName = 'ContextMenu.Item'
ContextMenuSeparator.displayName = 'ContextMenu.Separator'
ContextMenuLabel.displayName = 'ContextMenu.Label'
ContextMenuSub.displayName = 'ContextMenu.Sub'
ContextMenuSubTrigger.displayName = 'ContextMenu.SubTrigger'
ContextMenuSubContent.displayName = 'ContextMenu.SubContent'

// Compound component pattern
export const ContextMenuNamespace = Object.assign(ContextMenu, {
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  Separator: ContextMenuSeparator,
  Label: ContextMenuLabel,
  Sub: ContextMenuSub,
  SubTrigger: ContextMenuSubTrigger,
  SubContent: ContextMenuSubContent
})

export { ContextMenuNamespace as ContextMenu }