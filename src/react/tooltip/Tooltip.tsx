/**
 * @module Tooltip
 * @description A tooltip component for displaying contextual information on hover or focus. Automatically positions itself to stay within viewport bounds.
 */

import React, { useState, useRef, useEffect, useCallback, CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { clsx } from 'clsx'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'
import styles from './Tooltip.module.css'

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto'
export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual'

export interface TooltipProps {
  /** The content to display inside the tooltip */
  content: React.ReactNode
  /** The element that triggers the tooltip */
  children: React.ReactElement
  /** Position of the tooltip relative to the trigger */
  position?: TooltipPosition
  /** How the tooltip is triggered */
  trigger?: TooltipTrigger
  /** Delay before showing tooltip (ms) */
  showDelay?: number
  /** Delay before hiding tooltip (ms) */
  hideDelay?: number
  /** Whether the tooltip is currently visible (for manual trigger) */
  visible?: boolean
  /** Callback when visibility changes (for manual trigger) */
  onVisibilityChange?: (visible: boolean) => void
  /** Whether to show an arrow pointing to the trigger */
  showArrow?: boolean
  /** Additional CSS classes */
  className?: string
  /** Custom styles to apply to the tooltip */
  style?: CSSProperties
  /** Whether the tooltip is disabled */
  disabled?: boolean
  /** Maximum width of the tooltip */
  maxWidth?: number
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  trigger = 'hover',
  showDelay = 0,
  hideDelay = 0,
  visible: controlledVisible,
  onVisibilityChange,
  showArrow = true,
  className,
  style,
  disabled = false,
  maxWidth = 300,
}) => {
  const [visible, setVisible] = useState(false)
  const [actualPosition, setActualPosition] = useState<TooltipPosition>(position)
  const [coords, setCoords] = useState({ x: -9999, y: -9999 })
  const triggerRef = useRef<HTMLElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const showTimeoutRef = useRef<NodeJS.Timeout>()
  const hideTimeoutRef = useRef<NodeJS.Timeout>()

  const isVisible = controlledVisible !== undefined ? controlledVisible : visible

  // Calculate position and coordinates
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
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

      if (spaceTop >= tooltipRect.height + 10) {
        finalPosition = 'top'
      } else if (spaceBottom >= tooltipRect.height + 10) {
        finalPosition = 'bottom'
      } else if (spaceRight >= tooltipRect.width + 10) {
        finalPosition = 'right'
      } else if (spaceLeft >= tooltipRect.width + 10) {
        finalPosition = 'left'
      } else {
        finalPosition = 'bottom' // fallback
      }
    }

    // Calculate coordinates based on final position
    switch (finalPosition) {
      case 'top':
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
        y = triggerRect.top - tooltipRect.height - 8
        break
      case 'bottom':
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
        y = triggerRect.bottom + 8
        break
      case 'left':
        x = triggerRect.left - tooltipRect.width - 8
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
        break
      case 'right':
        x = triggerRect.right + 8
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
        break
    }

    // Adjust for viewport boundaries
    x = Math.max(8, Math.min(x, viewportWidth - tooltipRect.width - 8))
    y = Math.max(8, Math.min(y, viewportHeight - tooltipRect.height - 8))

    setActualPosition(finalPosition)
    setCoords({
      x: x + scrollX,
      y: y + scrollY,
    })
  }, [position])

  // Show tooltip
  const showTooltip = useCallback(() => {
    if (disabled) return
    
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = undefined
    }

    if (showDelay > 0) {
      showTimeoutRef.current = setTimeout(() => {
        if (controlledVisible === undefined) {
          setVisible(true)
        }
        onVisibilityChange?.(true)
      }, showDelay)
    } else {
      if (controlledVisible === undefined) {
        setVisible(true)
      }
      onVisibilityChange?.(true)
    }
  }, [disabled, showDelay, controlledVisible, onVisibilityChange])

  // Hide tooltip
  const hideTooltip = useCallback(() => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current)
      showTimeoutRef.current = undefined
    }

    if (hideDelay > 0) {
      hideTimeoutRef.current = setTimeout(() => {
        if (controlledVisible === undefined) {
          setVisible(false)
        }
        onVisibilityChange?.(false)
      }, hideDelay)
    } else {
      if (controlledVisible === undefined) {
        setVisible(false)
      }
      onVisibilityChange?.(false)
    }
  }, [hideDelay, controlledVisible, onVisibilityChange])

  // Handle keyboard events
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && isVisible) {
      hideTooltip()
    }
  }, [isVisible, hideTooltip])

  // Effect to handle position calculation
  useEffect(() => {
    if (isVisible && triggerRef.current) {
      // Use requestAnimationFrame to ensure the tooltip is rendered first
      const frame = requestAnimationFrame(() => {
        calculatePosition()
      })
      
      const handleResize = () => calculatePosition()
      const handleScroll = () => calculatePosition()
      
      window.addEventListener('resize', handleResize)
      window.addEventListener('scroll', handleScroll)
      document.addEventListener('keydown', handleKeyDown)
      
      return () => {
        cancelAnimationFrame(frame)
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('scroll', handleScroll)
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isVisible, calculatePosition, handleKeyDown])

  // Additional effect to recalculate position when tooltip ref becomes available
  useEffect(() => {
    if (isVisible && tooltipRef.current && triggerRef.current) {
      const timeout = setTimeout(() => {
        calculatePosition()
      }, 0)
      
      return () => clearTimeout(timeout)
    }
  }, [isVisible, calculatePosition])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current)
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    }
  }, [])

  // Create trigger event handlers
  const triggerProps: Record<string, (() => void) | ((e: React.MouseEvent) => void)> = {}
  
  if (trigger === 'hover') {
    triggerProps.onMouseEnter = showTooltip
    triggerProps.onMouseLeave = hideTooltip
  } else if (trigger === 'click') {
    triggerProps.onClick = (e: React.MouseEvent) => {
      e.preventDefault()
      if (isVisible) {
        hideTooltip()
      } else {
        showTooltip()
      }
    }
  } else if (trigger === 'focus') {
    triggerProps.onFocus = showTooltip
    triggerProps.onBlur = hideTooltip
  }

  // Clone trigger element with event handlers
  const triggerElement = React.cloneElement(children, {
    ...triggerProps,
    ref: (el: HTMLElement) => {
      if (triggerRef) {
        (triggerRef as React.MutableRefObject<HTMLElement | null>).current = el
      }
      const childRef = (children as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref
      if (typeof childRef === 'function') {
        childRef(el)
      } else if (childRef && typeof childRef === 'object') {
        (childRef as React.MutableRefObject<HTMLElement | null>).current = el
      }
    },
    'aria-describedby': isVisible ? 'tooltip' : undefined,
  })

  // Process utility classes
  const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
    className,
    style,
    componentClasses: clsx(
      styles.tooltip,
      styles[actualPosition],
      {
        [styles.withArrow]: showArrow,
      }
    )
  })

  // Render tooltip portal
  const tooltipPortal = isVisible ? createPortal(
    <div
      ref={tooltipRef}
      className={processedClassName}
      style={{
        position: 'absolute',
        left: coords.x,
        top: coords.y,
        maxWidth,
        zIndex: 'var(--brutal-z-tooltip)',
        opacity: coords.x === -9999 ? 0 : 1,
        transition: 'opacity 0.15s ease-in-out',
        ...processedStyle
      }}
      role="tooltip"
      id="tooltip"
      onMouseEnter={trigger === 'hover' ? showTooltip : undefined}
      onMouseLeave={trigger === 'hover' ? hideTooltip : undefined}
    >
      {showArrow && <div className={styles.arrow} />}
      <div className={styles.content}>
        {content}
      </div>
    </div>,
    document.body
  ) : null

  return (
    <>
      {triggerElement}
      {tooltipPortal}
    </>
  )
}

Tooltip.displayName = 'Tooltip'