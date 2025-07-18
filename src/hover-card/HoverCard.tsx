import React, { forwardRef, useState, useRef, useEffect, ReactNode } from 'react'
import { clsx } from 'clsx'
import styles from './HoverCard.module.css'

// Context for compound components
const HoverCardContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLDivElement>
} | null>(null)

const useHoverCard = () => {
  const context = React.useContext(HoverCardContext)
  if (!context) {
    throw new Error('HoverCard components must be used within a HoverCard')
  }
  return context
}

export interface HoverCardProps {
  children: ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  openDelay?: number
  closeDelay?: number
}

export const HoverCard: React.FC<HoverCardProps> & {
  Trigger: typeof HoverCardTrigger
  Content: typeof HoverCardContent
} = ({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  openDelay = 700,
  closeDelay = 300
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen
  const triggerRef = useRef<HTMLDivElement>(null)
  const openTimerRef = useRef<NodeJS.Timeout>()
  const closeTimerRef = useRef<NodeJS.Timeout>()

  const setOpen = (newOpen: boolean) => {
    // Clear any existing timers
    if (openTimerRef.current) clearTimeout(openTimerRef.current)
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)

    const delay = newOpen ? openDelay : closeDelay

    const timer = setTimeout(() => {
      if (!isControlled) {
        setInternalOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    }, delay)

    if (newOpen) {
      openTimerRef.current = timer
    } else {
      closeTimerRef.current = timer
    }
  }

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current)
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  return (
    <HoverCardContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className={styles.root}>
        {children}
      </div>
    </HoverCardContext.Provider>
  )
}

export interface HoverCardTriggerProps {
  children: ReactNode
  asChild?: boolean
  className?: string
}

const HoverCardTrigger = forwardRef<HTMLDivElement, HoverCardTriggerProps>(
  ({ children, asChild = false, className }, _ref) => {
    const { setOpen, triggerRef } = useHoverCard()

    const handleMouseEnter = () => setOpen(true)
    const handleMouseLeave = () => setOpen(false)
    const handleFocus = () => setOpen(true)
    const handleBlur = () => setOpen(false)

    const triggerProps = {
      ref: triggerRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      className: clsx(styles.trigger, className)
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<HTMLElement>, triggerProps)
    }

    return (
      <div {...triggerProps}>
        {children}
      </div>
    )
  }
)

HoverCardTrigger.displayName = 'HoverCardTrigger'

export interface HoverCardContentProps {
  children: ReactNode
  className?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  alignOffset?: number
  collisionBoundary?: 'viewport' | 'parent' | HTMLElement
  hideWhenDetached?: boolean
  brutalistShadow?: boolean
}

const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>(
  ({
    children,
    className,
    side = 'bottom',
    align = 'center',
    sideOffset = 8,
    alignOffset = 0,
    collisionBoundary = 'viewport',
    hideWhenDetached = true, // eslint-disable-line @typescript-eslint/no-unused-vars
    brutalistShadow = true,
    ...props
  }, ref) => {
    const { open, triggerRef, setOpen } = useHoverCard()
    const internalRef = useRef<HTMLDivElement>(null)
    const contentRef = (ref as React.RefObject<HTMLDivElement>) || internalRef
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const [actualSide, setActualSide] = useState(side)

    // Handle mouse events on content
    const handleMouseEnter = () => setOpen(true)
    const handleMouseLeave = () => setOpen(false)

    // Update position when open or window resizes
    useEffect(() => {
      if (!open || !triggerRef.current || !contentRef.current) return

      const updatePosition = () => {
        const trigger = triggerRef.current
        const content = contentRef.current
        if (!trigger || !content) return

        const triggerRect = trigger.getBoundingClientRect()
        const contentRect = content.getBoundingClientRect()
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        let top = 0
        let left = 0
        let finalSide = side

        // Calculate initial position based on side
        switch (side) {
          case 'top':
            top = triggerRect.top - contentRect.height - sideOffset
            left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2
            break
          case 'right':
            top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2
            left = triggerRect.right + sideOffset
            break
          case 'bottom':
            top = triggerRect.bottom + sideOffset
            left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2
            break
          case 'left':
            top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2
            left = triggerRect.left - contentRect.width - sideOffset
            break
        }

        // Apply alignment offset
        if (side === 'top' || side === 'bottom') {
          if (align === 'start') {
            left = triggerRect.left + alignOffset
          } else if (align === 'end') {
            left = triggerRect.right - contentRect.width - alignOffset
          }
        } else {
          if (align === 'start') {
            top = triggerRect.top + alignOffset
          } else if (align === 'end') {
            top = triggerRect.bottom - contentRect.height - alignOffset
          }
        }

        // Collision detection and adjustment
        if (collisionBoundary === 'viewport') {
          // Check if content overflows viewport and flip if needed
          if (side === 'bottom' && top + contentRect.height > viewportHeight) {
            top = triggerRect.top - contentRect.height - sideOffset
            finalSide = 'top'
          } else if (side === 'top' && top < 0) {
            top = triggerRect.bottom + sideOffset
            finalSide = 'bottom'
          } else if (side === 'right' && left + contentRect.width > viewportWidth) {
            left = triggerRect.left - contentRect.width - sideOffset
            finalSide = 'left'
          } else if (side === 'left' && left < 0) {
            left = triggerRect.right + sideOffset
            finalSide = 'right'
          }

          // Ensure content stays within viewport
          left = Math.max(8, Math.min(left, viewportWidth - contentRect.width - 8))
          top = Math.max(8, Math.min(top, viewportHeight - contentRect.height - 8))
        }

        setPosition({ top, left })
        setActualSide(finalSide)
      }

      updatePosition()
      window.addEventListener('resize', updatePosition)
      window.addEventListener('scroll', updatePosition, true)

      return () => {
        window.removeEventListener('resize', updatePosition)
        window.removeEventListener('scroll', updatePosition, true)
      }
    }, [open, side, align, sideOffset, alignOffset, collisionBoundary, triggerRef, contentRef])

    if (!open) return null

    return (
      <div
        ref={contentRef}
        className={clsx(
          styles.content,
          styles[actualSide],
          {
            [styles.withShadow]: brutalistShadow
          },
          className
        )}
        style={{
          position: 'fixed',
          top: `${position.top}px`,
          left: `${position.left}px`,
          zIndex: 50
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div className={styles.contentInner}>
          {children}
        </div>
        <div className={styles.arrow} data-side={actualSide} />
      </div>
    )
  }
)

HoverCardContent.displayName = 'HoverCardContent'

// Attach compound components
HoverCard.Trigger = HoverCardTrigger
HoverCard.Content = HoverCardContent

export { HoverCardTrigger, HoverCardContent }