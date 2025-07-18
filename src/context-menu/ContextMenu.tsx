import React, { createContext, useContext, useState, useRef, useEffect, useCallback, forwardRef } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
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

// Main ContextMenu component
export interface ContextMenuProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'brutal' | 'dark'
  onOpenChange?: (open: boolean) => void
}

const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ children, className, size = 'md', variant = 'default', onOpenChange }, ref) => {
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

    return (
      <ContextMenuContext.Provider value={contextValue}>
        <div ref={ref} className={clsx(styles.root, className)}>
          {children}
        </div>
      </ContextMenuContext.Provider>
    )
  }
)

// Trigger component
export interface ContextMenuTriggerProps {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

const ContextMenuTrigger = forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ children, className, asChild = false }, ref) => {
    const { onOpen } = useContextMenu()

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ onContextMenu?: (e: React.MouseEvent) => void }>, {
        onContextMenu: onOpen,
        ref
      })
    }

    return (
      <div 
        ref={ref}
        className={clsx(styles.trigger, className)}
        onContextMenu={onOpen}
      >
        {children}
      </div>
    )
  }
)

// Content component with portal
export interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  alignOffset?: number
  collisionPadding?: number
  avoidCollisions?: boolean
  container?: HTMLElement | null
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'brutal' | 'dark'
}

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
          ref={(node) => {
            contentRef.current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
          }}
          className={clsx(
            styles.content,
            className
          )}
          data-size={size}
          data-variant={variant}
          style={{
            position: 'fixed',
            left: `${adjustedPosition.x}px`,
            top: `${adjustedPosition.y}px`,
            zIndex: 9999,
            ...rest.style
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

// Item component
export interface ContextMenuItemProps {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  destructive?: boolean
  onSelect?: (e: React.MouseEvent) => void
  closeOnSelect?: boolean
  icon?: React.ReactNode
  shortcut?: string
  checked?: boolean
  dotted?: boolean
}

const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ children, className, disabled = false, destructive = false, onSelect, closeOnSelect = true, icon, shortcut, checked, dotted }, ref) => {
    const { onClose } = useContextMenu()
    const [isHighlighted, setIsHighlighted] = useState(false)

    const handleClick = (e: React.MouseEvent) => {
      console.log('Context menu item clicked', { disabled, children })
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
        className={clsx(
          styles.item,
          disabled && styles.itemDisabled,
          destructive && styles.itemDestructive,
          className
        )}
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

// Separator component
export interface ContextMenuSeparatorProps {
  className?: string
}

const ContextMenuSeparator = forwardRef<HTMLDivElement, ContextMenuSeparatorProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.separator, className)}
        role="separator"
        aria-orientation="horizontal"
      />
    )
  }
)

// Label component
export interface ContextMenuLabelProps {
  children: React.ReactNode
  className?: string
}

const ContextMenuLabel = forwardRef<HTMLDivElement, ContextMenuLabelProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.label, className)}
        role="presentation"
      >
        {children}
      </div>
    )
  }
)

// Sub menu components
export interface ContextMenuSubProps {
  children: React.ReactNode
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const ContextMenuSub = forwardRef<HTMLDivElement, ContextMenuSubProps>(
  ({ children, className, open: controlledOpen, onOpenChange }, ref) => {
    const parentContext = useContextMenu()
    const [internalOpen, setInternalOpen] = useState(false)
    const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen
    const hoverTimeoutRef = useRef<NodeJS.Timeout>()
    const closeTimeoutRef = useRef<NodeJS.Timeout>()

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
          className={className}
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

export interface ContextMenuSubTriggerProps {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  icon?: React.ReactNode
}

const ContextMenuSubTrigger = forwardRef<HTMLDivElement, ContextMenuSubTriggerProps>(
  ({ children, className, disabled = false, icon }, ref) => {
    const { onOpen, onClose, isOpen } = useContextMenu()
    const [isHighlighted, setIsHighlighted] = useState(false)

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
        className={clsx(
          styles.subTrigger,
          disabled && styles.itemDisabled,
          isOpen && styles.subTriggerOpen,
          className
        )}
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

export interface ContextMenuSubContentProps extends Omit<ContextMenuContentProps, 'container'> {
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const ContextMenuSubContent = forwardRef<HTMLDivElement, ContextMenuSubContentProps>(
  ({ className, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const context = useContextMenu()
    const elementRef = useRef<HTMLDivElement>(null)
    
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
        ref={(node) => {
          elementRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
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