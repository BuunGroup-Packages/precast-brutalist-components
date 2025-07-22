/**
 * @module ScrollArea
 * @description A custom scrollable area component with brutalist-styled scrollbars. Provides consistent cross-browser scrolling with customizable scrollbar appearance.
 */

import React, { forwardRef, useRef, useState, useEffect } from 'react'
import { clsx } from 'clsx'
import styles from './ScrollArea.module.css'

export interface ScrollAreaProps {
  /**
   * The content to be scrolled
   */
  children: React.ReactNode
  
  /**
   * Additional CSS classes
   */
  className?: string
  
  /**
   * Height of the scroll area
   */
  height?: string | number
  
  /**
   * Maximum height of the scroll area
   */
  maxHeight?: string | number
  
  /**
   * Width of the scroll area
   */
  width?: string | number
  
  /**
   * Whether to show horizontal scrollbar
   * @default false
   */
  horizontal?: boolean
  
  /**
   * Whether to show vertical scrollbar
   * @default true
   */
  vertical?: boolean
  
  /**
   * Scrollbar size variant
   * @default 'md'
   */
  scrollbarSize?: 'sm' | 'md' | 'lg'
  
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: 'default' | 'minimal' | 'brutal'
  
  /**
   * Whether to auto-hide scrollbars when not scrolling
   * @default false
   */
  autoHide?: boolean
  
  /**
   * Whether to show a border around the scroll area
   * @default true
   */
  showBorder?: boolean
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties
  
  /**
   * Callback when scroll position changes
   */
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      children,
      className,
      height,
      maxHeight,
      width,
      horizontal = false,
      vertical = true,
      scrollbarSize = 'md',
      variant = 'default',
      autoHide = false,
      showBorder = true,
      style,
      onScroll,
      ...props
    },
    ref
  ) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [isScrolling, setIsScrolling] = useState(false)
    const [showVerticalScrollbar, setShowVerticalScrollbar] = useState(false)
    const [showHorizontalScrollbar, setShowHorizontalScrollbar] = useState(false)
    const [verticalThumbHeight, setVerticalThumbHeight] = useState(0)
    const [horizontalThumbWidth, setHorizontalThumbWidth] = useState(0)
    const [verticalThumbTop, setVerticalThumbTop] = useState(0)
    const [horizontalThumbLeft, setHorizontalThumbLeft] = useState(0)
    
    // Combine refs
    const combinedRef = (node: HTMLDivElement | null) => {
      scrollRef.current = node
      if (ref) {
        if (typeof ref === 'function') {
          ref(node)
        } else {
          // Use type assertion for mutable ref
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }
      }
    }
    
    // Calculate scrollbar visibility and thumb sizes
    const updateScrollbars = () => {
      if (!scrollRef.current) return
      
      const element = scrollRef.current
      const { scrollHeight, clientHeight, scrollWidth, clientWidth, scrollTop, scrollLeft } = element
      
      // Vertical scrollbar
      if (vertical) {
        const hasVerticalScroll = scrollHeight > clientHeight
        setShowVerticalScrollbar(hasVerticalScroll)
        
        if (hasVerticalScroll) {
          const thumbHeight = Math.max(30, (clientHeight / scrollHeight) * clientHeight)
          const maxThumbTop = clientHeight - thumbHeight
          const thumbTop = (scrollTop / (scrollHeight - clientHeight)) * maxThumbTop
          
          setVerticalThumbHeight(thumbHeight)
          setVerticalThumbTop(thumbTop)
        }
      }
      
      // Horizontal scrollbar
      if (horizontal) {
        const hasHorizontalScroll = scrollWidth > clientWidth
        setShowHorizontalScrollbar(hasHorizontalScroll)
        
        if (hasHorizontalScroll) {
          const thumbWidth = Math.max(30, (clientWidth / scrollWidth) * clientWidth)
          const maxThumbLeft = clientWidth - thumbWidth
          const thumbLeft = (scrollLeft / (scrollWidth - clientWidth)) * maxThumbLeft
          
          setHorizontalThumbWidth(thumbWidth)
          setHorizontalThumbLeft(thumbLeft)
        }
      }
    }
    
    // Handle scroll
    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
      updateScrollbars()
      setIsScrolling(true)
      onScroll?.(event)
      
      // Auto-hide scrollbars after delay
      if (autoHide) {
        setTimeout(() => {
          setIsScrolling(false)
        }, 1000)
      }
    }
    
    // Handle vertical scrollbar drag
    const handleVerticalMouseDown = (e: React.MouseEvent) => {
      e.preventDefault()
      const startY = e.clientY
      const startTop = verticalThumbTop
      
      const handleMouseMove = (e: MouseEvent) => {
        if (!scrollRef.current) return
        
        const deltaY = e.clientY - startY
        const element = scrollRef.current
        const { scrollHeight, clientHeight } = element
        const maxThumbTop = clientHeight - verticalThumbHeight
        const newThumbTop = Math.max(0, Math.min(maxThumbTop, startTop + deltaY))
        const scrollRatio = newThumbTop / maxThumbTop
        
        element.scrollTop = scrollRatio * (scrollHeight - clientHeight)
      }
      
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
      
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
    
    // Handle horizontal scrollbar drag
    const handleHorizontalMouseDown = (e: React.MouseEvent) => {
      e.preventDefault()
      const startX = e.clientX
      const startLeft = horizontalThumbLeft
      
      const handleMouseMove = (e: MouseEvent) => {
        if (!scrollRef.current) return
        
        const deltaX = e.clientX - startX
        const element = scrollRef.current
        const { scrollWidth, clientWidth } = element
        const maxThumbLeft = clientWidth - horizontalThumbWidth
        const newThumbLeft = Math.max(0, Math.min(maxThumbLeft, startLeft + deltaX))
        const scrollRatio = newThumbLeft / maxThumbLeft
        
        element.scrollLeft = scrollRatio * (scrollWidth - clientWidth)
      }
      
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
      
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
    
    // Initialize scrollbars
    useEffect(() => {
      updateScrollbars()
      
      // Add resize observer
      if (scrollRef.current) {
        const resizeObserver = new ResizeObserver(updateScrollbars)
        resizeObserver.observe(scrollRef.current)
        
        return () => {
          resizeObserver.disconnect()
        }
      }
    }, [])
    
    const scrollAreaStyle: React.CSSProperties = {
      ...style,
      height,
      maxHeight,
      width,
    }
    
    return (
      <div
        className={clsx(
          styles.scrollArea,
          styles[variant],
          styles[`size-${scrollbarSize}`],
          {
            [styles.showBorder]: showBorder,
            [styles.autoHide]: autoHide,
            [styles.isScrolling]: isScrolling,
          },
          className
        )}
        style={scrollAreaStyle}
        {...props}
      >
        <div
          ref={combinedRef}
          className={styles.viewport}
          onScroll={handleScroll}
          style={{
            overflowX: horizontal ? 'auto' : 'hidden',
            overflowY: vertical ? 'auto' : 'hidden',
          }}
        >
          {children}
        </div>
        
        {/* Custom vertical scrollbar */}
        {vertical && showVerticalScrollbar && (
          <div className={clsx(styles.scrollbar, styles.vertical)}>
            <div
              className={styles.thumb}
              style={{
                height: verticalThumbHeight,
                transform: `translateY(${verticalThumbTop}px)`,
              }}
              onMouseDown={handleVerticalMouseDown}
            />
          </div>
        )}
        
        {/* Custom horizontal scrollbar */}
        {horizontal && showHorizontalScrollbar && (
          <div className={clsx(styles.scrollbar, styles.horizontal)}>
            <div
              className={styles.thumb}
              style={{
                width: horizontalThumbWidth,
                transform: `translateX(${horizontalThumbLeft}px)`,
              }}
              onMouseDown={handleHorizontalMouseDown}
            />
          </div>
        )}
        
        {/* Corner when both scrollbars are visible */}
        {vertical && horizontal && showVerticalScrollbar && showHorizontalScrollbar && (
          <div className={styles.corner} />
        )}
      </div>
    )
  }
)

ScrollArea.displayName = 'ScrollArea'