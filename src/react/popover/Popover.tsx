/**
 * @module Popover
 * @description A floating content component that displays rich content in a portal overlay. Features intelligent positioning, focus management, and keyboard navigation with customizable trigger behaviors.
 */

import React, { useState, useRef, useEffect, useCallback, useContext, createContext, CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { clsx } from 'clsx'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'
import styles from './Popover.module.css'

/**
 * Available positions for the popover relative to its trigger element
 */
export type PopoverPosition = 
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end'
  | 'auto'

/**
 * Available trigger behaviors for showing the popover
 */
export type PopoverTrigger = 'click' | 'focus' | 'manual'

/**
 * Props for the Popover component
 */
export interface PopoverProps {
  /**
   * The trigger element that will show the popover when interacted with
   */
  children: React.ReactElement
  
  /**
   * The content to display inside the popover (for simple usage without sub-components)
   */
  content?: React.ReactNode
  
  /**
   * Position of the popover relative to the trigger element
   * @default 'bottom'
   */
  position?: PopoverPosition
  
  /**
   * How the popover should be triggered to show/hide
   * @default 'click'
   */
  trigger?: PopoverTrigger
  
  /**
   * Whether the popover is currently visible (controlled mode)
   */
  open?: boolean
  
  /**
   * Callback function called when the popover visibility changes
   */
  onOpenChange?: (open: boolean) => void
  
  /**
   * Whether the popover should close when clicking outside of it
   * @default true
   */
  closeOnClickOutside?: boolean
  
  /**
   * Whether the popover should close when pressing the Escape key
   * @default true
   */
  closeOnEscape?: boolean
  
  /**
   * Whether to show an arrow pointing from the popover to the trigger
   * @default true
   */
  showArrow?: boolean
  
  /**
   * Additional CSS classes to apply to the popover
   */
  className?: string
  
  /**
   * Custom styles to apply to the popover
   */
  style?: CSSProperties
  
  /**
   * Whether the popover trigger is disabled
   * @default false
   */
  disabled?: boolean
  
  /**
   * Maximum width of the popover in pixels
   * @default 400
   */
  maxWidth?: number
  
  /**
   * Whether to automatically focus the first focusable element when opened
   * @default true
   */
  autoFocus?: boolean
  
  /**
   * CSS selector for the element that should receive initial focus
   */
  initialFocus?: string
}

interface PopoverContextValue {
  close: () => void
}

const PopoverContext = createContext<PopoverContextValue | null>(null)

export const Popover: React.FC<PopoverProps> & {
  Content: typeof PopoverContent
  Header: typeof PopoverHeader
  Body: typeof PopoverBody
  Footer: typeof PopoverFooter
} = ({
  children,
  content,
  position = 'bottom',
  trigger = 'click',
  open: controlledOpen,
  onOpenChange,
  closeOnClickOutside = true,
  closeOnEscape = true,
  showArrow = true,
  className,
  style,
  disabled = false,
  maxWidth = 400,
  autoFocus = true,
  initialFocus,
}) => {
  const [open, setOpen] = useState(false)
  const [actualPosition, setActualPosition] = useState<PopoverPosition>(position)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLElement | null>(null)
  const popoverRef = useRef<HTMLDivElement | null>(null)
  const previousActiveElementRef = useRef<HTMLElement | null>(null)

  const isOpen = controlledOpen !== undefined ? controlledOpen : open

  // Calculate position and coordinates
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const popoverRect = popoverRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const scrollX = window.scrollX
    const scrollY = window.scrollY

    let finalPosition = position
    let x = 0
    let y = 0

    // Auto positioning logic
    if (position === 'auto') {
      const spaceTop = triggerRect.top
      const spaceBottom = viewportHeight - triggerRect.bottom
      const spaceLeft = triggerRect.left
      const spaceRight = viewportWidth - triggerRect.right

      if (spaceBottom >= popoverRect.height + 10) {
        finalPosition = 'bottom'
      } else if (spaceTop >= popoverRect.height + 10) {
        finalPosition = 'top'
      } else if (spaceRight >= popoverRect.width + 10) {
        finalPosition = 'right'
      } else if (spaceLeft >= popoverRect.width + 10) {
        finalPosition = 'left'
      } else {
        finalPosition = 'bottom'
      }
    }

    // Calculate coordinates based on final position
    switch (finalPosition.split('-')[0]) {
      case 'top':
        y = triggerRect.top - popoverRect.height - 8
        break
      case 'bottom':
        y = triggerRect.bottom + 8
        break
      case 'left':
        x = triggerRect.left - popoverRect.width - 8
        break
      case 'right':
        x = triggerRect.right + 8
        break
    }

    // Handle alignment variants (start, end)
    if (finalPosition.includes('top') || finalPosition.includes('bottom')) {
      if (finalPosition.includes('start')) {
        x = triggerRect.left
      } else if (finalPosition.includes('end')) {
        x = triggerRect.right - popoverRect.width
      } else {
        x = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2
      }
    } else if (finalPosition.includes('left') || finalPosition.includes('right')) {
      if (finalPosition.includes('start')) {
        y = triggerRect.top
      } else if (finalPosition.includes('end')) {
        y = triggerRect.bottom - popoverRect.height
      } else {
        y = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2
      }
    }

    // Adjust for viewport boundaries
    x = Math.max(8, Math.min(x, viewportWidth - popoverRect.width - 8))
    y = Math.max(8, Math.min(y, viewportHeight - popoverRect.height - 8))

    setActualPosition(finalPosition)
    setCoords({
      x: x + scrollX,
      y: y + scrollY,
    })
  }, [position])

  // Open popover
  const openPopover = useCallback(() => {
    if (disabled) return
    
    previousActiveElementRef.current = document.activeElement as HTMLElement
    
    if (controlledOpen === undefined) {
      setOpen(true)
    }
    onOpenChange?.(true)
  }, [disabled, controlledOpen, onOpenChange])

  // Close popover
  const closePopover = useCallback(() => {
    if (controlledOpen === undefined) {
      setOpen(false)
    }
    onOpenChange?.(false)
    
    // Restore focus to trigger element without scrolling
    if (previousActiveElementRef.current) {
      previousActiveElementRef.current.focus({ preventScroll: true })
    }
  }, [controlledOpen, onOpenChange])

  // Handle click outside
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!closeOnClickOutside || !isOpen) return
    
    const target = event.target as Node
    if (
      popoverRef.current &&
      triggerRef.current &&
      !popoverRef.current.contains(target) &&
      !triggerRef.current.contains(target)
    ) {
      closePopover()
    }
  }, [closeOnClickOutside, isOpen, closePopover])

  // Handle keyboard events
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && closeOnEscape && isOpen) {
      closePopover()
    }
  }, [closeOnEscape, isOpen, closePopover])

  // Handle focus management
  const handleFocusManagement = useCallback(() => {
    if (!autoFocus || !isOpen || !popoverRef.current) return

    const focusableElements = popoverRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    if (initialFocus) {
      const initialElement = popoverRef.current.querySelector(initialFocus) as HTMLElement
      if (initialElement) {
        initialElement.focus({ preventScroll: true })
        return
      }
    }

    if (focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus({ preventScroll: true })
    } else {
      popoverRef.current.focus({ preventScroll: true })
    }
  }, [autoFocus, isOpen, initialFocus])

  // Handle focus trap
  const handleFocusTrap = useCallback((event: KeyboardEvent) => {
    if (!isOpen || !popoverRef.current || event.key !== 'Tab') return

    const focusableElements = popoverRef.current.querySelectorAll(
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
  }, [isOpen])

  // Effects
  useEffect(() => {
    if (isOpen) {
      calculatePosition()
      handleFocusManagement()
      
      const handleResize = () => calculatePosition()
      const handleScroll = () => calculatePosition()
      
      window.addEventListener('resize', handleResize)
      window.addEventListener('scroll', handleScroll)
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('keydown', handleFocusTrap)
      
      return () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('scroll', handleScroll)
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('keydown', handleFocusTrap)
      }
    }
  }, [isOpen, calculatePosition, handleFocusManagement, handleClickOutside, handleKeyDown, handleFocusTrap])

  // Create trigger event handlers
  const triggerProps: Record<string, (() => void) | ((e: React.MouseEvent) => void) | ((e: React.FocusEvent) => void)> = {}
  
  if (trigger === 'click') {
    triggerProps.onClick = (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (isOpen) {
        closePopover()
      } else {
        openPopover()
      }
    }
  } else if (trigger === 'focus') {
    triggerProps.onFocus = openPopover
    triggerProps.onBlur = (_e: React.FocusEvent) => {
      // Don't close if focus moved to popover
      setTimeout(() => {
        if (popoverRef.current && popoverRef.current.contains(document.activeElement)) {
          return
        }
        closePopover()
      }, 0)
    }
  }

  // Clone trigger element with event handlers
  const triggerElement = React.cloneElement(children, {
    ...triggerProps,
    ref: (el: HTMLElement | null) => {
      if (el) {
        triggerRef.current = el
      }
    },
    'aria-expanded': isOpen,
    'aria-haspopup': 'dialog',
  })

  // Context value
  const contextValue: PopoverContextValue = {
    close: closePopover,
  }

  // Process utility classes
  const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
    className,
    style,
    componentClasses: clsx(
      styles.popover,
      styles[actualPosition.split('-')[0]],
      {
        [styles.withArrow]: showArrow,
      }
    )
  })

  // Render popover portal
  const popoverPortal = isOpen ? createPortal(
    <PopoverContext.Provider value={contextValue}>
      <div
        ref={popoverRef}
        className={processedClassName}
        style={{
          position: 'absolute',
          left: coords.x,
          top: coords.y,
          maxWidth,
          zIndex: 'var(--brutal-z-popover)',
          ...processedStyle
        }}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        {showArrow && <div className={styles.arrow} />}
        <div className={styles.content}>
          {content}
        </div>
      </div>
    </PopoverContext.Provider>,
    document.body
  ) : null

  return (
    <>
      {triggerElement}
      {popoverPortal}
    </>
  )
}

// Subcomponents
export const PopoverContent: React.FC<{ children: React.ReactNode; className?: string; style?: CSSProperties }> = ({
  children,
  className,
  style,
}) => {
  // Process utility classes
  const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
    className,
    style,
    componentClasses: styles.contentWrapper
  })

  return (
    <div className={processedClassName} style={processedStyle}>
      {children}
    </div>
  )
}

export const PopoverHeader: React.FC<{ children: React.ReactNode; className?: string; style?: CSSProperties }> = ({
  children,
  className,
  style,
}) => {
  // Process utility classes
  const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
    className,
    style,
    componentClasses: styles.header
  })

  return (
    <div className={processedClassName} style={processedStyle}>
      {children}
    </div>
  )
}

export const PopoverBody: React.FC<{ children: React.ReactNode; className?: string; style?: CSSProperties }> = ({
  children,
  className,
  style,
}) => {
  // Process utility classes
  const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
    className,
    style,
    componentClasses: styles.body
  })

  return (
    <div className={processedClassName} style={processedStyle}>
      {children}
    </div>
  )
}

export const PopoverFooter: React.FC<{ children: React.ReactNode; className?: string; style?: CSSProperties }> = ({
  children,
  className,
  style,
}) => {
  // Process utility classes
  const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
    className,
    style,
    componentClasses: styles.footer
  })

  return (
    <div className={processedClassName} style={processedStyle}>
      {children}
    </div>
  )
}

// Hook to access popover context
export const usePopover = () => {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error('usePopover must be used within a Popover component')
  }
  return context
}

// Assign subcomponents
Popover.Content = PopoverContent
Popover.Header = PopoverHeader
Popover.Body = PopoverBody
Popover.Footer = PopoverFooter

Popover.displayName = 'Popover'
PopoverContent.displayName = 'PopoverContent'
PopoverHeader.displayName = 'PopoverHeader'
PopoverBody.displayName = 'PopoverBody'
PopoverFooter.displayName = 'PopoverFooter'