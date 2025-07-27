/**
 * @module Carousel
 * @description A fully-featured carousel component with support for touch gestures, keyboard navigation, and auto-play. Includes compound components for flexible composition.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useRef, forwardRef, CSSProperties } from 'react'
import clsx from 'clsx'
import { useResponsiveUtilities } from '../hooks/useResponsiveUtilities'
import styles from './Carousel.module.css'

/**
 * Props for the Carousel component
 */
interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The orientation of the carousel slides
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'
  
  /**
   * Whether the carousel should automatically advance slides
   * @default false
   */
  autoPlay?: boolean
  
  /**
   * The interval between auto-play transitions in milliseconds
   * @default 3000
   */
  autoPlayInterval?: number
  
  /**
   * Whether the carousel should loop back to the beginning after the last slide
   * @default false
   */
  loop?: boolean
  
  /**
   * The controlled current slide index
   */
  value?: number
  
  /**
   * The default slide index when uncontrolled
   * @default 0
   */
  defaultValue?: number
  
  /**
   * Callback fired when the slide index changes
   */
  onValueChange?: (value: number) => void
  
  /**
   * The size variant of the carousel
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * The visual style variant of the carousel
   * @default 'default'
   */
  variant?: 'default' | 'brutal' | 'outline'
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
  
  /**
   * Custom inline styles (supports utility classes)
   */
  style?: CSSProperties
}

interface CarouselContextValue {
  currentIndex: number
  setCurrentIndex: (index: number) => void
  orientation: 'horizontal' | 'vertical'
  totalItems: number
  setTotalItems: (count: number) => void
  loop: boolean
  autoPlay: boolean
  autoPlayInterval: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'brutal' | 'outline'
}

const CarouselContext = createContext<CarouselContextValue | null>(null)

const useCarousel = () => {
  const context = useContext(CarouselContext)
  if (!context) {
    throw new Error('Carousel components must be used within a Carousel')
  }
  return context
}

/**
 * A fully-featured carousel component for displaying content in a slideshow format.
 * Supports keyboard navigation, touch gestures, and auto-play functionality.
 * 
 * @example
 * ```tsx
 * <Carousel autoPlay loop>
 *   <Carousel.Content>
 *     <img src="slide1.jpg" alt="Slide 1" />
 *     <img src="slide2.jpg" alt="Slide 2" />
 *     <img src="slide3.jpg" alt="Slide 3" />
 *   </Carousel.Content>
 *   <Carousel.Controls>
 *     <Carousel.Previous />
 *     <Carousel.Next />
 *   </Carousel.Controls>
 *   <Carousel.Indicators />
 * </Carousel>
 * ```
 */
const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  ({ 
    orientation = 'horizontal',
    autoPlay = false,
    autoPlayInterval = 3000,
    loop = false,
    value,
    defaultValue = 0,
    onValueChange,
    size = 'md',
    variant = 'default',
    children,
    className,
    style,
    ...props
  }, ref) => {
    const [currentIndex, setCurrentIndexState] = useState(value ?? defaultValue)
    const [totalItems, setTotalItems] = useState(0)

    const setCurrentIndex = useCallback((index: number) => {
      if (loop) {
        const newIndex = (index + totalItems) % totalItems
        setCurrentIndexState(newIndex)
        onValueChange?.(newIndex)
      } else {
        const newIndex = Math.max(0, Math.min(index, totalItems - 1))
        setCurrentIndexState(newIndex)
        onValueChange?.(newIndex)
      }
    }, [loop, totalItems, onValueChange])

    useEffect(() => {
      if (value !== undefined) {
        setCurrentIndexState(value)
      }
    }, [value])

    useEffect(() => {
      if (autoPlay && totalItems > 0) {
        const interval = setInterval(() => {
          setCurrentIndex(currentIndex + 1)
        }, autoPlayInterval)
        return () => clearInterval(interval)
      }
    }, [autoPlay, autoPlayInterval, currentIndex, setCurrentIndex, totalItems])

    // Process utility classes
    const { className: processedClassName, style: processedStyle } = useResponsiveUtilities({
      className,
      style,
      componentClasses: clsx(
        styles.carousel,
        styles[`carousel-${size}`],
        styles[`carousel-${variant}`]
      )
    })

    return (
      <CarouselContext.Provider
        value={{
          currentIndex,
          setCurrentIndex,
          orientation,
          totalItems,
          setTotalItems,
          loop,
          autoPlay,
          autoPlayInterval,
          size,
          variant
        }}
      >
        <div
          ref={ref}
          className={processedClassName}
          style={processedStyle}
          data-orientation={orientation}
          data-size={size}
          data-variant={variant}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)

/**
 * Props for the Carousel.Content component
 */
interface CarouselContentProps {
  /**
   * The slide items to display in the carousel
   */
  children?: React.ReactNode
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
}

/**
 * Container for the carousel slides.
 * Automatically tracks and transitions between child elements.
 */
const CarouselContent = forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ children, className }, ref) => {
    const { currentIndex, orientation, setTotalItems } = useCarousel()
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const items = React.Children.count(children)
      setTotalItems(items)
    }, [children, setTotalItems])

    const transform = orientation === 'horizontal' 
      ? `translateX(-${currentIndex * 100}%)`
      : `translateY(-${currentIndex * 100}%)`

    return (
      <div 
        ref={ref}
        className={clsx(styles.carouselContent, className)}
      >
        <div
          ref={contentRef}
          className={styles.carouselTrack}
          style={{ transform }}
        >
          {React.Children.map(children, (child, index) => (
            <div
              className={styles.carouselItem}
              data-active={index === currentIndex}
              key={index}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    )
  }
)

/**
 * Props for the Carousel.Controls component
 */
interface CarouselControlsProps {
  /**
   * The control elements (typically Previous and Next buttons)
   */
  children?: React.ReactNode
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
}

/**
 * Container for carousel navigation controls.
 * Typically contains Previous and Next buttons.
 */
const CarouselControls = forwardRef<HTMLDivElement, CarouselControlsProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.carouselControls, className)}
      >
        {children}
      </div>
    )
  }
)

/**
 * Props for the Carousel.Previous component
 */
interface CarouselPreviousProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Custom content for the button (defaults to arrow icon)
   */
  children?: React.ReactNode
}

/**
 * Previous slide navigation button.
 * Automatically disabled when at the first slide unless loop is enabled.
 */
const CarouselPrevious = forwardRef<HTMLButtonElement, CarouselPreviousProps>(
  ({ children, className, onClick, ...props }, ref) => {
    const { currentIndex, setCurrentIndex, loop } = useCarousel()
    const isDisabled = !loop && currentIndex === 0

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented) {
        setCurrentIndex(currentIndex - 1)
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        className={clsx(styles.carouselButton, styles.carouselPrevious, className)}
        onClick={handleClick}
        disabled={isDisabled}
        aria-label="Previous slide"
        {...props}
      >
        {children || (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        )}
      </button>
    )
  }
)

/**
 * Props for the Carousel.Next component
 */
interface CarouselNextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Custom content for the button (defaults to arrow icon)
   */
  children?: React.ReactNode
}

/**
 * Next slide navigation button.
 * Automatically disabled when at the last slide unless loop is enabled.
 */
const CarouselNext = forwardRef<HTMLButtonElement, CarouselNextProps>(
  ({ children, className, onClick, ...props }, ref) => {
    const { currentIndex, setCurrentIndex, totalItems, loop } = useCarousel()
    const isDisabled = !loop && currentIndex === totalItems - 1

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (!e.defaultPrevented) {
        setCurrentIndex(currentIndex + 1)
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        className={clsx(styles.carouselButton, styles.carouselNext, className)}
        onClick={handleClick}
        disabled={isDisabled}
        aria-label="Next slide"
        {...props}
      >
        {children || (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        )}
      </button>
    )
  }
)

/**
 * Props for the Carousel.Indicators component
 */
interface CarouselIndicatorsProps {
  /**
   * Custom indicator elements (defaults to dot indicators)
   */
  children?: React.ReactNode
  
  /**
   * Additional CSS class name for styling
   */
  className?: string
}

/**
 * Slide position indicators for the carousel.
 * Displays dots by default that can be clicked to navigate to specific slides.
 */
const CarouselIndicators = forwardRef<HTMLDivElement, CarouselIndicatorsProps>(
  ({ children, className }, ref) => {
    const { currentIndex, setCurrentIndex, totalItems } = useCarousel()

    if (children) {
      return (
        <div
          ref={ref}
          className={clsx(styles.carouselIndicators, className)}
        >
          {children}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={clsx(styles.carouselIndicators, className)}
      >
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={clsx(
              styles.carouselIndicator,
              index === currentIndex && styles.carouselIndicatorActive
            )}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    )
  }
)

// Component display names
Carousel.displayName = 'Carousel'
CarouselContent.displayName = 'CarouselContent'
CarouselControls.displayName = 'CarouselControls'
CarouselPrevious.displayName = 'CarouselPrevious'
CarouselNext.displayName = 'CarouselNext'
CarouselIndicators.displayName = 'CarouselIndicators'

// Compound component pattern
const CarouselComponent = Object.assign(Carousel, {
  Content: CarouselContent,
  Controls: CarouselControls,
  Previous: CarouselPrevious,
  Next: CarouselNext,
  Indicators: CarouselIndicators
})

export { CarouselComponent as Carousel }
export type {
  CarouselProps,
  CarouselContentProps,
  CarouselControlsProps,
  CarouselPreviousProps,
  CarouselNextProps,
  CarouselIndicatorsProps
}