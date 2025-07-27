/**
 * @module Dropdown
 * @description A dropdown menu component triggered by user interaction. Features automatic positioning, keyboard navigation, and flexible content with support for icons and shortcuts.
 */

import React, { useState, useRef, useEffect, useCallback, createContext, useContext, forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { clsx } from 'clsx'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'
import styles from './Dropdown.module.css'

export type DropdownPosition = 
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'top' | 'top-start' | 'top-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end'

/**
 * Props for the Dropdown component
 */
export interface DropdownProps {
  /**
   * The trigger element and menu content
   */
  children: React.ReactNode
  
  /**
   * Controlled open state
   */
  open?: boolean
  
  /**
   * Callback fired when the dropdown opens or closes
   */
  onOpenChange?: (open: boolean) => void
  
  /**
   * Position of the dropdown relative to the trigger
   * @default 'bottom'
   */
  position?: DropdownPosition
  
  /**
   * Distance in pixels from the trigger
   * @default 8
   */
  offset?: number
  
  /**
   * Whether to close the dropdown when an item is clicked
   * @default true
   */
  closeOnItemClick?: boolean
  
  /**
   * Whether to close when clicking outside the dropdown
   * @default true
   */
  closeOnClickOutside?: boolean
  
  /**
   * Whether to close when pressing the Escape key
   * @default true
   */
  closeOnEscape?: boolean
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
  
  /**
   * Custom styles to apply to the dropdown
   */
  style?: CSSProperties
}

interface DropdownContextValue {
  close: () => void
  closeOnItemClick: boolean
}

const DropdownContext = createContext<DropdownContextValue | null>(null)

/**
 * A dropdown menu triggered by user interaction.
 * Provides automatic positioning and keyboard navigation.
 * 
 * @example
 * ```tsx
 * <Dropdown>
 *   <button>Options</button>
 *   <Dropdown.Menu>
 *     <Dropdown.Item icon={<EditIcon />}>Edit</Dropdown.Item>
 *     <Dropdown.Item icon={<CopyIcon />}>Duplicate</Dropdown.Item>
 *     <Dropdown.Separator />
 *     <Dropdown.Item destructive>Delete</Dropdown.Item>
 *   </Dropdown.Menu>
 * </Dropdown>
 * ```
 */
export const Dropdown: React.FC<DropdownProps> & {
  Menu: typeof DropdownMenu
  Item: typeof DropdownItem
  Separator: typeof DropdownSeparator
  Label: typeof DropdownLabel
} = ({
  children,
  open: controlledOpen,
  onOpenChange,
  position = 'bottom',
  offset = 8,
  closeOnItemClick = true,
  closeOnClickOutside = true,
  closeOnEscape = true,
  className,
  style,
}) => {
  const [open, setOpen] = useState(false)
  const [actualPosition, setActualPosition] = useState<DropdownPosition>(position)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const isOpen = controlledOpen !== undefined ? controlledOpen : open

  // Extract trigger and menu from children
  let triggerElement: React.ReactElement | null = null
  let menuContent: React.ReactNode = null

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === DropdownMenu) {
        menuContent = child.props.children
      } else {
        triggerElement = child
      }
    }
  })

  // Calculate position
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !dropdownRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const dropdownRect = dropdownRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let x = 0
    let y = 0

    // Calculate base position
    const [main, alignment] = position.split('-') as [string, string?]

    switch (main) {
      case 'bottom':
        y = triggerRect.bottom + offset
        break
      case 'top':
        y = triggerRect.top - dropdownRect.height - offset
        break
      case 'left':
        x = triggerRect.left - dropdownRect.width - offset
        break
      case 'right':
        x = triggerRect.right + offset
        break
    }

    // Handle alignment
    if (main === 'bottom' || main === 'top') {
      switch (alignment) {
        case 'start':
          x = triggerRect.left
          break
        case 'end':
          x = triggerRect.right - dropdownRect.width
          break
        default:
          x = triggerRect.left + triggerRect.width / 2 - dropdownRect.width / 2
      }
    } else if (main === 'left' || main === 'right') {
      switch (alignment) {
        case 'start':
          y = triggerRect.top
          break
        case 'end':
          y = triggerRect.bottom - dropdownRect.height
          break
        default:
          y = triggerRect.top + triggerRect.height / 2 - dropdownRect.height / 2
      }
    }

    // Adjust for viewport boundaries
    x = Math.max(8, Math.min(x, viewportWidth - dropdownRect.width - 8))
    y = Math.max(8, Math.min(y, viewportHeight - dropdownRect.height - 8))

    setActualPosition(position)
    setCoords({
      x: x,
      y: y,
    })
  }, [position, offset])

  // Toggle dropdown
  const toggleDropdown = useCallback(() => {
    if (controlledOpen === undefined) {
      setOpen(prev => !prev)
    }
    onOpenChange?.(!isOpen)
  }, [controlledOpen, isOpen, onOpenChange])

  // Close dropdown
  const closeDropdown = useCallback(() => {
    if (controlledOpen === undefined) {
      setOpen(false)
    }
    onOpenChange?.(false)
  }, [controlledOpen, onOpenChange])

  // Handle click outside
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!closeOnClickOutside || !isOpen) return

    const target = event.target as Node
    if (
      dropdownRef.current &&
      triggerRef.current &&
      !dropdownRef.current.contains(target) &&
      !triggerRef.current.contains(target)
    ) {
      closeDropdown()
    }
  }, [closeOnClickOutside, isOpen, closeDropdown])

  // Handle escape key
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && closeOnEscape && isOpen) {
      closeDropdown()
    }
  }, [closeOnEscape, isOpen, closeDropdown])

  // Effects
  useEffect(() => {
    if (isOpen) {
      calculatePosition()

      const handleResize = () => calculatePosition()
      const handleScroll = () => {
        calculatePosition()
        // Optional: Close dropdown if trigger is scrolled out of view
        if (triggerRef.current) {
          const rect = triggerRef.current.getBoundingClientRect()
          if (rect.bottom < 0 || rect.top > window.innerHeight) {
            closeDropdown()
          }
        }
      }

      window.addEventListener('resize', handleResize)
      window.addEventListener('scroll', handleScroll, true) // Use capture to catch all scroll events
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)

      return () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('scroll', handleScroll, true)
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isOpen, calculatePosition, handleClickOutside, handleKeyDown, closeDropdown])

  // Clone trigger with ref and click handler
  const trigger = triggerElement && React.isValidElement(triggerElement) ? React.cloneElement(triggerElement, {
    ref: (el: HTMLElement | null) => {
      triggerRef.current = el
    },
    onClick: (e: React.MouseEvent) => {
      triggerElement?.props.onClick?.(e)
      toggleDropdown()
    },
    'aria-expanded': isOpen,
    'aria-haspopup': 'menu',
  }) : null

  const contextValue: DropdownContextValue = {
    close: closeDropdown,
    closeOnItemClick,
  }

  // Process utility classes for the dropdown
  const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
    className,
    style,
    componentClasses: clsx(
      styles.dropdown,
      styles[actualPosition.split('-')[0]]
    )
  })

  return (
    <>
      {trigger}
      {isOpen && createPortal(
        <DropdownContext.Provider value={contextValue}>
          <div
            ref={dropdownRef}
            className={processedClassName}
            style={{
              position: 'fixed',
              left: coords.x,
              top: coords.y,
              zIndex: 'var(--brutal-z-dropdown)',
              ...processedStyle
            }}
            role="menu"
            aria-orientation="vertical"
          >
            {menuContent}
          </div>
        </DropdownContext.Provider>,
        document.body
      )}
    </>
  )
}

/**
 * Container for dropdown menu items.
 * Must be a direct child of the Dropdown component.
 */
export const DropdownMenu = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { style?: CSSProperties }>(
  ({ className, style, children, ...props }, ref) => {
    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: styles.menu
    })

    return (
      <div ref={ref} className={processedClassName} style={processedStyle} {...props}>
        {children}
      </div>
    )
  }
)

/**
 * Props for the Dropdown.Item component
 */
interface DropdownItemProps extends HTMLAttributes<HTMLDivElement> {
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
   * Icon to display before the item text
   */
  icon?: React.ReactNode
  
  /**
   * Keyboard shortcut to display on the right
   */
  shortcut?: string
  
  /**
   * Custom styles to apply to the item
   */
  style?: CSSProperties
}

/**
 * Individual item within the dropdown menu.
 * Supports icons, shortcuts, and various states.
 */
export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ className, style, disabled, destructive, icon, shortcut, children, onClick, ...props }, ref) => {
    const context = useContext(DropdownContext)

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      
      onClick?.(e)
      if (context?.closeOnItemClick) {
        context.close()
      }
    }

    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.item,
        {
          [styles.disabled]: disabled,
          [styles.destructive]: destructive,
        }
      )
    })

    return (
      <div
        ref={ref}
        className={processedClassName}
        style={processedStyle}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        {...props}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.text}>{children}</span>
        {shortcut && <span className={styles.shortcut}>{shortcut}</span>}
      </div>
    )
  }
)

/**
 * Visual separator between dropdown items or groups.
 */
export const DropdownSeparator = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { style?: CSSProperties }>(
  ({ className, style, ...props }, ref) => {
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
        {...props}
      />
    )
  }
)

/**
 * Label for grouping dropdown items.
 * Non-interactive and used for organizational purposes.
 */
export const DropdownLabel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { style?: CSSProperties }>(
  ({ className, style, children, ...props }, ref) => {
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
        {...props}
      >
        {children}
      </div>
    )
  }
)

// Hook to use dropdown context
export const useDropdown = () => {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error('useDropdown must be used within a Dropdown component')
  }
  return context
}

// Display names
DropdownMenu.displayName = 'DropdownMenu'
DropdownItem.displayName = 'DropdownItem'
DropdownSeparator.displayName = 'DropdownSeparator'
DropdownLabel.displayName = 'DropdownLabel'

// Attach subcomponents
Dropdown.Menu = DropdownMenu
Dropdown.Item = DropdownItem
Dropdown.Separator = DropdownSeparator
Dropdown.Label = DropdownLabel